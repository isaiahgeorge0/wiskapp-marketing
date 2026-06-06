export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://wiskapp.com";
}

export function getDefaultOgImageUrl(): string {
  return `${getSiteUrl()}/opengraph-image`;
}
