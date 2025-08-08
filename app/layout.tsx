import type { Metadata } from "next";
import '@/app/globals.css'
import ThemeRegistry from '@/components/ThemeRegistry'
import SidebarWrapper from "@/components/layout/SidebarWrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";



export const metadata = {
    title: 'PyProject2025',
    description: 'آموزش برنامه نویسی',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir="rtl">
        <body>
        <ThemeRegistry>{children}</ThemeRegistry>
        </body>
        </html>
    )
}
