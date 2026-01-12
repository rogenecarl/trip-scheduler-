export interface Driver {
  id: string;
  name: string;
  availability: DayAvailability;
  createdAt: Date;
  updatedAt: Date;
}

export interface DayAvailability {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface Trip {
  id: string;
  tripId: string;
  date: Date;
  assignedDrivers: string[];
  status: "pending" | "assigned" | "completed";
  createdAt: Date;
}

export interface ScheduleEntry {
  date: Date;
  drivers: Driver[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}
