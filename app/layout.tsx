import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import "stream-chat-react/dist/css/v2/index.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatterbox - Online Chatting App",
  description: "Created by Yash Dwivedi!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}  antialiased`}>
          <Navbar/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
