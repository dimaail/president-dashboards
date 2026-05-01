// president-charts.jsx — small reusable chart primitives (SVG, no libs)
// Light-theme variant: dark rgba(255,255,255,*) swapped for rgba(0,0,0,*).

const Sparkline = ({ data, color = "var(--pres-accent)", fill = true, height = 36 }) => {
  if (!data || data.length === 0) return null;
  const w = 200, h = height, pad = 2;
  const min = Math.min(...data), max = Math.max(...data);
  const xs = (i) => pad + (i / (data.length - 1)) * (w - pad * 2);
  const ys = (v) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
  const path = data.map((v, i) => `${i ? "L" : "M"}${xs(i).toFixed(1)},${ys(v).toFixed(1)}`).join(" ");
  const area = `${path} L${xs(data.length - 1).toFixed(1)},${h} L${xs(0).toFixed(1)},${h} Z`;
  return (
    <svg className="spark-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {fill && <path d={area} fill={color} opacity="0.10" />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={xs(data.length - 1)} cy={ys(data[data.length - 1])} r="2.2" fill={color} />
    </svg>
  );
};

const AreaChart = ({ data, height = 160, color = "var(--pres-accent)", labels }) => {
  const w = 600, h = height, padX = 24, padY = 18;
  const min = 0, max = Math.max(...data.filter(v => v != null)) * 1.15;
  const valid = data.map((v, i) => ({ v, i })).filter(p => p.v != null);
  const xs = (i) => padX + (i / (data.length - 1)) * (w - padX * 2);
  const ys = (v) => h - padY - ((v - min) / (max - min || 1)) * (h - padY * 2);
  const path = valid.map((p, k) => `${k ? "L" : "M"}${xs(p.i).toFixed(1)},${ys(p.v).toFixed(1)}`).join(" ");
  const last = valid[valid.length - 1];
  const area = `${path} L${xs(last.i).toFixed(1)},${h - padY} L${xs(valid[0].i).toFixed(1)},${h - padY} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(t => min + (max - min) * t);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height }}>
      {ticks.map((t, k) => (
        <g key={k}>
          <line x1={padX} x2={w - padX} y1={ys(t)} y2={ys(t)} stroke="rgba(0,0,0,0.07)" strokeWidth="0.8" />
          <text x={padX - 6} y={ys(t) + 3} textAnchor="end" fontSize="8" fill="rgba(18,18,22,0.40)">{t.toFixed(1)}</text>
        </g>
      ))}
      <path d={area} fill={color} opacity="0.10" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
      {valid.map((p) => (
        <circle key={p.i} cx={xs(p.i)} cy={ys(p.v)} r="2" fill={color} />
      ))}
      {labels && labels.map((lbl, i) => (
        <text key={i} x={xs(i)} y={h - 4} textAnchor="middle" fontSize="9" fill="rgba(18,18,22,0.42)">{lbl}</text>
      ))}
    </svg>
  );
};

const BarsHoriz = ({ rows, max, accent = "var(--pres-accent)", suffix = "" }) => {
  const cap = max || Math.max(...rows.map(r => r.value || r.actual || r.v));
  return (
    <div>
      {rows.map((r, i) => {
        const v = r.value ?? r.actual ?? r.v;
        const t = r.target;
        return (
          <div key={i} className="bar-row">
            <span className="name">{r.name || r.m}</span>
            <div className="bar-track">
              {t && <div className="bar-fill" style={{ width: `${(t / cap) * 100}%`, background: "rgba(0,0,0,0.10)" }} />}
              <div className="bar-fill" style={{
                width: `${(v / cap) * 100}%`, background: accent,
                position: t ? "absolute" : "relative", top: 0, left: 0
              }} />
            </div>
            <span className="num">{typeof v === "number" ? v.toFixed(2) : v}{suffix}</span>
          </div>
        );
      })}
    </div>
  );
};

const Donut = ({ slices, size = 160, thickness = 18, label }) => {
  const r = (size - thickness) / 2;
  const cx = size / 2, cy = size / 2;
  const C = 2 * Math.PI * r;
  let acc = 0;
  const total = slices.reduce((s, x) => s + x.pct, 0);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="donut" style={{ width: size, height: size }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth={thickness} />
      {slices.map((s, i) => {
        const len = (s.pct / total) * C;
        const dash = `${len} ${C - len}`;
        const offset = -acc;
        acc += len;
        return (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={s.color} strokeWidth={thickness}
            strokeDasharray={dash} strokeDashoffset={offset}
            transform={`rotate(-90 ${cx} ${cy})`} />
        );
      })}
      {label && (
        <g>
          <text x={cx} y={cy - 2} textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--pres-text)">{label.value}</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fill="rgba(18,18,22,0.50)" letterSpacing="0.10em">{label.unit}</text>
        </g>
      )}
    </svg>
  );
};

const ColumnBars = ({ data, height = 140, color = "var(--pres-accent)" }) => {
  const w = 600, h = height, padX = 16, padY = 16;
  const valid = data.filter(d => d.v != null);
  const max = Math.max(...valid.map(d => d.v)) * 1.15;
  const bw = (w - padX * 2) / data.length * 0.65;
  const step = (w - padX * 2) / data.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height }}>
      {data.map((d, i) => {
        const x = padX + step * i + (step - bw) / 2;
        const isNull = d.v == null;
        const bh = isNull ? 0 : ((d.v / max)) * (h - padY * 2);
        return (
          <g key={i}>
            {!isNull && (
              <rect x={x} y={h - padY - bh} width={bw} height={bh}
                fill={color} opacity={i === valid.length - 1 ? 1 : 0.55} />
            )}
            {isNull && (
              <rect x={x} y={padY} width={bw} height={h - padY * 2}
                fill="rgba(0,0,0,0.05)" />
            )}
            <text x={x + bw / 2} y={h - 4} textAnchor="middle" fontSize="9" fill="rgba(18,18,22,0.42)">{d.m}</text>
          </g>
        );
      })}
    </svg>
  );
};

const Delta = ({ value, good, bad, suffix = "%" }) => {
  const isUp = value > 0;
  const cls = (good && isUp) || (bad && !isUp) ? "up" : (good && !isUp) || (bad && isUp) ? "down" : isUp ? "up" : "down";
  return (
    <span className={`delta ${cls}`}>
      <Icon name={isUp ? "arrow_upward" : "arrow_downward"} size={14} />
      {Math.abs(value).toFixed(1)}{suffix} <span className="muted" style={{ fontWeight: 400, marginLeft: 4 }}>vs prior</span>
    </span>
  );
};

const KpiTile = ({ k, big, sparkColor }) => {
  const color = k.bad ? "var(--pres-bad)" : k.good ? "var(--pres-good)" : (sparkColor || "var(--pres-accent)");
  return (
    <div className={`pres-card pres-kpi ${big ? "feature" : ""}`}>
      <div className="label">{k.label}</div>
      <div className="value tnum">
        {k.valueText || (typeof k.value === "number" ? (k.value < 100 && !Number.isInteger(k.value) ? k.value.toFixed(2) : k.value.toLocaleString("en-US")) : k.value)}
        <span className="unit">{k.unit}</span>
      </div>
      <Delta value={k.delta} good={k.good} bad={k.bad} />
      <div className="spark"><Sparkline data={k.spark} color={color} /></div>
    </div>
  );
};

Object.assign(window, { Sparkline, AreaChart, BarsHoriz, Donut, ColumnBars, Delta, KpiTile });
