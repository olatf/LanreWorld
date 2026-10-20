import { Avatar } from "@/components/avatar";
import { LinkCard } from "@/components/link-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoCard } from "@/components/video-card";
import { VideoEmbed } from "@/components/video-embed";
import { type RoleIcon, site } from "@/lib/site";
import { getYouTubeData } from "@/lib/youtube";
import { Clapperboard, Leaf, type LucideIcon, Mail, MapPin, Mic } from "lucide-react";
import Link from "next/link";

const roleIcons: Record<RoleIcon, LucideIcon> = {
  mic: Mic,
  film: Clapperboard,
  leaf: Leaf,
};

const channelUrl = `https://www.youtube.com/@${site.youtube.handle}`;

export default async function Home() {
  const youtube = await getYouTubeData();
  const [featured, ...recent] = youtube.videos;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 pb-16 pt-[max(2.5rem,env(safe-area-inset-top))] md:pt-16">
      <header className="grid items-center gap-6 text-center md:grid-cols-[auto_1fr] md:gap-10 md:text-left">
        <div className="justify-self-center">
          <Avatar src={site.avatar || youtube.avatar} name={site.name} />
        </div>
        <div className="grid gap-4">
          <h1 className="font-serif text-5xl font-bold tracking-wide sm:text-6xl md:text-7xl">
            {site.name}
          </h1>
          <p className="mx-auto max-w-xl text-lg md:mx-0 md:text-xl">{site.tagline}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Button asChild>
              <Link
                href={`${channelUrl}?sub_confirmation=1`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe on YouTube
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#listen">Listen</Link>
            </Button>
            <span className="inline-flex items-center gap-1.5 text-sm text-accent">
              <MapPin className="size-4" aria-hidden="true" />
              {site.location}
            </span>
          </div>
        </div>
      </header>

      <section aria-label="Links" className="mt-12">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {site.links.map((link) => (
            <li key={link.id} className={link.featured ? "col-span-2 md:row-span-2" : undefined}>
              <LinkCard link={link} />
            </li>
          ))}
        </ul>
      </section>

      {featured && (
        <section aria-labelledby="watch" className="mt-16">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 id="watch" className="font-serif text-3xl font-bold">
              Latest videos
            </h2>
            <Button asChild variant="outline" size="sm">
              <Link href={`${channelUrl}/videos`} target="_blank" rel="noopener noreferrer">
                All videos
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
            <VideoEmbed video={featured} />
            {recent.length > 0 && (
              <ul className="grid auto-rows-fr grid-cols-2 gap-3">
                {recent.map((video) => (
                  <li key={video.id}>
                    <VideoCard video={video} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <section aria-labelledby="listen-title" id="listen" className="scroll-mt-6">
          <h2 id="listen-title" className="sr-only">
            Listen
          </h2>
          <Card>
            <CardContent>
              <iframe
                title="Pen Voyage, Chapter 1: Singing on Apple Music"
                src={site.appleMusicEmbed}
                height="450"
                allow="autoplay *; encrypted-media *; fullscreen *"
                loading="lazy"
                className="w-full rounded-xl border-0 bg-transparent"
              />
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-6">
          <Card>
            <CardContent className="grid gap-4 p-6">
              <h2 className="font-serif text-2xl font-bold">What I do</h2>
              <ul className="grid gap-3">
                {site.roles.map((role) => {
                  const Icon = roleIcons[role.icon];
                  return (
                    <li key={role.label} className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-background/60 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-medium">{role.label}</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-primary/40 bg-gradient-to-br from-primary/15 to-transparent">
            <CardContent className="grid gap-4 p-6">
              <h2 className="font-serif text-2xl font-bold">Get in touch</h2>
              <p className="text-muted-foreground">
                For collaborations, projects and general enquiries.
              </p>
              <Button asChild className="justify-self-start">
                <Link href={`mailto:${site.email}`}>
                  <Mail className="size-4" aria-hidden="true" />
                  {site.email}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
