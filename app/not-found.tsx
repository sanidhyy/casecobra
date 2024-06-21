import Image from "next/image";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
/* 
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70dvh] px-4 md:px-6">
      <Image
        src="/snake-3.png"
        width={200}
        height={200}
        alt="404 Error"
        className="mb-8"
      />

      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">
          Oops! The page you requested could not be found.
        </p>

        <Link
          href="/"
          className={buttonVariants({
            size: "lg",
          })}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}; */

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70dvh] px-4 md:px-6">
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
          <Button>Try Again</Button>

          <Link
            href="/"
            className={buttonVariants({
              size: "lg",
              variant: "link",
            })}
          >
            Go Home
            <ArrowRight className="h-4 w-4 ml-1.5 inline" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
