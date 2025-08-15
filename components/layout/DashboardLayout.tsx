import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SidebarWrapper from '@/components/layout/SidebarWrapper';
import MobileNav from '@/components/layout/MobileNav';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SidebarWrapper>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </SidebarWrapper>
            <MobileNav />
        </>
    );
}