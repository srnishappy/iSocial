# 🚀 iSocial – Project Setup Guide

Welcome to **iSocial**! This project is built with **Next.js**, **Clerk Authentication**, **PostgreSQL (Neon)**, and **Uploadthing** for handling file uploads.

---

## 📋 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: v18+)
- [PostgreSQL (Neon)](https://neon.tech/)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Prisma](https://www.prisma.io/) (auto-installed via `postinstall` script)

---

## 🔧 Environment Configuration

Create a `.env` file at the root of the project and add the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

DATABASE_URL=

UPLOADTHING_TOKEN=''
NODE_ENV=development
```

### Configuration Details:

- **DATABASE_URL**: Neon PostgreSQL connection string.
- **CLERK\_\* keys**: Used for Clerk authentication.
- **UPLOADTHING_TOKEN**: Token required for file/image upload with Uploadthing.
- **NODE_ENV**: Defines the environment mode (development/production).

---

## 📦 Installing Dependencies

Install all packages with:

```bash
npm install --legacy-peer-deps
```

> ⚠️ Use `--legacy-peer-deps` to bypass peer dependency conflicts.

---

## ⚙️ Prisma Client Generation

Run the following to generate the Prisma client:

```bash
npx prisma generate
```

This will also run automatically after `npm install` due to the `postinstall` script.

---

## 🧪 Development Mode

Start the development server:

```bash
npm run dev
```

Open the app at:  
http://localhost:3000

---

## 🏗️ Production Build

To build the app for production:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## ❤️ Tech Stack

- ⚡️ **Next.js 15**
- 🎨 **Tailwind CSS**
- 🔒 **Clerk Authentication**
- 🛢️ **PostgreSQL via Neon**
- ☁️ **Uploadthing**
- 🧬 **Prisma ORM**

---
