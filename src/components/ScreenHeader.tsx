import { useRouter } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export const ScreenHeader = ({
  title,
  backTo,
  action,
}: {
  title: string;
  backTo?: string;
  action?: React.ReactNode;
}) => {
  const router = useRouter();
  const handleBack = () => {
    if (backTo) {
      router.navigate({ to: backTo });
    } else {
      router.history.back();
    }
  };
  return (
    <div className="px-5 pt-6 pb-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="rounded-full w-9 h-9 bg-card shadow-sm border border-border/50 hover:bg-accent"
        >
          <ChevronLeft size={20} />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
