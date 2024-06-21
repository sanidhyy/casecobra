"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] px-4 md:px-6">
      <Image
        src="/snake-3.png"
        width={200}
        height={200}
        alt="500 Error"
        className="mb-8"
      />

      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">500</h1>
        <p className="text-muted-foreground">
          Oops! An unexpected error has occurred on our end.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button onClick={() => reset()}>Try Again</Button>

          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
