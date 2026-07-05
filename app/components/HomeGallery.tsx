import HomeGalleryClient from "./HomeGalleryClient"
import { getInstagramPosts } from "@/lib/instagram"

// Server component: fetches Instagram posts (via Behold) and hands them to the
// client gallery. Falls back to local images if the feed is unavailable.
export default async function HomeGallery() {
  const posts = await getInstagramPosts(6)
  return <HomeGalleryClient posts={posts} />
}
