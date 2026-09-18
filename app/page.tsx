"use client";

import { useEffect, useState } from "react";

const FALLBACK = [
  { name: "S&P 500", val: "5,892", chg: "+0.4%", up: true },
  { name: "FTSE 100", val: "8,441", chg: "-0.2%", up: false },
  { name: "EUR/USD", val: "1.0842", chg: "+0.3%", up: true },
  { name: "GBP/USD", val: "1.2731", chg: "-0.1%", up: false },
  { name: "Brent Crude", val: "$78.4", chg: "+1.2%", up: true },
  { name: "Gold", val: "$3,312", chg: "+0.6%", up: true },
  { name: "US 10Y", val: "4.38%", chg: "+0.06", up: true },
  { name: "VIX", val: "18.2", chg: "-0.8", up: false },
  { name: "DXY", val: "101.2", chg: "-0.8%", up: false },
];

const SYMBOLS = [
  { symbol: "AAPL", name: "Apple", prefix: "$" },
  { symbol: "MSFT", name: "Microsoft", prefix: "$" },
  { symbol: "EUR/USD", name: "EUR/USD", prefix: "" },
  { symbol: "GBP/USD", name: "GBP/USD", prefix: "" },
  { symbol: "XAU/USD", name: "Gold", prefix: "$" },
  { symbol: "BTC/USD", name: "Bitcoin", prefix: "$" },
  { symbol: "NVDA", name: "Nvidia", prefix: "$" },
];
export default function Home() {
  const [tickerItems, setTickerItems] = useState(FALLBACK); const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
const apiKey = process.env.NEXT_PUBLIC_TWELVE_DATA_KEY;
console.log("API key present:", !!apiKey);
if (!apiKey) return;    const symbols = SYMBOLS.map((s) => s.symbol).join(",");
fetch(`https://api.twelvedata.com/quote?symbol=${symbols}&apikey=${apiKey}`)      .then((r) => r.json())
.then((data) => {
  console.log("API response:", JSON.stringify(data));        const updated = SYMBOLS.map((s) => {
          const quote = data[s.symbol];
          if (!quote || quote.status === "error") return null;
          const price = parseFloat(quote.close);
          const change = parseFloat(quote.percent_change);
          const up = change >= 0;
          return {
            name: s.name,
            val: `${s.prefix}${price.toLocaleString("en-GB", { maximumFractionDigits: 2 })}`,
            chg: `${up ? "+" : ""}${change.toFixed(2)}%`,
            up,
          };
        }).filter(Boolean) as typeof FALLBACK;
        if (updated.length > 0) setTickerItems(updated);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "#fafafa", color: "#1a1a1a", fontFamily: "sans-serif" }}>

      {/* Ticker */}
      <div style={{ background: "#f0f0f7", borderBottom: "1px solid #e0ddf0", padding: "7px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "2rem", whiteSpace: "nowrap", width: "max-content", animation: "scroll 30s linear infinite" }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "inline-flex", gap: "2rem" }}>
              {tickerItems.map((item) => (
                <span key={item.name} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px" }}>
                  <span style={{ color: "#1a1a1a", fontWeight: 500 }}>{item.name}</span>
                  <span style={{ color: "#888" }}>{item.val}</span>
                  <span style={{ color: item.up ? "#2d7a4f" : "#a33030" }}>{item.chg}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

{/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e8e4f0", padding: "0 2rem", height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", letterSpacing: "-0.5px", fontWeight: 500 }}>
          Volta<span style={{ color: "#6b4fa0" }}>Weekly</span>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: "1.5rem" }}>
          {[
            { label: "Geopolitics", href: "/category/geopolitics" },
            { label: "Macro", href: "/category/macro" },
            { label: "Markets", href: "/category/markets" },
            { label: "Policy", href: "/category/policy" },
            { label: "Data", href: "/category/data" },
            { label: "About", href: "/about" },
          ].map((item) => (
            <a key={item.label} href={item.href} style={{ fontSize: "11px", color: "#666", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer" }} onMouseEnter={e => (e.currentTarget.style.color = "#6b4fa0")} onMouseLeave={e => (e.currentTarget.style.color = "#666")}>
              {item.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
<button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", flexDirection: "column", gap: "5px" }}>            <span style={{ display: "block", width: "22px", height: "2px", background: "#1a1a1a", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: "#1a1a1a", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: "#1a1a1a", borderRadius: "2px" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e4f0", padding: "1rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { label: "Geopolitics", href: "/category/geopolitics" },
            { label: "Macro", href: "/category/macro" },
            { label: "Markets", href: "/category/markets" },
            { label: "Policy", href: "/category/policy" },
            { label: "Data", href: "/category/data" },
            { label: "About", href: "/about" },
          ].map((item) => (
            <a key={item.label} href={item.href} style={{ fontSize: "14px", color: "#1a1a1a", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {item.label}
            </a>
          ))}
        </div>
      )}

{/* Hero */}
{/* Hero */}
      <div style={{ borderBottom: "1px solid #ede9f5", padding: "2.5rem 1.5rem 2rem", background: "#fff" }}>
        <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#6b4fa0", fontWeight: 600, marginBottom: "1rem" }}>
          Featured analysis
        </div>
        <div className="hero-layout">
          <div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 500, lineHeight: 1.15, color: "#1a1a1a", marginBottom: "1rem", letterSpacing: "-0.5px" }}>
              Saudi Arabia's bypass route just got hit.{" "}
              <em style={{ fontStyle: "italic", color: "#2d7a4f" }}>There is no backup to the backup.</em>
            </h1>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.75, marginBottom: "1.25rem" }}>
              The East-West pipeline was the global oil market's last contingency plan while Hormuz stayed closed. On September 10, drones launched from Iraq shut it down. Brent is above $107. There is no alternative export route left.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "#888", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <span style={{ background: "#ede9f5", color: "#5a3d8a", padding: "2px 9px", borderRadius: "99px", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Geopolitics</span>
              <span style={{ background: "#f0edf8", color: "#6b4fa0", padding: "2px 9px", borderRadius: "99px", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Markets</span>
              <span>September 13, 2026</span>
              <span>2 min read</span>
            </div>
            <a href="/articles/saudi-pipeline-attack-september-2026" style={{ fontSize: "13px", color: "#2d7a4f", textDecoration: "none", borderBottom: "1px solid #2d7a4f", paddingBottom: "1px", cursor: "pointer", fontWeight: 500 }}>
              Read analysis →
            </a>
          </div>

          <div>
            <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: "0.75rem", fontWeight: 500 }}>Market pulse</div>
            {[
              { name: "Brent crude", val: "$107.20", chg: "+2.71%", up: true },
              { name: "US 10Y yield", val: "4.98%", chg: "+0.20", up: true },
              { name: "Gold ($/oz)", val: "$4,351", chg: "+1.4%", up: true },
            ].map((item) => (
              <div key={item.name} style={{ background: "#f7f5fc", border: "1px solid #e0ddf0", borderRadius: "6px", padding: "0.75rem 1rem", marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "#1a1a1a" }}>{item.name}</span>
                  <span style={{ fontSize: "11px", color: item.up ? "#2d7a4f" : "#a33030" }}>{item.chg}</span>
                </div>
                <div style={{ fontSize: "16px", fontWeight: 500, color: "#1a1a1a" }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      {/* Risk dashboard */}
{/* Risk dashboard */}
      <div style={{ background: "#f4f2fa", borderTop: "1px solid #e0ddf0", borderBottom: "1px solid #e0ddf0", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
          <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", fontWeight: 500 }}>Geopolitical risk dashboard</span>
          <span style={{ fontSize: "11px", color: "#aaa", cursor: "pointer" }}>Full dashboard →</span>
        </div>
        <div className="dash-grid">
          {[
            { label: "Global risk index", val: 91, sub: "Critical · pipeline shut, Fed hike imminent", color: "#a33030" },
            { label: "US–China tension", val: 76, sub: "High · trade grinding, no new flashpoint", color: "#c0601a" },
            { label: "Middle East volatility", val: 98, sub: "Critical · Hormuz closed, pipeline shut", color: "#a33030" },
            { label: "EUR political risk", val: 52, sub: "Elevated · energy inflation accelerating", color: "#b09820" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#fff", border: "1px solid #e8e4f0", borderRadius: "6px", padding: "1rem" }}>
              <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.07em", color: "#888", marginBottom: "6px", fontWeight: 500 }}>{item.label}</div>
              <div style={{ fontSize: "24px", fontWeight: 500, lineHeight: 1, marginBottom: "4px", color: item.color }}>
                {item.val}<span style={{ fontSize: "14px", color: "#ccc" }}>/100</span>
              </div>
              <div style={{ fontSize: "11px", color: "#888", marginBottom: "8px" }}>{item.sub}</div>
              <div style={{ height: "4px", borderRadius: "2px", background: "#e8e4f0" }}>
                <div style={{ height: "100%", borderRadius: "2px", background: item.color, width: `${item.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div style={{ padding: "2rem", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "2px solid #ede9f5", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Latest analysis</span>
          <a href="/articles" style={{ fontSize: "11px", color: "#aaa", cursor: "pointer", textDecoration: "none" }}>All articles →</a>
        </div>
        <div className="articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "2rem" }}>          {[
 {
    tag: "Geopolitics", tagBg: "#e3f2ea", tagColor: "#1e5c38",
    slug: "/articles/saudi-pipeline-attack-september-2026",
    title: "Saudi Arabia's bypass route just got hit. There is no backup to the backup.",
    excerpt: "The East-West pipeline was Saudi Arabia's main workaround while Hormuz stayed closed. On September 10, drones launched from Iraq hit its pumping stations and shut it down. Brent is now above $107. The oil market has lost its last contingency plan.",
    date: "September 13, 2026", read: "2 min read",
  },
  {
    tag: "Macro", tagBg: "#e3f2ea", tagColor: "#1e5c38",
    slug: "/articles/fed-hikes-september-13-2026",
    title: "The Fed just hiked into the worst oil shock in history. Here is why that was probably right.",
    excerpt: "The Federal Reserve raised rates to 3.75 to 4.00% today. Brent is above $107. The labour market is softening. Hiking into a supply shock is normally bad monetary policy. This time the calculus is different.",
    date: "September 13, 2026", read: "2 min read",
  },
  {
    tag: "Macro", tagBg: "#e3f2ea", tagColor: "#1e5c38",
    slug: "/articles/fed-september-hike-iran-war-september-2026",
    title: "The Fed is about to hike into a war it didn't start and can't control",
    excerpt: "The September FOMC meeting is live. Markets are split roughly 50/50 on whether rates go up. The inflation keeping the Fed hawkish isn't coming from domestic demand. It's coming from a war in the Persian Gulf.",
    date: "September 6, 2026", read: "2 min read",
  },
].map((a) => (
  <a key={a.title} href={a.slug} style={{ borderTop: "3px solid #ede9f5", paddingTop: "1rem", cursor: "pointer", textDecoration: "none", display: "block" }}>
    <span style={{ background: a.tagBg, color: a.tagColor, padding: "2px 9px", borderRadius: "99px", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
      {a.tag}
    </span>
    <h2 style={{ fontFamily: "Georgia, serif", fontSize: "17px", fontWeight: 500, lineHeight: 1.3, color: "#1a1a1a", margin: "0.5rem 0" }}>
      {a.title}
    </h2>
    <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.65, marginBottom: "0.75rem" }}>{a.excerpt}</p>
    <div style={{ fontSize: "11px", color: "#aaa" }}>{a.date} · {a.read}</div>
  </a>
))}
            
        </div>
      </div>

      {/* Newsletter */}
{/* Newsletter */}
      <div className="newsletter" style={{ padding: "2.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #e8e4f0", gap: "2rem", background: "linear-gradient(135deg, #f4f2fa 0%, #edf5f0 100%)", flexWrap: "wrap" }}>        <div>         
         <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 500, marginBottom: "0.5rem" }}>Sunday dispatch</div>
          <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.6, maxWidth: "380px" }}>
            One email a week. The political developments that actually moved markets, and the ones that should have but didn&apos;t. Published on Sundays, read with coffee.
          </p>
        </div>
<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  <form onSubmit={async (e) => {
  e.preventDefault();
  const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (res.ok) {
    alert("You're in. See you on Sunday.");
  } else {
    alert("Something went wrong. Try again.");
  }
}} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  <input name="email" type="email" placeholder="your@email.com" style={{ padding: "8px 14px", border: "1px solid #d0cce8", borderRadius: "3px", fontSize: "13px", background: "#fff", color: "#1a1a1a", flex: "1", minWidth: "200px" }} />
  <button type="submit" style={{ background: "#6b4fa0", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "3px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
    Subscribe
  </button>
</form>
</div>      </div>

     <style>{`
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .hero-layout { display: grid; grid-template-columns: 1fr 340px; gap: 3rem; align-items: start; }
  .articles-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; }
  .dash-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
  .pulse-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .hamburger { display: none; }
  @media (max-width: 768px) {
    .hero-layout { grid-template-columns: 1fr !important; }
    .dash-grid { grid-template-columns: 1fr 1fr !important; }
    .articles-grid { grid-template-columns: 1fr !important; }
    .pulse-grid { grid-template-columns: 1fr !important; }
    .desktop-nav { display: none !important; }
    .hamburger { display: flex !important; }
  }
`}</style>

    </main>
  );
}