"use client"
import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
 
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
        <NavigationMenu className="bg-green/65 backdrop-blur-md fixed top-0 left-0 right-0 z-50 w-screen max-w-none justify-start">
          <NavigationMenuList className="flex justify-between items-center w-screen px-4 py-2">
            <NavigationMenuItem className={`transition-all duration-400 text-lg sm:text-xl md:text-2xl font-semibold text-black ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}>
                Cole Bennett
            </NavigationMenuItem>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-2 lg:gap-4">
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
                <button 
                  onClick={() => {window.open("/pdf/bennett_cole_resume.pdf", '_blank')}} 
                  className={navigationMenuTriggerStyle()}
                >
                  Resume
                </button>
              </NavigationMenuItem>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-black hover:text-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </NavigationMenuList>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-green backdrop-blur-md border-t border-green/20 absolute top-full left-0 right-0 w-full z-40">
              <div className="flex flex-col px-4 py-2 space-y-2">
                <Link 
                  href="/" 
                  className="text-lg font-medium text-black hover:text-gray-700 py-2 px-3 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="text-lg font-medium text-black hover:text-gray-700 py-2 px-3 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/projects" 
                  className="text-lg font-medium text-black hover:text-gray-700 py-2 px-3 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </Link>
                <button 
                  onClick={() => {
                    window.open("/pdf/bennett_cole_resume.pdf", '_blank');
                    setMobileMenuOpen(false);
                  }} 
                  className="text-lg font-medium text-black hover:text-gray-700 py-2 px-3 rounded transition-colors text-left"
                >
                  Resume
                </button>
              </div>
            </div>
          )}
        </NavigationMenu>
    );
}
