import type { Prisma } from "@loansync/db";

export type ProjectionCalculation = Omit<
  Prisma.LoanProjectionCreateManyInput,
  "loan_id" | "loan_participant_id"
>;

export const generateProjections = (
  principalInPaise: number,
  interestRateBps: number,
  durationMonths: number,
  startDate: string,
): ProjectionCalculation[] => {
  const projections: ProjectionCalculation[] = [];

  const monthlyInterestRate = interestRateBps / 10000 / 12;
  let remainingBalance = principalInPaise;

  let emi = 0;
  if (monthlyInterestRate > 0) {
    const mathPower = Math.pow(1 + monthlyInterestRate, durationMonths);
    emi =
      principalInPaise * monthlyInterestRate * (mathPower / (mathPower - 1));
  } else {
    emi = principalInPaise / durationMonths;
  }

  const baseDate = new Date(startDate);

  for (let month = 1; month <= durationMonths; month++) {
    const projectedDate = new Date(baseDate);
    projectedDate.setMonth(projectedDate.getMonth() + month);

    const interestComponent = remainingBalance * monthlyInterestRate;
    let principalComponent = emi - interestComponent;

    if (month === durationMonths) {
      principalComponent = remainingBalance;
      emi = principalComponent + interestComponent;
    }

    remainingBalance = Math.round(remainingBalance - principalComponent);

    projections.push({
      month_number: month,
      expected_payment_in_paise: BigInt(Math.round(emi)),
      interest_component_in_paise: BigInt(Math.round(interestComponent)),
      principal_component_in_paise: BigInt(Math.round(principalComponent)),
      remaining_balance_in_paise: BigInt(Math.max(0, remainingBalance)),
      projected_due_date: projectedDate,
      status: "upcoming",
    });
  }

  return projections;
};
