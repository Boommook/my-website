import type { Metadata } from "next";
import AssignmentPage from "@/components/imgd_4300/AssignmentPage";

export const metadata: Metadata = {
  title: "IMGD 4300 - A5",
};

export default function A5Page() {
  return (
    <AssignmentPage title="A5b: Particles" src="/imgd_4300/a5b/index.html" />
  );
}

