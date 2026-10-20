export type RoleIcon = "mic" | "film" | "leaf";

export type IconKey = "youtube" | "instagram" | "facebook" | "music" | "globe";

export type SiteLink = {
  id: string;
  label: string;
  handle: string;
  href: string;
  icon: IconKey;
  featured?: boolean;
  /** Optional thumbnail, e.g. "/thumbs/pen-voyage.jpg" (file lives in /public). */
  image?: string;
};

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "LANREWORLD",
  tagline: "A digital diary of life in London, and the ideas and complexities that make us human.",
  description:
    "Singer songwriter, film writer & producer, organic skin care formulator. Living in London UK.",
  roles: [
    { label: "Singer songwriter", icon: "mic" },
    { label: "Film writer & producer", icon: "film" },
    { label: "Organic skin care formulator", icon: "leaf" },
  ] satisfies { label: string; icon: RoleIcon }[],
  location: "London, UK",
  email: "hellolanreworld@gmail.com",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (productionHost ? `https://${productionHost}` : "http://localhost:3000"),

  /** Leave empty to use the YouTube channel picture. Or set e.g. "/profile.jpg" (in /public). */
  avatar: "",

  youtube: {
    handle: "lanreworld",
    /** Optional. Skips the @handle lookup when set (env var YOUTUBE_CHANNEL_ID). */
    channelId: process.env.YOUTUBE_CHANNEL_ID ?? "",
    videoCount: 5,
  },

  links: [
    {
      id: "youtube",
      label: "Watch on YouTube",
      handle: "youtube.com/@lanreworld",
      href: "https://www.youtube.com/@lanreworld",
      icon: "youtube",
      featured: true,
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@lanreworld",
      href: "https://instagram.com/lanreworld",
      icon: "instagram",
    },
    {
      id: "itunes",
      label: "Listen on iTunes",
      handle: "Pen Voyage, Chapter 1: Singing",
      href: "https://itunes.apple.com/gb/album/pen-voyage-chapter-1-singing/id466810768",
      icon: "music",
    },
    {
      id: "facebook",
      label: "Facebook",
      handle: "facebook.com/lanreworld",
      href: "https://facebook.com/lanreworld",
      icon: "facebook",
    },
    {
      id: "website",
      label: "Website",
      handle: "lanreworld.com",
      href: "https://lanreworld.com",
      icon: "globe",
    },
  ] satisfies SiteLink[],

  /** Apple Music player. Format: embed.music.apple.com/<country>/album/<slug>/<id> */
  appleMusicEmbed: "https://embed.music.apple.com/gb/album/pen-voyage-chapter-1-singing/466810768",
};
