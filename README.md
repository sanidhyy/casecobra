<a name="readme-top"></a>

# CaseCobra - Custom high-quality phones cases

![CaseCobra - Custom high-quality phones cases](/.github/images/img_main.png "CaseCobra - Custom high-quality phones cases")

[![Ask Me Anything!](https://flat.badgen.net/static/Ask%20me/anything?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy "Ask Me Anything!")
[![GitHub license](https://flat.badgen.net/github/license/sanidhyy/casecobra?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/casecobra/blob/main/LICENSE "GitHub license")
[![Maintenance](https://flat.badgen.net/static/Maintained/yes?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/casecobra/commits/main "Maintenance")
[![GitHub branches](https://flat.badgen.net/github/branches/sanidhyy/casecobra?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/casecobra/branches "GitHub branches")
[![Github commits](https://flat.badgen.net/github/commits/sanidhyy/casecobra?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/casecobra/commits "Github commits")
[![GitHub issues](https://flat.badgen.net/github/issues/sanidhyy/casecobra?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/casecobra/issues "GitHub issues")
[![GitHub pull requests](https://flat.badgen.net/github/prs/sanidhyy/casecobra?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/casecobra/pulls "GitHub pull requests")
[![Vercel status](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://app-casecobra.vercel.app/ "Vercel status")

<!-- Table of Contents -->
<details>

<summary>

# :notebook_with_decorative_cover: Table of Contents

</summary>

- [Folder Structure](#bangbang-folder-structure)
- [Getting Started](#toolbox-getting-started)
- [Screenshots](#camera-screenshots)
- [Tech Stack](#gear-tech-stack)
- [Stats](#wrench-stats)
- [Contribute](#raised_hands-contribute)
- [Acknowledgements](#gem-acknowledgements)
- [Sponsor Me](#heart-sponsor-me)
- [Follow Me](#rocket-follow-me)
- [Learn More](#books-learn-more)
- [Deploy on Vercel](#page_with_curl-deploy-on-vercel)
- [Give A Star](#star-give-a-star)
- [Star History](#star2-star-history)
- [Give A Star](#star-give-a-star)

</details>

## :bangbang: Folder Structure

Here is the folder structure of this app.

<!--- FOLDER_STRUCTURE_START --->
```bash
casecobra/
  |- app/
    |-- api/
        |--- auth/[kindeAuth]/
        |--- uploadthing/
        |--- webhooks/stripe/
    |-- auth-callback/
    |-- configure/
    |-- dashboard/
    |-- thank-you/
    |-- apple-icon.png
    |-- error.tsx
    |-- favicon.ico
    |-- globals.css
    |-- icon1.png
    |-- icon2.png
    |-- layout.tsx
    |-- loading.tsx
    |-- not-found.tsx
    |-- page.tsx
  |- components/
    |-- emails/
    |-- modals/
    |-- ui/
    |-- footer.tsx
    |-- handle-component.tsx
    |-- icons.tsx
    |-- loader.tsx
    |-- max-width-wrapper.tsx
    |-- navbar.tsx
    |-- phone-preview.tsx
    |-- phone.tsx
    |-- providers.tsx
    |-- reviews.tsx
    |-- steps.tsx
  |- config/
    |-- index.ts
    |-- products.ts
  |- db/
    |-- index.ts
  |- lib/
    |-- stripe.ts
    |-- uploadthing.ts
    |-- utils.ts
  |- prisma/
    |-- schema.prisma
  |- public/
  |- validators/
    |-- option-validator.ts
  |- .env
  |- .env.example
  |- .eslintrc.json
  |- .gitignore
  |- .prettierrc.json
  |- bun.lockb
  |- components.json
  |- environment.d.ts
  |- next.config.mjs
  |- package.json
  |- postcss.config.js
  |- tailwind.config.ts
  |- tsconfig.json
```
<!--- FOLDER_STRUCTURE_END --->

<br />

## :toolbox: Getting Started

1. Make sure **Git** and **NodeJS** is installed.
2. Clone this repository to your local computer.
3. Create `.env` file in **root** directory.
4. Contents of `.env`:

```env
# .env

# disabled next.js telemetry
NEXT_TELEMETRY_DISABLED=1

# kinde client id and secret
KINDE_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
KINDE_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# kinde issuer and callback url
KINDE_ISSUER_URL=https://exampleapp.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/auth-callback

# uploadthing app id and secret
UPLOADTHING_APP_ID=xxxxxxxxxxxx
UPLOADTHING_SECRET=sk_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# neon db uri
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/casecobra?sslmode=require"

# stripe key and webhook
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# resend api key and sender email
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RESEND_SENDER_EMAIL="your.email@example.com"

# app base url
NEXT_PUBLIC_APP_BASE_URL=http://localhost:3000

# admin email
ADMIN_EMAIL="admin.email@example.com"

```

### 5. Disable Next.js Telemetry

To disable Next.js telemetry, add the following line to your `.env` file:

```env
NEXT_TELEMETRY_DISABLED=1
```

### 6. Kinde Client ID and Secret

1. Visit the [Kinde website](https://kinde.com) and log in to your account.
2. Navigate to the "Applications" section and create a new application if you haven't already.
3. After creating the application, you will find the `Client ID` and `Client Secret` in the application settings.
4. Copy these values and add them to your `.env` file:

```env
KINDE_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
KINDE_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 7. Kinde Issuer and Callback URL

1. In the same Kinde application settings, locate the `Issuer URL` and configure the callback URLs.
2. Set the callback URLs to match your local development setup:
   - Post Login Redirect URL: `http://localhost:3000/auth-callback`
   - Post Logout Redirect URL: `http://localhost:3000`
3. Add these values to your `.env` file:

```env
KINDE_ISSUER_URL=https://exampleapp.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/auth-callback
```

### 8. UploadThing App ID and Secret

1. Visit the [UploadThing website](https://uploadthing.com) and log in to your account.
2. Navigate to the "API Keys" section and create a new API key.
3. Copy the `App ID` and `Secret` values.
4. Add these values to your `.env` file:

```env
UPLOADTHING_APP_ID=xxxxxxxxxxxx
UPLOADTHING_SECRET=sk_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 9. Neon DB URI

1. Visit the [Neon website](https://neon.tech) and log in to your account.
2. Navigate to the "Databases" section and create a new PostgreSQL database if you haven't already.
3. Obtain the connection URI from the database settings.
4. Replace `<user>`, `<password>`, `<host>`, and `<port>` with your database credentials and add the value to your `.env` file:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/casecobra?sslmode=require"
```

### 10. Stripe Key and Webhook

1. Visit the [Stripe website](https://stripe.com) and log in to your account.
2. Navigate to the "Developers" section and click on "API keys".
3. Copy the `Secret Key` and add it to your `.env` file:
4. Navigate to "Webhook" settings, create a new webhook, and copy the `Webhook Secret`:

```env
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 11. Resend API Key and Sender Email

1. Visit the [Resend website](https://resend.dev) and log in to your account.
2. Navigate to the "API Keys" section and generate a new API key.
3. Copy the `API Key` and add it to your `.env` file.
4. Set your sender email address:

```env
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RESEND_SENDER_EMAIL="your.email@example.com"
```

### 12. Application Base URL

Set the base URL for your application to match your local development environment:

```env
NEXT_PUBLIC_APP_BASE_URL=http://localhost:3000
```

### 13. Admin Email

Set the admin email address:

```env
ADMIN_EMAIL="admin.email@example.com"
```

14. Now app is fully configured 👍 and you can start using this app using either one of `npm run dev` or `yarn dev`.

**NOTE:** Please make sure to keep your API keys and configuration values secure and do not expose them publicly.

## :camera: Screenshots

![Modern ui/ux](/.github/images/img1.png "Modern ui/ux")

![Customize your case](/.github/images/img2.png "Customize your case")

![Thank you page](/.github/images/img3.png "Thank you page")

![Order confirmation mail](/.github/images/img4.png "Order confirmation mail")

## :gear: Tech Stack

[![React JS](https://skillicons.dev/icons?i=react "React JS")](https://react.dev/ "React JS") [![Next JS](https://skillicons.dev/icons?i=next "Next JS")](https://nextjs.org/ "Next JS") [![Typescript](https://skillicons.dev/icons?i=ts "Typescript")](https://www.typescriptlang.org/ "Typescript") [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind "Tailwind CSS")](https://tailwindcss.com/ "Tailwind CSS") [![Vercel](https://skillicons.dev/icons?i=vercel "Vercel")](https://vercel.app/ "Vercel") [![Postgresql](https://skillicons.dev/icons?i=postgres "Postgresql")](https://www.postgresql.org/ "Postgresql") [![Prisma](https://skillicons.dev/icons?i=prisma "Prisma")](https://www.prisma.io/ "Prisma")

## :wrench: Stats

[![Stats for CaseCobra](/.github/images/stats.svg "Stats for CaseCobra")](https://pagespeed.web.dev/analysis?url=https://app-casecobra.vercel.app/ "Stats for CaseCobra")

## :raised_hands: Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## :gem: Acknowledgements

Useful resources and dependencies that are used in CaseCobra.

<!--- DEPENDENCIES_START --->
- [@headlessui/react](https://www.npmjs.com/package/@headlessui/react): ^2.0.4
- [@kinde-oss/kinde-auth-nextjs](https://www.npmjs.com/package/@kinde-oss/kinde-auth-nextjs): ^2.2.13
- [@paralleldrive/cuid2](https://www.npmjs.com/package/@paralleldrive/cuid2): ^2.2.2
- [@prisma/client](https://www.npmjs.com/package/@prisma/client): ^5.15.0
- [@radix-ui/react-aspect-ratio](https://www.npmjs.com/package/@radix-ui/react-aspect-ratio): ^1.0.3
- [@radix-ui/react-dialog](https://www.npmjs.com/package/@radix-ui/react-dialog): ^1.1.0
- [@radix-ui/react-dropdown-menu](https://www.npmjs.com/package/@radix-ui/react-dropdown-menu): ^2.0.6
- [@radix-ui/react-icons](https://www.npmjs.com/package/@radix-ui/react-icons): ^1.3.0
- [@radix-ui/react-label](https://www.npmjs.com/package/@radix-ui/react-label): ^2.0.2
- [@radix-ui/react-progress](https://www.npmjs.com/package/@radix-ui/react-progress): ^1.0.3
- [@radix-ui/react-scroll-area](https://www.npmjs.com/package/@radix-ui/react-scroll-area): ^1.0.5
- [@radix-ui/react-slot](https://www.npmjs.com/package/@radix-ui/react-slot): ^1.0.2
- [@react-email/components](https://www.npmjs.com/package/@react-email/components): ^0.0.19
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query): ^5.45.1
- [@uploadthing/react](https://www.npmjs.com/package/@uploadthing/react): ^6.6.0
- [class-variance-authority](https://www.npmjs.com/package/class-variance-authority): ^0.7.0
- [clsx](https://www.npmjs.com/package/clsx): ^2.1.1
- [framer-motion](https://www.npmjs.com/package/framer-motion): ^11.2.10
- [lucide-react](https://www.npmjs.com/package/lucide-react): ^0.394.0
- [next](https://www.npmjs.com/package/next): 14.2.4
- [next-themes](https://www.npmjs.com/package/next-themes): ^0.3.0
- [prisma](https://www.npmjs.com/package/prisma): ^5.15.0
- [react](https://www.npmjs.com/package/react): ^18
- [react-dom](https://www.npmjs.com/package/react-dom): ^18
- [react-dom-confetti](https://www.npmjs.com/package/react-dom-confetti): ^0.2.0
- [react-dropzone](https://www.npmjs.com/package/react-dropzone): ^14.2.3
- [react-rnd](https://www.npmjs.com/package/react-rnd): ^10.4.11
- [resend](https://www.npmjs.com/package/resend): ^3.3.0
- [sharp](https://www.npmjs.com/package/sharp): ^0.32.6
- [sonner](https://www.npmjs.com/package/sonner): ^1.5.0
- [stripe](https://www.npmjs.com/package/stripe): ^15.12.0
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge): ^2.3.0
- [tailwindcss-animate](https://www.npmjs.com/package/tailwindcss-animate): ^1.0.7
- [uploadthing](https://www.npmjs.com/package/uploadthing): ^6.12.0
- [zod](https://www.npmjs.com/package/zod): ^3.23.8
- [@types/node](https://www.npmjs.com/package/@types/node): ^20
- [@types/react](https://www.npmjs.com/package/@types/react): ^18
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): ^18
- [eslint](https://www.npmjs.com/package/eslint): ^8
- [eslint-config-next](https://www.npmjs.com/package/eslint-config-next): 14.2.4
- [eslint-plugin-unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports): ^4.0.0
- [postcss](https://www.npmjs.com/package/postcss): ^8
- [prettier](https://www.npmjs.com/package/prettier): ^3.3.2
- [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss): ^0.6.5
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): ^3.4.1
- [typescript](https://www.npmjs.com/package/typescript): ^5
<!--- DEPENDENCIES_END --->

## :heart: Sponsor Me

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

[<img src="https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white" width="150" />](https://www.patreon.com/sanidhy "Patreon")

## :rocket: Follow Me

[![Follow Me](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy "Follow Me")
[![Tweet about this project](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fx.com%2F_sanidhyy)](https://x.com/intent/tweet?text=Check+out+this+amazing+app:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Fcasecobra "Tweet about this project")

## :books: Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## :page_with_curl: Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## :star: Give A Star

You can also give this repository a star to show more people and they can use this repository.

## :star2: Star History

<a href="https://star-history.com/#sanidhyy/casecobra&Timeline">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=sanidhyy/casecobra&type=Timeline&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=sanidhyy/casecobra&type=Timeline" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=sanidhyy/casecobra&type=Timeline" />
</picture>
</a>

<br />
<p align="right">(<a href="#readme-top">back to top</a>)</p>
