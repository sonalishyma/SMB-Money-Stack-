import "./globals.css";

const siteBasePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/+$/, "");
const walletIconUrl = `${siteBasePath}/icon.svg?v=3`;

export const metadata = {
  title: "The SMB Money Stack — Intuit vs. BILL vs. Toast",
  description:
    "A filing-led SaaS metrics teardown of three ways to monetize the small-business wallet.",
  icons: {
    icon: [{ url: walletIconUrl, type: "image/svg+xml" }],
    shortcut: walletIconUrl,
    apple: walletIconUrl,
  },
  metadataBase: new URL("https://smb-money-stack-teardown.sites.openai.com"),
  openGraph: {
    title: "The SMB Money Stack",
    description:
      "Intuit vs. BILL vs. Toast: growth, gross margin, sales efficiency, Rule of 40, and the five-year call.",
    type: "article",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
