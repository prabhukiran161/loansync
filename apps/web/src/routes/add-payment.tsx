import { createFileRoute } from "@tanstack/react-router";
import { LoanSelector } from "@/components/LoanSelector";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/add-payment")({
  component: () => (
    <LoanSelector
      title="Add Payment"
      description="Select which loan you want to record a payment for."
      icon={Plus}
      getHref={(loanId) => `/loans/${loanId}/add-payment`}
    />
  ),
});
