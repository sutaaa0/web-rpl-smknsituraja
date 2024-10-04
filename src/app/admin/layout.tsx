"use client";
import { IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Newspaper, SquarePen } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const prefetchTags = async () => {
        // The results of this query will be cached like a normal query
        await queryClient.prefetchQuery({
          queryKey: ['tags'],
          queryFn: async () => {
            const response = await axios.get('/api/tags');
            return response.data;
          },
        })
      }

    return (
        <div className={cn(
            "rounded-md flex flex-col md:flex-row bg-gray-50 dark:bg-neutral-900 w-full h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
        )}>
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody>
                    <div className="flex flex-col gap-2">
                        <SidebarLink link={{
                            label: "Dashboard",
                            href: "/admin/dashboard",
                            icon: (
                                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                            ),
                        }} />
                        <SidebarLink 
                            link={{
                                label: "Create News",
                                href: "/admin/create",
                                icon: (
                                    <SquarePen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" onClick={prefetchTags} />
                                ),
                            }}
                        />
                        <SidebarLink link={{
                            label: "News",
                            href: "/admin/news",
                            icon: (
                                <Newspaper className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                            ),
                        }} />
                        <SidebarLink link={{
                            label: "Profile",
                            href: "/admin/profile",
                            icon: (
                                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                            ),
                        }} />
                        <SidebarLink link={{
                            label: "Settings",
                            href: "/admin/settings",
                            icon: (
                                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                            ),
                        }} />
                    </div>
                </SidebarBody>
            </Sidebar>
            {children}
            <Toaster />
        </div>
    );
}
