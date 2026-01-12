import { NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
];

export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { label: "Schedule Trip", href: "/schedule" },
  { label: "Manage Drivers", href: "/drivers" },
  { label: "Driver Calendar", href: "/calendar" },
];

export const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const DAY_LABELS: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};
