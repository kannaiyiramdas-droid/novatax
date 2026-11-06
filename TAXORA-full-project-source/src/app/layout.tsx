import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TAXORA | Tax Compliance Workspace",
  description: "A secure workspace for GST and tax compliance operations."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
