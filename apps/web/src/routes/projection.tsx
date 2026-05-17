import { createFileRoute } from "@tanstack/react-router";
import { LoanSelector } from "@/components/LoanSelector";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/projection")({
  component: () => (
    <LoanSelector
      title="Projections"
      description="Select a loan to view its detailed repayment projection schedule."
      icon={TrendingUp}
      getHref={(loanId) => `/loans/${loanId}/projection`}
    />
  ),
});
