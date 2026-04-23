import type { Metadata } from "next";
import AssignmentPage from "@/components/imgd_4300/AssignmentPage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IMGD 4300 - A4",
};

export default function A4Page() {
  return (
    <AssignmentPage title="A4: Reaction Diffusion" src="/imgd_4300/a4/index.html" />
  )
}

