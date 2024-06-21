import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] px-4 md:px-6">
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
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
