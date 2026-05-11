import type { Loan } from "@/lib/mockData";
import { fmt } from "@/lib/mockData";

export const SummaryCard = ({ loan }: { loan: Loan }) => {
  return (
    <div>
      <h2 className="font-semibold text-[15px] text-foreground mb-3">
        Your summary
      </h2>
      <div className="bg-card rounded-[16px] p-4 shadow-sm border border-border/50 grid grid-cols-2 gap-y-5 gap-x-4">
        <Stat
          label="Your contribution"
          value={fmt(loan.participants[0].contribution)}
        />
        <Stat label="Pending" value={fmt(loan.participants[0].pending)} />
        <Stat
          label="Interest paid"
          value={fmt(Math.round(loan.participants[0].contribution * 0.08))}
        />
        <Stat label="Next due" value="May 15" />
      </div>
    </div>
  );
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <p className="text-[12px] text-muted-foreground mb-1">{label}</p>
      <p className="text-[15px] font-semibold text-foreground">{value}</p>
    </div>
  );
}
