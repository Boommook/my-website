"use client"

import {createContext, useContext, useLayoutEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation"

type RouteContextType = {
    prevPath: string | null;
    currPath: string;
  };

const RouteContext = createContext<RouteContextType>({
    prevPath: null,
    currPath: "/"
})

export const RouteProvider = ({children}: {children: React.ReactNode}) => {
    const pathname = usePathname();
    const prevRef = useRef<string | null>(null);
    const [prevPath, setPrevPath] = useState<string | null>(null);
    const [currPath, setCurrPath] = useState(pathname);

    useLayoutEffect(() => {
        if (pathname !== currPath) {
            setPrevPath(currPath);
            setCurrPath(pathname);
        }
    }, [pathname]);

    return <RouteContext.Provider value={{prevPath, currPath}}>{children}</RouteContext.Provider>
}

export const useRouteContext = () => useContext(RouteContext);