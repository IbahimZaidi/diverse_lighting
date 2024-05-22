import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../HelpCompHeaderFooter/Header";
import Footer from "../HelpCompHeaderFooter/Footer";

export const metadata = {
  title: "Afric Light",
  description: "diverse Light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
