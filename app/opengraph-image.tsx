import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// ビルド時に一度だけ生成（静的書き出しにも対応）
export const dynamic = "force-static";

export const alt = "出雲香 IZUMOKOU — 神話の香りを纏う";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEXT = `出雲香${site.tagline}IZUMOKOU`;

/** OG 画像に必要な文字だけを Google Fonts から取得（失敗時は英字のみで生成） */
async function loadFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(TEXT)}`,
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [mincho, serif] = await Promise.all([
    loadFont("Shippori+Mincho", 400),
    loadFont("Cormorant+Garamond", 300),
  ]);
  const fonts = [
    ...(mincho ? [{ name: "Mincho", data: mincho, weight: 400 as const }] : []),
    ...(serif ? [{ name: "Serif", data: serif, weight: 300 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 70% 20% at 50% 62%, rgba(214,196,168,0.28), transparent 70%), linear-gradient(180deg, #090d14 0%, #16202e 58%, #0c141d 60%, #06090e 100%)",
          color: "#ebe9e3",
        }}
      >
        <div style={{ fontFamily: "Serif", fontSize: 26, letterSpacing: 18, opacity: 0.8 }}>IZUMOKOU</div>
        {mincho && (
          <div style={{ fontFamily: "Mincho", fontSize: 120, letterSpacing: 36, marginTop: 24 }}>出雲香</div>
        )}
        {mincho && (
          <div style={{ fontFamily: "Mincho", fontSize: 28, letterSpacing: 14, marginTop: 36, opacity: 0.8 }}>
            {site.tagline}
          </div>
        )}
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
