# Environment variables

This project reads runtime configuration from a `.env.local` file in the project root during development.

## Where to put values
- Create a file at the repository root named `.env.local` (already present in this repo).
- The repository's `.gitignore` includes `.env*`, so local env files will not be committed.

## Required variables
- `MONGODB_URI` — MongoDB connection string (Atlas). Example: `mongodb+srv://<user>:<pass>@cluster0.mongodb.net/yourdb`.
- `MONGODB_DB` — Database name to use (e.g. `easyconstruct`).
- `JWT_SECRET` — Secret used to sign/verify JSON Web Tokens; keep this secret.
- `NEXT_PUBLIC_YOUTUBE_API_KEY` — Public YouTube API key (must start with `NEXT_PUBLIC_` to be available client-side).

## Example `.env.local`
```
MONGODB_URI=mongodb+srv://glenishadsouza:secret@cluster0.tk0ht9r.mongodb.net/easyconstruct?retryWrites=true&w=majority
MONGODB_DB=easyconstruct
JWT_SECRET=your_jwt_secret_here
NEXT_PUBLIC_YOUTUBE_API_KEY=AIza...yourkey
```

## Running the project
- Install dependencies (if not already done):
```
npm install --legacy-peer-deps
```
- Start Next.js dev server:
```
npm run dev
```

## Testing the MongoDB connection (local)
This repo includes a small script that attempts to connect using the env values found in `.env.local` or `.env`.

Run in PowerShell at the repo root:
```
node scripts/testDbConnection.js
```

If the script prints `Connected OK`, your connection is working.

## Production
- Do not commit `.env.local` to source control. Instead, set these variables in your hosting provider (e.g. Vercel, Netlify, Heroku) under project/environment settings.

## Security
- Treat `JWT_SECRET` and any DB credentials as sensitive secrets. Rotate them if accidentally exposed.

---
If you want, I can also run the DB test now or add this file to the repo for you.
