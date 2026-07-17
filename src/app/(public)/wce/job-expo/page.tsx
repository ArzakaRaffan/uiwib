import type { Metadata } from "next";
import JobExpoClient from "./JobExpoClient";

export const metadata: Metadata = {
  title: "Job Expo | WCE | UIWIB",
};

export default function JobExpoPage() {
  return <JobExpoClient />;
}
