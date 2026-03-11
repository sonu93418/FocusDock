import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "FocusDock - Productivity Dashboard",
  description: "Aesthetic productivity dashboard for your 7-day work challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full m-0 p-0 bg-deep-navy text-white">
        <div className="h-full w-full">{children}</div>
      </body>
    </html>
  );
}
