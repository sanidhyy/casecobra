import type { PropsWithChildren } from "react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";

const ConfigureLayout = ({ children }: PropsWithChildren) => {
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      {children}
    </MaxWidthWrapper>
  );
};

export default ConfigureLayout;
