import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, CssBaseline } from "@mui/joy";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import StoreProvider from "@/shared/config/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dolphilab — Інтелектуальна освітня платформа нового покоління",
  description:
    "Проводьте заняття та навчайтеся разом із Dolphilab — платформою, що поєднує людський досвід і можливості штучного інтелекту. Діліться експертизою, управляйте прогресом і розвивайтесь у єдиному просторі.",
  keywords: [
    "онлайн навчання",
    "освітня платформа",
    "штучний інтелект",
    "інструменти для викладачів",
    "цифрове навчання",
    "Dolphilab",
  ],
  authors: [{ name: "Dolphilab" }],
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
  openGraph: {
    title: "Dolphilab — Інтелектуальна освітня платформа нового покоління",
    description:
      "Проводьте заняття та навчайтеся разом із Dolphilab — платформою, що поєднує людський досвід і можливості штучного інтелекту. Діліться експертизою, управляйте прогресом і розвивайтесь у єдиному просторі.",
    type: "website",
    locale: "uk_UA",
    siteName: "Dolphilab",
    url: "https://www.dolphilab.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dolphilab — Інтелектуальна освітня платформа нового покоління",
    description:
      "Навчайтеся та проводьте заняття з підтримкою штучного інтелекту в єдиному просторі Dolphilab.",
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
        <StoreProvider>
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
        </StoreProvider>
      </body>
    </html>
  );
}
