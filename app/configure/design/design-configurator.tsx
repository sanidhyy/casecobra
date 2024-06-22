"use client";
// Don't forget to add color here as a comment after adding it in `COLORS` array.
// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950
// bg-zinc-900 border-zinc-900

import {
  Radio,
  RadioGroup,
  Label as RadioLabel,
  Description as RadioDescription,
} from "@headlessui/react";
import { createId } from "@paralleldrive/cuid2";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { toast } from "sonner";

import { HandleComponent } from "@/components/handle-component";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  EXPORT_IMAGE_MIMETYPE,
  EXPORT_IMAGE_TYPE,
  RND_POSITION,
} from "@/config";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { base64ToBlob, cn, formatPrice } from "@/lib/utils";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator";

import { saveConfig as saveConfigAction, type SaveConfigArgs } from "./actions";

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
  const router = useRouter();
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const [renderedPosition, setRenderedPosition] = useState(RND_POSITION);
  const [renderedDimension, setRenderedDimension] = useState({
    width: imgDimensions.width / 4,
    height: imgDimensions.height / 4,
  });

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing("imageUploader");

  const saveConfiguration = async () => {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();
      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      // positions relative to phone case
      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      // context to modify canvas
      const ctx = canvas.getContext("2d");

      // initialize user image
      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imgUrl;
      userImage.alt = "user uploaded image";

      // waiting until image is successfully created/loaded
      await new Promise((resolve) => (userImage.onload = resolve));

      // draw image on canvas
      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1]; // remove image headers

      const blob = base64ToBlob(base64Data, EXPORT_IMAGE_MIMETYPE);

      // create new file
      const file = new File([blob], `${createId()}.${EXPORT_IMAGE_TYPE}`, {
        type: EXPORT_IMAGE_MIMETYPE,
      });

      await startUpload([file], { configId });
    } catch (err) {
      toast.error("Something went wrong!", {
        description:
          "There was a problem saving your config, please try again.",
      });
    }
  };

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), saveConfigAction(args)]);
    },
    onError: () => {
      toast.error("Something went wrong!", {
        description: "There was an error on our end. Please try again.",
      });
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  return (
    <div className="relative mb-20 mt-20 grid grid-cols-1 pb-20 lg:grid-cols-3">
      <div
        ref={containerRef}
        className="relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="pointer-events-none relative aspect-[896_/_1831] w-60 bg-opacity-50">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896_/_1831]"
          >
            <NextImage
              src="/phone-template.png"
              alt="Phone"
              className="pointer-events-none z-50 select-none"
              fill
            />
          </AspectRatio>

          <div
            aria-hidden
            className="absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,_231,_235,_0.6)]"
          />

          <div
            className={cn(
              "absolute inset-0 bottom-px left-[3px] right-[3px] top-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>

        <Rnd
          default={{
            ...RND_POSITION,
            height: imgDimensions.height / 4,
            width: imgDimensions.width / 4,
          }}
          onResizeStop={(_e, _dir, ref, _delta, { x, y }) => {
            setRenderedDimension({
              // 50px -> 50
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });

            setRenderedPosition({ x, y });
          }}
          onDragStop={(_e, data) => {
            const { x, y } = data;

            setRenderedPosition({ x, y });
          }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent isPending={isPending} />,
            topRight: <HandleComponent isPending={isPending} />,
            bottomLeft: <HandleComponent isPending={isPending} />,
            topLeft: <HandleComponent isPending={isPending} />,
          }}
          disableDragging={isPending}
          enableResizing={!isPending}
          className="absolute z-20 border-[3px] border-primary"
        >
          <div className="relative h-full w-full">
            <NextImage
              src={imgUrl}
              alt="uploaded image"
              fill
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="col-span-full flex h-[37.5rem] w-full flex-col bg-white lg:col-span-1">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white"
          />

          <div className="px-8 pb-12 pt-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Customize your case
            </h2>

            <div aria-hidden className="my-6 h-px w-full bg-zinc-200" />

            <div className="relative mt-4 flex h-full flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(newColor) => {
                    setOptions((prevColor) => ({
                      ...prevColor,
                      color: newColor,
                    }));
                  }}
                  disabled={isPending}
                >
                  <Label>Color: {options.color.label}</Label>

                  <div
                    className={cn(
                      "mt-3 flex items-center space-x-3",
                      isPending && "opacity-50"
                    )}
                  >
                    {COLORS.map((color) => (
                      <Radio
                        key={color.label}
                        value={color}
                        className={({ checked, focus }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent p-0.5 focus:outline-primary focus:ring-0 active:outline-none active:ring-0",
                            {
                              [`border-${color.tw}`]: checked && !focus,
                              "cursor-not-allowed": isPending,
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

                <div className="relative flex w-full flex-col gap-3">
                  <Label>Model</Label>

                  <DropdownMenu>
                    <DropdownMenuTrigger disabled={isPending} asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.value}
                          className={cn(
                            "flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100",
                            {
                              "bg-primary-foreground text-primary":
                                model.value === options.model.value,
                            }
                          )}
                          onClick={() => {
                            setOptions((prevOptions) => ({
                              ...prevOptions,
                              model,
                            }));
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              model.value === options.model.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(value) => {
                        setOptions((prevOptions) => ({
                          ...prevOptions,
                          [name]: value,
                        }));
                      }}
                      disabled={isPending}
                    >
                      <Label className="capitalize">{name}</Label>

                      <div className="mt-3 space-y-4">
                        {selectableOptions.map((option) => (
                          <Radio
                            key={option.value}
                            value={option}
                            className={({ checked, focus }) =>
                              cn(
                                "relative block cursor-pointer rounded-lg border-2 border-zinc-200 bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none focus:outline-dotted focus:outline-primary focus:ring-0 sm:flex sm:justify-between",
                                {
                                  "border-primary": checked && !focus,
                                  "cursor-not-allowed opacity-50": isPending,
                                }
                              )
                            }
                          >
                            <span className="flex items-center">
                              <span className="flex flex-col text-sm">
                                <RadioLabel
                                  as="span"
                                  className="font-medium text-gray-900"
                                >
                                  {option.label}
                                </RadioLabel>

                                {option.description ? (
                                  <RadioDescription
                                    as="span"
                                    className="text-gray-500"
                                  >
                                    <span className="block sm:inline">
                                      {option.description}
                                    </span>
                                  </RadioDescription>
                                ) : null}
                              </span>
                            </span>

                            <RadioDescription
                              as="span"
                              className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                            >
                              <span className="font-medium text-gray-900">
                                {formatPrice(option.price / 100)}
                              </span>
                            </RadioDescription>
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="h-16 w-full bg-white px-8">
          <div aria-hidden className="h-px w-full bg-zinc-200" />

          <div className="flex h-full w-full items-center justify-end">
            <div className="flex w-full items-center gap-6">
              <p className="whitespace-nowrap font-medium">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100
                )}
              </p>

              <Button
                size="sm"
                className="w-full"
                isLoading={isPending}
                disabled={isPending}
                loadingText="Saving"
                onClick={() =>
                  saveConfig({
                    configId,
                    color: options.color.value,
                    finish: options.finish.value,
                    material: options.material.value,
                    model: options.model.value,
                  })
                }
              >
                Continue
                <ArrowRight className="ml-1.5 inline h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
