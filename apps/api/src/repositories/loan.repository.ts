import { db } from "@loansync/db";
import type { Prisma } from "@loansync/db";
import type { ProjectionCalculation } from "../services/projection.service";

export const createLoanWithParticipantAndProjections = async (
  loanData: Prisma.LoanCreateInput,
  participantData: Prisma.LoanParticipantCreateWithoutLoanInput,
  projectionsData: ProjectionCalculation[],
) => {
  return await db.$transaction(async (tx) => {
    const loan = await tx.loan.create({
      data: {
        ...loanData,
        participants: {
          create: participantData,
        },
        events: {
          create: {
            event_type: "loan_created",
            event_data: { message: "Loan initialized with projections" },
          },
        },
      },
      include: {
        participants: true,
      },
    });

    if (!loan.participants || loan.participants.length === 0) {
      throw new Error(
        "Critical System Error: Participant failed to link during loan creation",
      );
    }

    const adminParticipantId = loan.participants[0].id;

    const finalProjections: Prisma.LoanProjectionCreateManyInput[] =
      projectionsData.map((p) => ({
        ...p,
        loan_id: loan.id,
        loan_participant_id: adminParticipantId,
      }));

    await tx.loanProjection.createMany({
      data: finalProjections,
    });

    return await tx.loan.findUniqueOrThrow({
      where: { id: loan.id },
      include: { participants: true, projections: true },
    });
  });
};

export const getLoanById = async (id: number) => {
  return await db.loan.findUnique({
    where: { id },
    include: { participants: true },
  });
};
