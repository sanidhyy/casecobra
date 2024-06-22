import Link from "next/link";

import { MaxWidthWrapper } from "./max-width-wrapper";

export const Footer = () => {
  return (
    <footer className="relative h-20 bg-white">
      <MaxWidthWrapper>
        <div aria-hidden className="border-t border-gray-200" />

        <div className="flex h-full flex-col items-center justify-center md:flex-row md:justify-between">
          <div className="pb-2 text-center md:pb-0 md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy;{" "}
              <span className="font-semibold">
                case<span className="text-green-600">cobra</span>
              </span>{" "}
              {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex space-x-8">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Terms &amp; Conditions
              </Link>

              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};
