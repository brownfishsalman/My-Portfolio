# Salman Saadiq — e-portfolio

A personal portfolio site with an admin panel. You write text, upload photos and paste YouTube links in the admin panel; the site updates by itself.

- **Site:** Next.js (the framework Vercel is built around), hosted on Vercel.
- **Admin panel:** Sanity Studio, embedded in the site at `/studio`.
- **Design:** a strip-chart recorder. The page is a roll of chart paper; three pens at the fixed red carriage line record your visitor's scroll. Content is stamped onto the roll as it crosses the carriage.

Everything you see on the site is editable in the admin panel: name, tagline, bio, portrait, projects (with galleries and video), skills, experience, contact links and the CV.

---

## Step 1 — run it on your PC

Open a terminal in this folder and run:

```bash
npm install
```

then:

```bash
npm run dev
```

Open <http://localhost:3000>. Until you connect Sanity (Step 2) the site shows built-in example content, stamped **EXAMPLE**.

Stop the server with `Ctrl+C`.

## Step 2 — connect the admin panel (Sanity)

1. Go to <https://www.sanity.io/manage> and sign in (GitHub or Google is easiest).
2. **Create project** → name it `portfolio` → choose the **Free** plan → dataset name `production`.
3. On the project page copy the **Project ID** (a short code like `ab12cd34`).
4. In this folder, copy `.env.local.example` to a new file called `.env.local` and fill in:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=ab12cd34
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

5. Still in Sanity manage: **API → CORS origins → Add CORS origin** → `http://localhost:3000` → tick **Allow credentials** → Save. (Do the same later for your Vercel address.)
6. Restart `npm run dev` and open <http://localhost:3000/studio>. Sign in. You will see an empty admin panel.

### Load the example content (optional but recommended)

So you can edit rather than start from blank:

1. In Sanity manage: **API → Tokens → Add API token** → name `seed`, permissions **Editor** → copy the token.
2. Put it in `.env.local` as `SANITY_API_WRITE_TOKEN=...` (never share this file; it is git-ignored).
3. Run:

   ```bash
   npm run seed
   ```

4. Refresh `/studio`. The example projects, skills, experience and site settings are there. Delete the `seed` token in Sanity manage afterwards if you like; the site never needs it.

## Step 3 — put the code on GitHub

1. On <https://github.com/new> create an **empty** repository (no README, no .gitignore). Name it e.g. `portfolio`.
2. In this folder:

   ```bash
   git add -A
   ```

   ```bash
   git commit -m "Portfolio site"
   ```

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   ```

   ```bash
   git push -u origin main
   ```

`.env.local` is ignored by git on purpose: your token stays on your PC.

## Step 4 — deploy on Vercel

1. Go to <https://vercel.com/new>, pick **Import Git Repository**, choose the repo. Framework is detected as Next.js; leave the settings.
2. Open **Environment Variables** and add the two public values from `.env.local`:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = your project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
3. Click **Deploy**. After a minute you get an address like `https://portfolio-xyz.vercel.app`.
4. Back in Sanity manage → **API → CORS origins** → add that address (with **Allow credentials**), so the admin panel works on the live site.
5. Open `https://your-address.vercel.app/studio`, sign in, and edit.

Every push to GitHub redeploys automatically. Content edits in the admin panel do **not** need a redeploy: the site re-reads Sanity within about a minute.

## Editing content

| What | Where in the admin panel |
|---|---|
| Name, tagline, degree, university, year | Site settings → Identity |
| Bio, portrait | Site settings → About |
| Email, GitHub, LinkedIn, CV (PDF), contact note | Site settings → Contact & CV |
| A project: cover, gallery, YouTube link, Analysis / Build / Test write-up, links | Projects → open one (or **Create**) |
| Which projects appear on the home page | Project → Basics → **Show on home page** (max 3 shown) |
| Skills | Skill groups |
| Degree, internships, roles, certificates, awards | Experience & education |

Tips:

- Click **Publish** after editing; drafts are not shown on the site.
- Example content carries an **Example content** tick box; untick it once you have replaced the text, or delete the entry.
- Images: landscape, at least 1600 px wide, look best for project covers. Fill in the "description for screen readers" field.
- YouTube: paste the normal `https://www.youtube.com/watch?v=...` link.

## Custom domain (later)

Vercel → your project → **Settings → Domains** → add `yourname.com` and follow the DNS instructions from your registrar. Add the new domain to Sanity's CORS origins too.

## For developers

```
app/                 pages: home, /projects, /projects/[slug], /studio
components/recorder  the chart-paper shell: bezel (nav), paper, channel band (pens), stamp reveal
components/          prints, headings, rich text, video
lib/content.ts       all content reads (Sanity, or built-in examples before Sanity is connected)
lib/placeholders.ts  the example content (also what `npm run seed` loads)
sanity/schemaTypes   the admin panel's forms
scripts/             seed, placeholder figure and CV generators
```

- `npm run lint` — code checks · `npm run build` — production build (what Vercel runs) · `npm run figures` — regenerate placeholder figures.
- Design decisions are recorded in `PRODUCT.md` and `DESIGN.md`.
