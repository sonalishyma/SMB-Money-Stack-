export const years = ["FY22", "FY23", "FY24", "FY25"];

export const companies = {
  INTU: {
    key: "INTU",
    name: "Intuit",
    exchange: "NASDAQ",
    model: "Software toolbench",
    description:
      "Subscription software is the product and the profit pool. Payments exist inside the ecosystem, but Intuit does not disclose them as a clean revenue line.",
    fiscalEnd: "July 31",
    color: "#163a70",
    revenue: [12726, 14368, 16285, 18831],
    software: [12726, 14368, 16285, 18831],
    payments: [0, 0, 0, 0],
    other: [0, 0, 0, 0],
    growth: [null, 12.9027, 13.3421, 15.634],
    cagr: 13.9534,
    grossMargin: [81.0938, 78.125, 78.7228, 79.5656],
    softwareMargin: [81.0938, 78.125, 78.7228, 79.5656],
    paymentsMargin: [null, null, null, null],
    fcf: [3660, 4786, 4634, 6083],
    fcfMargin: [28.76, 33.3101, 28.4556, 32.3031],
    rule40: [null, 46.2129, 41.7978, 47.9371],
    salesEfficiency: [null, 0.4657, 0.5096, 0.5904],
    sbcPercent: [10.2782, 11.9154, 11.9128, 10.4509],
    nrr: null,
    latestQuarter: {
      label: "Q3 FY26",
      period: "Apr. 30, 2026",
      revenue: 8558,
      growth: 10,
      note: "Tax season quarter; nine month revenue grew 14%.",
    },
    verdict: "HOLD",
    ledgerStatus: "CLEARED",
    openItems: 2,
  },
  BILL: {
    key: "BILL",
    name: "BILL",
    exchange: "NYSE",
    model: "Workflow + take rate",
    description:
      "Software wins the workflow; transaction fees monetize the money movement; float adds a rate sensitive third engine.",
    fiscalEnd: "June 30",
    color: "#326bff",
    revenue: [641.959, 1058.468, 1290.172, 1462.57],
    software: [193.5, 253.3, 257.143, 272.136],
    payments: [439.865, 691.41, 865.59, 1028.668],
    other: [8.594, 113.758, 167.439, 161.766],
    growth: [null, 64.8809, 21.8905, 13.3624],
    cagr: 31.584,
    grossMargin: [77.4123, 81.6738, 81.8151, 81.3956],
    softwareMargin: [null, null, null, null],
    paymentsMargin: [null, null, null, null],
    fcf: [-33.729, 156.565, 257.878, 312.542],
    fcfMargin: [-5.2541, 14.7917, 19.9879, 21.3694],
    rule40: [null, 79.6726, 41.8784, 34.7318],
    salesEfficiency: [null, 1.356, 0.4492, 0.3603],
    sbcPercent: [30.7118, 29.6246, 19.2513, 16.5826],
    nrr: 94,
    latestQuarter: {
      label: "Q3 FY26",
      period: "Mar. 31, 2026",
      revenue: 406.563,
      growth: 13,
      note: "Core fees grew 16%; float revenue fell 7%.",
    },
    verdict: "WATCH",
    ledgerStatus: "OPEN",
    openItems: 4,
  },
  TOST: {
    key: "TOST",
    name: "Toast",
    exchange: "NYSE",
    model: "Payments operating system",
    description:
      "Software and hardware land the restaurant; payments carry the revenue. The model trades headline margin for embedded distribution.",
    fiscalEnd: "December 31",
    color: "#75b9ff",
    revenue: [2731, 3865, 4960, 6153],
    software: [324, 500, 706, 936],
    payments: [2268, 3189, 4053, 5037],
    other: [139, 176, 201, 180],
    growth: [null, 41.5233, 28.3312, 24.0524],
    cagr: 31.0957,
    grossMargin: [18.7111, 21.5783, 23.9919, 25.8898],
    softwareMargin: [65.4321, 66.8, 68.9802, 71.7949],
    paymentsMargin: [20.9877, 21.5114, 21.663, 22.7516],
    paymentsAdjustedMargin: [54.4196, 61.2335, 66.6667, 70.4244],
    fcf: [-189, 93, 306, 608],
    fcfMargin: [-6.9205, 2.4062, 6.1694, 9.8814],
    rule40: [null, 43.9295, 34.5005, 33.9338],
    salesEfficiency: [null, 3.5549, 2.7307, 2.5383],
    sbcPercent: [8.3486, 7.1669, 5.1008, 3.933],
    nrr: 109,
    latestQuarter: {
      label: "Q1 FY26",
      period: "Mar. 31, 2026",
      revenue: 1630,
      growth: 22,
      note: "Growth remained broad across software and fintech.",
    },
    verdict: "BUILD",
    ledgerStatus: "WATCH",
    openItems: 3,
  },
};

export const companyList = Object.values(companies);

export const sources = [
  {
    company: "Intuit",
    annual: "FY2025 10 K",
    annualUrl:
      "https://www.sec.gov/Archives/edgar/data/896878/000089687825000035/intu-20250731.htm",
    quarterly: "Q3 FY2026 10 Q",
    quarterlyUrl:
      "https://www.sec.gov/Archives/edgar/data/896878/000089687826000025/intu-20260430.htm",
  },
  {
    company: "BILL",
    annual: "FY2025 10 K",
    annualUrl:
      "https://www.sec.gov/Archives/edgar/data/1786352/000178635225000037/bill-20250630.htm",
    quarterly: "Q3 FY2026 10 Q",
    quarterlyUrl:
      "https://www.sec.gov/Archives/edgar/data/1786352/000162828026032387/bill-20260331.htm",
  },
  {
    company: "Toast",
    annual: "FY2025 10 K",
    annualUrl:
      "https://www.sec.gov/Archives/edgar/data/1650164/000165016426000057/tost-20251231.htm",
    quarterly: "Q1 FY2026 10 Q",
    quarterlyUrl:
      "https://www.sec.gov/Archives/edgar/data/1650164/000165016426000114/tost-20260331.htm",
  },
];

export const buyoutSource = {
  label: "Bloomberg, Feb. 6, 2026",
  url: "https://www.bloomberg.com/news/articles/2026-02-06/h-f-said-in-talks-for-buyout-of-payments-firm-bill-holdings",
};

export const formatPct = (value, digits = 1) =>
  value == null ? "n/d" : `${value.toFixed(digits)}%`;

export const formatMoney = (value) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(value >= 10000 ? 1 : 2)}B`;
  return `$${value.toFixed(value % 1 ? 1 : 0)}M`;
};

export const normalizedRevenue = companyList.map((company) => ({
  key: company.key,
  color: company.color,
  values: company.revenue.map((value) => (value / company.revenue[0]) * 100),
}));
