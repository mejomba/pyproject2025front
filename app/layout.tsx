import '@/app/globals.css'
import ThemeRegistry from '@/components/ThemeRegistry'
import { cookies } from 'next/headers';


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
        {/*<ThemeRegistry>{children}</ThemeRegistry>*/}
        <ThemeRegistry initialMode={initialMode}>{children}</ThemeRegistry>
        jafar
        </body>
        </html>
    )
}
