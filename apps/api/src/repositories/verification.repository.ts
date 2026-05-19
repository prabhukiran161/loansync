import { db } from "@loansync/db";

export const verifyTransaction = async (
  transactionId: number,
  verifierParticipantId: number,
  status: "verified" | "rejected",
  remarks?: string,
) => {
  return await db.$transaction(async (tx) => {
    const transaction = await tx.transaction.findUniqueOrThrow({
      where: { id: transactionId },
      include: { loan: true, participant: true },
    });

    if (transaction.status !== "pending") {
      throw new Error("Transaction is already processed");
    }

    const verification = await tx.transactionVerification.create({
      data: {
        transaction_id: transactionId,
        verified_by_loan_participant_id: verifierParticipantId,
        status,
        remarks,
      },
    });

    await tx.transaction.update({
      where: { id: transactionId },
      data: { status },
    });

    if (status === "verified") {
      const amount = transaction.amount_in_paise;

      await tx.loanParticipant.update({
        where: { id: transaction.loan_participant_id },
        data: {
          total_paid_in_paise: { increment: amount },
          remaining_balance_in_paise: { decrement: amount },
        },
      });

      await tx.loan.update({
        where: { id: transaction.loan_id },
        data: {
          total_paid_in_paise: { increment: amount },
          remaining_balance_in_paise: { decrement: amount },
        },
      });

      const oldestProjection = await tx.loanProjection.findFirst({
        where: {
          loan_participant_id: transaction.loan_participant_id,
          status: "upcoming",
        },
        orderBy: { month_number: "asc" },
      });

      if (
        oldestProjection &&
        oldestProjection.expected_payment_in_paise === amount
      ) {
        await tx.loanProjection.update({
          where: { id: oldestProjection.id },
          data: { status: "paid" },
        });
      }
    }

    return verification;
  });
};

export const getVerificationsByTransaction = async (transactionId: number) => {
  return await db.transactionVerification.findMany({
    where: { transaction_id: transactionId },
    include: {
      verifier: { include: { user: { select: { userName: true } } } },
    },
  });
};
