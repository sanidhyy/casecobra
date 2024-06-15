import sharp from "sharp";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

import { db } from "@/db";

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

      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();

      const imgMetadata = await sharp(buffer).metadata();
      const { height, width } = imgMetadata;

      if (!configId) {
        const configuration = await db.configuration.create({
          data: {
            imgUrl: file.url,
            height: height || 500,
            width: width || 500,
          },
        });

        return { configId: configuration.id };
      }

      const updatedConfiguration = await db.configuration.update({
        where: {
          id: configId,
        },
        data: {
          croppedImageUrl: file.url,
        },
      });

      return { configId: updatedConfiguration.id };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
