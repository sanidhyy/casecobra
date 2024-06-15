import type { PropsWithChildren } from "react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Steps } from "@/components/steps";

const ConfigureLayout = ({ children }: PropsWithChildren) => {
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      <Steps />

      {children}
    </MaxWidthWrapper>
  );
};

export default ConfigureLayout;
