/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_GOOGLE_MAPS_URL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_PATIENT_PORTAL_URL?: string;
  readonly VITE_DENTIST_PORTAL_URL?: string;
  readonly VITE_ADMIN_PORTAL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
