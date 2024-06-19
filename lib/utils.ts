import { createId } from "@paralleldrive/cuid2";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;

    if (!result[index]) result[index] = [];

    result[index].push(array[i]);
  }

  return result;
}

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}

export function base64ToBlob(base64: string, mimeType: string) {
  const byteCharacters = atob(base64);

  const byteNumbers = new Array(byteCharacters.length);

  // assign each by char code to byte numbers
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: mimeType });
}

export function generateFileName(originalName: string) {
  const id = createId();
  const extension = originalName.split(".").pop();

  return `${id}.${extension}`;
}
