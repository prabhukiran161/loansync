import { Link } from "@tanstack/react-router";
import { Card } from "./ui/card";
import { fmt } from "@/lib/mockData";
import { StatusBadge } from "./StatusBadge";

export const TransactionCard = ({
  userName,
  date,
  note,
  amount,
  status,
}: {
  userName: string;
  date: string;
  note?: string;
  amount: number;
  status: "verified" | "rejected" | "pending";
}) => {
  return (
    <Link to="/">
      <Card className="rounded-xl p-4 shadow-sm border border-border/50 transition hover:border-primary/50">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-foreground text-sm">{userName}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            {note && (
              <p className="text-xs text-muted-foreground mt-2 italic bg-accent/50 px-2 py-1 rounded-md w-fit max-w-40 truncate">
                {note}
              </p>
            )}
          </div>
          <div className="text-right flex flex-col items-end gap-1.5">
            <p className="font-semibold text-foreground text-base">
              {fmt(amount)}
            </p>
            <StatusBadge status={status} />
          </div>
        </div>
      </Card>
    </Link>
  );
};
