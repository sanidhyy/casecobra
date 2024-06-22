import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type LoginModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const LoginModal = ({ isOpen, setIsOpen }: LoginModalProps) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="absolute z-[999999]">
        <DialogHeader>
          <div className="relative mx-auto mb-2 h-24 w-24">
            <Image
              src="/snake-1.png"
              alt="Snake"
              className="object-contain"
              fill
            />
          </div>

          <DialogTitle className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Login in to continue
          </DialogTitle>

          <DialogDescription className="py-2 text-center text-base">
            <span className="font-medium text-zinc-900">
              Your configuration was saved!
            </span>{" "}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
          <LoginLink
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Login
          </LoginLink>

          <RegisterLink className={buttonVariants()}>Sign up</RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
};
