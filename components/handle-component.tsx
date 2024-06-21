import { cn } from "@/lib/utils";

export const HandleComponent = ({
  isPending = false,
}: {
  isPending?: boolean;
}) => {
  return (
    <div
      aria-hidden
      className={cn(
        "w-5 h-5 rounded-full shadow border bg-white border-zinc-200 transition hover:bg-primary",
        isPending && "opacity-0"
      )}
    />
  );
};
