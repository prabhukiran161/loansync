import { Link } from "@tanstack/react-router";
import { Card } from "./ui/card";
import { fmt, type Transaction } from "@/lib/mockData";
import { StatusBadge } from "./StatusBadge";

export const TransactionCard = ({ tx }: { tx: Transaction }) => {
  return (
    <Link to="/transactions/$txId" params={{ txId: tx.id }}>
      <Card className="rounded-xl p-4 shadow-sm border border-border/50 transition hover:border-primary/50">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-foreground text-sm">
              {tx.userName}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(tx.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            {tx.note && (
              <p className="text-xs text-muted-foreground mt-2 italic bg-accent/50 px-2 py-1 rounded-md w-fit max-w-40 truncate">
                {tx.note}
              </p>
            )}
          </div>
          <div className="text-right flex flex-col items-end gap-1.5">
            <p className="font-semibold text-foreground text-base">
              {fmt(tx.amount)}
            </p>
            <StatusBadge status={tx.status} />
          </div>
        </div>
      </Card>
    </Link>
  );
};
