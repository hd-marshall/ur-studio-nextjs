// Instagram feed for the homepage gallery, sourced via Behold (behold.so).
//
// Behold connects once to the Instagram Professional account, handles the Meta
// token + auto-refresh, and exposes a public JSON feed. We fetch it server-side
// so the homepage stays fresh as new posts go up, with a local-image fallback so
// the section never breaks if the feed is unavailable.

// Behold's feed endpoint is a PUBLIC URL (Behold serves it to browsers too), so
// it is not a secret. We ship a working default so the gallery just works with no
// setup, and allow BEHOLD_FEED_URL to override it per-environment (e.g. to swap
// feeds without a code change). Whatever it resolves to is validated — https and
// pinned to the Behold host — so a misconfigured or hostile value can never point
// the server-side fetch at an arbitrary host.
const BEHOLD_HOST = "feeds.behold.so"
const DEFAULT_FEED_URL = "https://feeds.behold.so/BkaLzMvDcSvv14bStzW0"

function resolveFeedUrl(): string | null {
  const raw = process.env.BEHOLD_FEED_URL || DEFAULT_FEED_URL
  try {
    const url = new URL(raw)
    if (url.protocol !== "https:" || url.hostname !== BEHOLD_HOST) return null
    return url.toString()
  } catch {
    return null
  }
}

export type GalleryPost = {
  src: string
  permalink?: string
  alt: string
  /** True for reels/video posts. */
  isVideo?: boolean
  /** Playable .mp4 (Instagram CDN) for video posts — used for hover-to-play. */
  videoUrl?: string
}

// Offline fallback — the original hardcoded gallery images (kept in public/).
const FALLBACK_POSTS: GalleryPost[] = [
  "/images/gallery/gallery-5.webp",
  "/images/gallery/gallery-2.webp",
  "/images/gallery/gallery-4.webp",
  "/images/gallery/gallery-3.webp",
  "/images/gallery/gallery-1.webp",
  "/images/gallery/gallery-6.webp",
].map((src) => ({ src, alt: "" }))

// Shape of a Behold feed post (only the fields we use).
interface BeholdSize {
  mediaUrl?: string
}
interface BeholdPost {
  mediaType?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  mediaUrl?: string
  thumbnailUrl?: string
  permalink?: string
  caption?: string
  sizes?: {
    small?: BeholdSize
    medium?: BeholdSize
    large?: BeholdSize
    full?: BeholdSize
  }
}

function normalize(post: BeholdPost): GalleryPost | null {
  // Prefer a mid-size responsive variant; fall back to full media, and for
  // videos use the still thumbnail so it renders in a plain <img>.
  const src =
    post.sizes?.medium?.mediaUrl ||
    post.sizes?.large?.mediaUrl ||
    (post.mediaType === "VIDEO" ? post.thumbnailUrl : post.mediaUrl) ||
    post.mediaUrl ||
    post.thumbnailUrl

  if (!src) return null

  const isVideo = post.mediaType === "VIDEO"

  return {
    src,
    permalink: post.permalink,
    alt: post.caption ? post.caption.slice(0, 100) : "",
    isVideo,
    videoUrl: isVideo ? post.mediaUrl : undefined,
  }
}

export async function getInstagramPosts(limit = 6): Promise<GalleryPost[]> {
  const feedUrl = resolveFeedUrl()

  if (!feedUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[instagram] BEHOLD_FEED_URL is invalid — using fallback images.")
    }
    return FALLBACK_POSTS.slice(0, limit)
  }

  try {
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`Behold feed responded ${res.status}`)

    const data = await res.json()
    // Behold returns an object with a `posts` array; tolerate a bare array too.
    const rawPosts: BeholdPost[] = Array.isArray(data) ? data : data?.posts ?? []

    const posts = rawPosts
      .map(normalize)
      .filter((p): p is GalleryPost => p !== null)
      .slice(0, limit)

    return posts.length > 0 ? posts : FALLBACK_POSTS.slice(0, limit)
  } catch {
    return FALLBACK_POSTS.slice(0, limit)
  }
}
