import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ThankYou } from "./thank-you";

type ThankYouPageProps = {
  searchParams: {
    orderId: string;
  };
};

const ThankYouPage = ({ searchParams }: ThankYouPageProps) => {
  const { orderId } = searchParams;

  if (!orderId) notFound();

  return (
    <Suspense fallback={<></>}>
      <ThankYou orderId={orderId} />
    </Suspense>
  );
};

export default ThankYouPage;
