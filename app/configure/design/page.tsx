import { notFound } from "next/navigation";

import { db } from "@/db";

import { DesignConfigurator } from "./design-configurator";

type DesignPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const DesignPage = async ({ searchParams }: DesignPageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") notFound();

  const configuration = await db.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!configuration) notFound();

  const { imgUrl, width, height } = configuration;

  return (
    <DesignConfigurator
      configId={configuration.id}
      imgDimensions={{ width, height }}
      imgUrl={imgUrl}
    />
  );
};

export default DesignPage;
