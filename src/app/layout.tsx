import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, CssBaseline } from "@mui/joy";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dolphilab - Маркетплейс онлайн-курсів нового покоління",
  description:
    "Створюйте, викладайте та навчайтеся разом із Dolphilab — платформою, що поєднує людський досвід і можливості штучного інтелекту. Викладайте свої знання, монетизуйте експертизу або вчіться у найкращих викладачів із підтримкою AI.",
  keywords: [
    "онлайн курси",
    "маркетплейс курсів",
    "навчання онлайн",
    "продаж курсів",
    "створення курсів",
    "AI навчання",
    "освітня платформа",
    "Dolphilab",
  ],
  authors: [{ name: "Dolphilab" }],
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
  openGraph: {
    title: "Dolphilab - Маркетплейс онлайн-курсів нового покоління",
    description:
      "Створюйте, викладайте та навчайтеся разом із Dolphilab — платформою, що поєднує людський досвід і можливості штучного інтелекту. Викладайте свої знання, монетизуйте експертизу або вчіться у найкращих викладачів із підтримкою AI.",
    type: "website",
    locale: "uk_UA",
    siteName: "Dolphilab",
    url: "https://www.dolphilab.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dolphilab - Маркетплейс онлайн-курсів нового покоління",
    description:
      "Платформа для створення, продажу та навчання через онлайн-курси з AI-підтримкою",
  },
  alternates: {
    canonical: "https://www.dolphilab.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ scrollBehavior: "smooth" }}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <CssVarsProvider>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              backgroundColor: "transparent",
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0) 100%)",
            }}
          >
            <Header />
            <Box
              component="main"
              sx={{
                flex: 1,
                backgroundColor: "transparent",
              }}
            >
              {children}
            </Box>
            <Footer />
          </Box>
        </CssVarsProvider>
      </body>
    </html>
  );
}
