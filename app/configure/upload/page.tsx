"use client";

import { ImageIcon, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { type FileRejection } from "react-dropzone";
import { toast } from "sonner";

import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { cn, generateFileName } from "@/lib/utils";

const UploadPage = () => {
  const router = useRouter();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPending, startTransition] = useTransition();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;

      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(progress) {
      setUploadProgress(progress);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    const isFileInvalid = file.errors.find(
      (error) => error.code === "file-invalid-type"
    );
    const isFileTooLarge = file.errors.find(
      (error) => error.code === "file-too-large"
    );

    setIsDragOver(false);

    if (isFileInvalid) {
      return toast.error(
        `${file.file.type.split("/")[1].toUpperCase()} type if not supported.`,
        {
          description: "Please choose a PNG, JPG or JPEG image instead.",
        }
      );
    }

    if (isFileTooLarge) {
      return toast.error(`Image is too large.`, {
        description: "Please choose a image up to 8MB.",
      });
    }

    return toast.error(`Something went wrong.`, {
      description: "Please try again later.",
    });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;

    // update file name
    const updatedName = generateFileName(file.name);
    const updatedFile = new File([file], updatedName, { type: file.type });

    startUpload([updatedFile], {
      configId: undefined,
    });

    setIsDragOver(false);
  };

  return (
    <div
      className={cn(
        "relative my-16 flex h-full w-full flex-1 flex-col items-center justify-center rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl",
        {
          "bg-blue-900/10 ring-blue-900/25": isDragOver,
        }
      )}
    >
      <div className="relative flex w-full flex-1 flex-col items-center justify-center">
        <Dropzone
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          disabled={isUploading || isPending}
          maxSize={8_000_000}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className={cn(
                "flex h-full w-full flex-1 cursor-pointer flex-col items-center justify-center",
                {
                  "cursor-not-allowed": isUploading || isPending,
                }
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              {isDragOver ? (
                <MousePointerSquareDashed className="mb-2 h-6 w-6 text-zinc-500" />
              ) : isUploading || isPending ? (
                <Loader2 className="mb-2 h-6 w-6 animate-spin text-zinc-500" />
              ) : (
                <ImageIcon className="mb-2 h-6 w-6 text-zinc-500" />
              )}

              <div className="mb-2 flex flex-col justify-center text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className="mt-2 h-2 w-40 bg-gray-300"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span> to upload.
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop.
                  </p>
                )}
              </div>

              {isPending ? null : (
                <div className="space-y-0.5 text-center">
                  <p className="text-xs text-zinc-500">PNG, JPG or JPEG.</p>
                  <p className="text-xs text-zinc-500">
                    Maximum file size up to 8MB.
                  </p>
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default UploadPage;
