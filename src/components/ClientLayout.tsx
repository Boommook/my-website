"use client"

import { RouteProvider } from "@/context/routecontext";
import AnimatedLayout from "./AnimatedLayout";

export default function ClientLayout({children}: {children: React.ReactNode}) {
    return (
        <RouteProvider>
            <AnimatedLayout>
                {children}
            </AnimatedLayout>
        </RouteProvider>
    )
}