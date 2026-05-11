import { MobileShell } from "./MobileShell";
import { ScreenHeader } from "./ScreenHeader";
import { Wallet } from "lucide-react";

export const LoanNotFound = () => {
  return (
    <MobileShell>
      <div className="min-h-full flex flex-col">
        <ScreenHeader title="Error" backTo="/loans" />
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-60">
          <Wallet size={48} className="mb-4" />
          <p className="text-lg font-medium">Loan Not Found</p>
        </div>
      </div>
    </MobileShell>
  );
};
