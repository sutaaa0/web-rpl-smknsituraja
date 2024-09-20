"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconMenu2,
    IconSettings,
    IconUserBolt,
    IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ToggleButton from "../ToggleButon";

interface Links {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const links: Links[] = [
    {
        label: "Dashboard",
        href: "#",
        icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Profile",
        href: "#",
        icon: (
            <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Settings",
        href: "#",
        icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Logout",
        href: "#",
        icon: (
            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
];

export function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between">
                <IconMenu2
                    className="text-neutral-800 dark:text-neutral-200"
                    onClick={() => setOpen(!open)}
                />
            </div>

            {/* Sidebar content */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={cn(
                            "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between"
                        )}
                    >
                        <div
                            className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                            onClick={() => setOpen(!open)}
                        >
                            <IconX />
                        </div>
                        <div className="flex flex-col gap-4 mt-8">
                            {links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className="flex items-center gap-3 text-neutral-700 dark:text-neutral-200 text-lg"
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
