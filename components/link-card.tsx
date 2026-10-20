import type { IconKey, SiteLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Facebook,
  Globe,
  Instagram,
  type LucideIcon,
  Music2,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const icons: Record<IconKey, LucideIcon> = {
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
  music: Music2,
  globe: Globe,
};

/** A bento tile. The featured link is large and spans two rows on wider screens. */
export function LinkCard({ link }: { link: SiteLink }) {
  const Icon = icons[link.icon];
  const featured = link.featured;

  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex h-full min-h-36 flex-col justify-between gap-6 rounded-2xl border p-4 backdrop-blur transition",
        "motion-safe:hover:-translate-y-0.5 hover:border-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        featured
          ? "border-primary/60 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent p-6"
          : "border-border bg-card/70",
      )}
    >
      <span className="flex items-start justify-between">
        <span
          className={cn(
            "relative grid place-items-center overflow-hidden rounded-xl bg-background/60 text-primary",
            featured ? "size-16" : "size-12",
          )}
        >
          {link.image ? (
            <Image src={link.image} alt="" fill sizes="64px" className="object-cover" />
          ) : (
            <Icon className={featured ? "size-8" : "size-6"} aria-hidden="true" />
          )}
        </span>
        <ArrowUpRight
          className="size-5 text-muted-foreground transition group-hover:text-primary"
          aria-hidden="true"
        />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className={cn("font-semibold", featured && "font-serif text-3xl")}>{link.label}</span>
        <span className="truncate text-sm text-muted-foreground">{link.handle}</span>
      </span>
    </Link>
  );
}
