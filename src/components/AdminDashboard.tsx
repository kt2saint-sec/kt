import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ExternalLink, DollarSign, Users, FileText, CheckCircle, Clock } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface Invoice {
  clientEmail: string;
  description: string;
  amount: number;
  stripeInvoiceId: string;
  stripeInvoiceUrl: string;
  paid: boolean;
  createdAt: string;
  paidAt?: string;
}

interface Client {
  email: string;
  name: string;
  stripeCustomerId: string;
  createdAt: string;
  totalInvoices: number;
  totalAmount: number;
  paidAmount: number;
  unpaidAmount: number;
}

interface AdminDashboardProps {
  adminToken: string;
}

export function AdminDashboard({ adminToken }: AdminDashboardProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch invoices
      const invoicesResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a8be528/invoices`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "X-Admin-Token": adminToken,
          },
        }
      );

      if (!invoicesResponse.ok) {
        throw new Error("Failed to fetch invoices");
      }

      const invoicesData = await invoicesResponse.json();
      setInvoices(invoicesData.invoices || []);

      // Fetch clients
      const clientsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2a8be528/clients`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "X-Admin-Token": adminToken,
          },
        }
      );

      if (!clientsResponse.ok) {
        throw new Error("Failed to fetch clients");
      }

      const clientsData = await clientsResponse.json();
      setClients(clientsData.clients || []);
    } catch (err: any) {
      console.error("Error fetching dashboard data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Calculate overview stats
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidRevenue = invoices
    .filter((inv) => inv.paid)
    .reduce((sum, inv) => sum + inv.amount, 0);
  const unpaidRevenue = totalRevenue - paidRevenue;
  const totalClients = clients.length;
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((inv) => inv.paid).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400">Error: {error}</p>
        <button
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white">Admin Dashboard</h1>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          Refresh
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/5 border-white/10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <p className="text-2xl text-white">{formatCurrency(totalRevenue)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Paid</p>
                  <p className="text-2xl text-white">{formatCurrency(paidRevenue)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Unpaid</p>
                  <p className="text-2xl text-white">{formatCurrency(unpaidRevenue)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Clients</p>
                  <p className="text-2xl text-white">{totalClients}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <FileText className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Invoices</p>
                  <p className="text-2xl text-white">{totalInvoices}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Paid Invoices</p>
                  <p className="text-2xl text-white">
                    {paidInvoices} / {totalInvoices}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Invoices */}
          <Card className="p-6 bg-white/5 border-white/10">
            <h2 className="text-xl text-white mb-4">Recent Invoices</h2>
            <div className="space-y-4">
              {invoices.slice(0, 5).map((invoice) => (
                <div
                  key={invoice.stripeInvoiceId}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-white">{invoice.description}</p>
                    <p className="text-sm text-gray-400">{invoice.clientEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white">{formatCurrency(invoice.amount)}</p>
                    <Badge
                      variant={invoice.paid ? "default" : "secondary"}
                      className={
                        invoice.paid
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }
                    >
                      {invoice.paid ? "Paid" : "Unpaid"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <Card className="p-6 bg-white/5 border-white/10">
            <h2 className="text-xl text-white mb-4">All Invoices</h2>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.stripeInvoiceId}
                  className="flex flex-col gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white">{invoice.description}</p>
                        <Badge
                          variant={invoice.paid ? "default" : "secondary"}
                          className={
                            invoice.paid
                              ? "bg-green-500/20 text-green-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }
                        >
                          {invoice.paid ? "Paid" : "Unpaid"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{invoice.clientEmail}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Created: {formatDate(invoice.createdAt)}
                        {invoice.paidAt && ` • Paid: ${formatDate(invoice.paidAt)}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-white">
                        {formatCurrency(invoice.amount)}
                      </p>
                    </div>
                  </div>
                  <a
                    href={invoice.stripeInvoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Invoice in Stripe
                  </a>
                </div>
              ))}
              {invoices.length === 0 && (
                <p className="text-center text-gray-400 py-8">No invoices yet</p>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" className="space-y-4">
          <Card className="p-6 bg-white/5 border-white/10">
            <h2 className="text-xl text-white mb-4">All Clients</h2>
            <div className="space-y-3">
              {clients.map((client) => (
                <div
                  key={client.email}
                  className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white">{client.name}</p>
                      <p className="text-sm text-gray-400">{client.email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Member since {formatDate(client.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-white/10">
                    <div>
                      <p className="text-xs text-gray-400">Total Invoices</p>
                      <p className="text-white">{client.totalInvoices}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total Amount</p>
                      <p className="text-white">
                        {formatCurrency(client.totalAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Paid</p>
                      <p className="text-green-400">
                        {formatCurrency(client.paidAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Unpaid</p>
                      <p className="text-yellow-400">
                        {formatCurrency(client.unpaidAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {clients.length === 0 && (
                <p className="text-center text-gray-400 py-8">No clients yet</p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
