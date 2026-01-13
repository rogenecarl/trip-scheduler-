import type { Metadata } from "next";
import { AssignmentsClient } from "./assignments-client";

export const metadata: Metadata = {
  title: "Assignments",
  description: "View and manage driver assignments",
};

export default function AssignmentsPage() {
  return <AssignmentsClient />;
}
