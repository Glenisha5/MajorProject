## Authentication & MongoDB notes

This project now includes a minimal username/password signup & login backed by MongoDB.

Required environment variables (see `.env.example`):

- `MONGODB_URI` - your MongoDB connection string
- `MONGODB_DB` - database name (defaults to `majorproject`)
- `JWT_SECRET` - secret used to sign session JWTs

What was added:
- `lib/mongodb.ts` — MongoDB connection helper with caching
- `lib/auth.ts` — small JWT sign/verify helpers
- `app/api/auth/signup/route.ts` — signup endpoint (stores user, hashes password)
- `app/api/auth/login/route.ts` — login endpoint (validates credentials)

Client-side `app/page.tsx` was wired to call these APIs for signup/login and sets `isAuthenticated` on success.

How to run locally:
1. Copy `.env.example` to `.env.local` and fill the values.
2. Install dependencies (pnpm, npm or yarn). Example with pnpm:
```
pnpm install
pnpm dev
```

Notes & next steps:
- For production, set `NODE_ENV=production` and ensure HTTPS so cookies are secure.
- Consider adding server-side protection (middleware or server components) for truly protected pages.
- Replace the simple JWT cookie approach with a full session store or NextAuth if you need refresh tokens, social login, or advanced flows.
