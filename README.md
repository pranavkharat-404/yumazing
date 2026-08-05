# Yumazing Multi Food Corner

Food ordering web app for Yumazing Multi Food Corner, Mehkar. Built with Next.js 15, TypeScript, Tailwind CSS, Firebase (Auth + Firestore), and Framer Motion. Checkout goes through WhatsApp instead of a payment gateway.

## Stack

- Next.js 15 (App Router), TypeScript
- Tailwind CSS
- Firebase Authentication (Email/Password, used internally for phone + password login) and Firestore
- Framer Motion
- Lucide React icons

## Getting started

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` with your Firebase project config (see below), then:

```bash
npm run dev
```

## Firebase setup

1. Create a project at console.firebase.google.com.
2. Authentication → Sign-in method → enable Email/Password.
   Customers sign up and log in with a phone number and password. Internally the phone number is converted to an email like `9876543210@yumazing.app` so Firebase's Email/Password auth can be used without any OTP/SMS limits.
3. Firestore Database → Create database → production mode.
4. Deploy the included rules:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use --add
   firebase deploy --only firestore:rules
   ```
5. Project settings → General → Your apps → add a Web app, copy the config values into `.env.local`.
6. Authentication → Settings → Authorized domains → add `localhost` and your production domain.

## Editing the menu

Edit `src/data/menu.json` and `src/data/categories.json` directly — there's no admin panel. Prices are plain numbers; the rupee symbol is added automatically. Badges: `isBestSeller`, `isPopular`, `isTodaysSpecial`.

Menu item images are currently Unsplash placeholders — replace the `image` URLs with your own photos before going live.

## WhatsApp checkout

No payment gateway. Checkout builds an order summary message and opens `https://wa.me/<number>?text=...`. The number is set via `NEXT_PUBLIC_WHATSAPP_NUMBER`.

## Deploying to Vercel

1. Push the project to GitHub.
2. Import the repo at vercel.com/new.
3. Add all variables from `.env.example` under Settings → Environment Variables.
4. Deploy.
5. Add the resulting domain to Firebase → Authentication → Authorized domains.

## Firestore data

`users` collection: `uid`, `name`, `phone`, `createdAt`.

An `orders` collection is scaffolded in `firestore.rules` for future use — orders currently go out via WhatsApp only, nothing is written there yet.

## Folder structure

```
src/
  app/            routes (home, menu, food/[id], profile)
  components/     ui/, layout/, home/, menu/, cart/, auth/, shared/
  context/        AuthContext, CartContext
  hooks/          useMenu, useGatedAction, useDebounce
  lib/            firebase.ts, whatsapp.ts, utils.ts, constants.ts
  data/           menu.json, categories.json
  types/
public/
  manifest.json, icons/
firestore.rules
```
