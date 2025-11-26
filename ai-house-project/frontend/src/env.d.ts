/// <reference types="node" />

// Provide a minimal `import.meta.env` typing so editors/TS don't require `vite/client`.
// Extend as needed for your project's environment variables.

interface ImportMetaEnv {
  readonly NODE_ENV?: string;
  readonly VITE_API_URL?: string;
  // add other env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
