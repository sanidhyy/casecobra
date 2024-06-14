import { cn } from "@/lib/utils";
import Image from "next/image";
import { type HTMLAttributes } from "react";

type PhoneProps = HTMLAttributes<HTMLDivElement> & {
  imgSrc: string;
  dark?: boolean;
};

export const Phone = ({
  imgSrc,
  className,
  dark = false,
  ...props
}: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <Image
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        alt="Phone"
        className="pointer-events-none z-50 select-none"
        width={896}
        height={1831}
      />

      <div className="absolute -z-10 inset-0">
        <Image
          src={imgSrc}
          alt="Overlaying phone"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};
