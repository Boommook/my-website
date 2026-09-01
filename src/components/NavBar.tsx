"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { withBasePath } from "@/lib/paths";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/imgd_4300", label: "IMGD 4300" },
];
const focusStyle = "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tangerine";

export const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(true));
    return () => window.clearTimeout(timeout);
  }, []);
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const desktopClass = (href: string) => `${navigationMenuTriggerStyle()} ${focusStyle} h-full ${isActive(href) ? "bg-cyan/40 font-semibold text-tangerine shadow-[inset_2px_0_4px_rgba(0,0,0,0.2),inset_-2px_0_4px_rgba(0,0,0,0.2)]" : "text-cyan/90 transition-all duration-400 hover:bg-silver/10 hover:shadow-[inset_2px_0_4px_rgba(0,0,0,0.2),inset_-2px_0_4px_rgba(0,0,0,0.2)]"}`;
  const mobileClass = (href: string) => `${focusStyle} rounded px-3 py-2 text-lg transition-colors hover:bg-cyan/70 hover:text-tangerine ${isActive(href) ? "bg-gray/10 font-semibold text-tangerine" : "text-gray"}`;

  return (
    <NavigationMenu aria-label="Primary navigation" className="shine fixed top-0 right-0 left-0 z-50 w-screen max-w-none justify-start border-b border-tangerine/30 backdrop-blur-sm shadow-[0_4px_4px_#999]">
      <NavigationMenuList className="flex w-screen items-center justify-between px-4">
        <NavigationMenuItem className={`text-lg font-bold text-cyan transition-all duration-400 sm:text-xl md:text-2xl ${visible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
          <div className="flex items-center gap-4">
            <HoverCard openDelay={10} closeDelay={100}>
              <HoverCardTrigger asChild><Image src={withBasePath("/images/boommook-cyan.png")} width={80} height={56} alt="Boommook logo" className="hidden h-auto w-20 md:block" priority /></HoverCardTrigger>
              <HoverCardContent className="ml-1 flex flex-col items-start gap-0.5 rounded-xl border-2 border-tangerine/30 p-2 shadow-lg"><h2 className="text-sm font-bold text-gray">Boommook</h2><p className="text-xs">This is my logo for my username and gamertag Boommook. I have used it since I created my first Minecraft account in 2012.</p></HoverCardContent>
            </HoverCard>
            <span className="text-xl text-cyan sm:text-2xl">Cole Bennett</span>
          </div>
        </NavigationMenuItem>
        <div className="hidden gap-2 text-cyan md:flex lg:gap-4">
          {NAV_ITEMS.map((item) => <NavigationMenuItem key={item.href}><Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={desktopClass(item.href)}>{item.label}</Link></NavigationMenuItem>)}
          <NavigationMenuItem><a href={withBasePath("/pdf/bennett_cole_resume.pdf")} target="_blank" rel="noopener noreferrer" className={`${navigationMenuTriggerStyle()} ${focusStyle}`}>Resume</a></NavigationMenuItem>
        </div>
        <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className={`p-2 text-cyan transition-colors hover:text-tangerine md:hidden ${focusStyle}`} aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">
          {mobileMenuOpen ? <X aria-hidden size={24} /> : <Menu aria-hidden size={24} />}
        </button>
      </NavigationMenuList>
      {mobileMenuOpen && <div id="mobile-navigation" className="absolute top-full right-0 left-0 z-40 w-full border-t border-cyan/30 bg-cyan/95 backdrop-blur-lg md:hidden"><div className="flex flex-col gap-2 px-4 py-2">
        {NAV_ITEMS.map((item) => <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={mobileClass(item.href)} onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>)}
        <a href={withBasePath("/pdf/bennett_cole_resume.pdf")} target="_blank" rel="noopener noreferrer" className={`${focusStyle} rounded px-3 py-2 text-lg font-medium text-gray transition-colors hover:bg-cyan/70 hover:text-tangerine`} onClick={() => setMobileMenuOpen(false)}>Resume</a>
      </div></div>}
    </NavigationMenu>
  );
};
