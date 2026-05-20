const CLOUDINARY_BASE = "https://res.cloudinary.com";

// Cloudinary free accounts use "dynamic folder mode" which treats folders as
// visual-only labels — the folder path is NOT included in the public ID or URL.
// We store full paths in "cloudinary:" references (e.g. "cloudinary:covers/foo.svg")
// for readability and future-proofing, but strip the folder when building the URL.
// If you ever switch to a host that supports folder paths, remove the split below.
function extractFilename(publicId: string): string {
  return publicId.includes("/") ? publicId.split("/").pop()! : publicId;
}

export function cloudinaryUrl(publicId: string, transforms = ""): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return "";
  const transformPath = transforms ? `${transforms}/` : "";
  const filename = extractFilename(publicId);
  return `${CLOUDINARY_BASE}/${cloudName}/image/upload/${transformPath}${filename}`;
}

// Resolve an image src that may use the "cloudinary:" shorthand used in post frontmatter.
// "cloudinary:covers/foo.svg" → full Cloudinary URL using just the filename
// Any other value is returned unchanged.
// Returns empty string if cloud name is not configured and a cloudinary: path was given.
export function resolveImageUrl(src: string | undefined): string {
  if (!src) return "";
  if (src.startsWith("cloudinary:")) {
    return cloudinaryUrl(src.slice("cloudinary:".length));
  }
  return src;
}
