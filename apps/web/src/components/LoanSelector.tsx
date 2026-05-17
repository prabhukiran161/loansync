import { MobileShell } from "./MobileShell";
import { ScreenHeader } from "./ScreenHeader";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { loans } from "@/lib/mockData";

interface LoanSelectorProps {
  title: string;
  description: string;
  icon: LucideIcon;
  getHref: (loanId: string) => string;
}

export const LoanSelector = ({
  title,
  description,
  icon: Icon,
  getHref,
}: LoanSelectorProps) => {
  return (
    <MobileShell hideNav>
      <div className="flex flex-col min-h-full pb-8">
        <ScreenHeader title={title} backTo="/" />
        <div className="px-5 mt-2">
          <p className="text-[14px] text-muted-foreground mb-6">
            {description}
          </p>
          <div className="space-y-3">
            {loans.map((loan) => (
              <Link key={loan.id} to={getHref(loan.id)} className="block group">
                <div className="bg-card rounded-[16px] p-4 shadow-sm border border-border/50 flex justify-between items-center group-hover:border-primary/40 active:scale-[0.98] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[15px] text-foreground">
                        {loan.name}
                      </h3>
                      <p className="text-[13px] text-muted-foreground mt-0.5">
                        {loan.interestRate}% APR{" "}
                        <span className="mx-1 opacity-50">•</span>{" "}
                        {loan.durationMonths} months
                      </p>
                    </div>
                  </div>
                  <div>
                    <ChevronRight
                      size={20}
                      className="text-muted-foreground opacity-40 group-hover:text-primary group-hover:opacity-100 transition-colors"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
};
