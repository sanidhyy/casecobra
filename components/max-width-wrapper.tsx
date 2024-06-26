import { type PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type MaxWidthWrapperProps = {
  className?: string;
};

export const MaxWidthWrapper = ({
  className,
  children,
}: PropsWithChildren<MaxWidthWrapperProps>) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};
