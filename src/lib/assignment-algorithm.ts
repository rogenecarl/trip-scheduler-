/**
 * Fast Trip Assignment Algorithm
 * - Matches trips to drivers by day of week availability
 * - Balances workload evenly across drivers
 * - No AI = instant results (~1-5ms for 100 trips)
 */

type Trip = {
  id: string;
  tripId: string;
  dayOfWeek: number;
};

type Driver = {
  id: string;
  name: string;
  availability: { dayOfWeek: number }[];
};

type Assignment = {
  tripId: string;
  driverId: string;
  reasoning: string;
};

type DriverDistribution = {
  driverId: string;
  driverName: string;
  tripCount: number;
};

type AssignmentResult = {
  assignments: Assignment[];
  warnings: string[];
  summary: string;
  distribution: DriverDistribution[];
  stats: {
    totalTrips: number;
    assignedCount: number;
    unassignedCount: number;
  };
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function assignTripsToDrivers(
  trips: Trip[],
  drivers: Driver[]
): AssignmentResult {
  if (trips.length === 0) {
    return {
      assignments: [],
      warnings: [],
      summary: "No trips to assign",
      distribution: [],
      stats: { totalTrips: 0, assignedCount: 0, unassignedCount: 0 },
    };
  }

  if (drivers.length === 0) {
    return {
      assignments: [],
      warnings: ["No active drivers available"],
      summary: "Assignment failed: No drivers",
      distribution: [],
      stats: { totalTrips: trips.length, assignedCount: 0, unassignedCount: trips.length },
    };
  }

  // Track driver workload for balancing
  const driverLoad = new Map<string, number>();
  drivers.forEach((d) => driverLoad.set(d.id, 0));

  // Build lookup: dayOfWeek -> available drivers
  const driversByDay = new Map<number, Driver[]>();
  for (let day = 0; day < 7; day++) {
    driversByDay.set(
      day,
      drivers.filter((d) => d.availability.some((a) => a.dayOfWeek === day))
    );
  }

  const assignments: Assignment[] = [];
  const warnings: string[] = [];

  for (const trip of trips) {
    const availableDrivers = driversByDay.get(trip.dayOfWeek) || [];

    if (availableDrivers.length === 0) {
      warnings.push(
        `Trip ${trip.tripId}: No driver available on ${DAY_NAMES[trip.dayOfWeek]}`
      );
      continue;
    }

    // Select driver with lowest workload (load balancing)
    const selectedDriver = availableDrivers.reduce((minDriver, driver) => {
      const minLoad = driverLoad.get(minDriver.id) || 0;
      const currentLoad = driverLoad.get(driver.id) || 0;
      return currentLoad < minLoad ? driver : minDriver;
    });

    assignments.push({
      tripId: trip.id,
      driverId: selectedDriver.id,
      reasoning: `${DAY_NAMES[trip.dayOfWeek]} - ${selectedDriver.name} (balanced)`,
    });

    driverLoad.set(
      selectedDriver.id,
      (driverLoad.get(selectedDriver.id) || 0) + 1
    );
  }

  // Build distribution data
  const distribution: DriverDistribution[] = drivers
    .map((d) => ({
      driverId: d.id,
      driverName: d.name,
      tripCount: driverLoad.get(d.id) || 0,
    }))
    .filter((d) => d.tripCount > 0)
    .sort((a, b) => b.tripCount - a.tripCount);

  const unassignedCount = trips.length - assignments.length;

  return {
    assignments,
    warnings,
    summary: `Assigned ${assignments.length} of ${trips.length} trips`,
    distribution,
    stats: {
      totalTrips: trips.length,
      assignedCount: assignments.length,
      unassignedCount,
    },
  };
}
