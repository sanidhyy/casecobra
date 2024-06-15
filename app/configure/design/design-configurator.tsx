"use client";

import { Radio, RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { Rnd } from "react-rnd";

import { HandleComponent } from "@/components/handle-component";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { COLORS } from "@/validators/option-validator";

type DesignConfiguratorProps = {
  configId: string;
  imgUrl: string;
  imgDimensions: {
    width: number;
    height: number;
  };
};

export const DesignConfigurator = ({
  configId,
  imgDimensions,
  imgUrl,
}: DesignConfiguratorProps) => {
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
  }>({
    color: COLORS[0],
  });

  return (
    <div className="relative mt-20 grid grid-cols-3 mb-20 pb-20">
      <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896_/_1831]">
          <AspectRatio
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896_/_1831]"
          >
            <Image
              src="/phone-template.png"
              alt="Phone"
              className="pointer-events-none z-50 select-none"
              fill
            />
          </AspectRatio>

          <div
            aria-hidden
            className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,_231,_235,_0.6)]"
          />

          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>

        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imgDimensions.height / 4,
            width: imgDimensions.width / 4,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            topRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
          className="absolute z-20 border-[3px] border-primary"
        >
          <div className="relative w-full h-full">
            <Image
              src={imgUrl}
              alt="uploaded image"
              fill
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="h-[37.5rem] flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />

          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customize your case
            </h2>

            <div aria-hidden className="w-full h-px bg-zinc-200 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <RadioGroup
                value={options.color}
                onChange={(newColor) => {
                  setOptions((prevColor) => ({
                    ...prevColor,
                    color: newColor,
                  }));
                }}
              >
                <Label>Color: {options.color.label}</Label>

                <div className="mt-3 flex items-center space-x-3">
                  {COLORS.map((color) => (
                    <Radio
                      key={color.label}
                      value={color}
                      className={({ checked }) =>
                        cn(
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                          {
                            [`border-${color.tw}`]: checked,
                          }
                        )
                      }
                    >
                      <span
                        aria-hidden
                        className={cn(
                          `bg-${color.tw}`,
                          "h-8 w-8 rounded-full border border-black border-opacity-10"
                        )}
                      />
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
