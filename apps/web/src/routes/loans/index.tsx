import { AddButton } from "@/components/AddButton";
import { MobileShell } from "@/components/MobileShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { loans } from "@/lib/mockData";
import { createFileRoute } from "@tanstack/react-router";
import { LoanCard } from "@/components/LoanCard";
import { NewLoanCard } from "@/components/NewLoanCard";

export const Route = createFileRoute("/loans/")({
  component: Loans,
});

function Loans() {
  return (
    <MobileShell>
      <div className="flex flex-col min-h-full">
        <ScreenHeader
          title="My Loans"
          action={<AddButton to="/loans/create" />}
        />
        <div className="px-5 mt-2 flex flex-col gap-4">
          {loans.map((loan) => {
            const percent = Math.round(
              ((loan.total - loan.remaining) / loan.total) * 100,
            );
            return <LoanCard loan={loan} percent={percent} />;
          })}
          <NewLoanCard />
        </div>
      </div>
    </MobileShell>
  );
}
