import { REVALIDATE_SECONDS } from "@/config/constant";
import { site } from "@/lib/site";
import { type YouTubeVideo, parseChannelPage, parseFeed } from "@/lib/youtube-parse";
import consola from "consola";

export type { YouTubeVideo };

export type YouTubeData = {
  avatar: string | null;
  videos: YouTubeVideo[];
};

const HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  "accept-language": "en-GB,en;q=0.9",
  cookie: "CONSENT=YES+1; SOCS=CAI",
};

async function fetchText(url: string) {
  const response = await fetch(url, {
    headers: HEADERS,
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`${url} responded with ${response.status}`);
  return response.text();
}

async function getChannel() {
  try {
    return parseChannelPage(await fetchText(`https://www.youtube.com/@${site.youtube.handle}`));
  } catch (error) {
    consola.error("YouTube channel page lookup failed:", error);
    return { id: null, avatar: null };
  }
}

/**
 * Latest uploads and the channel profile picture. Cached for an hour by Next.js,
 * so new videos appear without a redeploy. Never throws: the page falls back
 * to the monogram avatar and hides the video section if YouTube is unreachable.
 */
export async function getYouTubeData(): Promise<YouTubeData> {
  const channel = await getChannel();
  const channelId = site.youtube.channelId || channel.id;
  if (!channelId) return { avatar: channel.avatar, videos: [] };

  try {
    const xml = await fetchText(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    return { avatar: channel.avatar, videos: parseFeed(xml, site.youtube.videoCount) };
  } catch (error) {
    consola.error("YouTube feed failed:", error);
    return { avatar: channel.avatar, videos: [] };
  }
}
