import { Link } from "@tanstack/react-router";
import { Card } from "./ui/card";
import { Wallet, Users } from "lucide-react";
import { fmt, type Loan } from "@/lib/mockData";

export const LoanCard = ({
  loan,
  percent,
}: {
  loan: Loan;
  percent: number;
}) => {
  return (
    <Link
      to="/loans/$loanId"
      params={{ loanId: loan.id }}
      className="block group"
    >
      <Card className="rounded-[20px] p-5 shadow-sm border border-border/50 group-hover:border-primary/30 transition-colors">
        {/* Top Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            {/* Icon */}
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Wallet size={18} />
            </div>
            {/* Name & No. of Participants */}
            <div>
              <h3 className="font-semibold text-[16px] text-foreground">
                {loan.name}
              </h3>
              <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground mt-0.5">
                <Users size={12} className="opacity-70" />
                {loan.participants.length} participant
                {loan.participants.length > 1 ? "s" : ""}
              </div>
            </div>
          </div>
          {/* Intrest Rate */}
          <span className="text-[12px] bg-emerald-500/10 text-emerald-600 font-bold px-2.5 py-1 rounded-full">
            {loan.interestRate}% APR
          </span>
        </div>

        <div className="bg-muted/30 p-3.5 rounded-xl border border-border/30">
          <div className="flex justify-between text-[13px] mb-2">
            <span className="text-muted-foreground font-medium">
              Repayment Progress
            </span>
            <span className="font-bold text-foreground">
              {fmt(loan.total - loan.remaining)}{" "}
              <span className="text-muted-foreground font-normal">
                / {fmt(loan.total)}
              </span>
            </span>
          </div>
          <div className="h-2 bg-border/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-2 text-right text-[11px] text-primary font-semibold">
            {percent}% Paid
          </div>
        </div>
      </Card>
    </Link>
  );
};
