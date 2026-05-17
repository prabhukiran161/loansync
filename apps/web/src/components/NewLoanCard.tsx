import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
export const NewLoanCard = () => {
  return (
    <Link
      to="/loans/create"
      className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-border/60 bg-card rounded-[20px] p-6 text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-colors active:scale-[0.98]"
    >
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
        <Plus size={20} />
      </div>
      <span className="font-semibold text-[14px]">Create New Loan</span>
      <span className="text-[12px] text-muted-foreground/70 mt-1 text-center px-4">
        Start a new shared loan with family or friends
      </span>
    </Link>
  );
};
