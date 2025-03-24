import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const workSans = localFont({
  src: [
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal"
    },

    {
      path: "./fonts/WorkSans-Thin.ttf",
      weight: "200",
      style: "normal"
    },
    {
      path: "./fonts/WorkSans-ExtraLight.ttf",
      weight: "100",
      style: "normal"
    }
  ],
  variable: "--font-work-sans"
});

export const metadata: Metadata = {
  title: "Next Blog",
  description: "Next 15 Blog App"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
            rel="stylesheet"
          />
        </Head>
        {/* <body className={`${workSans.variable} font-work-sans bg-neutral-200`}> */}
        <body className="bg-neutral-200 text-black font-paragraph">
          {children}
          <Toaster />
        </body>
      </html>
    </>
  );
}
