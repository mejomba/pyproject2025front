import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SidebarWrapper from "@/components/layout/SidebarWrapper";
import MobileNav from "@/components/layout/MobileNav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
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
