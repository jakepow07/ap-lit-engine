import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "AP Literature Engine",
  description: "Generate AP-level literary analysis instantly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-FDT4PS5HZ6" />
    </html>
  );
}