import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import Stripe from "npm:stripe@17.5.0";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Email sending function using Resend
async function sendInvoiceEmail(
  to: string,
  customerName: string,
  invoiceUrl: string,
  amount: number,
  description: string
): Promise<void> {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const karlEmail = Deno.env.get("KARL_EMAIL") || "noreply@example.com";

  if (!resendApiKey) {
    console.error("RESEND_API_KEY not set, skipping email");
    return;
  }

  const emailData = {
    from: `Karl <${karlEmail}>`,
    to: [to],
    subject: `Invoice for ${description}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Invoice from Karl</h2>
        <p>Hi ${customerName},</p>
        <p>Thank you for your business! Here's your invoice:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
        </div>
        <p>
          <a href="${invoiceUrl}" 
             style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View & Pay Invoice
          </a>
        </p>
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          If you have any questions, please don't hesitate to reach out.
        </p>
        <p style="color: #666; font-size: 14px;">
          Best regards,<br/>
          Karl
        </p>
      </div>
    `,
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to send email to client:", error);
    } else {
      console.log(`Invoice email sent to ${to}`);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }

  // Send copy to Karl
  try {
    const karlEmailData = {
      from: `Karl <${karlEmail}>`,
      to: [karlEmail],
      subject: `Invoice Copy: ${description}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Invoice Created</h2>
          <p>You've created a new invoice for ${customerName}:</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Client:</strong> ${customerName} (${to})</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
          </div>
          <p>
            <a href="${invoiceUrl}" 
               style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Invoice
            </a>
          </p>
        </div>
      `,
    };

    const karlResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(karlEmailData),
    });

    if (!karlResponse.ok) {
      const error = await karlResponse.text();
      console.error("Failed to send copy to Karl:", error);
    } else {
      console.log(`Invoice copy sent to Karl`);
    }
  } catch (error) {
    console.error("Error sending copy to Karl:", error);
  }
}

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Admin-Token"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-2a8be528/health", (c) => {
  return c.json({ status: "ok" });
});

// Admin login endpoint
app.post("/make-server-2a8be528/admin-login", async (c) => {
  try {
    const body = await c.req.json();
    const { username, password } = body;

    // Get admin credentials from environment variables
    const adminUsername = Deno.env.get("ADMIN_USERNAME") || "admin";
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD not set in environment variables");
      return c.json({ error: "Server configuration error" }, 500);
    }

    // Verify credentials
    if (username === adminUsername && password === adminPassword) {
      // Generate a simple token (timestamp + hash)
      const token = btoa(`${username}:${Date.now()}:${adminPassword}`);
      
      console.log(`Admin login successful for user: ${username}`);
      
      return c.json({ 
        success: true,
        token,
        message: "Login successful"
      });
    } else {
      console.log(`Failed login attempt for username: ${username}`);
      return c.json({ error: "Invalid username or password" }, 401);
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    return c.json({ error: `Login error: ${error.message}` }, 500);
  }
});

// Verify admin token middleware function
const verifyAdminToken = (token: string | null): boolean => {
  if (!token) return false;
  
  try {
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    if (!adminPassword) return false;

    const decoded = atob(token);
    const parts = decoded.split(':');
    
    if (parts.length !== 3) return false;
    
    const [username, timestamp, password] = parts;
    
    // Verify password matches
    if (password !== adminPassword) return false;
    
    // Token expires after 24 hours
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (tokenAge > maxAge) return false;
    
    return true;
  } catch (error) {
    console.error("Token verification error:", error);
    return false;
  }
};

// Create Stripe payment intent
app.post("/make-server-2a8be528/create-payment-intent", async (c) => {
  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      console.error("Stripe secret key not found in environment variables");
      return c.json({ error: "Stripe configuration error. Please contact the administrator." }, 500);
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-11-20.acacia",
    });

    const body = await c.req.json();
    const { amount, projectName, customerEmail, customerName } = body;

    // Validate inputs
    if (!amount || amount < 50) {
      return c.json({ error: "Amount must be at least $0.50" }, 400);
    }

    if (!projectName || !customerEmail || !customerName) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      description: `Payment for project: ${projectName}`,
      metadata: {
        projectName,
        customerEmail,
        customerName,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(`Payment intent created: ${paymentIntent.id} for $${amount}`);

    // Store payment record in KV store
    await kv.set(`payment:${paymentIntent.id}`, {
      id: paymentIntent.id,
      amount,
      projectName,
      customerEmail,
      customerName,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return c.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return c.json({ error: `Failed to create payment intent: ${error.message}` }, 500);
  }
});

// Get payment status
app.get("/make-server-2a8be528/payment-status/:paymentIntentId", async (c) => {
  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      return c.json({ error: "Stripe configuration error" }, 500);
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-11-20.acacia",
    });

    const paymentIntentId = c.req.param("paymentIntentId");
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Update KV store with latest status
    const storedPayment = await kv.get(`payment:${paymentIntentId}`);
    if (storedPayment) {
      await kv.set(`payment:${paymentIntentId}`, {
        ...storedPayment,
        status: paymentIntent.status,
        updatedAt: new Date().toISOString(),
      });
    }

    return c.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
    });
  } catch (error) {
    console.error("Error retrieving payment status:", error);
    return c.json({ error: `Failed to retrieve payment status: ${error.message}` }, 500);
  }
});

// Create invoice endpoint
app.post("/make-server-2a8be528/create-invoice", async (c) => {
  try {
    // Verify admin token
    const adminToken = c.req.header("X-Admin-Token");
    if (!verifyAdminToken(adminToken || null)) {
      console.log("Unauthorized invoice creation attempt");
      return c.json({ error: "Unauthorized. Please login." }, 401);
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      console.error("Stripe secret key not found in environment variables");
      return c.json({ error: "Stripe configuration error. Please contact the administrator." }, 500);
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-11-20.acacia",
    });

    const body = await c.req.json();
    const { email, name, description, amount } = body;

    // Validate inputs
    if (!email || !name || !description || !amount || amount < 1) {
      return c.json({ error: "Missing required fields or invalid amount" }, 400);
    }

    console.log(`Creating invoice for ${name} (${email}) - Amount: $${amount}`);

    // Step 1: Check if customer exists or create new one
    let customer;
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log(`Found existing customer: ${customer.id}`);
    } else {
      customer = await stripe.customers.create({
        email,
        name,
      });
      console.log(`Created new customer: ${customer.id}`);
    }

    // Store customer in KV store
    await kv.set(`client:${email}`, {
      email,
      name,
      stripeCustomerId: customer.id,
      createdAt: new Date().toISOString(),
    });

    // Step 2: Create invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: true, // Automatically finalize the invoice
      collection_method: 'send_invoice',
      days_until_due: 30, // Due in 30 days
      description: description,
    });

    // Step 3: Add invoice item
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      description: description,
    });

    // Step 4: Finalize the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    console.log(`Invoice created and finalized: ${finalizedInvoice.id}`);

    // Store invoice/job in KV store
    await kv.set(`job:${finalizedInvoice.id}`, {
      clientEmail: email,
      description,
      amount,
      stripeInvoiceId: finalizedInvoice.id,
      stripeInvoiceUrl: finalizedInvoice.hosted_invoice_url,
      paid: false,
      createdAt: new Date().toISOString(),
    });

    // Send invoice email
    await sendInvoiceEmail(email, name, finalizedInvoice.hosted_invoice_url, amount, description);

    return c.json({
      success: true,
      invoiceId: finalizedInvoice.id,
      invoiceUrl: finalizedInvoice.hosted_invoice_url,
      customer: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return c.json({ error: `Failed to create invoice: ${error.message}` }, 500);
  }
});

// Stripe webhook handler
app.post("/make-server-2a8be528/stripe-webhook", async (c) => {
  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeSecretKey) {
      return c.json({ error: "Stripe configuration error" }, 500);
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-11-20.acacia",
    });

    const body = await c.req.text();
    const signature = c.req.header("stripe-signature");

    let event;

    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return c.json({ error: "Webhook signature verification failed" }, 400);
      }
    } else {
      // If no webhook secret is configured, parse the body directly (not recommended for production)
      event = JSON.parse(body);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(`Payment succeeded: ${paymentIntent.id}`);
        
        // Update payment status in KV store
        const storedPayment = await kv.get(`payment:${paymentIntent.id}`);
        if (storedPayment) {
          await kv.set(`payment:${paymentIntent.id}`, {
            ...storedPayment,
            status: "succeeded",
            completedAt: new Date().toISOString(),
          });
        }
        break;
      
      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        console.log(`Payment failed: ${failedPayment.id}`);
        
        // Update payment status in KV store
        const failedStoredPayment = await kv.get(`payment:${failedPayment.id}`);
        if (failedStoredPayment) {
          await kv.set(`payment:${failedPayment.id}`, {
            ...failedStoredPayment,
            status: "failed",
            failedAt: new Date().toISOString(),
          });
        }
        break;
      
      case "invoice.paid":
        const paidInvoice = event.data.object;
        console.log(`Invoice paid: ${paidInvoice.id}`);
        
        // Update job status in KV store
        const storedJob = await kv.get(`job:${paidInvoice.id}`);
        if (storedJob) {
          await kv.set(`job:${paidInvoice.id}`, {
            ...storedJob,
            paid: true,
            paidAt: new Date().toISOString(),
          });
        }
        
        // Log payment
        await kv.set(`payment_log:${paidInvoice.id}:${Date.now()}`, {
          stripeInvoiceId: paidInvoice.id,
          amount: paidInvoice.amount_paid / 100,
          paidAt: new Date().toISOString(),
        });
        break;
      
      case "invoice.payment_failed":
        const failedInvoice = event.data.object;
        console.log(`Invoice payment failed: ${failedInvoice.id}`);
        
        // Update job status in KV store
        const failedJob = await kv.get(`job:${failedInvoice.id}`);
        if (failedJob) {
          await kv.set(`job:${failedInvoice.id}`, {
            ...failedJob,
            paymentFailed: true,
            lastFailedAt: new Date().toISOString(),
          });
        }
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return c.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return c.json({ error: `Webhook error: ${error.message}` }, 500);
  }
});

// Get all invoices (admin only)
app.get("/make-server-2a8be528/invoices", async (c) => {
  try {
    // Verify admin token
    const adminToken = c.req.header("X-Admin-Token");
    if (!verifyAdminToken(adminToken || null)) {
      console.log("Unauthorized attempt to access invoices");
      return c.json({ error: "Unauthorized. Please login." }, 401);
    }

    // Get all jobs from KV store
    const jobs = await kv.getByPrefix("job:");
    
    // Sort by creation date (newest first)
    const sortedJobs = jobs.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    console.log(`Retrieved ${sortedJobs.length} invoices`);

    return c.json({ invoices: sortedJobs });
  } catch (error) {
    console.error("Error retrieving invoices:", error);
    return c.json({ error: `Failed to retrieve invoices: ${error.message}` }, 500);
  }
});

// Get all clients (admin only)
app.get("/make-server-2a8be528/clients", async (c) => {
  try {
    // Verify admin token
    const adminToken = c.req.header("X-Admin-Token");
    if (!verifyAdminToken(adminToken || null)) {
      console.log("Unauthorized attempt to access clients");
      return c.json({ error: "Unauthorized. Please login." }, 401);
    }

    // Get all clients from KV store
    const clients = await kv.getByPrefix("client:");
    
    // Get all jobs to calculate statistics
    const jobs = await kv.getByPrefix("job:");
    
    // Add invoice count and total amounts to each client
    const clientsWithStats = clients.map((client: any) => {
      const clientJobs = jobs.filter((job: any) => job.clientEmail === client.email);
      const totalInvoices = clientJobs.length;
      const totalAmount = clientJobs.reduce((sum: number, job: any) => sum + job.amount, 0);
      const paidAmount = clientJobs.filter((job: any) => job.paid).reduce((sum: number, job: any) => sum + job.amount, 0);
      const unpaidAmount = totalAmount - paidAmount;
      
      return {
        ...client,
        totalInvoices,
        totalAmount,
        paidAmount,
        unpaidAmount,
      };
    });

    // Sort by creation date (newest first)
    const sortedClients = clientsWithStats.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    console.log(`Retrieved ${sortedClients.length} clients`);

    return c.json({ clients: sortedClients });
  } catch (error) {
    console.error("Error retrieving clients:", error);
    return c.json({ error: `Failed to retrieve clients: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);