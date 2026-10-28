# NorDa — Cloudflare Pages + D1

This is a browser-uploadable migration starter built from the latest supplied `Pasted text(6).txt` Blogger template. The visual layout, Arabic/English/French language data, project showcase, pricing, theme toggle, builder modal, contact/chat UI, and responsive styling are retained. Blogger-only widgets and `data:blog` expressions were removed.

## What is included

- `index.html`: standalone front end with the original design and same-origin `/api` calls.
- `functions/`: Cloudflare Pages Functions for project requests, visitor chat tickets/messages, and admin APIs.
- `admin/index.html`: private admin sign-in, project-request status management, ticket history, and replies.
- `migrations/0001_initial.sql`: D1 tables and indexes.
- `wrangler.toml`: Pages configuration. Replace the database ID placeholder after creating D1.
- `_headers`, `404.html`, and `.gitignore`.

## Before deployment

1. Create a GitHub repository and upload the **contents** of this folder (not just the ZIP file).
2. In Cloudflare, open **Workers & Pages → D1 SQL Database → Create database**, name it `norda-db`.
3. Open the new D1 database's SQL console and execute the complete contents of `migrations/0001_initial.sql`.
4. Copy the database ID from the D1 database overview. In GitHub's web editor, open `wrangler.toml` and replace `REPLACE_WITH_D1_DATABASE_ID` with the real ID. Commit the change.
5. In Cloudflare, create a **Pages** project connected to the GitHub repository. Use the root directory, no framework preset, and no build command. Output directory: `.`. Deploy.
6. In the Pages project settings, open **Functions → D1 database bindings**, add binding variable `DB`, and select `norda-db`. Save and redeploy if Cloudflare asks.
7. In Pages **Settings → Variables and Secrets**, add these as secrets (not public variables):
   - `ADMIN_USERNAME`: a unique admin username
   - `ADMIN_PASSWORD`: a long, unique password
8. Open the deployed `/admin/` page. The first successful login provisions the admin account in D1. Use the same username/password configured in Cloudflare.

## Optional attachments (Cloudflare R2)

Text chat works with D1 alone. The existing chat attachment control requires an R2 bucket:

1. Create an R2 bucket named `norda-uploads`.
2. Add an R2 binding named `UPLOADS` to the Pages project, selecting that bucket.
3. Uncomment the `[[r2_buckets]]` block in `wrangler.toml` if you deploy using the Wrangler config. If using only the Pages dashboard binding, add the binding there and redeploy.

The code enforces a 2 MiB attachment limit. R2 files are only served to the owning visitor (using their visitor ID) or a signed-in admin.

## API routes

- `POST /api/requests` — stores a project-builder submission in D1.
- `POST /api/ticket/new` — starts or resumes the visitor's open chat ticket.
- `GET /api/ticket/:id/messages` — loads chat history.
- `POST /api/ticket/:id/message` — sends a visitor message.
- `POST /api/ticket/:id/close` — closes the visitor's ticket.
- `GET /api/ticket/closed/closed` — lists the visitor's closed tickets.
- `/api/admin/login`, `/api/admin/logout` — admin session.
- `GET/PATCH /api/admin/requests` — list/update request status.
- `GET /api/admin/tickets`, `POST /api/admin/reply` — view tickets and reply.

## Important security notes

- Never put secrets in `index.html`, browser JavaScript, or GitHub files.
- Visitor chat authorization uses the random `rose_uid` stored in that visitor's browser. Clearing browser storage loses that browser's access to its old tickets. This is not a verified user account system.
- The admin panel is protected by a server-side session cookie and D1 session record. Keep `ADMIN_PASSWORD` private and rotate it if it is exposed.
- The project-builder form is saved as a request. The contact form still opens a chat ticket and sends the contact message into that chat.
- No live deployment has been performed from this workspace. The site becomes live only after you complete the Cloudflare steps above.

## Browser-only workflow

You do not need to install Node.js, Wrangler, or VS Code. You can edit files with GitHub's web editor and run the D1 migration in Cloudflare's SQL console. If you later need to make many edits, GitHub's web editor can handle small changes; larger edits are easier with a local editor but are not required for this setup.


## Static project detail pages

Each portfolio project has a pre-generated page at projects/<id>.html. The pages include project-specific canonical URLs, Open Graph and Twitter Card metadata, JSON-LD, and visible project content in the HTML response, so previews do not depend on JavaScript. The source of truth remains projects.js. After editing projects.js or project.html, regenerate the pages with node scripts/generate-project-pages.js and commit the generated files.
