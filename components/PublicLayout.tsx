"use client";
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { usePathname } from "next/navigation";

function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuth = ["/signin", "/signup"].includes(pathname);
  return (
    <>
      {!isDashboard && !isAuth && <Navbar />}
      {children}
      {!isDashboard && !isAuth && <Footer />}
    </>
  );
}

export default PublicLayout;
