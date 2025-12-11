import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Suprnova - Reindustrializing North America",
  description: "Building the next generation of factories to accelerate the pace of advanced manufacturing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {/* Continuous background */}
        <div className="site-bg" aria-hidden="true" />
        <div className="site-grid" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
