import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle, ChevronLeft, ChevronRight, Clock, Download, Eye, IndianRupee, Loader2, Mail, MapPin, Phone,
  RefreshCw, Search, Trash2, TrendingUp, Trophy, Users,
} from "lucide-react";
import { isAxiosError } from "axios";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IqArenaRegistration {
  _id: string;
  registrationNumber?: string;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  city: string;
  state: string;
  collegeYear: string;
  graduationYear: number;
  graduationStream: string;
  cgpa10: number;
  cgpa12: number;
  mastersAim: string;
  mastersAimOther?: string;
  entranceExam: string;
  entranceExamOther?: string;
  paymentStatus: "pending" | "completed" | "failed";
  registrationFee?: number;
  platformCharge?: number;
  amountPaid?: number;
  orderId?: string;
  paymentId?: string;
  paidAt?: string;
  confirmedVia?: "checkout" | "webhook";
  emailStatus?: { student: boolean; admin: boolean };
  registrationDate: string;
}

interface Stats {
  paid: number;
  pending: number;
  today: number;
  revenue: number;
  byMastersAim: { aim: string; count: number }[];
}

type StatusFilter = "completed" | "pending" | "all";

const PAGE_SIZE = 10;

const authHeaders = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } });

const fmtDate = (d?: string) =>
  d
    ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : "—";

const aimLabel = (r: IqArenaRegistration) => (r.mastersAim === "Other" ? `Other: ${r.mastersAimOther}` : r.mastersAim);
const examLabel = (r: IqArenaRegistration) => (r.entranceExam === "Other" ? `Other: ${r.entranceExamOther}` : r.entranceExam);

const StatusBadge = ({ status }: { status: IqArenaRegistration["paymentStatus"] }) => {
  if (status === "completed") return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
  if (status === "failed") return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
  return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
};

const IqArenaAdminSection = () => {
  const [rows, setRows] = useState<IqArenaRegistration[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [status, setStatus] = useState<StatusFilter>("completed");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [selected, setSelected] = useState<IqArenaRegistration | null>(null);
  const [toDelete, setToDelete] = useState<IqArenaRegistration | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get("/user/iq-arena/stats", authHeaders());
      if (data.success) setStats(data.data);
    } catch {
      /* table fetch surfaces auth errors */
    }
  }, []);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/user/iq-arena/all", {
        ...authHeaders(),
        params: { page, limit: PAGE_SIZE, search: debouncedSearch, paymentStatus: status },
      });
      if (data.success) {
        setRows(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalItems(data.pagination.totalItems);
        setAuthError(false);
      }
    } catch (err) {
      const code = isAxiosError(err) ? err.response?.status : undefined;
      if (code === 401 || code === 403) setAuthError(true);
      setRows([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, status]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refresh = () => {
    fetchRows();
    fetchStats();
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await api.get("/user/iq-arena/export", {
        ...authHeaders(),
        params: { search: debouncedSearch, paymentStatus: status },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "text/csv;charset=utf-8;" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `IQ_Arena_2027_${status}_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting IQ Arena registrations:", error);
    } finally {
      setExporting(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await api.delete(`/user/iq-arena/${toDelete._id}`, authHeaders());
      setToDelete(null);
      refresh();
    } catch (error) {
      console.error("Error deleting IQ Arena registration:", error);
      setToDelete(null);
    }
  };

  const statTiles = [
    { label: "Paid registrations", value: stats?.paid ?? "—", icon: Trophy, color: "from-orange-500 to-rose-500" },
    {
      label: "Revenue collected",
      value: stats ? `₹${stats.revenue.toLocaleString("en-IN")}` : "—",
      icon: IndianRupee,
      color: "from-green-500 to-emerald-600",
    },
    { label: "Paid today", value: stats?.today ?? "—", icon: TrendingUp, color: "from-blue-500 to-indigo-600" },
    { label: "Pending / failed payments", value: stats?.pending ?? "—", icon: Clock, color: "from-amber-500 to-orange-600" },
  ];

  const filters: { key: StatusFilter; label: string }[] = [
    { key: "completed", label: `Paid${stats ? ` (${stats.paid})` : ""}` },
    { key: "pending", label: `Pending${stats ? ` (${stats.pending})` : ""}` },
    { key: "all", label: "All" },
  ];

  const from = totalItems === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, totalItems);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card className="overflow-hidden border-orange-200/50 bg-white/80 shadow-lg backdrop-blur-sm">
        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500" />
        <CardHeader className="border-b border-orange-100">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 shadow-md">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900 sm:text-2xl">IQ Arena 2027 Registrations</CardTitle>
                <CardDescription>
                  Students who registered and paid for the quiz championship · 23 Jan 2027, Sparsh Business School, Noida
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={refresh} className="border-orange-200 hover:bg-orange-50" disabled={loading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                size="sm"
                onClick={handleExport}
                disabled={exporting || totalItems === 0 || authError}
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                {exporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                Export CSV
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 lg:grid-cols-4">
            {statTiles.map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-xl border border-orange-100 bg-white p-3 shadow-sm">
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${s.color}`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl font-bold text-gray-900">{s.value}</p>
                  <p className="truncate text-xs text-gray-600">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {stats && stats.byMastersAim.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-3 text-xs">
              <span className="font-semibold text-gray-600">Paid by Master's aim:</span>
              {stats.byMastersAim.map((a) => (
                <Badge key={a.aim} variant="outline" className="border-orange-200 text-orange-800">
                  {a.aim}: {a.count}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0">
          <div className="flex flex-col justify-between gap-3 px-4 py-4 sm:flex-row sm:items-center">
            <div className="inline-flex w-fit rounded-lg bg-orange-50 p-1">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setStatus(f.key)}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                    status === f.key ? "bg-orange-500 text-white shadow" : "text-orange-900 hover:bg-orange-100"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search name, email, mobile, reg no…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 sm:w-72"
              />
            </div>
          </div>

          <div className="overflow-x-auto border-t border-orange-100">
            <Table>
              <TableHeader className="bg-orange-50/80">
                <TableRow>
                  <TableHead className="px-4 py-3 text-sm font-semibold text-orange-900">#</TableHead>
                  <TableHead className="px-4 py-3 text-sm font-semibold text-orange-900">Student</TableHead>
                  <TableHead className="hidden px-4 py-3 text-sm font-semibold text-orange-900 md:table-cell">Academics</TableHead>
                  <TableHead className="hidden px-4 py-3 text-sm font-semibold text-orange-900 lg:table-cell">Aim / Exam</TableHead>
                  <TableHead className="hidden px-4 py-3 text-sm font-semibold text-orange-900 sm:table-cell">Location</TableHead>
                  <TableHead className="px-4 py-3 text-sm font-semibold text-orange-900">Payment</TableHead>
                  <TableHead className="px-4 py-3 text-right text-sm font-semibold text-orange-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
                        <span className="text-gray-600">Loading IQ Arena registrations...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : authError ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-600">
                        <AlertCircle className="h-8 w-8 text-amber-500" />
                        Please log in as an admin to view IQ Arena registrations.
                      </div>
                    </TableCell>
                  </TableRow>
                ) : rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Users className="h-8 w-8 text-orange-300" />
                        {debouncedSearch ? "No registrations match your search." : "No registrations yet."}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((r, i) => (
                    <TableRow key={r._id} className="border-b border-orange-100 transition-colors hover:bg-orange-50/50">
                      <TableCell className="px-4 py-3">
                        <div className="font-mono text-xs text-gray-500">{(page - 1) * PAGE_SIZE + i + 1}</div>
                        {r.registrationNumber && (
                          <div className="mt-1 font-mono text-xs font-semibold text-orange-700">{r.registrationNumber}</div>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="text-sm font-semibold text-gray-900">{r.name}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Mail className="h-3 w-3" />
                          <span className="max-w-[180px] truncate">{r.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Phone className="h-3 w-3" />
                          {r.mobile}
                        </div>
                      </TableCell>
                      <TableCell className="hidden px-4 py-3 md:table-cell">
                        <div className="text-sm text-gray-800">{r.graduationStream}</div>
                        <div className="text-xs text-gray-600">
                          {r.collegeYear} · {r.graduationYear}
                        </div>
                        <div className="text-xs text-gray-500">
                          10th {r.cgpa10} · 12th {r.cgpa12}
                        </div>
                      </TableCell>
                      <TableCell className="hidden px-4 py-3 lg:table-cell">
                        <Badge variant="outline" className="border-purple-300 text-xs text-purple-700">
                          {aimLabel(r)}
                        </Badge>
                        <div className="mt-1 text-xs text-gray-600">{examLabel(r)}</div>
                      </TableCell>
                      <TableCell className="hidden px-4 py-3 sm:table-cell">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-orange-600" />
                          {r.city}
                        </div>
                        <div className="pl-4 text-xs text-gray-600">{r.state}</div>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <StatusBadge status={r.paymentStatus} />
                        {r.paymentStatus === "completed" && (
                          <div className="mt-1 text-xs font-semibold text-gray-800">₹{r.amountPaid}</div>
                        )}
                        <div className="text-[11px] text-gray-500">{fmtDate(r.paidAt || r.registrationDate)}</div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-orange-100"
                            onClick={() => setSelected(r)}
                            title="View details"
                          >
                            <Eye className="h-4 w-4 text-orange-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-red-100"
                            onClick={() => setToDelete(r)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {!loading && !authError && totalItems > 0 && (
            <div className="flex items-center justify-between border-t border-orange-100 bg-white px-4 py-3">
              <div className="text-sm text-gray-700">
                Showing <span className="font-semibold">{from}-{to}</span> of{" "}
                <span className="font-semibold">{totalItems}</span> registrations
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="h-8 w-8 border-orange-200 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-3 text-sm text-gray-700">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="h-8 w-8 border-orange-200 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-orange-500" />
                  {selected.name}
                  {selected.registrationNumber && (
                    <span className="font-mono text-sm text-orange-700">· {selected.registrationNumber}</span>
                  )}
                </DialogTitle>
                <DialogDescription>IQ Arena 2027 registration details</DialogDescription>
              </DialogHeader>
              {[
                {
                  title: "Personal",
                  items: [
                    ["Email", selected.email],
                    ["Mobile", selected.mobile],
                    ["Gender", selected.gender],
                    ["City / State", `${selected.city}, ${selected.state}`],
                  ],
                },
                {
                  title: "Academics & aspirations",
                  items: [
                    ["College year", selected.collegeYear],
                    ["Graduation year", String(selected.graduationYear)],
                    ["Graduation stream", selected.graduationStream],
                    ["10th CGPA", `${selected.cgpa10} / 10`],
                    ["12th CGPA", `${selected.cgpa12} / 10`],
                    ["Master's aim", aimLabel(selected)],
                    ["Entrance exam", examLabel(selected)],
                  ],
                },
                {
                  title: "Payment",
                  items: [
                    ["Status", selected.paymentStatus],
                    [
                      "Amount",
                      selected.amountPaid
                        ? `₹${selected.amountPaid} (₹${selected.registrationFee} + ₹${selected.platformCharge} platform fee)`
                        : "—",
                    ],
                    ["Payment ID", selected.paymentId || "—"],
                    ["Order ID", selected.orderId || "—"],
                    ["Confirmed via", selected.confirmedVia || "—"],
                    ["Paid at", fmtDate(selected.paidAt)],
                    ["Registered at", fmtDate(selected.registrationDate)],
                    [
                      "Emails sent",
                      selected.emailStatus
                        ? `Student: ${selected.emailStatus.student ? "yes" : "no"} · Admin: ${selected.emailStatus.admin ? "yes" : "no"}`
                        : "—",
                    ],
                  ],
                },
              ].map((section) => (
                <div key={section.title} className="rounded-lg border border-orange-100 p-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-orange-700">{section.title}</p>
                  <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {section.items.map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs text-gray-500">{k}</dt>
                        <dd className="break-words text-sm font-medium text-gray-900">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this registration?</AlertDialogTitle>
            <AlertDialogDescription>
              {toDelete?.name} ({toDelete?.registrationNumber || toDelete?.email}) will be permanently removed. This does not
              refund the payment in Razorpay.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default IqArenaAdminSection;
