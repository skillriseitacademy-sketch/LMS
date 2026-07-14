/**
 * Sanitizes user input text by removing potentially problematic characters,
 * zero-width spaces, and trimming whitespace.
 * 
 * We do not aggressively escape `<` or `>` because the frontend uses 
 * `react-markdown` which handles HTML escaping safely.
 * 
 * @param text The input string to sanitize
 * @param maxLength Optional max length to truncate to
 * @param stripHtml Whether to aggressively strip all HTML tags
 */
export function sanitizeText(text: string | undefined | null, maxLength?: number, stripHtml: boolean = false): string {
  if (!text) return "";
  
  // Convert to string in case it's a number or something else
  let sanitized = String(text);

  // Strip zero-width spaces, invisible formatting characters
  sanitized = sanitized.replace(/[\u200B-\u200D\uFEFF]/g, "");

  if (stripHtml) {
    // Basic regex to strip HTML tags if requested
    sanitized = sanitized.replace(/<\/?[^>]+(>|$)/g, "");
  }

  // Trim leading/trailing whitespaces
  sanitized = sanitized.trim();

  // Enforce max length if provided
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

export function isValidUrl(urlStr: string): boolean {
  if (!urlStr) return false;
  try {
    const url = new URL(urlStr);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
