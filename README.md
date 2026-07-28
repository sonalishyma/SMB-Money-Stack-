# The SMB Money Stack

A filing-led strategic finance case study comparing how **Intuit, BILL, and Toast** monetize the small-business wallet—and which growth model appears most durable over a five-year horizon.

[View the GitHub Pages site](https://sonalishyma.github.io/SMB-Money-Stack-/)

## The question

The customer is similar; the monetization layer changes:

| Company | Model | Primary engine |
| --- | --- | --- |
| Intuit | Software toolbench | Subscription software, with payments embedded in the ecosystem |
| BILL | Workflow + take rate | Software, transaction fees, and interest on customer funds |
| Toast | Payments operating system | Software and hardware distribution feeding a payments-led model |

The analysis asks: **Which growth engine is built to last?**

## What the case study analyzes

The comparison uses each company’s reported fiscal years from FY2022 through FY2025 without calendarizing them. Latest reported quarters are used only as a momentum check.

The comparable dashboard covers:

- Revenue growth and FY2022–FY2025 CAGR
- Revenue mix
- Blended and disclosed stream gross margins
- Free cash flow and FCF margin
- Rule of 40
- Sales efficiency
- Stock-based compensation as a percentage of revenue
- Net revenue retention, where disclosed

Every revenue mapping is reconciled to the reported total before entering a derived metric. Disclosure limitations remain visible: Intuit does not separately disclose payments revenue, and BILL does not disclose costs by revenue stream.

## Conclusion

The analysis identifies **Intuit as the strongest demonstrated five-year hold**, with Toast as the most credible challenger and BILL treated as a special situation.

- **Intuit:** 15.6% FY2025 growth plus a 32.3% FCF margin produced a 47.9% Rule of 40 score—the only result above the threshold.
- **Toast:** The strongest growth mechanics, including 24.1% growth, 2.54× sales efficiency, 3.9% SBC/revenue, and 109% NRR, but with cash conversion still developing.
- **BILL:** Strong gross margin and FCF generation, offset by slower growth, 0.36× sales efficiency, 16.6% SBC/revenue, and 94% net retention.

This is a portfolio case study for analytical discussion, not investment advice.

## Site features

- Interactive Rule of 40 ledger
- Five responsive, custom SVG exhibits
- Latest-quarter momentum cards
- Comparable FY2025 metrics table
- Downloadable CSV comparison
- Print-ready investment committee memo
- Responsive navigation and reduced-motion support
- Direct links to source filings

## Data sources

Annual metrics are derived from a local collection workbook and traced to public filings. The workbook is intentionally not included in this public repository. Quarterly results are kept separate from annual calculations.

- **Intuit:** [FY2025 10-K](https://www.sec.gov/Archives/edgar/data/896878/000089687825000035/intu-20250731.htm) · [Q3 FY2026 10-Q](https://www.sec.gov/Archives/edgar/data/896878/000089687826000025/intu-20260430.htm)
- **BILL:** [FY2025 10-K](https://www.sec.gov/Archives/edgar/data/1786352/000178635225000037/bill-20250630.htm) · [Q3 FY2026 10-Q](https://www.sec.gov/Archives/edgar/data/1786352/000162828026032387/bill-20260331.htm)
- **Toast:** [FY2025 10-K](https://www.sec.gov/Archives/edgar/data/1650164/000165016426000057/tost-20251231.htm) · [Q1 FY2026 10-Q](https://www.sec.gov/Archives/edgar/data/1650164/000165016426000114/tost-20260331.htm)
- **BILL deal context:** [Bloomberg, February 6, 2026](https://www.bloomberg.com/news/articles/2026-02-06/h-f-said-in-talks-for-buyout-of-payments-firm-bill-holdings)

Analysis as of July 27, 2026.

## Built with

- Next.js 16 and React 19
- Custom CSS and hand-built SVG visualizations
- Static export for GitHub Pages
- GitHub Actions for automated deployment

## Run locally

Node.js 20.9 or later is required.

```bash
git clone https://github.com/sonalishyma/SMB-Money-Stack-.git
cd SMB-Money-Stack-
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build and preview the production output:

```bash
npm run build
npm start
```

## Publish with GitHub Pages

The repository includes [a GitHub Pages workflow](.github/workflows/deploy-pages.yml). To enable it:

1. Open the repository’s **Settings** tab.
2. Select **Pages** under **Code and automation**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Merge the Pages workflow into `main`, or open **Actions → Deploy GitHub Pages** and run it manually.
5. When the workflow completes, the site will be available at [sonalishyma.github.io/SMB-Money-Stack-](https://sonalishyma.github.io/SMB-Money-Stack-/).

Every subsequent push to `main` will rebuild and redeploy the site automatically.
