"use client";

import { useEffect, useState } from "react";
import {
  ComparisonTable,
  EfficiencyAndSbcChart,
  GrowthIndexChart,
  LatestQuarterPulse,
  MarginDecompositionChart,
  MetricLedger,
  RevenueMixChart,
  RuleOf40Scatter,
} from "./components/Charts";
import {
  buyoutSource,
  companyList,
  formatMoney,
  formatPct,
  sources,
} from "../lib/data";

const navItems = [
  ["question", "Question"],
  ["data", "Data"],
  ["method", "Method"],
  ["findings", "Findings"],
  ["call", "The Call"],
];

function SectionLabel({ number, children, aside }) {
  return (
    <div className="section-label">
      <div>
        <span>{number}</span>
        <i />
        <p>{children}</p>
      </div>
      {aside && <p className="section-label__aside">{aside}</p>}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2v11m0 0 4-4m-4 4L6 9M3 16h14" />
    </svg>
  );
}

function exportComparison() {
  const header = ["Metric", ...companyList.map((company) => company.key)];
  const rows = [
    ["Fiscal year", "FY2025", "FY2025", "FY2025"],
    ["Revenue ($mm)", ...companyList.map((company) => company.revenue[3])],
    ["Revenue growth (%)", ...companyList.map((company) => company.growth[3])],
    ["FY22-FY25 CAGR (%)", ...companyList.map((company) => company.cagr)],
    [
      "Blended gross margin (%)",
      ...companyList.map((company) => company.grossMargin[3]),
    ],
    ["FCF margin (%)", ...companyList.map((company) => company.fcfMargin[3])],
    ["Rule of 40 (%)", ...companyList.map((company) => company.rule40[3])],
    [
      "Sales efficiency (x)",
      ...companyList.map((company) => company.salesEfficiency[3]),
    ],
    [
      "SBC as % of revenue",
      ...companyList.map((company) => company.sbcPercent[3]),
    ],
    ["NRR (%)", ...companyList.map((company) => company.nrr ?? "n/d")],
  ];
  const csv = [header, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(",")
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "smb-money-stack-comparison.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("question");

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((node) => revealObserver.observe(node));

    const sections = navItems
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { threshold: [0.15, 0.35, 0.65], rootMargin: "-15% 0px -55% 0px" }
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const updateProgress = () => {
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? window.scrollY / distance : 0;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${Math.min(1, Math.max(0, progress)) * 100}%`
      );
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Back to top">
          <span>SS</span>
          <div>
            <strong>STRATEGIC FINANCE</strong>
            <small>CASE STUDY · 06C</small>
          </div>
        </a>

        <button
          type="button"
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "is-open" : ""} aria-label="Case study">
          {navItems.map(([id, label]) => (
            <a
              href={`#${id}`}
              key={id}
              className={activeSection === id ? "is-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#call">
          Read the memo <ArrowIcon />
        </a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero__wash" aria-hidden="true">
            LEDGER / 06C / SMB
          </div>
          <div className="hero__meta reveal">
            <span>PUBLIC FILINGS · FY2022–FY2025</span>
            <span>ANALYSIS AS OF JULY 27, 2026</span>
          </div>
          <div className="hero__grid">
            <div className="hero__copy reveal">
              <p className="eyebrow brass">THE SMB MONEY STACK</p>
              <h1>
                Three ways to
                <br />
                monetize the same
                <br />
                <em>small-business wallet.</em>
              </h1>
              <p className="hero__lede">
                Intuit sells the software. BILL sells the workflow plus a cut
                of each payment. Toast sells the operating system where
                payments are the business model. Which growth engine is built
                to last?
              </p>
              <div className="hero__call">
                <span>THE FIVE-YEAR CALL</span>
                <p>
                  Hold <strong>Intuit</strong>. Watch <strong>Toast</strong>.
                  Underwrite <strong>BILL</strong> as a special situation.
                </p>
              </div>
              <div className="hero__actions">
                <a href="#findings" className="button button--dark">
                  Open the dashboard <ArrowIcon />
                </a>
                <button
                  type="button"
                  className="button button--text"
                  onClick={exportComparison}
                >
                  Export comparison <DownloadIcon />
                </button>
              </div>
            </div>
            <div className="hero__visual reveal reveal--delay">
              <MetricLedger />
              <div className="figure-caption">
                <span>FIG. A</span>
                <em>A live Rule of 40 reconciliation</em>
              </div>
            </div>
          </div>
          <div className="hero__index reveal">
            {navItems.map(([id, label], index) => (
              <a href={`#${id}`} key={id}>
                <span>0{index + 1}</span>
                <strong>{label}</strong>
              </a>
            ))}
          </div>
        </section>

        <section className="section section--question" id="question">
          <SectionLabel number="01" aside="ONE WALLET · THREE REVENUE ENGINES">
            THE QUESTION
          </SectionLabel>
          <div className="question-heading reveal">
            <p className="eyebrow">WHY THESE THREE</p>
            <h2>
              The customer is the constant.
              <br />
              <em>The monetization layer changes.</em>
            </h2>
          </div>

          <div className="model-grid">
            {companyList.map((company, index) => (
              <article
                className={`model-card reveal ${
                  index === 1 ? "reveal--delay" : ""
                }`}
                key={company.key}
              >
                <div className="model-card__top">
                  <span>0{index + 1}</span>
                  <span>
                    {company.exchange} · {company.key}
                  </span>
                </div>
                <h3>{company.model}</h3>
                <p>{company.description}</p>
                <div className="model-card__metric">
                  <strong>{formatMoney(company.revenue[3])}</strong>
                  <span>FY25 revenue</span>
                </div>
                <div className="model-card__rule" />
                <div className="model-card__footer">
                  <span>FY ends {company.fiscalEnd}</span>
                  <span>{formatPct(company.cagr)} CAGR</span>
                </div>
              </article>
            ))}
          </div>

          <div className="origin-note reveal">
            <div className="origin-note__mark">“</div>
            <p>
              I ran QuickBooks daily in an accounting internship—Intuit was my
              toolbench. BILL is what the AP/AR workflows I did by hand look
              like as a product. Toast is the same idea taken to its extreme,
              where software is the wedge and payments are the revenue.
            </p>
            <span>THE ANALYST’S ANGLE</span>
          </div>
        </section>

        <section className="section section--data" id="data">
          <SectionLabel number="02" aside="SEC EDGAR · 10-K + LATEST 10-Q">
            THE DATA
          </SectionLabel>
          <div className="split-heading reveal">
            <div>
              <p className="eyebrow brass">THE EVIDENCE BASE</p>
              <h2>
                Four fiscal years.
                <br />
                <em>No calendarizing.</em>
              </h2>
            </div>
            <div className="split-heading__copy">
              <p>
                Each company keeps its reported fiscal year. Intuit ends July
                31, BILL June 30, and Toast December 31. Aligning them to a
                common calendar would create precision the filings do not
                support.
              </p>
              <p className="annotation">
                Four annual observations create three compounding intervals;
                the displayed CAGR runs from FY2022 to FY2025.
              </p>
            </div>
          </div>

          <div className="data-register reveal">
            <div className="data-register__header">
              <span>COLLECTION REGISTER</span>
              <span>STATUS · RECONCILED</span>
            </div>
            <div className="data-register__grid">
              <div>
                <strong>3</strong>
                <span>public companies</span>
              </div>
              <div>
                <strong>12</strong>
                <span>core line items / FY</span>
              </div>
              <div>
                <strong>4</strong>
                <span>annual periods / company</span>
              </div>
              <div>
                <strong>0</strong>
                <span>revenue check breaks</span>
              </div>
            </div>
            <div className="data-register__note">
              <span>CONTROL</span>
              <p>
                Every revenue mapping must tie back to the reported total
                before it enters a metric. All dollar figures are in millions.
              </p>
              <b>✓</b>
            </div>
          </div>

          <div className="subsection-heading reveal">
            <p className="eyebrow">THE LATEST PULSE</p>
            <h3>Annual durability, checked against current momentum.</h3>
            <p>
              The latest reported quarters preserve the same ordering: Toast
              grows fastest; Intuit compounds more slowly; BILL’s core
              transaction engine outgrows its rate-sensitive float.
            </p>
          </div>
          <LatestQuarterPulse />
        </section>

        <section className="section section--method" id="method">
          <SectionLabel number="03" aside="COLLECT · CHECK · COMPUTE · INTERPRET">
            THE METHOD
          </SectionLabel>
          <div className="method-layout">
            <div className="method-intro reveal">
              <p className="eyebrow brass">THE TEARDOWN ENGINE</p>
              <h2>
                Build the truth
                <br />
                <em>one auditable line at a time.</em>
              </h2>
              <p>
                The model separates raw filing inputs from derived metrics.
                Yellow cells hold sourced values; formulas carry the
                comparison. Judgment calls stay visible instead of being
                hidden inside a chart.
              </p>
              <div className="method-stamp">
                <strong>DATA CHECK</strong>
                <span>12 / 12 PERIODS TIE</span>
              </div>
            </div>

            <div className="method-steps">
              {[
                [
                  "Collect",
                  "Revenue streams, stream costs, sales & marketing, SBC, OCF, capex, and NRR where disclosed.",
                ],
                [
                  "Reconcile",
                  "Computed revenue must equal the reported income-statement total in every company-year.",
                ],
                [
                  "Compute",
                  "Growth, margin, FCF, Rule of 40, sales efficiency, dilution, and revenue mix flow from formulas.",
                ],
                [
                  "Interpret",
                  "Separate model economics from disclosure artifacts before making the five-year call.",
                ],
              ].map(([title, copy], index) => (
                <article className="method-step reveal" key={title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="formula-grid reveal">
            <article>
              <span>01</span>
              <h4>Rule of 40</h4>
              <p>YoY revenue growth</p>
              <b>+</b>
              <p>FCF margin</p>
            </article>
            <article>
              <span>02</span>
              <h4>Sales efficiency</h4>
              <p>Net new revenue</p>
              <b>÷</b>
              <p>Prior-year S&amp;M</p>
            </article>
            <article>
              <span>03</span>
              <h4>Free cash flow</h4>
              <p>Operating cash flow</p>
              <b>−</b>
              <p>Capital expenditure</p>
            </article>
            <article>
              <span>04</span>
              <h4>Stream margin</h4>
              <p>Revenue − direct cost</p>
              <b>÷</b>
              <p>Stream revenue</p>
            </article>
          </div>

          <div className="judgment-grid">
            <article className="judgment-note reveal">
              <span>DISCLOSURE NOTE · INTUIT</span>
              <h3>Payments are embedded, not isolated.</h3>
              <p>
                QuickBooks Payments sits inside broader online services.
                Because the filing does not support a clean split, the model
                maps total revenue to software and leaves payments blank.
              </p>
            </article>
            <article className="judgment-note reveal reveal--delay">
              <span>DISCLOSURE NOTE · BILL</span>
              <h3>Stream costs are not disclosed.</h3>
              <p>
                BILL reports one combined cost-of-revenue line. The analysis
                uses blended gross margin only; any 100% stream margin is a
                spreadsheet artifact, not an economic claim.
              </p>
            </article>
          </div>
        </section>

        <section className="section section--findings" id="findings">
          <SectionLabel number="04" aside="05 EXHIBITS · ONE DURABILITY RANKING">
            THE FINDINGS
          </SectionLabel>
          <div className="findings-heading reveal">
            <div>
              <p className="eyebrow brass">THE COMPARISON DASHBOARD</p>
              <h2>
                Growth is easy to spot.
                <br />
                <em>Durability lives in the mix.</em>
              </h2>
            </div>
            <div>
              <p>
                The charts move from output to mechanism: first the Rule of 40,
                then the four-year growth path, the revenue engine, the margin
                anatomy, and finally the cost of acquiring that growth.
              </p>
              <button
                type="button"
                className="button button--outline"
                onClick={exportComparison}
              >
                Export source table <DownloadIcon />
              </button>
            </div>
          </div>

          <div className="exhibit-grid">
            <article className="exhibit exhibit--wide reveal" id="exhibit-1">
              <div className="exhibit__header">
                <div>
                  <span>EXHIBIT 01 · DURABILITY</span>
                  <h3>Growth × cash conversion</h3>
                </div>
                <p>FY2025 · bubble size approximates revenue scale</p>
              </div>
              <RuleOf40Scatter />
              <div className="exhibit__footer">
                <span>READ</span>
                <p>
                  Intuit is the only FY2025 name above the line. Toast owns the
                  growth axis; Intuit owns the cash-conversion axis.
                </p>
                <b>47.9%</b>
              </div>
            </article>

            <aside className="finding-card finding-card--blue reveal">
              <span>FINDING 01</span>
              <h3>
                Intuit’s lead is not speed.
                <br />
                It is self-funding growth.
              </h3>
              <p>
                A 32.3% FCF margin gives Intuit room to reinvest, repurchase,
                and absorb misses without making the thesis depend on a future
                margin bridge.
              </p>
              <div>
                <strong>15.6%</strong>
                <span>growth</span>
                <i>+</i>
                <strong>32.3%</strong>
                <span>FCF margin</span>
              </div>
            </aside>

            <article className="exhibit reveal" id="exhibit-2">
              <div className="exhibit__header">
                <div>
                  <span>EXHIBIT 02 · GROWTH PATH</span>
                  <h3>Four years, normalized</h3>
                </div>
                <p>FY2022 = 100</p>
              </div>
              <GrowthIndexChart />
              <div className="exhibit__footer">
                <span>READ</span>
                <p>
                  BILL and Toast both more than doubled revenue. Their latest
                  annual growth is now 13.4% and 24.1%, respectively.
                </p>
              </div>
            </article>

            <article className="exhibit reveal" id="exhibit-3">
              <div className="exhibit__header">
                <div>
                  <span>EXHIBIT 03 · REVENUE ENGINE</span>
                  <h3>What each dollar is made of</h3>
                </div>
                <p>FY2025 revenue mix</p>
              </div>
              <RevenueMixChart />
              <div className="exhibit__footer">
                <span>READ</span>
                <p>
                  Toast is 81.9% payments revenue. BILL is 70.3% transaction and
                  11.1% rate-sensitive float. Intuit’s payments mix is not
                  separately disclosed.
                </p>
              </div>
            </article>

            <article className="exhibit exhibit--wide reveal" id="exhibit-4">
              <div className="exhibit__header">
                <div>
                  <span>EXHIBIT 04 · THE AHA</span>
                  <h3>Headline margin hides the product stack</h3>
                </div>
                <p>GAAP gross margin · FY2025</p>
              </div>
              <MarginDecompositionChart />
              <div className="margin-callout">
                <div>
                  <span>TOAST · REPORTED</span>
                  <strong>25.9%</strong>
                </div>
                <div className="margin-callout__arrow">
                  <i />
                  <span>DECOMPOSE</span>
                  <i />
                </div>
                <div>
                  <span>NET-REVENUE VIEW¹</span>
                  <strong>70.4%</strong>
                </div>
                <div>
                  <span>SOFTWARE</span>
                  <strong>71.8%</strong>
                </div>
                <div>
                  <span>PAYMENTS</span>
                  <strong>22.8%</strong>
                </div>
              </div>
              <p className="margin-footnote">
                ¹ Illustrative: gross profit ÷ (reported revenue − fintech cost
                of revenue). Fintech cost includes processor pass-throughs plus
                personnel and infrastructure, so this is not a GAAP
                restatement.
              </p>
              <div className="exhibit__footer">
                <span>READ</span>
                <p>
                  Toast is not simply a 26%-margin company. Netting fintech
                  processing cost from the revenue denominator produces an
                  illustrative 70.4% net-revenue margin; the software layer is
                  71.8%.
                </p>
                <b>+$225M</b>
                <small>hardware / services cost above revenue</small>
              </div>
            </article>

            <aside className="finding-card finding-card--brass reveal">
              <span>FINDING 02</span>
              <h3>
                Toast has the best
                <br />
                growth mechanics.
              </h3>
              <p>
                The fastest growth, highest sales efficiency, lowest SBC
                burden, and 109% NRR make Toast the credible challenger—if cash
                conversion keeps climbing.
              </p>
              <div>
                <strong>2.54×</strong>
                <span>sales efficiency</span>
              </div>
            </aside>

            <article className="exhibit exhibit--wide reveal" id="exhibit-5">
              <div className="exhibit__header">
                <div>
                  <span>EXHIBIT 05 · QUALITY OF GROWTH</span>
                  <h3>Acquisition efficiency versus equity cost</h3>
                </div>
                <p>FY2025</p>
              </div>
              <EfficiencyAndSbcChart />
              <p className="metric-footnote">
                Sales efficiency is directionally useful, not perfectly
                apples-to-apples: Toast and BILL report gross transaction
                revenue, and BILL records Divvy rewards inside sales &amp;
                marketing.
              </p>
              <div className="exhibit__footer">
                <span>READ</span>
                <p>
                  Toast adds revenue with far less go-to-market spend and
                  dilution. BILL’s 0.36× efficiency, 16.6% SBC, and 94% net
                  retention create a private-equity playbook—and a
                  public-market warning.
                </p>
              </div>
            </article>
          </div>

          <div className="table-section reveal">
            <div className="table-section__heading">
              <div>
                <p className="eyebrow">THE FULL LEDGER</p>
                <h3>Comparable metrics, one view.</h3>
              </div>
              <p>
                “n/d” means the company did not disclose a decision-useful
                figure. BILL’s 94% FY25 net dollar-based retention is corrected
                from the blank workbook input using its 10-K.
              </p>
            </div>
            <ComparisonTable />
          </div>
        </section>

        <section className="section section--call" id="call">
          <SectionLabel number="05" aside="INVESTMENT COMMITTEE MEMO · 1 PAGE">
            THE CALL
          </SectionLabel>
          <div className="call-intro reveal">
            <div>
              <p className="eyebrow brass">THE FIVE-YEAR HOLD</p>
              <h2>
                Buy the proof.
                <br />
                <em>Keep the optionality on watch.</em>
              </h2>
            </div>
            <p>
              Intuit wins on demonstrated durability. Toast has the best path
              to change the ranking. BILL’s filing data explain the sponsor
              interest—but they do not make the operating questions disappear.
            </p>
          </div>

          <article className="memo-sheet reveal">
            <div className="memo-sheet__masthead">
              <div>
                <span>STRATEGIC FINANCE</span>
                <strong>INVESTMENT COMMITTEE</strong>
              </div>
              <div>
                <span>MEMORANDUM</span>
                <strong>27 JUL 2026</strong>
              </div>
            </div>
            <div className="memo-sheet__subject">
              <span>SUBJECT</span>
              <h3>The SMB Money Stack · five-year durability</h3>
              <div className="memo-sheet__status">
                <strong>INTU</strong>
                <span>CONVICTION · HIGH</span>
              </div>
            </div>
            <div className="memo-sheet__body">
              <aside>
                <div>
                  <span>RECOMMENDATION</span>
                  <strong>HOLD INTUIT</strong>
                </div>
                <div>
                  <span>CHALLENGER</span>
                  <strong>TOAST</strong>
                </div>
                <div>
                  <span>SPECIAL SITUATION</span>
                  <strong>BILL</strong>
                </div>
                <div>
                  <span>TIME HORIZON</span>
                  <strong>5 YEARS</strong>
                </div>
              </aside>
              <div className="memo-copy">
                <p className="memo-opening">
                  If I had to hold one for five years, I would hold Intuit. The
                  call rests on two FY2025 numbers: a <strong>47.9%</strong>{" "}
                  Rule of 40 score and a <strong>32.3%</strong> free-cash-flow
                  margin.
                </p>
                <p>
                  <a href="#exhibit-1">Exhibit 1</a> makes the durability
                  ranking clear. Intuit is the only company above the 40%
                  threshold: 15.6% growth plus a 32.3% FCF margin. BILL reaches
                  34.7%; Toast 33.9%. The four-observation CAGRs reverse the
                  headline—31.6% for BILL and 31.1% for Toast versus 14.0% for
                  Intuit—but the latest year shows what those averages conceal.
                  Intuit’s growth is not the fastest; it is the least dependent
                  on future margin improvement.
                </p>
                <p>
                  <a href="#exhibit-4">Exhibit 4</a> changes the Toast
                  interpretation. Its 25.9% blended margin contains a 71.8%
                  software layer and a 22.8% payments layer. Hardware and
                  professional services generated $180 million of revenue
                  against $405 million of cost, including acquired-intangible
                  amortization. That strengthens the long-term margin case, but
                  81.9% of current revenue still comes from payments.
                </p>
                <p>
                  <a href="#exhibit-5">Exhibit 5</a> belongs to Toast: $2.54 of
                  incremental revenue per dollar of prior-year S&amp;M, 3.9%
                  SBC / revenue, and 109% NRR. It has the best upside to the
                  ranking, but its 9.9% FCF margin keeps that upside as an
                  execution requirement—not yet a proven result.
                </p>
                <p>
                  BILL’s sponsor appeal is visible in the filings: 81.4%
                  blended gross margin, 21.4% FCF margin, and $312.5 million of
                  FCF on $1.46 billion of revenue. Its 0.36× sales efficiency
                  and 16.6% SBC burden create obvious levers. The harder facts
                  are structural: growth has slowed to 13.4%, 70.3% of revenue
                  is transaction-based, 11.1% is float, and net dollar-based
                  retention is 94%. The data explain why private equity is
                  interested; they do not answer what price it should pay.
                </p>
              </div>
            </div>
            <div className="memo-sheet__signature">
              <div>
                <em>S. Singh</em>
                <span>ANALYST</span>
              </div>
              <div className="call-stamp">
                <strong>HOLD</strong>
                <span>INTUIT · 5Y</span>
              </div>
            </div>
          </article>

          <div className="print-row reveal">
            <p>
              The memo is formatted for print. Use your browser’s “Save as
              PDF” option for a one-page handoff.
            </p>
            <button
              type="button"
              className="button button--dark"
              onClick={() => window.print()}
            >
              Print the memo <ArrowIcon />
            </button>
          </div>

          <div className="risk-heading reveal">
            <p className="eyebrow">WHAT BREAKS THE CALL</p>
            <h3>Three models, three distinct failure modes.</h3>
          </div>
          <div className="risk-grid">
            <article className="risk-card reveal">
              <span>INTU · OPACITY</span>
              <h4>The mix can move before the model sees it.</h4>
              <p>
                Embedded payments are not isolated in the filing. A lower-margin
                mix shift, tax-season concentration, or weaker Mailchimp /
                Credit Karma execution could pressure the quality signal.
              </p>
              <strong>MONITOR · ONLINE SERVICES MIX</strong>
            </article>
            <article className="risk-card reveal reveal--delay">
              <span>BILL · STRUCTURE</span>
              <h4>Cost levers may not fix demand quality.</h4>
              <p>
                High dilution and weak efficiency can be attacked. Transaction
                concentration, falling float yield, credit exposure, and 94%
                net retention are harder to solve with a sponsor playbook.
              </p>
              <strong>MONITOR · CORE FEES VS. FLOAT</strong>
            </article>
            <article className="risk-card reveal">
              <span>TOST · CONVERSION</span>
              <h4>Distribution can remain expensive at scale.</h4>
              <p>
                Restaurant cyclicality, interchange economics, and a
                loss-leading hardware wedge could keep blended margin and cash
                conversion below the level its growth rate deserves.
              </p>
              <strong>MONITOR · FCF MARGIN</strong>
            </article>
          </div>
        </section>

        <section className="sources-section">
          <div className="sources-section__heading">
            <div>
              <p className="eyebrow brass">SOURCES &amp; NOTES</p>
              <h2>Read the filings behind the call.</h2>
            </div>
            <p>
              Annual metrics come from the supplied collection workbook and
              are traceable to SEC filings. Quarterly figures are used as a
              current-momentum check, not mixed into annual calculations.
            </p>
          </div>
          <div className="source-list">
            {sources.map((source, index) => (
              <div className="source-row" key={source.company}>
                <span>0{index + 1}</span>
                <strong>{source.company}</strong>
                <a
                  href={source.annualUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {source.annual} <ArrowIcon />
                </a>
                <a
                  href={source.quarterlyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {source.quarterly} <ArrowIcon />
                </a>
              </div>
            ))}
            <div className="source-row">
              <span>04</span>
              <strong>BILL deal context</strong>
              <a
                href={buyoutSource.url}
                target="_blank"
                rel="noreferrer"
              >
                {buyoutSource.label} <ArrowIcon />
              </a>
              <span className="source-row__note">
                Reported talks; no transaction assumed
              </span>
            </div>
          </div>
          <p className="source-disclaimer">
            For portfolio demonstration and analytical discussion only. This
            is not investment advice. Figures may not be perfectly comparable
            because fiscal calendars and disclosure taxonomies differ.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__brand">
          <strong>THE SMB MONEY STACK</strong>
          <span>INTUIT · BILL · TOAST</span>
        </div>
        <p>
          Built from public filings.
          <br />
          Designed as an analyst’s working paper.
        </p>
        <div className="site-footer__meta">
          <span>CASE 06C</span>
          <span>JULY 2026</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </>
  );
}
