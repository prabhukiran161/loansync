import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Card } from "@/components/ui/card";
import { loans, fmt, projectionFor } from "@/lib/mockData";
import { Wallet } from "lucide-react";
import { SpecificNotFound } from "@/components/SpecificNotFound";

export const Route = createFileRoute("/loans/$loanId/projection")({
  component: ProjectionDetail,
  notFoundComponent: () => (
    <SpecificNotFound title="Error" icon={Wallet} message="Loan Not Found" />
  ),
});

function ProjectionDetail() {
  const { loanId } = Route.useParams();
  const loan = loans.find((l) => l.id === loanId);

  if (!loan) {
    return (
      <SpecificNotFound title="Error" icon={Wallet} message="Loan Not Found" />
    );
  }

  const rows = projectionFor(loan);

  // In a real app, we would use the actual start date from your database.
  // We will mock it as May 15, 2024 for this example.
  const startDate = new Date("2024-05-15");
  const currentMonth = 4; // Mocking the current active month

  // Calculate the End Date based on the duration
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + loan.durationMonths);

  return (
    <MobileShell hideNav>
      <div className="flex flex-col min-h-full pb-8">
        <ScreenHeader title="Projection" backTo={`/projection`} />

        <div className="px-5 mt-2 mb-6">
          {/* Summary Section */}
          <Card className="rounded-[20px] p-5 shadow-sm border border-border/50 bg-card mb-6">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="text-[18px] font-bold text-foreground">
                  {loan.name}
                </h2>
                <p className="text-[13px] text-muted-foreground mt-0.5">
                  Repayment Schedule
                </p>
              </div>
              <div className="bg-primary/10 text-primary px-2.5 py-1.5 rounded-lg text-[13px] font-bold">
                {loan.interestRate}% APR
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div>
                <p className="text-[12px] text-muted-foreground mb-1">
                  Principal Amount
                </p>
                <p className="text-[15px] font-semibold text-foreground">
                  {fmt(loan.total)}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-muted-foreground mb-1">
                  Duration
                </p>
                <p className="text-[15px] font-semibold text-foreground">
                  {loan.durationMonths} Months
                </p>
              </div>
              <div>
                <p className="text-[12px] text-muted-foreground mb-1">
                  Start Date
                </p>
                <p className="text-[15px] font-semibold text-foreground">
                  {startDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-muted-foreground mb-1">
                  Est. End Date
                </p>
                <p className="text-[15px] font-semibold text-foreground">
                  {endDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Card>
          {/* Projection Table Section */}
          <Card className="rounded-[20px] shadow-sm border border-border/50 overflow-hidden flex flex-col bg-card">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1.2fr] text-[9.5px] font-bold text-muted-foreground/70 uppercase bg-muted/30 px-3 py-3 border-b border-border/60">
              <span>Date</span>
              <span className="text-right">Payment</span>
              <span className="text-right">Interest</span>
              <span className="text-right">Principal</span>
              <span className="text-right">Balance</span>
            </div>

            <div className="pb-2">
              {rows.map((r) => {
                const isCurrent = r.month === currentMonth;
                const rowDate = new Date(startDate);
                rowDate.setMonth(startDate.getMonth() + r.month);

                return (
                  <div
                    key={r.month}
                    className={`
                      grid grid-cols-[1.2fr_1fr_1fr_1fr_1.2fr] text-[12px] px-3 py-3.5 border-b border-border/30 last:border-0 items-center
                      ${isCurrent ? "bg-primary/5 relative" : "hover:bg-muted/20 transition-colors"}
                    `}
                  >
                    {isCurrent && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                    )}

                    <div className="flex flex-col">
                      <span
                        className={`font-semibold ${isCurrent ? "text-primary" : "text-foreground"}`}
                      >
                        {rowDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Month {r.month}
                      </span>
                    </div>

                    <span className="text-right font-medium">
                      {fmt(Math.round(r.payment))}
                    </span>
                    <span
                      className={`text-right ${isCurrent ? "text-primary/70" : "text-muted-foreground"}`}
                    >
                      {fmt(Math.round(r.interest))}
                    </span>
                    <span className="text-right">
                      {fmt(Math.round(r.principal))}
                    </span>

                    <span
                      className={`text-right font-bold ${isCurrent ? "text-primary" : "text-foreground"}`}
                    >
                      {fmt(Math.round(r.remaining))}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </MobileShell>
  );
}
