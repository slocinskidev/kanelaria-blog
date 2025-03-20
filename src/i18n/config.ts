export type Locale = (typeof locales)[number];

export const locales = ["pl"] as const;
export const defaultLocale: Locale = "pl";
