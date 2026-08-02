"use client";

import { useMemo, useState } from "react";
import {
  companies,
  companyList,
  formatMoney,
  formatPct,
  normalizedRevenue,
  years,
} from "../../lib/data";

const svgFont = "var(--font-sans)";

function TickLabel({ x, y, children, anchor = "middle" }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="chart-tick"
      style={{ fontFamily: svgFont }}
    >
      {children}
    </text>
  );
}

export function MetricLedger() {
  const [activeKey, setActiveKey] = useState("INTU");
  const company = companies[activeKey];
  const latest = company.revenue.length - 1;
  const growth = company.growth[latest];
  const fcfMargin = company.fcfMargin[latest];
  const total = company.rule40[latest];
  const variance = total - 40;

  return (
    <div className="ledger-card" aria-label="Interactive durability ledger">
      <div className="ledger-card__topline">
        <span>DURABILITY LEDGER · FY2025</span>
        <span>EXHIBIT 01</span>
      </div>

      <div className="ledger-selector" role="tablist" aria-label="Select company">
        {companyList.map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={item.key === activeKey}
            className={item.key === activeKey ? "is-active" : ""}
            key={item.key}
            onClick={() => setActiveKey(item.key)}
          >
            {item.key}
          </button>
        ))}
      </div>

      <div className="ledger-card__heading">
        <div>
          <p className="eyebrow brass">UNDERWRITING CASE</p>
          <h2>{company.name}</h2>
        </div>
        <div className="ledger-period">
          <span>PERIOD</span>
          <strong>FY2025</strong>
        </div>
      </div>

      <div className="ledger-rule" />

      <div className="ledger-equation">
        <div>
          <span>REVENUE GROWTH</span>
          <strong>{formatPct(growth)}</strong>
        </div>
        <b aria-hidden="true">+</b>
        <div>
          <span>FCF MARGIN</span>
          <strong>{formatPct(fcfMargin)}</strong>
        </div>
        <b aria-hidden="true">=</b>
        <div className="ledger-equation__total">
          <span>RULE OF 40</span>
          <strong key={`${activeKey}-total`}>{formatPct(total)}</strong>
        </div>
      </div>

      <div className="ledger-reconciliation">
        <span>40% threshold</span>
        <span className={variance >= 0 ? "positive" : "negative"}>
          {variance >= 0 ? "+" : ""}
          {variance.toFixed(1)} pts
        </span>
      </div>

      <div className="ledger-card__footer">
        <div className="signature">
          <em>{company.model}</em>
          <span>SIGNED · ANALYST</span>
        </div>
        <div
          className={`ledger-stamp ${
            company.ledgerStatus === "CLEARED" ? "is-cleared" : ""
          }`}
        >
          <strong>{company.ledgerStatus}</strong>
          <span>{company.openItems} OPEN ITEMS</span>
        </div>
      </div>
    </div>
  );
}

export function GrowthIndexChart() {
  const width = 720;
  const height = 390;
  const margin = { top: 30, right: 82, bottom: 54, left: 54 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const yMin = 80;
  const yMax = 240;
  const x = (index) => margin.left + (index / (years.length - 1)) * plotW;
  const y = (value) =>
    margin.top + plotH - ((value - yMin) / (yMax - yMin)) * plotH;
  const yTicks = [100, 140, 180, 220];

  return (
    <div className="svg-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby="growth-chart-title growth-chart-desc"
      >
        <title id="growth-chart-title">Revenue growth indexed to FY2022</title>
        <desc id="growth-chart-desc">
          Intuit reaches 148, BILL 228, and Toast 225 by FY2025, with FY2022 set
          to 100.
        </desc>

        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={y(tick)}
              y2={y(tick)}
              className="chart-grid"
            />
            <TickLabel x={margin.left - 12} y={y(tick) + 4} anchor="end">
              {tick}
            </TickLabel>
          </g>
        ))}

        <line
          x1={margin.left}
          x2={width - margin.right}
          y1={y(100)}
          y2={y(100)}
          className="chart-baseline"
        />

        {years.map((year, index) => (
          <TickLabel key={year} x={x(index)} y={height - 20}>
            {year}
          </TickLabel>
        ))}

        {normalizedRevenue.map((series) => {
          const points = series.values
            .map((value, index) => `${x(index)},${y(value)}`)
            .join(" ");
          return (
            <g key={series.key}>
              <polyline
                points={points}
                fill="none"
                stroke={series.color}
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {series.values.map((value, index) => (
                <circle
                  key={`${series.key}-${index}`}
                  cx={x(index)}
                  cy={y(value)}
                  r={index === series.values.length - 1 ? 5 : 3.5}
                  fill="var(--paper)"
                  stroke={series.color}
                  strokeWidth="2.5"
                >
                  <title>{`${series.key} ${years[index]}: ${value.toFixed(0)}`}</title>
                </circle>
              ))}
              <text
                x={x(3) + 12}
                y={y(series.values[3]) + 4}
                fill={series.color}
                className="chart-end-label"
                style={{ fontFamily: svgFont }}
              >
                {series.key} · {series.values[3].toFixed(0)}
              </text>
            </g>
          );
        })}

        <text
          x={margin.left}
          y={14}
          className="chart-unit"
          style={{ fontFamily: svgFont }}
        >
          INDEX · FY22 = 100
        </text>
      </svg>
    </div>
  );
}

export function RuleOf40Scatter() {
  const width = 720;
  const height = 420;
  const margin = { top: 35, right: 38, bottom: 64, left: 62 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const xMax = 30;
  const yMax = 40;
  const x = (value) => margin.left + (value / xMax) * plotW;
  const y = (value) => margin.top + plotH - (value / yMax) * plotH;
  const xTicks = [0, 10, 20, 30];
  const yTicks = [0, 10, 20, 30, 40];

  return (
    <div className="svg-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby="rule-chart-title rule-chart-desc"
      >
        <title id="rule-chart-title">FY2025 growth versus free cash flow margin</title>
        <desc id="rule-chart-desc">
          Intuit is the only company above the Rule of 40 threshold in FY2025.
          BILL and Toast sit below it.
        </desc>

        {yTicks.map((tick) => (
          <g key={`y-${tick}`}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={y(tick)}
              y2={y(tick)}
              className="chart-grid"
            />
            <TickLabel x={margin.left - 12} y={y(tick) + 4} anchor="end">
              {tick}%
            </TickLabel>
          </g>
        ))}
        {xTicks.map((tick) => (
          <g key={`x-${tick}`}>
            <line
              x1={x(tick)}
              x2={x(tick)}
              y1={margin.top}
              y2={height - margin.bottom}
              className="chart-grid chart-grid--vertical"
            />
            <TickLabel x={x(tick)} y={height - 30}>
              {tick}%
            </TickLabel>
          </g>
        ))}

        <polygon
          points={`${x(0)},${y(40)} ${x(30)},${y(10)} ${x(30)},${y(40)}`}
          className="rule-zone"
        />
        <line
          x1={x(0)}
          y1={y(40)}
          x2={x(30)}
          y2={y(10)}
          className="rule-line"
        />
        <text
          x={x(21)}
          y={y(21.5)}
          className="rule-line-label"
          transform={`rotate(-32 ${x(21)} ${y(21.5)})`}
          style={{ fontFamily: svgFont }}
        >
          RULE OF 40
        </text>

        {companyList.map((company) => {
          const growth = company.growth[3];
          const fcf = company.fcfMargin[3];
          const radius =
            company.key === "INTU" ? 27 : company.key === "TOST" ? 22 : 17;
          const labelDx = company.key === "TOST" ? -8 : radius + 10;
          const anchor = company.key === "TOST" ? "end" : "start";
          return (
            <g key={company.key}>
              <circle
                cx={x(growth)}
                cy={y(fcf)}
                r={radius}
                fill={company.color}
                fillOpacity=".9"
                stroke="var(--paper)"
                strokeWidth="4"
              >
                <title>{`${company.name}: ${formatPct(growth)} growth, ${formatPct(fcf)} FCF margin, ${formatPct(company.rule40[3])} Rule of 40`}</title>
              </circle>
              <text
                x={x(growth)}
                y={y(fcf) + 4}
                textAnchor="middle"
                className="scatter-key"
                style={{ fontFamily: svgFont }}
              >
                {company.key}
              </text>
              <text
                x={x(growth) + labelDx}
                y={y(fcf) - 3}
                textAnchor={anchor}
                className="scatter-label"
                style={{ fontFamily: svgFont }}
              >
                {formatPct(company.rule40[3])}
              </text>
              <text
                x={x(growth) + labelDx}
                y={y(fcf) + 13}
                textAnchor={anchor}
                className="scatter-label scatter-label--sub"
                style={{ fontFamily: svgFont }}
              >
                Rule of 40
              </text>
            </g>
          );
        })}

        <TickLabel x={margin.left + plotW / 2} y={height - 7}>
          REVENUE GROWTH · FY25
        </TickLabel>
        <text
          x={16}
          y={margin.top + plotH / 2}
          textAnchor="middle"
          transform={`rotate(-90 16 ${margin.top + plotH / 2})`}
          className="chart-axis-label"
          style={{ fontFamily: svgFont }}
        >
          FCF MARGIN · FY25
        </text>
      </svg>
    </div>
  );
}

export function RevenueMixChart() {
  const mix = companyList.map((company) => ({
    ...company,
    softwareShare: (company.software[3] / company.revenue[3]) * 100,
    paymentsShare: (company.payments[3] / company.revenue[3]) * 100,
    otherShare: (company.other[3] / company.revenue[3]) * 100,
  }));

  return (
    <div className="mix-chart">
      <div className="mix-legend" aria-hidden="true">
        <span><i className="mix-software" />Software / subscription</span>
        <span><i className="mix-payments" />Transaction / payments</span>
        <span><i className="mix-other" />Float / other</span>
      </div>
      {mix.map((company) => (
        <div className="mix-row" key={company.key}>
          <div className="mix-row__label">
            <strong>{company.key}</strong>
            <span>{formatMoney(company.revenue[3])}</span>
          </div>
          <div
            className="mix-bar"
            role="img"
            aria-label={`${company.name} revenue mix: ${company.softwareShare.toFixed(
              1
            )}% software, ${company.paymentsShare.toFixed(
              1
            )}% payments, ${company.otherShare.toFixed(1)}% other`}
          >
            <div
              className="mix-bar__segment mix-software"
              style={{ width: `${company.softwareShare}%` }}
            >
              {company.softwareShare >= 10 && (
                <span>{company.softwareShare.toFixed(0)}%</span>
              )}
            </div>
            <div
              className="mix-bar__segment mix-payments"
              style={{ width: `${company.paymentsShare}%` }}
            >
              {company.paymentsShare >= 10 && (
                <span>{company.paymentsShare.toFixed(0)}%</span>
              )}
            </div>
            <div
              className="mix-bar__segment mix-other"
              style={{ width: `${company.otherShare}%` }}
            >
              {company.otherShare >= 7 && (
                <span>{company.otherShare.toFixed(0)}%</span>
              )}
            </div>
          </div>
          <p>{company.model}</p>
        </div>
      ))}
    </div>
  );
}

export function MarginDecompositionChart() {
  const width = 720;
  const height = 430;
  const margin = { top: 44, right: 30, bottom: 78, left: 58 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const yMax = 90;
  const y = (value) => margin.top + plotH - (value / yMax) * plotH;
  const groupWidth = plotW / 3;
  const barWidth = 38;
  const series = [
    { key: "grossMargin", label: "Blended", className: "bar-blended" },
    { key: "softwareMargin", label: "Software", className: "bar-software" },
    { key: "paymentsMargin", label: "Payments", className: "bar-payments" },
  ];
  const yTicks = [0, 20, 40, 60, 80];

  return (
    <div className="svg-chart">
      <div className="chart-legend" aria-hidden="true">
        {series.map((item) => (
          <span key={item.key}>
            <i className={item.className} />
            {item.label}
          </span>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby="margin-chart-title margin-chart-desc"
      >
        <title id="margin-chart-title">FY2025 gross margin decomposition</title>
        <desc id="margin-chart-desc">
          Intuit has 79.6% blended gross margin. BILL has 81.4% blended gross
          margin but does not disclose stream costs. Toast has 25.9% blended,
          71.8% software, and 22.8% payments gross margin.
        </desc>

        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={y(tick)}
              y2={y(tick)}
              className="chart-grid"
            />
            <TickLabel x={margin.left - 12} y={y(tick) + 4} anchor="end">
              {tick}%
            </TickLabel>
          </g>
        ))}

        {companyList.map((company, companyIndex) => {
          const center = margin.left + groupWidth * (companyIndex + 0.5);
          return (
            <g key={company.key}>
              {series.map((item, seriesIndex) => {
                const value = company[item.key][3];
                const barX =
                  center + (seriesIndex - 1) * (barWidth + 9) - barWidth / 2;
                if (value == null) {
                  return (
                    <g key={item.key}>
                      <rect
                        x={barX}
                        y={y(12)}
                        width={barWidth}
                        height={y(0) - y(12)}
                        className="bar-not-disclosed"
                      />
                      <text
                        x={barX + barWidth / 2}
                        y={y(6) + 4}
                        textAnchor="middle"
                        className="bar-nd-label"
                        style={{ fontFamily: svgFont }}
                      >
                        n/d
                      </text>
                    </g>
                  );
                }
                return (
                  <g key={item.key}>
                    <rect
                      x={barX}
                      y={y(value)}
                      width={barWidth}
                      height={y(0) - y(value)}
                      rx="1"
                      className={item.className}
                    >
                      <title>{`${company.name} ${item.label}: ${formatPct(value)}`}</title>
                    </rect>
                    <text
                      x={barX + barWidth / 2}
                      y={y(value) - 9}
                      textAnchor="middle"
                      className="bar-value"
                      style={{ fontFamily: svgFont }}
                    >
                      {value.toFixed(1)}%
                    </text>
                  </g>
                );
              })}
              <TickLabel x={center} y={height - 40}>
                {company.key}
              </TickLabel>
              <text
                x={center}
                y={height - 20}
                textAnchor="middle"
                className="chart-group-note"
                style={{ fontFamily: svgFont }}
              >
                {company.key === "BILL" ? "STREAM COSTS N/D" : "FY2025"}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function HorizontalMetric({
  title,
  description,
  values,
  max,
  formatter,
  inverse = false,
}) {
  return (
    <div className="horizontal-metric">
      <div className="horizontal-metric__heading">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="horizontal-metric__scale">
        <span>0</span>
        <span>{formatter(max)}</span>
      </div>
      {companyList.map((company) => {
        const value = values(company);
        return (
          <div className="horizontal-metric__row" key={company.key}>
            <strong>{company.key}</strong>
            <div className="horizontal-metric__track">
              <div
                className={inverse ? "is-inverse" : ""}
                style={{
                  width: `${Math.min(100, Math.max(0, (value / max) * 100))}%`,
                  backgroundColor: company.color,
                }}
              />
            </div>
            <span>{formatter(value)}</span>
          </div>
        );
      })}
    </div>
  );
}

export function EfficiencyAndSbcChart() {
  return (
    <div className="paired-metrics">
      <HorizontalMetric
        title="Sales efficiency"
        description="Net new revenue per $1 of prior year S&M."
        values={(company) => company.salesEfficiency[3]}
        max={2.8}
        formatter={(value) => `${value.toFixed(2)}×`}
      />
      <HorizontalMetric
        title="Equity dilution"
        description="Stock based compensation as a share of revenue."
        values={(company) => company.sbcPercent[3]}
        max={18}
        formatter={(value) => `${value.toFixed(1)}%`}
        inverse
      />
    </div>
  );
}

export function LatestQuarterPulse() {
  return (
    <div className="pulse-grid">
      {companyList.map((company) => (
        <article className="pulse-card" key={company.key}>
          <div className="pulse-card__top">
            <span>{company.latestQuarter.label}</span>
            <span>{company.latestQuarter.period}</span>
          </div>
          <div className="pulse-card__metric">
            <strong>{formatPct(company.latestQuarter.growth, 0)}</strong>
            <span>YoY revenue growth</span>
          </div>
          <div className="mini-sparkline" aria-hidden="true">
            {company.growth.slice(1).map((value, index) => (
              <i
                key={index}
                style={{
                  height: `${Math.max(18, (value / 65) * 100)}%`,
                  backgroundColor: company.color,
                }}
              />
            ))}
            <i
              className="is-quarter"
              style={{
                height: `${Math.max(
                  18,
                  (company.latestQuarter.growth / 65) * 100
                )}%`,
                borderColor: company.color,
              }}
            />
          </div>
          <p>{company.latestQuarter.note}</p>
          <div className="pulse-card__footer">
            <strong>{company.key}</strong>
            <span>{formatMoney(company.latestQuarter.revenue)} revenue</span>
          </div>
        </article>
      ))}
    </div>
  );
}

const rows = [
  ["Revenue", (c) => formatMoney(c.revenue[3])],
  ["FY25 growth", (c) => formatPct(c.growth[3])],
  ["FY22→FY25 CAGR", (c) => formatPct(c.cagr)],
  ["Blended gross margin", (c) => formatPct(c.grossMargin[3])],
  [
    "Software gross margin",
    (c) => (c.softwareMargin[3] == null ? "n/d" : formatPct(c.softwareMargin[3])),
  ],
  [
    "Payments gross margin",
    (c) =>
      c.paymentsMargin[3] == null ? "n/d" : formatPct(c.paymentsMargin[3]),
  ],
  ["FCF margin", (c) => formatPct(c.fcfMargin[3])],
  ["Rule of 40", (c) => formatPct(c.rule40[3])],
  ["Sales efficiency", (c) => `${c.salesEfficiency[3].toFixed(2)}×`],
  ["SBC / revenue", (c) => formatPct(c.sbcPercent[3])],
  ["Net retention", (c) => (c.nrr == null ? "n/d" : formatPct(c.nrr, 0))],
];

export function ComparisonTable() {
  const [focusKey, setFocusKey] = useState("INTU");
  const headers = useMemo(() => companyList.map((company) => company.key), []);

  return (
    <div className="comparison-table-wrap">
      <div className="mobile-company-toggle" aria-label="Highlight a company">
        {headers.map((key) => (
          <button
            type="button"
            key={key}
            className={focusKey === key ? "is-active" : ""}
            onClick={() => setFocusKey(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Metric · FY2025</th>
            {companyList.map((company) => (
              <th
                key={company.key}
                className={focusKey === company.key ? "is-focused" : ""}
              >
                <span>{company.name}</span>
                <small>FY ends {company.fiscalEnd}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, getValue]) => (
            <tr key={label}>
              <th>{label}</th>
              {companyList.map((company) => (
                <td
                  key={company.key}
                  className={focusKey === company.key ? "is-focused" : ""}
                >
                  {getValue(company)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
