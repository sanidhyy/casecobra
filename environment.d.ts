// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // uploadthing api key and app id
      UPLOADTHING_SECRET: string;
      UPLOADTHING_APP_ID: string;

      // neon db uri
      DATABASE_URL: string;

      // stripe key and webhook
      STRIPE_SECRET_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;

      // resend api key and sender email
      RESEND_API_KEY: string;
      RESEND_SENDER_EMAIL: string;

      // app base url
      NEXT_PUBLIC_APP_BASE_URL: string;

      // admin email
      ADMIN_EMAIL: string;
    }
  }
}
