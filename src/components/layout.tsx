// components/Layout.tsx

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    console.log("sdfhshjdfhjxhxksjahdkjahsdkjhjhvkjxhcvhsdhf");
    
    return (
        <SessionProvider>
            <div className="layout-container">
                <header>School Management App</header>
                <main>{children}</main>
            </div>
        </SessionProvider>
    );
};

export default Layout;
