import { type Loan } from "@/lib/mockData";
import { fmt } from "@/lib/mockData";

export const RemainingCard = ({
  loan,
  percent,
}: {
  loan: Loan;
  percent: number;
}) => {
  return (
    <div
      className="rounded-[16px] p-5 text-white shadow-sm"
      style={{
        background: "linear-gradient(135deg, #00B9F1 0%, #0891D1 100%)",
      }}
    >
      <p className="text-[13px] opacity-90">Remaining</p>
      <p className="text-[32px] font-bold leading-none mt-1.5">
        {fmt(loan.remaining)}
      </p>

      <div className="mt-8 flex justify-between items-end text-[12px] opacity-90">
        <span>Total: {fmt(loan.total)}</span>
        <span>Rate: {loan.interestRate}%</span>
      </div>

      <div className="mt-2 h-1.5 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-xs mt-2">{percent}% Repaid</div>
    </div>
  );
};
