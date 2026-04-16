import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "AP Literature Engine — Free AP Lit Analysis & Essay Grader",
  description:
    "Generate AP-level literary analysis, grade essays with Elements of Style annotations, and play infinite English literature trivia. Free tool for AP Literature students.",
  keywords:
    "AP Literature, AP Lit, essay grader, literary analysis, English literature trivia",
  openGraph: {
    title: "AP Literature Engine",
    description:
      "Free AP Literature analysis, essay grading, and trivia for students.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}
