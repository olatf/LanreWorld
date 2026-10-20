import { expect, test } from "bun:test";
import { parseChannelPage, parseFeed } from "./youtube-parse";

const feed = `<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015">
  <entry>
    <yt:videoId>abcdefghijk</yt:videoId>
    <title>Tea &amp; &quot;Time&quot;</title>
    <published>2026-03-12T10:00:00+00:00</published>
  </entry>
  <entry>
    <yt:videoId>lmnopqrstuv</yt:videoId>
    <title>Second</title>
    <published>2026-03-01T10:00:00+00:00</published>
  </entry>
</feed>`;

test("parseFeed reads videos newest first and decodes titles", () => {
  const videos = parseFeed(feed, 5);
  expect(videos).toHaveLength(2);
  expect(videos[0]?.id).toBe("abcdefghijk");
  expect(videos[0]?.title).toBe('Tea & "Time"');
  expect(videos[0]?.thumbnail).toBe("https://i.ytimg.com/vi/abcdefghijk/hqdefault.jpg");
});

test("parseFeed respects the limit and tolerates empty input", () => {
  expect(parseFeed(feed, 1)).toHaveLength(1);
  expect(parseFeed("", 5)).toEqual([]);
});

test("parseChannelPage finds the channel ID and a YouTube-hosted avatar", () => {
  const html = `<link rel="canonical" href="https://www.youtube.com/channel/UCabcdefghijklmnopqrstuv">
    <meta property="og:image" content="https://yt3.googleusercontent.com/abc=s900-c-k">`;
  expect(parseChannelPage(html)).toEqual({
    id: "UCabcdefghijklmnopqrstuv",
    avatar: "https://yt3.googleusercontent.com/abc=s900-c-k",
  });
});

test("parseChannelPage rejects avatars from other hosts", () => {
  const html = '<meta property="og:image" content="https://evil.example.com/a.jpg">';
  expect(parseChannelPage(html).avatar).toBeNull();
});
