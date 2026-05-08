import { MobileShell } from "@/components/MobileShell";
import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/ScreenHeader";
import { transactions } from "@/lib/mockData";
import { TransactionCard } from "@/components/TransactionCard";
import { ScrollText } from "lucide-react";

export const Route = createFileRoute("/ledger")({
  component: Ledger,
});

function Ledger() {
  return (
    <MobileShell>
      <div className="h-full flex flex-col">
        <ScreenHeader title="Ledger" />
        {transactions.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-60">
            <ScrollText size={48} className="mb-4" />
            <p className="text-lg font-medium">No Transactions exist</p>
          </div>
        ) : (
          <div className="px-5 mt-2 pb-6 flex flex-col gap-3">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                userName={transaction.userName}
                date={transaction.date}
                amount={transaction.amount}
                note={transaction.note}
                status={transaction.status}
              />
            ))}
          </div>
        )}
      </div>
    </MobileShell>
  );
}
