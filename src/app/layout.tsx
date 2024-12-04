import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Try and stick to this method for Google fonts, due to privacy/performance reasons.
import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "My Awesome Blog", // Base title (Used when the page doesn't have a title)
    template: "%s - My Awesome Blog", // Template for dynamic titles
    // absolute: "My Awesome Blog", // Absolute title (Ignores template)
  },
  description: "Come and read my awesome articles!",
  twitter: {
    card: "summary_large_image", // Can also be "summary"
  },

  // openGraph: {
  //   images: [
  //     {
  //       url: post.imageUrl
  //     }
  //   ]
  // }
  // robots: {
  //   index: false,
  //   follow: true,
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="p-5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

/* Favicon: 
  - 180x180px is the recommended size.
  - Must be named favicon.ico and placed in the app folder to be used automatically.

  Social Media cards: 
  - 1200x630px is the recommended size.
  - The image must be named opengraph-image.png and placed in the app folder to be used automatically.

  OG Images:
  - Should be dynamic and page specific.
  - Can be generated dynamically with tsx files, not just images.

  Site Maps:
  - For telling search engines about pages that should be indexed in Google. (Especially important for pages without links to them.)
  - Can be generated automatically with the 'sitemap.ts' (NOT tsx) file. (Preferred over manually creating one.)

  Robots.txt:
  - For telling search engines about pages that should NOT be indexed.
  - Can be generated automatically with the 'robots.ts' (NOT tsx) file. (Preferred over manually creating one.)

  General SEO:
  - Use the NextJS Image components, as it will increase performance and improve SEO.
  - Avoid 'dynamic' rendering as much as possible.

  USE THESE LINKS FOR TESTING:
  - https://www.opengraph.xyz/
  - https://socialsharepreview.com/
*/
