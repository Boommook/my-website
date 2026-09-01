    "use client"

    import { NavBar } from "@/components/NavBar";
    import { Footer } from "@/components/Footer";

    // page animation stuff
    import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
    import { useRouteContext } from "@/context/routecontext";
    import { PAGES } from "@/constants/routes";


    export default function AnimatedLayout({children}: {children: React.ReactNode}) {
        const {prevPath, currPath} = useRouteContext();
        const reduceMotion = useReducedMotion();

        const currInd = PAGES.indexOf(currPath);
        const prevInd = prevPath ? PAGES.indexOf(prevPath) : -1;

        const direction = 
            prevInd === -1 || currInd === -1 ? "none" : currInd > prevInd ? "f" : "b";

        const variants = {
            initial: {
                x: reduceMotion ? 0 : direction === "f" ? 500 : direction === "b" ? -500 : 0, opacity: 0
            },
            animate: {
                x: 0,
                opacity: 1
            },
            exit: {
                x: reduceMotion ? 0 : direction === "f" ? 500 : direction === "b" ? -500 : 0, opacity: 0
            }
        }

        return (
            <div className="flex min-h-dvh flex-1 flex-col overflow-hidden">
                <NavBar/>
                <AnimatePresence mode="wait">
                    <motion.main
                        key={currPath}
                        className="flex min-h-0 flex-1 flex-col pt-14"
                        initial="initial"
                        animate="animate"
                        variants={variants}
                        transition={{ duration: reduceMotion ? 0.12 : 0.4 }}>
                            {children}
                    </motion.main>
                </AnimatePresence>
                <Footer />
            </div>
        )
    }
