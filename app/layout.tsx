import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "../components/context/context";
import { SocketProvider } from "../components/context/socketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZenChat",
  description: "Social media platform ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={inter.className}
        suppressHydrationWarning={true}>
        <ToastContainer />
        <AppProvider>
          <SocketProvider>{children}</SocketProvider>
        </AppProvider>
      </body>
    </html>
  );
}
