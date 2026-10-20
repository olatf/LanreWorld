export type YouTubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  url: string;
  thumbnail: string;
};

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&#39;": "'",
};

function decodeEntities(text: string) {
  return text.replace(/&(?:amp|lt|gt|quot|apos|#39);/g, (match) => ENTITIES[match] ?? match);
}

/** Reads the latest videos from a channel's public Atom feed (newest first). */
export function parseFeed(xml: string, limit: number): YouTubeVideo[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  return entries.slice(0, limit).flatMap((entry) => {
    const id = /<yt:videoId>([\w-]{11})<\/yt:videoId>/.exec(entry)?.[1];
    const title = /<title>([\s\S]*?)<\/title>/.exec(entry)?.[1];
    const publishedAt = /<published>([^<]+)<\/published>/.exec(entry)?.[1];
    if (!id || !title || !publishedAt) return [];

    return [
      {
        id,
        title: decodeEntities(title.trim()),
        publishedAt,
        url: `https://www.youtube.com/watch?v=${id}`,
        // hqdefault is 4:3 with black bars; object-cover in a 16:9 box crops them exactly.
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      },
    ];
  });
}

const CHANNEL_ID_PATTERNS = [
  /<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/,
  /"externalId":"(UC[\w-]{22})"/,
  /itemprop="(?:channelId|identifier)" content="(UC[\w-]{22})"/,
  /"channelId":"(UC[\w-]{22})"/,
];

const AVATAR_HOST = /^(?:[\w-]+\.)*(?:googleusercontent\.com|ggpht\.com)$/;

/** Pulls the channel ID and profile picture URL out of a channel page's HTML. */
export function parseChannelPage(html: string): { id: string | null; avatar: string | null } {
  let id: string | null = null;
  for (const pattern of CHANNEL_ID_PATTERNS) {
    const match = pattern.exec(html)?.[1];
    if (match) {
      id = match;
      break;
    }
  }

  let avatar: string | null = null;
  const og = /<meta property="og:image" content="([^"]+)"/.exec(html)?.[1];
  if (og) {
    try {
      const url = new URL(decodeEntities(og));
      if (url.protocol === "https:" && AVATAR_HOST.test(url.hostname)) avatar = url.toString();
    } catch {
      avatar = null;
    }
  }

  return { id, avatar };
}
