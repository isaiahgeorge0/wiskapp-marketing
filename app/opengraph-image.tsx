import { ImageResponse } from "next/og";

export const alt = "WISK: Your business. Centralised.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#141b27",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "0.2em",
          }}
        >
          <span style={{ color: "#c3ff32" }}>W</span>
          <span style={{ color: "#aca0ff" }}>I</span>
          <span style={{ color: "#016c81" }}>S</span>
          <span style={{ color: "#fea9e0" }}>K</span>
        </div>
        <p
          style={{
            marginTop: 32,
            fontSize: 36,
            color: "#94A3B8",
            textAlign: "center",
          }}
        >
          Your business. Centralised.
        </p>
      </div>
    ),
    { ...size },
  );
}
