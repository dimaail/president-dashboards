// president-map.jsx — simplified Uganda regional map (stylized polygons)
// Not geographically precise — abstracted regions for executive overview.

const UGANDA_REGIONS_PATH = [
  // Each region is a stylized polygon over a 100x90 viewBox.
  { id: "westnile", name: "West Nile", d: "M8,8 L34,6 L36,30 L18,34 L10,28 Z" },
  { id: "northern", name: "Northern", d: "M36,6 L74,4 L78,30 L36,30 Z" },
  { id: "karamoja", name: "Karamoja", d: "M74,4 L94,8 L94,34 L78,30 Z" },
  { id: "western",  name: "Western",  d: "M10,28 L36,30 L42,58 L34,76 L14,72 L6,52 Z" },
  { id: "central",  name: "Central",  d: "M36,30 L60,30 L66,52 L54,72 L42,72 L42,58 Z" },
  { id: "eastern",  name: "Eastern",  d: "M60,30 L78,30 L94,34 L92,60 L78,72 L66,68 L66,52 Z" },
];

const UgandaMap = ({ data, valueKey = "disb", maxKey = "alloc", activeId, onPick, showLabels = true }) => {
  const byId = Object.fromEntries(data.map(r => [r.id, r]));
  // Build colour scale based on disbursement rate (or activity)
  const ratio = (r) => (r[maxKey] ? r[valueKey] / r[maxKey] : (r.activity || 0) / 100);
  const scale = (t) => {
    // 0 -> dim, 1 -> accent
    const a = Math.max(0.10, Math.min(0.95, t));
    return `rgba(255, 122, 0, ${a})`;
  };
  return (
    <div className="uganda-map">
      <svg viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">
        {/* Lake Victoria */}
        <path className="lake" d="M52,72 L78,72 L82,86 L60,86 L52,80 Z" />
        {UGANDA_REGIONS_PATH.map(reg => {
          const d = byId[reg.id];
          const t = d ? ratio(d) : 0;
          return (
            <path key={reg.id} d={reg.d}
              className={`region ${activeId === reg.id ? "is-active" : ""}`}
              style={{ fill: d ? scale(t) : undefined }}
              onClick={() => onPick && onPick(reg.id)}>
              <title>{reg.name}</title>
            </path>
          );
        })}
        {showLabels && data.map(r => (
          <g key={r.id}>
            <text className="label" x={r.cx} y={r.cy - 1.5} fontSize="2.4">{r.name.toUpperCase()}</text>
            <text className="label-val" x={r.cx} y={r.cy + 2.6} fontSize="2.8">
              {r.disb != null ? `${r.disb}B / ${r.alloc}B` : `${r.activity}`}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const MapLegend = ({ left = "Low", right = "High", scaleStops = 6 }) => (
  <div className="map-legend">
    <span>{left}</span>
    <div className="legend-stops">
      {Array.from({ length: scaleStops }).map((_, i) => (
        <div key={i} className="s" style={{ background: `rgba(255,122,0,${0.12 + (i / (scaleStops - 1)) * 0.78})` }} />
      ))}
    </div>
    <span>{right}</span>
  </div>
);

Object.assign(window, { UgandaMap, MapLegend });
