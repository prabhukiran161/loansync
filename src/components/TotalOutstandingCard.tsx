import { type Loan } from "@/lib/mockData";
import { fmt } from "@/lib/mockData";

export const TotalOutstandingCard = ({
  loan,
  percent,
}: {
  loan: Loan;
  percent: number;
}) => {
  return (
    <div
      className="rounded-xl p-5 text-primary-foreground shadow-lg shadow-primary/20"
      style={{
        background: "linear-gradient(135deg, #00B9F1 0%, #0891D1 100%)",
      }}
    >
      <p className="text-xs opacity-90">Total Outstanding</p>
      <p className="text-3xl font-bold mt-1">{fmt(loan.remaining)}</p>
      <div className="mt-4 flex justify-between text-xs opacity-90">
        <span>Paid {fmt(loan.total - loan.remaining)}</span>
        <span>Total {fmt(loan.total)}</span>
      </div>
      <div className="mt-2 h-2 bg-white/25 rounded-full overflow-hidden">
        <div
          className="h-full bg-white  rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="mt-2 text-xs opacity-90">{percent}% repaid</p>
    </div>
  );
};
