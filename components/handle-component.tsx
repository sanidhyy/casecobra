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
        "h-5 w-5 rounded-full border border-zinc-200 bg-white shadow transition hover:bg-primary",
        isPending && "opacity-0"
      )}
    />
  );
};
