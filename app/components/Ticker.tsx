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
  { symbol: "SPX", name: "S&P 500", prefix: "" },
  { symbol: "FTSE", name: "FTSE 100", prefix: "" },
  { symbol: "EUR/USD", name: "EUR/USD", prefix: "" },
  { symbol: "GBP/USD", name: "GBP/USD", prefix: "" },
  { symbol: "XBR/USD", name: "Brent Crude", prefix: "$" },
  { symbol: "XAU/USD", name: "Gold", prefix: "$" },
  { symbol: "US10Y", name: "US 10Y", prefix: "" },
  { symbol: "VIX", name: "VIX", prefix: "" },
  { symbol: "DXY", name: "DXY", prefix: "" },
];

export default function Ticker() {
  const [items, setItems] = useState(FALLBACK);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_TWELVE_DATA_KEY;
    if (!apiKey) return;

    const symbols = SYMBOLS.map((s) => s.symbol).join(",");

    fetch(`https://api.twelvedata.com/quote?symbol=${symbols}&apikey=${apiKey}`)
      .then((r) => r.json())
      .then((data) => {
        const updated = SYMBOLS.map((s) => {
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

        if (updated.length > 0) setItems(updated);
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ background: "#f0f0f7", borderBottom: "1px solid #e0ddf0", padding: "7px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: "2rem", whiteSpace: "nowrap", width: "max-content", animation: "scroll 30s linear infinite" }}>
        {[...Array(2)].map((_, i) => (
          <span key={i} style={{ display: "inline-flex", gap: "2rem" }}>
            {items.map((item) => (
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
  );
}