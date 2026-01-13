import type { Metadata } from "next";
import { getTrips } from "@/actions/trip-actions";
import { TripsClient } from "./trips-client";

export const metadata: Metadata = {
  title: "Trips",
  description: "Manage trips and import from CSV",
};

export default async function TripsPage() {
  const result = await getTrips();
  const initialTrips = result.success ? result.data : [];

  return <TripsClient initialTrips={initialTrips} />;
}
