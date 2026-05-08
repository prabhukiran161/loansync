import { Badge } from "./ui/badge";

export const StatusBadge = ({
  status,
}: {
  status: "verified" | "pending" | "rejected";
}) => {
  switch (status) {
    case "verified":
      return (
        <Badge
          variant="secondary"
          className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-none shadow-none font-semibold"
        >
          Verified
        </Badge>
      );
    case "pending":
      return (
        <Badge
          variant="secondary"
          className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border-none shadow-none font-semibold"
        >
          Pending
        </Badge>
      );
    case "rejected":
      return (
        <Badge
          variant="secondary"
          className="bg-red-500/15 text-red-700 hover:bg-red-500/25 border-none shadow-none font-semibold"
        >
          Rejected
        </Badge>
      );
  }
};
