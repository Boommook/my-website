import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { InfoIcon, X } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"

  export const ProjectInfoPopup = ({ className }: { className?: string }) => {
    const [showPopup, setShowPopup] = useState(true)
    return (
        showPopup && (
        <Alert className="hidden md:flex absolute top-20 w-fit right-10 flex-row justify-between items-center gap-2
         shadow-md border-2 border-tangerine/20 rounded-xl px-2 py-1">
            <InfoIcon className="!text-cyan/80" />
            <AlertTitle className="my-auto pt-[2px]">
                Click a project to view more information.
            </AlertTitle>
            <Button variant="ghost" 
            className="hover:cursor-pointer hover:text-tangerine" onClick={() => setShowPopup(false)}><X 
            className="w-4 h-4 " /></Button>
        </Alert>
        )
    )
  }