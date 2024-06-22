import { Loader2 } from "lucide-react";

type LoaderProps = {
  title?: string;
  description?: string;
};

export const Loader = ({
  title = "Loading...",
  description = "This won't take too long.",
}: LoaderProps) => {
  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="text-xl font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
