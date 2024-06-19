import { notFound } from "next/navigation";

import { db } from "@/db";

import { DesignPreview } from "./design-preview";

type PreviewPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const PreviewPage = async ({ searchParams }: PreviewPageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") notFound();

  const configuration = await db.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!configuration) notFound();

  return <DesignPreview configuration={configuration} />;
};

export default PreviewPage;
