"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { OrderStatus } from "@prisma/client";

import { db } from "@/db";

type ChangeOrderStatusProps = {
  id: string;
  newStatus: OrderStatus;
};

export const changeOrderStatus = async ({
  id,
  newStatus,
}: ChangeOrderStatusProps) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email !== ADMIN_EMAIL) throw new Error("Unauthorized.");

  await db.order.update({
    where: {
      id,
    },
    data: {
      status: newStatus,
    },
  });
};
