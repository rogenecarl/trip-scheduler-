import type { Metadata } from "next";
import { TripsClient } from "./trips-client";

export const metadata: Metadata = {
  title: "Trips",
  description: "Manage trips and import from CSV",
};

export default function TripsPage() {
  return <TripsClient />;
}
