/// <reference types="vite/client" />

type ImportMetaEnvVariable = string | undefined;

interface ImportMetaEnv {
  readonly VITE_YH_API_URL: ImportMetaEnvVariable;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
