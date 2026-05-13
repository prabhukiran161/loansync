import { Link } from "@tanstack/react-router";
import { Card } from "./ui/card";
import { fmt, type Loan } from "@/lib/mockData";
export const YourLoans = ({ loan }: { loan: Loan }) => {
  const participantCount = loan.participants.length;
  return (
    <Link to="/loans/$loanId" params={{ loanId: loan.id }}>
      <Card className="rounded-xl p-4 shadow-sm mb-3">
        <div>
          <div className="flex justify-between items-center font-semibold">
            <p className="text-base">{loan.name}</p>
            <p>{fmt(loan.remaining)}</p>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {participantCount}{" "}
            {participantCount > 1 ? "participants" : "participant"}
          </div>
        </div>
      </Card>
    </Link>
  );
};
