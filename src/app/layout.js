import "./globals.css";
import Header from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FloatingContact from "@/components/shared/FloatingContact";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://alwaqiah.com"), // TODO: প্রোডাকশনে সঠিক ডোমেইন দিয়ে আপডেট করুন
  title: "আল-ওয়াকিয়া হজ কাফেলা — বিশ্বস্ত হজ ও ওমরাহ এজেন্সি",
  description: "আল-ওয়াকিয়া হজ কাফেলার সাথে নিশ্চিন্তে হজ ও ওমরাহ পালন করুন। অভিজ্ঞ আলেম ও মুয়াল্লিমের তত্ত্বাবধানে মানসম্মত হজ-ওমরাহ প্যাকেজ, ভিসা, এয়ার টিকিট ও আবাসন সেবা।",
  keywords: [
    "আল-ওয়াকিয়া হজ কাফেলা",
    "হজ এজেন্সি বাংলাদেশ",
    "হজ প্যাকেজ",
    "ওমরাহ প্যাকেজ",
    "হজ প্যাকেজের মূল্য",
    "ওমরাহ প্যাকেজের মূল্য",
    "হজ ভিসা",
    "ওমরাহ ভিসা",
    "হজ ফ্লাইট সময়সূচী",
    "হজ প্রস্তুতি গাইড",
    "মদিনা জিয়ারত",
    "হজ কাফেলা",
    "সেরা হজ এজেন্সি",
    "Al Waqiah Hajj",
    "Al-Waqiah Hajj Kafela",
    "Hajj agency Bangladesh",
    "Umrah package Bangladesh",
  ],
  openGraph: {
    title: "আল-ওয়াকিয়া হজ কাফেলা — বিশ্বস্ত হজ ও ওমরাহ এজেন্সি",
    description: "অভিজ্ঞ আলেম ও মুয়াল্লিমের তত্ত্বাবধানে সুন্নাহ অনুযায়ী হজ ও ওমরাহের সম্পূর্ণ সেবা।",
    siteName: "আল-ওয়াকিয়া হজ কাফেলা",
    images: [
      {
        url: "/7.jpg",
        width: 1200,
        height: 630,
        alt: "আল-ওয়াকিয়া হজ কাফেলা — পবিত্র কাবা শরীফ",
      }
    ],
    locale: "bn_BD",
    type: "website"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        {/* Font Awesome CDN — for package feature icons from backend */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      {/* Apply Inter font using className */}
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
