import type { Metadata } from "next";
import '@/app/globals.css'
import ThemeRegistry from '@/components/ThemeRegistry'



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
