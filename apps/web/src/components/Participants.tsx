import type { Loan } from "@/lib/mockData";
import { fmt } from "@/lib/mockData";

export const Participants = ({ loan }: { loan: Loan }) => {
  return (
    <div>
      <h2 className="font-semibold text-[15px] text-foreground mb-3">
        Participants
      </h2>

      <div className="space-y-3">
        {loan.participants.map((p) => (
          <div
            key={p.id}
            className="bg-card rounded-[16px] p-4 shadow-sm border border-border/50 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-[15px] shrink-0">
                {p.name[0]}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-[14px] text-foreground leading-tight">
                  {p.name}
                </span>
                <span className="text-[12px] text-muted-foreground mt-0.5">
                  Paid {fmt(p.contribution)}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[12px] text-muted-foreground leading-tight mb-0.5">
                Pending
              </span>
              <span className="text-[14px] font-semibold text-foreground">
                {fmt(p.pending)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
