import type { Metadata } from "next";
import AssignmentPage from "@/components/imgd_4300/AssignmentPage";

export const metadata: Metadata = {
  title: "IMGD 4300 - Final",
};

export default function FinalPage() {
  return (
    <AssignmentPage title="Final: XXXX" src="/imgd_4300/final/index.html" />
  )
}
