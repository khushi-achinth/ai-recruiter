"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import {SideBarOptions} from "@/services/constants";
import {usePathname} from "next/navigation";

function AppSidebar() {
    const path = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className="flex items-center">
                <Image loading="eager"
                       src="/logo.png"
                       alt="logo"
                       width={200}
                       height={100} className="w-37.5"/>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup/>
                <SidebarContent>
                    <SidebarMenu>
                        {SideBarOptions?.map((option, index) => (
                            <SidebarMenuItem key={index} className="ml-4 hover:bg-muted">
                                <Link href={option.path} className="p-4 flex flex-row flex-nowrap">
                                    <option.icon className={`${path === option.path && 'text-primary'}`}/>
                                    <span
                                        className={`${path === option.path && 'text-primary font-bold'} pl-2 text-[16px]`}>{option.name}</span>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                        
                    </SidebarMenu>
                </SidebarContent>
                <SidebarGroup/>
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    )
}

export default AppSidebar;