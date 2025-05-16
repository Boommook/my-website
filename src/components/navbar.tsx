"use client"
import * as React from "react"
import Link from "next/link"
 
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useEffect, useRef, useState } from "react";


export const NavBar = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setVisible(true)
      }) 
      return () => clearTimeout(timeout)
    }, [])
    return (
        <NavigationMenu className="bg-green/65 backdrop-blur-md fixed max-h-16 z-100">
          <NavigationMenuList className="flex justify-between w-screen px-4 text-2xl text-black font-semibold">
            <NavigationMenuItem className={`transition-all duration-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}>
                Cole Bennett
            </NavigationMenuItem>
            <div className="flex gap-4">
            <NavigationMenuItem>
              <Link href="/" className={navigationMenuTriggerStyle()}>
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" className={navigationMenuTriggerStyle()}>
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/projects" className={navigationMenuTriggerStyle()}>
                Projects
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <button onClick={() => {window.open("/pdf/bennett_cole_resume.pdf", '_blank')}} className={navigationMenuTriggerStyle()}>
                Resume
              </button>
            </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
    );
}