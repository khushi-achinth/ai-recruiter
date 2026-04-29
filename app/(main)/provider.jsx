import React from 'react';
import {SidebarProvider} from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import WelcomeContainer from "@/app/(main)/dashboard/_components/WelcomeContainer";


const DashboardProvider = ({children}) => {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="w-full bg-muted p-3">
                {/* <SidebarTrigger/> */}
                <WelcomeContainer />
                {children}
            </div>
        </SidebarProvider>
    );
};

export default DashboardProvider;
