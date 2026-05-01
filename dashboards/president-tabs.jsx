// president-tabs.jsx — the 5 tab panes
// Each pane reads PRES_DATA, t() for i18n, and density flags.

// =============== OVERVIEW ===============
const TabOverview = ({ t, data, activeRegion, setActiveRegion }) => (
  <>
    <div className="pres-section-h">
      <h2>{t("Executive overview")}</h2>
      <span className="meta">{t("Live · all systems")} · {data.asOf}</span>
    </div>

    <div className="pres-grid cols-3" style={{ gridTemplateColumns: "1.4fr 1fr 1fr" }}>
      <KpiTile k={data.overview.kpis[0]} big />
      <KpiTile k={data.overview.kpis[1]} />
      <KpiTile k={data.overview.kpis[2]} />
    </div>
    <div className="pres-grid cols-3">
      <KpiTile k={data.overview.kpis[3]} />
      <KpiTile k={data.overview.kpis[4]} />
      <KpiTile k={data.overview.kpis[5]} />
    </div>

    <div className="pres-grid" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
      <div className="pres-card">
        <div className="card-h">
          <span>{t("Real-time activity · regions")}</span>
          <span className="actions">
            <span className="chip flat">{t("By transaction volume")}</span>
          </span>
        </div>
        <UgandaMap data={REGIONS} activeId={activeRegion} onPick={setActiveRegion} valueKey="activity" maxKey={null} />
        <MapLegend left={t("Low activity")} right={t("High activity")} />
      </div>

      <div className="col" style={{ gap: 12 }}>
        <div className="pres-card">
          <div className="card-h"><span>{t("Channel mix · today")}</span><span className="actions"><Icon name="more_horiz" size={16} /></span></div>
          <div className="row" style={{ gap: 16, alignItems: "center" }}>
            <Donut slices={data.overview.channelMix} label={{ value: "23.18M", unit: "TX TODAY" }} />
            <div className="col" style={{ flex: 1 }}>
              {data.overview.channelMix.map((c, i) => (
                <div key={i} className="row sb" style={{ fontSize: 12 }}>
                  <span className="row" style={{ gap: 8 }}>
                    <span style={{ width: 8, height: 8, background: c.color }} />
                    {c.name}
                  </span>
                  <span className="tnum">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pres-card">
          <div className="card-h"><span>{t("Transaction type mix")}</span></div>
          <BarsHoriz rows={data.overview.typeMix.map(t => ({ name: t.name, value: t.pct }))} suffix="%" max={100} />
        </div>
      </div>
    </div>

    <div className="pres-grid cols-2">
      <div className="pres-card">
        <div className="card-h"><span>{t("Switch volume · 30d (T UGX)")}</span><div className="seg-toggle"><button className="is-active">30D</button><button>QTR</button><button>YTD</button></div></div>
        <AreaChart data={Array.from({length: 30}, (_, i) => 6 + Math.sin(i/3)*1.6 + i*0.08)} height={160} labels={Array.from({length: 30}, (_, i) => i % 5 === 0 ? `${i + 1}` : "")} />
      </div>
      <div className="pres-card">
        <div className="card-h"><span>{t("Cross-agency signal")}</span><span className="chip accent">{t("auto")}</span></div>
        <table className="pres-table">
          <thead><tr><th>{t("Agency")}</th><th>{t("Indicator")}</th><th className="num">{t("Today")}</th><th className="num">{t("Δ")}</th></tr></thead>
          <tbody>
            <tr><td>BoU</td><td>{t("Settlement uptime")}</td><td className="num">99.997%</td><td className="num"><span className="chip ok">OK</span></td></tr>
            <tr><td>URA</td><td>{t("MTD vs target")}</td><td className="num">+1.4%</td><td className="num"><span className="chip ok">+</span></td></tr>
            <tr><td>FIA</td><td>{t("Blocked tx amount")}</td><td className="num">2.50B</td><td className="num"><span className="chip warn">↑</span></td></tr>
            <tr><td>PDM</td><td>{t("Disbursement rate")}</td><td className="num">67.6%</td><td className="num"><span className="chip warn">!</span></td></tr>
            <tr><td>BoU</td><td>{t("Liquidity floor breaches")}</td><td className="num">2</td><td className="num"><span className="chip bad">↑</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
);

// =============== BoU ===============
const TabBoU = ({ t, data }) => (
  <>
    <div className="pres-section-h">
      <h2>{t("Bank of Uganda · Macroeconomy")}</h2>
      <span className="meta">{t("Real-time · NPS feed")}</span>
    </div>
    <div className="pres-grid cols-4">
      {data.bou.kpis.map(k => <KpiTile key={k.id} k={k} />)}
    </div>
    <div className="pres-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
      <div className="pres-card">
        <div className="card-h"><span>{t("Liquidity & digitalization · rails")}</span></div>
        <BarsHoriz rows={data.bou.rails.map(r => ({ name: r.name, value: r.pct }))} suffix="%" max={100} />
      </div>
      <div className="pres-card">
        <div className="card-h"><span>{t("Consumption & business activity")}</span></div>
        <table className="pres-table">
          <thead><tr><th>{t("Indicator")}</th><th className="num">{t("Today")}</th><th className="num">{t("Δ")}</th><th>{t("Trend")}</th></tr></thead>
          <tbody>
            {data.bou.consumption.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td className="num tnum">{r.value}</td>
                <td className="num"><span className={`chip ${r.delta >= 0 ? "ok" : "bad"}`}>{r.delta >= 0 ? "+" : ""}{r.delta.toFixed(1)}%</span></td>
                <td style={{ width: 110 }}><div style={{ height: 24 }}><Sparkline data={r.spark} color={r.delta >= 0 ? "var(--pres-good)" : "var(--pres-bad)"} fill={false} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="pres-card">
      <div className="card-h"><span>{t("Participant liquidity (top 10)")}</span><span className="chip flat">{t("Live")}</span></div>
      <table className="pres-table">
        <thead><tr><th>{t("Participant")}</th><th className="num">{t("Liquidity (T UGX)")}</th><th className="num">{t("Share")}</th><th>{t("Status")}</th><th style={{ width: 200 }}>{t("Liquidity buffer")}</th></tr></thead>
        <tbody>
          {data.bou.participants.map((p, i) => {
            const pct = (p.liq / 2.5) * 100;
            return (
              <tr key={i}>
                <td>{p.name}</td>
                <td className="num">{p.liq.toFixed(2)}</td>
                <td className="num">{p.share.toFixed(1)}%</td>
                <td><span className={`chip ${p.status}`}>{p.status === "ok" ? t("Healthy") : p.status === "warn" ? t("Watch") : t("Resolution")}</span></td>
                <td>
                  <div className="bar-track" style={{ height: 8 }}>
                    <div className={`bar-fill ${p.status === "ok" ? "good" : p.status === "warn" ? "" : "bad"}`}
                         style={{ width: `${Math.min(100, pct)}%`, background: p.status === "ok" ? "var(--pres-good)" : p.status === "warn" ? "var(--pres-warn)" : "var(--pres-bad)" }} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

// =============== FIA ===============
const TabFIA = ({ t, data }) => (
  <>
    <div className="pres-section-h">
      <h2>{t("Financial Intelligence Authority")}</h2>
      <span className="meta">{t("Live · investigation activities")}</span>
    </div>
    <div className="pres-grid cols-4">
      {data.fia.kpis.map(k => <KpiTile key={k.id} k={k} />)}
    </div>
    <div className="pres-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
      <div className="pres-card">
        <div className="card-h"><span>{t("Fraud cases · by type")}</span></div>
        <BarsHoriz rows={data.fia.cases.map(c => ({ name: c.name, value: c.q }))} suffix="" />
        <div className="muted" style={{ fontSize: 11, paddingTop: 8 }}>{t("Volume (UGX) shown in detail view; click a row.")}</div>
      </div>
      <div className="pres-card">
        <div className="card-h"><span>{t("High-risk entities")}</span></div>
        <table className="pres-table">
          <thead><tr><th>{t("Sector")}</th><th className="num">{t("Entities")}</th><th className="num">{t("Volume (B UGX)")}</th><th className="num">{t("30d Δ")}</th></tr></thead>
          <tbody>
            {data.fia.highRisk.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td className="num">{r.q}</td>
                <td className="num">{r.vol.toFixed(1)}</td>
                <td className="num"><span className={`chip ${r.trend >= 10 ? "bad" : r.trend >= 0 ? "warn" : "ok"}`}>{r.trend >= 0 ? "+" : ""}{r.trend.toFixed(1)}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="pres-card">
      <div className="card-h"><span>{t("Recently blocked transactions")}</span><span className="chip accent">{t("auto-blocked")}</span></div>
      <table className="pres-table">
        <thead><tr><th>#</th><th>{t("Debtor")}</th><th>{t("Debtor FI")}</th><th>{t("Creditor")}</th><th>{t("Creditor FI")}</th><th className="num">{t("Amount")}</th><th>{t("Type")}</th><th>{t("Block date")}</th></tr></thead>
        <tbody>
          {data.fia.blocked.map(r => (
            <tr key={r.idx}>
              <td className="mute2">{String(r.idx).padStart(2, "0")}</td>
              <td className="mono">{r.debtor}</td>
              <td>{r.debFI}</td>
              <td className="mono">{r.creditor}</td>
              <td>{r.crFI}</td>
              <td className="num">{r.amt.toLocaleString("en-US", { minimumFractionDigits: 2 })} UGX</td>
              <td><span className="chip flat">{r.type.toUpperCase()}</span></td>
              <td className="mute2">{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

// =============== URA ===============
const TabURA = ({ t, data }) => (
  <>
    <div className="pres-section-h">
      <h2>{t("Uganda Revenue Authority")}</h2>
      <span className="meta">{t("Tax collection & cross-checks")}</span>
    </div>
    <div className="pres-grid cols-4">
      {data.ura.kpis.map(k => <KpiTile key={k.id} k={k} />)}
    </div>
    <div className="pres-grid" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
      <div className="pres-card">
        <div className="card-h"><span>{t("Tax collected · monthly (T UGX)")}</span><div className="seg-toggle"><button className="is-active">{t("Year")}</button><button>{t("Quarter")}</button><button>{t("Month")}</button></div></div>
        <ColumnBars data={data.ura.monthly} height={180} />
      </div>
      <div className="pres-card">
        <div className="card-h"><span>{t("Regional budget · target vs actual")}</span></div>
        <BarsHoriz rows={data.ura.regional} suffix="T" />
      </div>
    </div>
    <div className="pres-grid cols-2">
      <div className="pres-card">
        <div className="card-h"><span>{t("Cross-check: declared vs cashflow")}</span><span className="chip warn">{t("6 high-risk")}</span></div>
        <table className="pres-table">
          <thead><tr><th>TIN</th><th>{t("Taxpayer")}</th><th className="num">{t("Declared")}</th><th className="num">{t("Cashflow")}</th><th className="num">{t("Gap")}</th><th>{t("Risk")}</th></tr></thead>
          <tbody>
            {data.ura.crossCheck.map((r, i) => (
              <tr key={i}>
                <td className="mono">{r.tin}</td>
                <td>{r.name}</td>
                <td className="num">{r.declared}</td>
                <td className="num">{r.cashflow}</td>
                <td className="num">{r.gap}</td>
                <td><span className={`chip ${r.risk === "high" ? "bad" : "warn"}`}>{r.risk}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pres-card">
        <div className="card-h"><span>{t("Unregistered taxpayers")}</span></div>
        <div className="pres-grid cols-2" style={{ gap: 16 }}>
          <div className="col" style={{ gap: 4 }}>
            <span className="muted" style={{ fontSize: 11, letterSpacing: "0.10em", textTransform: "uppercase" }}>{t("Estimated taxpayers")}</span>
            <span style={{ fontSize: 32, fontWeight: 700 }} className="tnum">318K</span>
            <span className="muted" style={{ fontSize: 12 }}>{t("Potential revenue: UGX 124.7B / yr")}</span>
          </div>
          <div className="col" style={{ gap: 4 }}>
            <span className="muted" style={{ fontSize: 11, letterSpacing: "0.10em", textTransform: "uppercase" }}>{t("Unregistered VAT")}</span>
            <span style={{ fontSize: 32, fontWeight: 700 }} className="tnum">12.48K</span>
            <span className="muted" style={{ fontSize: 12 }}>{t("Potential revenue: UGX 488.4B / yr")}</span>
          </div>
        </div>
        <div className="h-line" style={{ margin: "8px 0" }}></div>
        <div className="muted" style={{ fontSize: 12, lineHeight: 1.6 }}>
          {t("Estimates derived from Switch C2B / B2B flows reconciled against URA TIN registry. Refreshed weekly. Click to drill into source matching rules.")}
        </div>
      </div>
    </div>
  </>
);

// =============== PDM ===============
const TabPDM = ({ t, data, activeRegion, setActiveRegion }) => (
  <>
    <div className="pres-section-h">
      <h2>{t("Parish Development Model")}</h2>
      <span className="meta">{t("Allocated vs disbursed · YTD")}</span>
    </div>
    <div className="pres-grid cols-4">
      {data.pdm.kpis.map(k => <KpiTile key={k.id} k={k} />)}
    </div>
    <div className="pres-grid" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
      <div className="pres-card">
        <div className="card-h">
          <span>{t("Disbursement intensity by region")}</span>
          <span className="chip flat">{t("Allocated → Disbursed")}</span>
        </div>
        <UgandaMap data={REGIONS} activeId={activeRegion} onPick={setActiveRegion} valueKey="disb" maxKey="alloc" />
        <MapLegend left={t("Underperforming")} right={t("On plan")} />
      </div>
      <div className="pres-card">
        <div className="card-h"><span>{t("PDM pillars · allocation vs disbursement")}</span></div>
        {data.pdm.pillars.map((p, i) => {
          const pct = Math.round((p.disb / p.alloc) * 100);
          return (
            <div key={i} className="stack-row">
              <span className="name">{p.name}</span>
              <div className="stack-track">
                <div className="seg disb" style={{ width: `${(p.disb / 4.2) * 100}%` }} />
                <div className="seg alloc" style={{ width: `${((p.alloc - p.disb) / 4.2) * 100}%` }} />
              </div>
              <div className="ratio">{pct}% <small>{p.disb.toFixed(2)}T / {p.alloc.toFixed(2)}T</small></div>
            </div>
          );
        })}
      </div>
    </div>
    <div className="pres-card">
      <div className="card-h"><span>{t("Districts · allocated vs disbursed (B UGX)")}</span><span className="chip flat">{t("Top 12")}</span></div>
      <table className="pres-table">
        <thead><tr><th>{t("District")}</th><th className="num">{t("Allocated")}</th><th className="num">{t("Disbursed")}</th><th className="num">{t("Rate")}</th><th style={{ width: 240 }}>{t("Progress")}</th></tr></thead>
        <tbody>
          {data.pdm.districts.map((d, i) => {
            const pct = Math.round((d.disb / d.alloc) * 100);
            const cls = pct >= 80 ? "ok" : pct >= 60 ? "warn" : "bad";
            return (
              <tr key={i}>
                <td>{d.d}</td>
                <td className="num">{d.alloc}</td>
                <td className="num">{d.disb}</td>
                <td className="num"><span className={`chip ${cls}`}>{pct}%</span></td>
                <td>
                  <div className="bar-track" style={{ height: 8 }}>
                    <div className="bar-fill" style={{
                      width: `${pct}%`,
                      background: cls === "ok" ? "var(--pres-good)" : cls === "warn" ? "var(--pres-warn)" : "var(--pres-bad)"
                    }} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

Object.assign(window, { TabOverview, TabBoU, TabFIA, TabURA, TabPDM });
