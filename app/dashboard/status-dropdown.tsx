"use client";

import type { OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LABEL_MAP } from "@/validators/option-validator";

import { changeOrderStatus } from "./actions";

type StatusDropdownProps = {
  id: string;
  orderStatus: OrderStatus;
};

export const StatusDropdown = ({ id, orderStatus }: StatusDropdownProps) => {
  const router = useRouter();

  const { mutate: mutateOrderStatus, isPending } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh(),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending} asChild>
        <Button variant="outline" className="w-52 items-center justify-between">
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-0">
        {Object.keys(LABEL_MAP).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              "flex cursor-default items-center gap-1 p-2.5 text-sm hover:bg-zinc-100",
              {
                "bg-zinc-100": orderStatus === status,
              }
            )}
            onClick={() =>
              mutateOrderStatus({
                id,
                newStatus: status as OrderStatus,
              })
            }
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4 text-primary",
                orderStatus === status ? "opacity-100" : "opacity-0"
              )}
            />

            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
