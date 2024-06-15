import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing();

export const appFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    .input(
      z.object({
        configId: z.string().optional(),
      })
    )
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      return { configId };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;