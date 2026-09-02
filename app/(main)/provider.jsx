import React from 'react';
import {SidebarProvider} from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import AppTopBar from "@/app/(main)/_components/AppTopBar";

const DashboardProvider = ({children}) => {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="w-full bg-muted p-3">
                <AppTopBar/>
                {children}
            </div>
        </SidebarProvider>
    );
};

export default DashboardProvider;
