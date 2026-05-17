import { MobileShell } from "@/components/MobileShell";
import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/ScreenHeader";
import { loans } from "@/lib/mockData";
import { RemainingCard } from "@/components/RemainingCard";
import { QUICK_ACTIONS } from "@/constants/quickActions";
import { QuickAction } from "@/components/QuickAction";
import { Participants } from "@/components/Participants";
import { SummaryCard } from "@/components/SummaryCard";
import { SpecificNotFound } from "@/components/SpecificNotFound";
import { Wallet } from "lucide-react";

export const Route = createFileRoute("/loans/$loanId/")({
  component: LoanDetail,
  notFoundComponent: () => (
    <SpecificNotFound title="Error" icon={Wallet} message="Loan Not Found" />
  ),
});

function LoanDetail() {
  const { loanId } = Route.useParams();
  const loan = loans.find((loan) => loan.id === loanId);
  if (!loan) {
    return (
      <SpecificNotFound title="Error" icon={Wallet} message="Loan Not Found" />
    );
  }
  const percent = Math.round(
    ((loan.total - loan.remaining) / loan.total) * 100,
  );
  return (
    <MobileShell>
      <div className="flex flex-col min-h-full pb-8">
        <ScreenHeader title={loan.name} backTo="/loans" />
        <div className="px-5 mt-2 space-y-5">
          <RemainingCard loan={loan} percent={percent} />
          <div className="grid grid-cols-3 gap-3">
            {QUICK_ACTIONS.map((action, index) => (
              <QuickAction
                key={index}
                to={action.to}
                label={action.label}
                icon={action.icon}
              />
            ))}
          </div>
          <Participants loan={loan} />
          <SummaryCard loan={loan} />
        </div>
      </div>
    </MobileShell>
  );
}
