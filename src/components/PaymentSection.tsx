import { useState, useEffect } from "react";
import {
  projectId,
  publicAnonKey,
} from "../utils/supabase/info";
import { AdminDashboard } from "./AdminDashboard";

export function PaymentSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeView, setActiveView] = useState<
    "create" | "dashboard"
  >("create");
  const [authToken, setAuthToken] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    description: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const [error, setError] = useState("");

  // Check if already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem("admin_auth_token");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a8be528/admin-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            username: loginForm.username,
            password: loginForm.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store auth token
      localStorage.setItem("admin_auth_token", data.token);
      setAuthToken(data.token);
      setIsAuthenticated(true);
      setLoginForm({ username: "", password: "" });
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials");
      console.error("Login error:", err);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth_token");
    setIsAuthenticated(false);
    setInvoiceUrl("");
    setFormData({
      email: "",
      name: "",
      description: "",
      amount: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInvoiceUrl("");

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a8be528/create-invoice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
            "X-Admin-Token": authToken || "",
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            description: formData.description,
            amount: parseFloat(formData.amount),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Auth token expired or invalid
          handleLogout();
          throw new Error(
            "Session expired. Please login again.",
          );
        }
        throw new Error(
          data.error || "Failed to create invoice",
        );
      }

      setInvoiceUrl(data.invoiceUrl);
      // Reset form
      setFormData({
        email: "",
        name: "",
        description: "",
        amount: "",
      });
    } catch (err: any) {
      setError(err.message || "An error occurred");
      console.error("Error creating invoice:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="payments"
      className="py-12 md:py-16 lg:py-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-['Poppins:Bold',_sans-serif] text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] text-[#f8f7f9] mb-8 md:mb-12 text-center">
          Payments
        </h2>

        <div className="max-w-2xl mx-auto">
          {!isAuthenticated ? (
            // Login Form
            <div className="bg-[rgba(248,247,249,0.05)] border border-[rgba(248,247,249,0.1)] rounded-2xl p-6 md:p-8">
              <div className="text-center mb-6">
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-[rgba(248,247,249,0.3)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <h3 className="font-['Poppins:Bold',_sans-serif] text-[20px] md:text-[24px] text-[#f8f7f9] mb-2">
                  Admin Access Required
                </h3>
                <p className="font-['Poppins:Regular',_sans-serif] text-[14px] md:text-[16px] text-[rgba(248,247,249,0.5)]">
                  Please login to create and manage invoices.
                </p>
              </div>

              <form
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div>
                  <label className="block font-['Poppins:SemiBold',_sans-serif] text-[14px] md:text-[16px] text-[rgba(248,247,249,0.7)] mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={loginForm.username}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        username: e.target.value,
                      })
                    }
                    className="w-full bg-[rgba(248,247,249,0.05)] border border-[rgba(248,247,249,0.2)] rounded-xl px-4 py-3 font-['Poppins:Regular',_sans-serif] text-[14px] md:text-[16px] text-[#f8f7f9] focus:outline-none focus:border-[rgba(248,247,249,0.5)] transition-colors"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block font-['Poppins:SemiBold',_sans-serif] text-[14px] md:text-[16px] text-[rgba(248,247,249,0.7)] mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        password: e.target.value,
                      })
                    }
                    className="w-full bg-[rgba(248,247,249,0.05)] border border-[rgba(248,247,249,0.2)] rounded-xl px-4 py-3 font-['Poppins:Regular',_sans-serif] text-[14px] md:text-[16px] text-[#f8f7f9] focus:outline-none focus:border-[rgba(248,247,249,0.5)] transition-colors"
                    placeholder="Enter password"
                  />
                </div>

                {loginError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <p className="font-['Poppins:Regular',_sans-serif] text-[14px] text-red-400">
                      {loginError}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full group border-2 border-[#f8f7f9] px-8 py-4 rounded-xl transition-all duration-300 hover:bg-[#f8f7f9] hover:text-[#1f1f1f] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-['Poppins:Bold',_sans-serif] text-[16px] md:text-[18px] text-[#f8f7f9] group-hover:text-[#1f1f1f] transition-colors duration-300">
                    {loginLoading ? "LOGGING IN..." : "LOGIN"}
                  </span>
                </button>
              </form>
            </div>
          ) : (
            // Invoice Creation Form (authenticated users only)
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="font-['Poppins:Regular',_sans-serif] text-[16px] md:text-[20px] lg:text-[24px] text-[rgba(248,247,249,0.5)] leading-[1.5]">
                  Create and send invoices to clients directly
                  through Stripe.
                </p>
                <button
                  onClick={handleLogout}
                  className="group border-2 border-[rgba(248,247,249,0.3)] px-4 py-2 rounded-lg transition-all duration-300 hover:border-[#f8f7f9] hover:bg-[rgba(248,247,249,0.1)] ml-4"
                >
                  <span className="font-['Poppins:SemiBold',_sans-serif] text-[12px] md:text-[14px] text-[rgba(248,247,249,0.7)] group-hover:text-[#f8f7f9] transition-colors duration-300 whitespace-nowrap">
                    LOGOUT
                  </span>
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveView("create")}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all duration-300 text-center ${
                    activeView === "create"
                      ? "bg-[#f8f7f9] text-[#1f1f1f]"
                      : "bg-[rgba(248,247,249,0.05)] border border-[rgba(248,247,249,0.2)] text-[rgba(248,247,249,0.7)] hover:bg-[rgba(248,247,249,0.1)]"
                  }`}
                >
                  <span className="font-['Poppins:SemiBold',_sans-serif] text-[14px] md:text-[16px]">
                    Create Invoice
                  </span>
                </button>
                <button
                  onClick={() => setActiveView("dashboard")}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all duration-300 text-center ${
                    activeView === "dashboard"
                      ? "bg-[#f8f7f9] text-[#1f1f1f]"
                      : "bg-[rgba(248,247,249,0.05)] border border-[rgba(248,247,249,0.2)] text-[rgba(248,247,249,0.7)] hover:bg-[rgba(248,247,249,0.1)]"
                  }`}
                >
                  <span className="font-['Poppins:SemiBold',_sans-serif] text-[14px] md:text-[16px]">
                    Dashboard
                  </span>
                </button>
              </div>

              {activeView === "dashboard" ? (
                <AdminDashboard adminToken={authToken} />
              ) : (
                <>
                  {invoiceUrl ? (
                    <div className="bg-[rgba(248,247,249,0.05)] border border-[rgba(248,247,249,0.1)] rounded-2xl p-6 md:p-8 text-center space-y-6">
                      <div className="space-y-3">
                        <svg
                          className="w-16 h-16 md:w-20 md:h-20 mx-auto text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h3 className="font-['Poppins:Bold',_sans-serif] text-[20px] md:text-[24px] text-[#f8f7f9]">
                          Invoice Created Successfully!
                        </h3>
                        <p className="font-['Poppins:Regular',_sans-serif] text-[14px] md:text-[16px] text-[rgba(248,247,249,0.5)]">
                          The invoice has been created. Share
                          this link with your client:
                        </p>
                      </div>

                      <div className="bg-[rgba(248,247,249,0.03)] border border-[rgba(248,247,249,0.1)] rounded-xl p-4 break-all">
                        <a
                          href={invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-['Poppins:Regular',_sans-serif] text-[14px] md:text-[16px] text-[#f8f7f9] hover:underline"
                        >
                          {invoiceUrl}
                        </a>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              invoiceUrl,
                            );
                            alert(
                              "Invoice URL copied to clipboard!",
                            );
                          }}
                          className="group border-2 border-[#f8f7f9] px-6 py-3 rounded-xl transition-all duration-300 hover:bg-[#f8f7f9] hover:text-[#1f1f1f]"
                        >
                          <span className="font-['Poppins:Bold',_sans-serif] text-[14px] md:text-[16px] text-[#f8f7f9] group-hover:text-[#1f1f1f] transition-colors duration-300">
                            COPY LINK
                          </span>
                        </button>

                        <button
                          onClick={() => setInvoiceUrl("")}
                          className="group border-2 border-[#f8f7f9] px-6 py-3 rounded-xl transition-all duration-300 hover:bg-[#f8f7f9] hover:text-[#1f1f1f]"
                        >
                          <span className="font-['Poppins:Bold',_sans-serif] text-[14px] md:text-[16px] text-[#f8f7f9] group-hover:text-[#1f1f1f] transition-colors duration-300">
                            CREATE ANOTHER
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="block font-['Poppins:SemiBold',_sans-serif] text-[14px] md:text-[16px] text-[rgba(248,247,249,0.7)] mb-2">
                            Client Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full bg-[rgba(248,247,249,0.05)] border border-[rgba(248,247,249,0.2)] rounded-xl px-4 py-3 font-['Poppins:Regular',_sans-serif] text-[14px] md:text-[16px] text-[#f8f7f9] focus:outline-none focus:border-[rgba(248,247,249,0.5)] transition-colors"
                            placeholder="client@example.com"
                          />
                        </div>

                        <div>
                          <label className="block font-['Poppins:SemiBold',_sans-serif] text-[14px] md:text-[16px] text-[rgba(248,247,249,0.7)] mb-2">
                            Client Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              })
                            }
                            className="w-full bg-[rgba(248,247,249,0.05)] border border-[rgba(248,247,249,0.2)] rounded-xl px-4 py-3 font-['Poppins:Regular',_sans-serif] text-[14px] md:text-[16px] text-[#f8f7f9] focus:outline-none focus:border-[rgba(248,247,249,0.5)] transition-colors"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block font-['Poppins:SemiBold',_sans-serif] text-[14px] md:text-[16px] text-[rgba(248,247,249,0.7)] mb-2">
                            Project Description *
                          </label>
                          <textarea
                            required
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                            className="w-full bg-[rgba(248,247,249,0.05)] border border-[rgba(248,247,249,0.2)] rounded-xl px-4 py-3 font-['Poppins:Regular',_sans-serif] text-[14px] md:text-[16px] text-[#f8f7f9] focus:outline-none focus:border-[rgba(248,247,249,0.5)] transition-colors resize-none"
                            rows={3}
                            placeholder="Web development project, consulting services, etc."
                          />
                        </div>

                        <div>
                          <label className="block font-['Poppins:SemiBold',_sans-serif] text-[14px] md:text-[16px] text-[rgba(248,247,249,0.7)] mb-2">
                            Amount (USD) *
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            step="0.01"
                            value={formData.amount}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                amount: e.target.value,
                              })
                            }
                            className="w-full bg-[rgba(248,247,249,0.05)] border border-[rgba(248,247,249,0.2)] rounded-xl px-4 py-3 font-['Poppins:Regular',_sans-serif] text-[14px] md:text-[16px] text-[#f8f7f9] focus:outline-none focus:border-[rgba(248,247,249,0.5)] transition-colors"
                            placeholder="500.00"
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                          <p className="font-['Poppins:Regular',_sans-serif] text-[14px] text-red-400">
                            {error}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full group border-2 border-[#f8f7f9] px-8 py-4 rounded-xl transition-all duration-300 hover:bg-[#f8f7f9] hover:text-[#1f1f1f] disabled:opacity-50 disabled:cursor-not-allowed text-center"
                      >
                        <span className="font-['Poppins:Bold',_sans-serif] text-[16px] md:text-[18px] text-[#f8f7f9] group-hover:text-[#1f1f1f] transition-colors duration-300">
                          {loading
                            ? "CREATING INVOICE..."
                            : "CREATE INVOICE"}
                        </span>
                      </button>
                    </form>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}