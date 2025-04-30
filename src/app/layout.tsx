import "./globals.css";
import type { Metadata } from "next";
import ReduxProvider from "./store/Provider";

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "Built with Next.js and Firebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Main content */}
        <main className="flex-1">
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
