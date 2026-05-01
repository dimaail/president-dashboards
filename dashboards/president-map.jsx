// president-map.jsx — geographically accurate Uganda regional map
// Paths derived from geoBoundaries-UGA-ADM1 data, simplified + projected to 200x220 viewBox.
// Northern region split into West Nile / Northern / Karamoja for PDM sub-regional reporting.

const UGANDA_REGIONS_PATH = [
  { id: "westnile", name: "West Nile", lx: 55, ly: 52,
    d: "M72.7,23.4 L60.6,17.4 L53.3,21.1 L48.7,28.7 L52.0,28.5 L51.8,32.6 L45.7,45.8 L50.1,53.2 L45.1,70.0 L50.6,73.4 L54.3,70.8 L64.1,79.3 L70.7,72.3 L71.2,66.4 L71.4,72.4 L67.0,76.6 L77.4,76.2 L84.1,71.9 L95.4,77.5 L99.5,76.3 L102.4,91.4 L93.9,96.0 L93.5,99.4 L100.3,99.0 L112.6,107.5 L125.2,106.0 L124.1,99.7 L130.2,91.6 L142.5,81.1 L145.4,72.3 L152.5,70.1 L169.7,81.4 L170.4,102.8 L184.4,102.2 L190.5,110.4 L197.9,98.9 L196.6,68.0 L178.6,40.9 L176.2,29.0 L178.9,22.2 L168.3,18.5 L169.9,14.1 L165.3,14.9 L167.0,11.0 L161.7,0.6 L144.5,19.1 L132.6,18.0 L127.1,13.6 L105.1,19.3 L97.2,24.9 L97.3,28.4 L88.6,25.9 L83.3,16.3 L72.7,23.4 Z" },
];

const UGANDA_REGIONS_PATH2 = [
  { id: "westnile", name: "West Nile", lx: 55, ly: 52,
    d: "M72.7,23.4 L60.6,17.4 L53.3,21.1 L48.7,28.7 L52.0,28.5 L51.8,32.6 L45.7,45.8 L50.1,53.2 L45.1,70.0 L50.6,73.4 L54.3,70.8 L64.1,79.3 L70.7,72.3 L71.2,66.4 L71.4,72.4 L67.0,76.6 Z" },
  { id: "northern", name: "Northern", lx: 112, ly: 60,
    d: "M72.7,23.4 L83.3,16.3 L88.6,25.9 L97.3,28.4 L97.2,24.9 L105.1,19.3 L127.1,13.6 L132.6,18.0 L144.5,19.1 L161.7,0.6 L152.5,70.1 L145.4,72.3 L142.5,81.1 L130.2,91.6 L124.1,99.7 L125.2,106.0 L112.6,107.5 L100.3,99.0 L93.5,99.4 L93.9,96.0 L102.4,91.4 L99.5,76.3 L95.4,77.5 L84.1,71.9 L77.4,76.2 L67.0,76.6 Z" },
  { id: "karamoja", name: "Karamoja", lx: 180, ly: 63,
    d: "M161.7,0.6 L167.0,11.0 L165.3,14.9 L169.9,14.1 L168.3,18.5 L178.9,22.2 L176.2,29.0 L178.6,40.9 L196.6,68.0 L197.9,98.9 L190.5,110.4 L184.4,102.2 L170.4,102.8 L169.7,81.4 L152.5,70.1 Z" },
  { id: "western", name: "Western", lx: 30, ly: 152,
    d: "M67.0,76.6 L69.0,89.0 L64.8,97.2 L52.4,103.6 L39.7,123.5 L35.9,123.0 L35.9,116.4 L31.0,116.6 L26.6,119.2 L23.6,128.7 L17.1,131.4 L17.3,142.8 L7.8,159.8 L8.4,165.6 L14.9,168.4 L5.6,183.3 L3.3,215.7 L11.7,212.7 L15.4,219.3 L24.1,214.1 L30.7,203.3 L63.8,200.9 L57.3,187.9 L59.5,179.4 L54.5,155.2 L59.1,149.6 L59.2,143.1 L63.0,142.3 L61.8,138.3 L64.4,134.2 L67.8,135.4 L73.0,123.7 L64.6,116.2 L73.2,110.4 L84.2,110.4 L103.2,87.9 L100.2,76.8 L95.4,77.5 L87.1,72.0 L67.0,76.6 Z" },
  { id: "central", name: "Central", lx: 90, ly: 148,
    d: "M93.5,99.4 L84.0,110.5 L73.2,110.4 L64.6,116.2 L73.0,123.7 L67.8,135.4 L64.4,134.2 L61.8,138.3 L63.0,142.3 L59.2,143.1 L59.1,149.6 L54.5,155.2 L59.5,179.4 L57.3,187.9 L63.8,200.9 L82.4,200.8 L79.2,193.5 L84.4,181.6 L91.7,175.0 L88.8,169.3 L86.7,172.6 L87.4,167.7 L93.1,166.0 L90.9,164.2 L97.4,165.5 L98.1,160.9 L101.2,162.6 L98.5,160.5 L103.7,162.9 L106.4,158.0 L105.9,161.9 L110.9,161.0 L114.0,151.1 L113.6,156.2 L117.0,155.9 L113.9,159.6 L121.6,155.0 L122.4,159.9 L124.9,159.5 L136.0,148.1 L127.9,139.7 L119.6,106.1 L112.6,107.5 L100.3,99.0 L93.5,99.4 Z" },
  { id: "eastern", name: "Eastern", lx: 162, ly: 125,
    d: "M119.6,106.1 L127.9,139.7 L133.2,146.7 L140.6,144.2 L137.2,148.8 L143.7,148.9 L144.6,152.1 L140.6,151.7 L144.9,156.2 L148.8,154.1 L147.7,150.2 L153.9,150.6 L150.9,152.7 L152.0,155.6 L155.3,153.9 L155.4,157.3 L162.3,153.5 L167.1,140.3 L177.1,131.7 L181.0,120.4 L192.1,114.0 L184.4,102.2 L170.4,102.8 L169.7,81.4 L152.5,70.1 L145.4,72.3 L142.5,81.1 L130.2,91.6 L124.1,99.7 L125.2,106.0 L119.6,106.1 Z" },
];

const LAKE_VICTORIA = "M63.8,200.9 L82.4,200.8 L91.7,175.0 L97.4,165.5 L110.9,161.0 L121.6,155.0 L136.0,148.1 L133.2,146.7 L127.9,139.7 L136.0,148.1 L124.9,159.5 L122.4,159.9 L121.6,155.0 L113.9,159.6 L117.0,155.9 L113.6,156.2 L114.0,151.1 L110.9,161.0 L105.9,161.9 L106.4,158.0 L103.7,162.9 L98.5,160.5 L101.2,162.6 L98.1,160.9 L97.4,165.5 L93.1,166.0 L87.4,167.7 L86.7,172.6 L88.8,169.3 L91.7,175.0 L84.4,181.6 L79.2,193.5 L82.4,200.8 L63.8,200.9 L30.7,203.3 L15.4,219.3 L155.4,219.3 L162.3,153.5 L155.4,157.3 L155.3,153.9 L152.0,155.6 L150.9,152.7 L153.9,150.6 L147.7,150.2 L148.8,154.1 L144.9,156.2 L140.6,151.7 L144.6,152.1 L143.7,148.9 L137.2,148.8 L140.6,144.2 L133.2,146.7 Z";

const LAKE_ALBERT = "M5.0,102.0 L15.0,96.0 L20.0,114.0 L8.0,118.0 Z";

const rateColor = (rate) => {
  if (rate >= 0.8) return "#1A6B3C";
  if (rate >= 0.6) return "#FF7A00";
  return "#C92028";
};

const activityColor = (a) => {
  const t = Math.max(0.15, Math.min(0.95, (a || 0) / 100));
  return `rgba(255,122,0,${t})`;
};

const UgandaMap = ({ data, valueKey = "disb", maxKey = "alloc", activeId, onPick, showLabels = true, mode = "rate" }) => {
  const [hoverId, setHoverId] = React.useState(null);
  const byId = Object.fromEntries(data.map(r => [r.id, r]));

  const fillColor = (reg) => {
    const d = byId[reg.id];
    if (!d) return "rgba(0,0,0,0.08)";
    if (mode === "activity") return activityColor(d.activity);
    const rate = d[maxKey] ? d[valueKey] / d[maxKey] : 0;
    const base = rateColor(rate);
    const isHov = hoverId === reg.id;
    const isAct = activeId === reg.id;
    return isHov || isAct ? base : base + "cc";
  };

  return (
    <div className="uganda-map" style={{ position: "relative" }}>
      <svg viewBox="0 0 200 222" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
        <defs>
          <filter id="map-shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.10" />
          </filter>
        </defs>

        {/* Lake Victoria */}
        <path d={LAKE_VICTORIA} fill="#B8D8F0" opacity="0.70" />
        <text x="100" y="212" textAnchor="middle" fontSize="7" fill="#5B8DB8" fontWeight="600" letterSpacing="0.08em">LAKE VICTORIA</text>

        {/* Lake Albert */}
        <path d={LAKE_ALBERT} fill="#B8D8F0" opacity="0.70" />
        <text x="8" y="108" textAnchor="middle" fontSize="4.5" fill="#5B8DB8" fontWeight="500" transform="rotate(-35,8,108)">L.ALBERT</text>

        {/* Regions */}
        {UGANDA_REGIONS_PATH2.map(reg => {
          const d = byId[reg.id];
          const isHov = hoverId === reg.id;
          const isAct = activeId === reg.id;
          const rate = d && d[maxKey] ? d[valueKey] / d[maxKey] : null;
          return (
            <g key={reg.id}
              onClick={() => onPick && onPick(reg.id)}
              onMouseEnter={() => setHoverId(reg.id)}
              onMouseLeave={() => setHoverId(null)}
              style={{ cursor: "pointer" }}>
              <path
                d={reg.d}
                fill={fillColor(reg)}
                stroke={isHov || isAct ? "rgba(0,0,0,0.50)" : "rgba(0,0,0,0.20)"}
                strokeWidth={isHov || isAct ? "1.2" : "0.7"}
                filter="url(#map-shadow)"
                style={{ transition: "fill 0.15s, stroke 0.15s" }}
              />
              {showLabels && d && (
                <g>
                  <text x={reg.lx} y={reg.ly} textAnchor="middle" fontSize="6" fontWeight="700"
                    fill="rgba(255,255,255,0.95)" style={{ pointerEvents: "none", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                    paintOrder="stroke" stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" strokeLinejoin="round">
                    {reg.name.toUpperCase()}
                  </text>
                  {rate !== null && (
                    <text x={reg.lx} y={reg.ly + 9} textAnchor="middle" fontSize="7.5" fontWeight="800"
                      fill="white" style={{ pointerEvents: "none" }}
                      paintOrder="stroke" stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" strokeLinejoin="round">
                      {Math.round(rate * 100)}%
                    </text>
                  )}
                  {d.alloc != null && (
                    <text x={reg.lx} y={reg.ly + 18} textAnchor="middle" fontSize="5"
                      fill="rgba(255,255,255,0.85)" style={{ pointerEvents: "none" }}
                      paintOrder="stroke" stroke="rgba(0,0,0,0.30)" strokeWidth="1.5">
                      {d.disb}B / {d.alloc}B
                    </text>
                  )}
                </g>
              )}
            </g>
          );
        })}

        {/* North arrow */}
        <g transform="translate(185,175)">
          <circle cx="0" cy="0" r="9" fill="white" stroke="rgba(0,0,0,0.15)" strokeWidth="0.6" />
          <path d="M0,-7 L3,2 L0,0 L-3,2 Z" fill="var(--pres-accent)" />
          <path d="M0,7 L3,-2 L0,0 L-3,-2 Z" fill="rgba(0,0,0,0.20)" />
          <text x="0" y="-9.5" textAnchor="middle" fontSize="5" fontWeight="700" fill="var(--pres-text)">N</text>
        </g>
      </svg>

      {/* Hover tooltip */}
      {hoverId && byId[hoverId] && (() => {
        const d = byId[hoverId];
        const rate = d[maxKey] ? d[valueKey] / d[maxKey] : null;
        return (
          <div style={{
            position: "absolute", top: 8, right: 8,
            background: "var(--pres-panel)", border: "1px solid var(--pres-line-2)",
            borderRadius: 8, padding: "8px 12px", minWidth: 140,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)", pointerEvents: "none"
          }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "var(--pres-text)", marginBottom: 4 }}>{d.name}</div>
            {rate !== null && (
              <div style={{ fontSize: 20, fontWeight: 800, color: rateColor(rate), lineHeight: 1 }}>
                {Math.round(rate * 100)}%
              </div>
            )}
            {d.alloc != null && (
              <div style={{ fontSize: 11, color: "var(--pres-text-dim)", marginTop: 2 }}>
                {d.disb}B disbursed<br />{d.alloc}B allocated
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};

const MapLegend = ({ mode = "rate" }) => (
  <div className="map-legend" style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
    {mode === "rate" ? (
      <>
        <span style={{ fontSize: 11, color: "var(--pres-text-dim)" }}>Disbursement rate:</span>
        {[["#1A6B3C", "≥80%"], ["#FF7A00", "60–79%"], ["#C92028", "<60%"]].map(([c, l]) => (
          <span key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "inline-block" }} />
            {l}
          </span>
        ))}
      </>
    ) : (
      <>
        <span style={{ fontSize: 11, color: "var(--pres-text-dim)" }}>Activity:</span>
        <div style={{ display: "flex", gap: 1 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ width: 16, height: 10, borderRadius: 1, background: `rgba(255,122,0,${0.15 + i * 0.14})` }} />
          ))}
        </div>
        <span style={{ fontSize: 11, color: "var(--pres-text-dim)" }}>High</span>
      </>
    )}
  </div>
);

Object.assign(window, { UgandaMap, MapLegend });
