import { formatDate } from "@/lib/utils";
import type { YouTubeVideo } from "@/lib/youtube-parse";
import Image from "next/image";
import Link from "next/link";

export function VideoCard({ video }: { video: YouTubeVideo }) {
  return (
    <Link
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur transition hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="relative aspect-video overflow-hidden bg-background/60">
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 200px, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </span>
      <span className="flex flex-1 flex-col gap-1 p-3">
        <span className="line-clamp-2 text-sm font-semibold leading-snug">{video.title}</span>
        <time dateTime={video.publishedAt} className="text-xs text-muted-foreground">
          {formatDate(video.publishedAt)}
        </time>
      </span>
    </Link>
  );
}
