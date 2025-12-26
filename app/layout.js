import "./globals.css";
import AuthProvider from "@/lib/AuthProvider";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/components/LanguageProvider";

import { Domine } from "next/font/google";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

const domine = Domine({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-domine",
});

export const metadata = {
  title: "Houde Bag",
  description: "Houde bags internal testing & quality assurance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${domine.className} antialiased`}>
        <LanguageProvider>
          <AuthProvider>
            <Toaster richColors closeButton/>
            <Navbar />
            {children}
            <Footer/>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
