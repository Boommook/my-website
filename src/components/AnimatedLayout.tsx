    "use client"

    import { NavBar } from "@/components/NavBar";
    import { Footer } from "@/components/Footer";

    // page animation stuff
    import { usePathname } from "next/navigation";
    import { animate, AnimatePresence, motion } from "framer-motion";
    import { useRouteContext } from "@/context/routecontext";
    import { PAGES } from "@/constants/routes";
    import { dir } from "console";


    export default function AnimatedLayout({children}: {children: React.ReactNode}) {
        const {prevPath, currPath} = useRouteContext();

        const currInd = PAGES.indexOf(currPath);
        const prevInd = prevPath ? PAGES.indexOf(prevPath) : -1;

        const direction = 
            prevInd === -1 || currInd === -1 ? "none" : currInd > prevInd ? "f" : "b";

        const variants = {
            initial: {
                x: direction === "f" ? 500 : direction === "b" ? -500 : 0, opacity: 0
            },
            animate: {
                x: 0,
                opacity: 1
            },
            exit: {
                x: direction === "f" ? 500 : direction === "b" ? -500 : 0, opacity: 0
            }
        }

        console.log("prev:", prevPath);
        console.log("current:", currPath);
        console.log("direction:", direction);

        return (
            <>
                <NavBar/>
                <AnimatePresence mode="wait">
                    <motion.main
                        key={currPath}
                        className="flex-grow mt-14"
                        initial="initial"
                        animate="animate"
                        variants={variants}
                        transition={{ duration: 0.4 }}>
                            {children}
                    </motion.main>
                </AnimatePresence>
                <Footer />
            </>
        )
    }