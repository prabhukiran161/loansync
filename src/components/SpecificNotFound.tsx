import { MobileShell } from "./MobileShell";
import { ScreenHeader } from "./ScreenHeader";
import { type LucideIcon } from "lucide-react";

interface SpecificNotFoundProps {
  title: string;
  icon: LucideIcon;
  message: string;
}
export const SpecificNotFound = ({
  title,
  icon:Icon,
  message,
}: SpecificNotFoundProps) => {
  return (
    <MobileShell>
      <div className="min-h-full flex flex-col">
        <ScreenHeader title={title} backTo="/loans" />
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-60">
          <Icon size={48} className="mb-4" />
          <p className="text-lg font-medium">{message}</p>
        </div>
      </div>
    </MobileShell>
  );
};
