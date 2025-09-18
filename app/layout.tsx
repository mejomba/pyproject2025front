import '@/app/globals.css'
import ThemeRegistry from '@/components/ThemeRegistry'
import { cookies } from 'next/headers';
import ProgressBarProvider from "./provider"


export const metadata = {
    title: 'PyProject2025',
    description: 'آموزش برنامه نویسی',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const modeCookie = cookieStore.get('color-mode')?.value;
    const initialMode = modeCookie === 'dark' ? 'dark' : 'light';
    return (
        <html lang="fa" dir="rtl">
        <body>
        <ProgressBarProvider />
        <ThemeRegistry initialMode={initialMode}>{children}</ThemeRegistry>
        </body>
        </html>
    )
}
