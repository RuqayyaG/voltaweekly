export default function AboutPage() {
  return (
    <main style={{ maxWidth: "680px", margin: "0 auto", padding: "3rem 2rem", fontFamily: "sans-serif", color: "#1a1a1a", minHeight: "100vh" }}>
      <a href="/" style={{ fontSize: "12px", color: "#6b4fa0", textDecoration: "none", display: "inline-block", marginBottom: "2rem" }}>
        ← Back to FaultLines
      </a>
      <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#6b4fa0", fontWeight: 600, marginBottom: "0.75rem" }}>
        About
      </div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: 500, lineHeight: 1.2, marginBottom: "1.5rem", letterSpacing: "-0.5px" }}>
        Ruqayya Ghuwel
      </h1>
      <div style={{ fontSize: "16px", lineHeight: 1.8, color: "#333" }}>
        <p style={{ marginBottom: "1.5rem" }}>
          FaultLines is where I write about geopolitics and markets — specifically the places where they collide. Political decisions move capital. Capital shapes political decisions. Most coverage treats these as separate beats. They aren't.
        </p>
        <p style={{ marginBottom: "1.5rem" }}>
          My background is in economics and politics. The further I got into both, the more obvious it became that you can't understand one without the other. A central bank decision is never just a monetary event. A trade war is never just about trade. That's what this site is about.
        </p>
        <p style={{ marginBottom: "1.5rem" }}>
          I write the Sunday dispatch every week — one email covering the political developments that actually moved markets, and the ones that should have. You can subscribe below.
        </p>
      </div>
      <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #ede9f5" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 500, marginBottom: "0.75rem" }}>Get the Sunday dispatch</div>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
          const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          if (res.ok) {
            alert("You're in. See you Sunday.");
          } else {
            alert("Something went wrong. Try again.");
          }
        }} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <input name="email" type="email" placeholder="your@email.com" style={{ padding: "8px 14px", border: "1px solid #d0cce8", borderRadius: "3px", fontSize: "13px", background: "#fff", color: "#1a1a1a", flex: "1", minWidth: "200px" }} />
          <button type="submit" style={{ background: "#6b4fa0", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "3px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
            Subscribe
          </button>
        </form>
      </div>
    </main>
  );
}