import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./GlobalStyles.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";
import { ToastProvider } from "@/hooks/ToastContext";

export const metadata: Metadata = {
  title: "MoviSub - Trang chủ",
  description: "Trang chủ của Web MoviSub xem phim trực tuyến",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html>
      <body>
        <ToastProvider>
          <SessionProvider session={session}>
            <Header />
            <div className="wrapper">{children}</div>
            <Footer />
          </SessionProvider>
          <ToastContainer position="top-center" autoClose={5000} />
        </ToastProvider>
      </body>
    </html>
  );
}
