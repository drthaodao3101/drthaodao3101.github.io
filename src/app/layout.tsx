import type { Metadata } from "next";
// Self-hosted fonts (no runtime dependency on Google Fonts; works offline & on GitHub Pages)
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/500.css";
import "@fontsource/newsreader/600.css";
import "@fontsource/newsreader/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://drthaodao3101.github.io"),
  title: "Thao Thi Phuong Dao | ENT Doctor & Medical AI Researcher",
  description:
    "Personal academic portfolio of Thao Thi Phuong Dao, MD, MSc — ENT doctor, computer scientist, and medical AI researcher specializing in otolaryngology, laryngoscopy image analysis, head-and-neck CT imaging, segmentation, radiomics, and explainable AI.",
  keywords: [
    "Thao Thi Phuong Dao",
    "Đào Thị Phương Thảo",
    "ENT doctor",
    "otolaryngology",
    "medical AI",
    "laryngoscopy",
    "vocal fold disease",
    "computer vision",
    "medical image analysis",
    "radiomics",
    "head and neck CT",
    "VNU-HCM",
    "Thong Nhat Hospital",
  ],
  authors: [{ name: "Thao Thi Phuong Dao" }],
  openGraph: {
    title: "Thao Thi Phuong Dao | ENT Doctor & Medical AI Researcher",
    description:
      "ENT doctor, computer scientist, and medical AI researcher — laryngoscopy, head-and-neck CT, segmentation, radiomics, explainable AI.",
    url: "https://drthaodao3101.github.io",
    siteName: "Thao Thi Phuong Dao — Portfolio",
    images: [{ url: "/images/profile/thao-dao-square.jpg", width: 600, height: 600 }],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <LanguageProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
