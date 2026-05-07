export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "64px 24px",
          textAlign: "center",
          background: "#ffffff",
          color: "#111111",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>
          404
        </h1>
        <p style={{ marginTop: 12, color: "#6b6b6b" }}>Page not found.</p>
        <p style={{ marginTop: 24 }}>
          <a
            href="/"
            style={{
              borderBottom: "1px solid #111",
              paddingBottom: 2,
              color: "#111",
              textDecoration: "none",
            }}
          >
            Return home →
          </a>
        </p>
      </body>
    </html>
  );
}
