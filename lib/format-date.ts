export function formatDate(dateString: string | null): string {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
