/**
 * Get user initials from a full name.
 * Returns up to 2 characters (first letter of first and last name).
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
