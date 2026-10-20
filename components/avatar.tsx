import Image from "next/image";

export function Avatar({ src, name }: { src?: string | null; name: string }) {
  return (
    <div className="relative size-32 shrink-0 overflow-hidden rounded-full border-2 border-primary shadow-[0_0_0_8px_rgb(233_169_59/0.12)] md:size-44">
      {src ? (
        <Image
          src={src}
          alt={`${name} profile picture`}
          fill
          sizes="(min-width: 768px) 176px, 128px"
          priority
          className="object-cover"
        />
      ) : (
        <span className="grid size-full place-items-center bg-card font-serif text-6xl font-bold text-primary">
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}
