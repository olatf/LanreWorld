import { site } from "@/lib/site";
import { getYouTubeData } from "@/lib/youtube";
import { ImageResponse } from "next/og";

export const alt = `${site.name} | Links`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { avatar } = await getYouTubeData();
  const picture = site.avatar ? new URL(site.avatar, site.url).toString() : avatar;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        gap: 64,
        padding: 80,
        color: "#f3ece4",
        backgroundColor: "#241633",
        backgroundImage:
          "radial-gradient(circle at 15% 0%, rgba(201,139,163,0.35), transparent 55%), radial-gradient(circle at 95% 20%, rgba(233,169,59,0.18), transparent 50%)",
      }}
    >
      {picture ? (
        <img
          src={picture}
          alt=""
          width={280}
          height={280}
          style={{
            borderRadius: 9999,
            border: "6px solid #e9a93b",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            width: 280,
            height: 280,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 9999,
            border: "6px solid #e9a93b",
            backgroundColor: "#33224a",
            color: "#e9a93b",
            fontSize: 140,
          }}
        >
          {site.name.charAt(0)}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 640 }}>
        <div style={{ fontSize: 96, letterSpacing: 2 }}>{site.name}</div>
        <div style={{ fontSize: 34, lineHeight: 1.3, color: "#b9a9cc" }}>{site.tagline}</div>
        <div style={{ fontSize: 30, color: "#e9a93b" }}>{new URL(site.url).host}</div>
      </div>
    </div>,
    size,
  );
}
