import type { Metadata } from "next";
import { getAssignments } from "@/actions/assignment-actions";
import { AssignmentsClient } from "./assignments-client";

export const metadata: Metadata = {
  title: "Assignments",
  description: "View and manage driver assignments",
};

export default async function AssignmentsPage() {
  const result = await getAssignments();
  const initialAssignments = result.success ? result.data : [];

  return <AssignmentsClient initialAssignments={initialAssignments} />;
}
