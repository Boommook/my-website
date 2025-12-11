"use client"
import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
      const timeout = setTimeout(() => {
        setVisible(true)
      }) 
      return () => clearTimeout(timeout)
    }, [])

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <NavigationMenu className="bg-gray backdrop-blur-md fixed top-0 left-0 right-0 z-50 w-screen max-w-none justify-start border-b border-tangerine/30">
          <NavigationMenuList className="flex justify-between items-center w-screen px-4">
            <NavigationMenuItem className={`hover:cursor-default transition-all duration-400 text-lg sm:text-xl md:text-2xl font-bold text-cyan ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}>
                Cole Bennett
            </NavigationMenuItem>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-2 lg:gap-4 text-cyan">
              <NavigationMenuItem>
                <Link href="/" className={`${navigationMenuTriggerStyle()} 
                ${pathname === "/" ? "bg-cyan/40 shadow-[inset_2px_0_4px_rgba(0,0,0,0.2),inset_-2px_0_4px_rgba(0,0,0,0.2)] !font-semibold text-tangerine"
                 : "text-cyan/90 hover:bg-silver/10 hover:shadow-[inset_2px_0_4px_rgba(0,0,0,0.2),inset_-2px_0_4px_rgba(0,0,0,0.2)]"}`}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" className={`${navigationMenuTriggerStyle()} 
                ${pathname === "/about" ? " bg-cyan/40 shadow-[inset_2px_0_4px_rgba(0,0,0,0.2),inset_-2px_0_4px_rgba(0,0,0,0.2)] !font-semibold text-tangerine"
                 : "text-cyan/90 hover:bg-silver/10 hover:shadow-[inset_2px_0_4px_rgba(0,0,0,0.2),inset_-2px_0_4px_rgba(0,0,0,0.2)]"}`}>
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/projects" className={`${navigationMenuTriggerStyle()} 
                ${pathname === "/projects" ? "bg-cyan/40 shadow-[inset_2px_0_4px_rgba(0,0,0,0.2),inset_-2px_0_4px_rgba(0,0,0,0.2)] !font-semibold text-tangerine"
                 : "text-cyan/90 hover:bg-silver/10 hover:shadow-[inset_2px_0_4px_rgba(0,0,0,0.2),inset_-2px_0_4px_rgba(0,0,0,0.2)]"}`}>
                  Projects
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button 
                  onClick={() => {window.open("/pdf/bennett_cole_resume.pdf", '_blank')}} 
                  className={`${navigationMenuTriggerStyle()} hover:cursor-pointer`}
                >
                  Resume
                </button>
              </NavigationMenuItem>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-cyan hover:cursor-pointer hover:text-tangerine transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </NavigationMenuList>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-cyan/95 backdrop-blur-lg border-t border-cyan/30 absolute top-full left-0 right-0 w-full z-40">
              <div className="flex flex-col px-4 py-2 space-y-2">
                <Link 
                  href="/" 
                  className="text-lg text-gray hover:text-tangerine hover:font-semibold hover:bg-cyan/70 py-2 px-3 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="text-lg text-gray hover:text-tangerine hover:font-semibold hover:bg-cyan/70 py-2 px-3 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/projects" 
                  className="text-lg text-gray hover:text-tangerine hover:font-semibold hover:bg-cyan/70 py-2 px-3 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </Link>
                <button 
                  onClick={() => {
                    window.open("/pdf/bennett_cole_resume.pdf", '_blank');
                    setMobileMenuOpen(false);
                  }} 
                  className="text-lg font-medium text-gray hover:text-tangerine hover:cursor-pointer hover:font-semibold hover:bg-cyan/70 py-2 px-3 rounded transition-colors text-left"
                >
                  Resume
                </button>
              </div>
            </div>
          )}
        </NavigationMenu>
    );
}
