"use client";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { YouTubeVideo } from "@/lib/youtube-parse";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function VideoEmbed({ video }: { video: YouTubeVideo }) {
  const [active, setActive] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-video">
        {active ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play ${video.title}`}
            className="group absolute inset-0 size-full focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ring"
          >
            <Image
              src={video.thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 580px, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 grid place-items-center bg-black/30">
              <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                <Play className="size-6 fill-current" aria-hidden="true" />
              </span>
            </span>
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-0.5 px-4 py-3">
        <p className="font-semibold leading-snug">{video.title}</p>
        <time dateTime={video.publishedAt} className="text-sm text-muted-foreground">
          {formatDate(video.publishedAt)}
        </time>
      </div>
    </div>
  );
}
