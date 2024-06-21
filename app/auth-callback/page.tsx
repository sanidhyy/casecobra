"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LOCALSTORAGE_CONFIGURATION_KEY } from "@/config";

import { getAuthStatus } from "./actions";
import { Loader } from "@/components/loader";

const AuthCallbackPage = () => {
  const router = useRouter();
  const [configId, setConfigId] = useState<string | null>(null);

  useEffect(() => {
    const configurationId = localStorage.getItem(
      LOCALSTORAGE_CONFIGURATION_KEY
    );

    if (configurationId) setConfigId(configurationId);
  }, []);

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    if (configId) {
      localStorage.removeItem(LOCALSTORAGE_CONFIGURATION_KEY);
      router.push(`/configure/preview?id=${configId}`);
    } else {
      router.push("/");
    }
  }

  return (
    <Loader
      title="Logging you in..."
      description="You will be redirected automatically."
    />
  );
};

export default AuthCallbackPage;
