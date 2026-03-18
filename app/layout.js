export const metadata = {
  title: "AP Literature Engine",
  description: "Generate AP-level literary analysis instantly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
