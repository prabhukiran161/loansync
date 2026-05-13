import { MobileShell } from "@/components/MobileShell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/ScreenHeader";
import { transactions } from "@/lib/mockData";
import { fmt } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { X, Check } from "lucide-react";

export const Route = createFileRoute("/transactions/$txId")({
  component: TransactionDetail,
});

function TransactionDetail() {
  const { txId } = Route.useParams();
  const nav = useNavigate();
  const tx = transactions.find((tx) => tx.id === txId);
  if (!tx) {
    return null;
  }
  return (
    <MobileShell hideNav>
      <ScreenHeader title="Transaction Details" backTo="/ledger" />
      <div className="px-5 pb-10 mt-2">
        {/* Main Amount Section */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50 text-center">
          <p className="text-xs text-muted-foreground">Amount</p>
          <p className="text-3xl font-bold mt-1">{fmt(tx.amount)}</p>
          <div className="mt-3 flex justify-center">
            <StatusBadge status={tx.status} />
          </div>
        </div>
        {/* Details List Section */}
        <div className="mt-4 bg-card rounded-2xl p-4 shadow-sm border border-border/50 space-y-3 text-sm">
          <Row label="Paid by" value={tx.userName} />
          <div className="h-px bg-border/50 ml-4" />
          <Row
            label="Date"
            value={new Date(tx.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          />
          {tx.note && (
            <>
              <div className="h-px bg-border/50 ml-4" />
              <Row label="Note" value={tx.note} />
            </>
          )}
        </div>
        {/* Receipt Section */}
        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2">Receipt</p>
          {tx.imageUrl ? (
            <img
              src={tx.imageUrl}
              className="w-full rounded-2xl border border-border/50"
            />
          ) : (
            <div className="w-full h-40 rounded-2xl bg-muted flex items-center justify-center text-xs text-muted-foreground">
              No receipt Upload
            </div>
          )}
        </div>
        {/* Pending Confirmation */}
        {tx.status === "pending" && (
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={() => nav({ to: "/ledger" })}
              className="rounded-xl py-3 font-semibold bg-rose-50 text-rose-700 flex items-center justify-center gap-2"
            >
              <X size={16} /> Reject
            </button>
            <button
              onClick={() => nav({ to: "/ledger" })}
              className="rounded-xl py-3 font-semibold bg-primary text-primary-foreground flex items-center justify-center gap-2"
            >
              <Check size={16} /> Approve
            </button>
          </div>
        )}
      </div>
    </MobileShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
