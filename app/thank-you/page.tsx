import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Loader } from "@/components/loader";

import { ThankYou } from "./thank-you";

type ThankYouPageProps = {
  searchParams: Promise<{
    orderId: string;
  }>;
};

const ThankYouPage = async ({ searchParams }: ThankYouPageProps) => {
  const { orderId } = await searchParams;

  if (!orderId) notFound();

  return (
    <Suspense fallback={<Loader />}>
      <ThankYou orderId={orderId} />
    </Suspense>
  );
};

export default ThankYouPage;
