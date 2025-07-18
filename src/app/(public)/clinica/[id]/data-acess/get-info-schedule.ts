"use server";

import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// Tipo com include de subscription e services
export type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

export async function getInfoSchedule({
  userId,
}: {
  userId: string;
}): Promise<UserWithServiceAndSubscription | null> {
  try {
    if (!userId) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
        services: {
          where: {
            status: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    console.error("Erro ao buscar dados do usuário:", err);
    return null; // manter a consistência de retorno
  }
}
