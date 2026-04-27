# UI Women in Business — Website

Official website for **UIWIB (Universitas Indonesia Women in Business)** and their annual event **Weekend Career Expo (WCE)**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| File Storage | Supabase Storage |
| Auth | NextAuth.js (credentials) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── (public)/               ← All public-facing pages
│   │   ├── layout.tsx          ← Wraps Navbar + Footer
│   │   ├── page.tsx            ← Landing page (/)
│   │   ├── about-us/page.tsx   ← About Us (/about-us)
│   │   └── wce/
│   │       ├── page.tsx            ← WCE hub (/wce)
│   │       ├── competition/        ← /wce/competition
│   │       ├── training/           ← /wce/training
│   │       ├── grand-seminar/      ← /wce/grand-seminar
│   │       └── job-expo/           ← /wce/job-expo
│   ├── admin/                  ← Admin dashboard (protected)
│   │   ├── page.tsx            ← Login (/admin)
│   │   ├── layout.tsx          ← Sidebar layout
│   │   ├── dashboard/          ← Overview
│   │   ├── competition/        ← CRUD competition
│   │   ├── training/           ← CRUD training
│   │   └── job-expo/           ← CRUD job expo
│   └── api/                    ← API routes (server-only)
│       ├── auth/[...nextauth]/ ← NextAuth handler
│       ├── competition/        ← GET (public), POST (admin)
│       ├── competition/[id]/   ← PUT, DELETE (admin)
│       ├── training/           ← GET, POST
│       ├── training/[id]/      ← PUT, DELETE
│       ├── job-expo/           ← GET (w/ filters), POST
│       └── job-expo/[id]/      ← PUT, DELETE
├── components/
│   ├── public/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── admin/
│       └── AdminCrudPage.tsx   ← Reusable CRUD component
├── lib/
│   ├── prisma.ts               ← Prisma singleton
│   ├── supabase.ts             ← Supabase client + upload helpers
│   └── auth.ts                 ← NextAuth config
├── types/
│   └── index.ts                ← Shared TypeScript types
└── middleware.ts               ← Protects /admin/* routes
```

---

## Setup Guide

### Step 1 — Clone & Install

```bash
git clone https://github.com/your-org/uiwib-website.git
cd uiwib-website
npm install
```

### Step 2 — Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Note your **Project URL** and **API keys** (Settings → API)
3. Go to **Storage** → **New Bucket** → name it `uiwib-assets` → set to **Public**
4. In Storage → Policies, add a policy to allow public reads:
   ```sql
   -- Allow public read
   CREATE POLICY "Public read" ON storage.objects
     FOR SELECT USING (bucket_id = 'uiwib-assets');

   -- Allow authenticated insert/update/delete (service role handles this via API)
   ```

### Step 3 — Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
# Get from Supabase → Settings → Database → Connection string (URI)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Get from Supabase → Settings → API
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."   # Keep this SECRET, never expose to browser

# NextAuth
NEXTAUTH_URL="http://localhost:3000"  # Change to your domain in production
NEXTAUTH_SECRET="..."                 # Run: openssl rand -base64 32

# Storage
NEXT_PUBLIC_STORAGE_BUCKET="uiwib-assets"
```

### Step 4 — Set Up Database

```bash
# Push schema to Supabase
npm run db:push

# Generate Prisma client
npm run db:generate

# Seed initial data (creates admin account + sample content)
npm run db:seed
```

Default admin credentials after seeding:
- **Email:** `admin@uiwib.com`
- **Password:** `admin123`

> ⚠️ **Important:** Change this password immediately after first login by updating the database directly or building a "change password" feature.

### Step 5 — Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Deployment to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/your-org/uiwib-website.git
git push -u origin main
```

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Add all environment variables from `.env.local`
5. Change `NEXTAUTH_URL` to your production domain: `https://uiwomeninbusiness.com`
6. Deploy!

### Step 3 — Connect Custom Domain

1. In Vercel → Your Project → Settings → Domains
2. Add `uiwomeninbusiness.com`
3. Follow the DNS instructions (add A record or CNAME at your domain registrar)

### Step 4 — Set Up Cron Ping (Prevent Supabase Pausing)

Supabase free tier pauses databases inactive for 7+ days. Prevent this for free:

1. Go to [cron-job.org](https://cron-job.org) → Create free account
2. Create a new cron job:
   - **URL:** `https://uiwomeninbusiness.com/api/health` 
   - **Schedule:** Every 3 days (`0 9 */3 * *`)
3. Add this API route to your project:

```ts
// src/app/api/health/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.$queryRaw`SELECT 1`;
  return NextResponse.json({ status: "ok", time: new Date().toISOString() });
}
```

---

## Admin Guide

### Accessing Admin

Navigate to `/admin` on your website and log in with your admin credentials.

### Managing Content

From the admin sidebar you can:

| Section | What you can do |
|---|---|
| **Competition** | Add/edit/delete competition cards with image, description, timeline, and Google Form link |
| **Training** | Add/edit/delete training events (External or Internal) with date, place, and description |
| **Job Expo** | Add/edit/delete job listings with company logo, job details, and application deadline |

### Uploading Images

- Click **Add** or **Edit** on any item
- Use the file upload field — images are automatically uploaded to Supabase Storage
- Supported formats: JPG, PNG, WebP
- Recommended sizes:
  - Competition: `800×500px`
  - Training: `1200×600px`
  - Company Logo: `200×200px` (square)

### Adding a New Admin User

Currently, you need to add admin users directly in the database via Prisma Studio:

```bash
npm run db:studio
```

Or add to `prisma/seed.ts` and re-run `npm run db:seed`.

---

## Customization Guide

### Updating Company Partners (Landing Page)

Edit the `companyPartners` array in `src/app/(public)/page.tsx`.

### Updating Grand Seminar Content

Edit `src/app/(public)/wce/grand-seminar/page.tsx` — this page is fully static and designed to be edited per-event-year.

### Updating WCE Dates

Edit the dates in:
- `src/app/(public)/wce/page.tsx` (event cards)
- `src/app/(public)/wce/grand-seminar/page.tsx` (hero section)
- `src/app/(public)/wce/job-expo/page.tsx` (hero section)

### Brand Colors

All brand colors are defined as CSS variables in `src/app/globals.css`:

```css
:root {
  --color-rose-blush: #fce4ec;
  --color-rose-mid:   #f48fb1;
  --color-rose-deep:  #e91e8c;
  --color-rose-vivid: #d81b60;
  --color-navy:       #1a237e;
  --color-navy-mid:   #283593;
  --color-gold:       #f9a825;
  --color-cream:      #fff8f0;
}
```

---

## Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Push Prisma schema to database
npm run db:generate  # Regenerate Prisma client (after schema changes)
npm run db:studio    # Open Prisma Studio (visual DB browser)
npm run db:seed      # Seed initial data
```

---

## Troubleshooting

**"Prisma client not generated"**
```bash
npm run db:generate
```

**Images not loading in production**
- Check that `NEXT_PUBLIC_SUPABASE_URL` is set correctly in Vercel env vars
- Ensure the `uiwib-assets` bucket is set to **Public** in Supabase

**Admin redirects to login even after logging in**
- Check that `NEXTAUTH_SECRET` is set and matches between deployments
- Ensure `NEXTAUTH_URL` matches your actual domain exactly

**Database connection failed**
- Verify `DATABASE_URL` is correct
- If Supabase project was paused, visit the Supabase dashboard to unpause it

---

## License

© Universitas Indonesia Women in Business. All Rights Reserved.
