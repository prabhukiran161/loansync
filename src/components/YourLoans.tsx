import { Card } from "./ui/card";
import { fmt } from "@/lib/mockData";
export const YourLoans = ({
  name,
  remaining,
  participantCount,
}: {
  name: string;
  remaining: number;
  participantCount: number;
}) => {
  return (
    <Card className="rounded-xl p-4 shadow-sm mb-3">
      <div>
        <div className="flex justify-between items-center font-semibold">
          <p className="text-base">{name}</p>
          <p>{fmt(remaining)}</p>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {participantCount}{" "}
          {participantCount > 1 ? "participants" : "participant"}
        </div>
      </div>
    </Card>
  );
};
