# Migration notes

- Source used: latest supplied `Pasted text(6).txt` (Blogger XML/XHTML template, 259,524 bytes).
- Preserved the existing in-page style rules, content views, language dictionary, portfolio, pricing, theme controls, project builder, and chat interface.
- Removed Blogger-only metadata expressions, Blogger hidden blog widget markup, and the former hard-coded Telegram Worker API URL.
- The front end now calls same-origin Cloudflare Pages Functions under `/api`.
- The project builder stores structured submissions in `project_requests`; the chat/contact form uses D1-backed tickets and messages.
- The admin interface is new and separate at `/admin/`.
- R2 is optional and needed only for actual file attachments. Without it, text chat and requests can still work.
- This package is a migration build, not a claim that Cloudflare resources have been created or deployment has succeeded. Verify it on a test Pages project before sharing it publicly.
