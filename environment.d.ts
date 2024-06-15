// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // uploadthing api key and app id
      UPLOADTHING_SECRET: string;
      UPLOADTHING_APP_ID: string;

      // app base url
      NEXT_PUBLIC_BASE_URL: string;

      // admin email
      ADMIN_EMAIL: string;
    }
  }
}
