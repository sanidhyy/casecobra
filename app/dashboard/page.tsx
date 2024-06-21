import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MONTHLY_GOAL, WEEKLY_GOAL } from "@/config";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";

import { StatusDropdown } from "./status-dropdown";

const DashboardPage = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email !== ADMIN_EMAIL) notFound();

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)), // last week (7 days) order
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)), // last week (7 days) revenue sum
      },
    },
    _sum: {
      amount: true,
    },
  });

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)), // last month (30 days) revenue sum
      },
    },
    _sum: {
      amount: true,
    },
  });

  const lastWeekRevenue = lastWeekSum._sum.amount ?? 0;
  const lastMonthRevenue = lastMonthSum._sum.amount ?? 0;

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* last week progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekRevenue)}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)}
                </div>
              </CardContent>

              <CardFooter>
                <Progress value={(lastWeekRevenue * 100) / WEEKLY_GOAL} />
              </CardFooter>
            </Card>

            {/* last month progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastMonthRevenue)}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(MONTHLY_GOAL)}
                </div>
              </CardContent>

              <CardFooter>
                <Progress value={(lastMonthRevenue * 100) / MONTHLY_GOAL} />
              </CardFooter>
            </Card>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Incoming orders</h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">
                      {order.shippingAddress?.name}
                    </div>

                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user.email}
                    </div>
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    <StatusDropdown id={order.id} orderStatus={order.status} />
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    {formatPrice(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
