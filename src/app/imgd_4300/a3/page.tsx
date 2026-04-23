import type { Metadata } from "next";
import AssignmentPage from "@/components/imgd_4300/AssignmentPage";

export const metadata: Metadata = {
  title: "IMGD 4300 - A3",
};

export default function A3Page() {
  return (
    <AssignmentPage title="A3: WebGPU Intro" src="/imgd_4300/a3/index.html" />
  )
}
