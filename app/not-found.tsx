import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

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
};

export default NotFoundPage;
