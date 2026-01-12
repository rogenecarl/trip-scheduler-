import {
  Sparkles,
  FileSpreadsheet,
  Users,
  CalendarDays,
  Clock,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Assignment",
    description:
      "Gemini AI automatically matches drivers to trips based on their availability, ensuring optimal scheduling every time.",
  },
  {
    icon: FileSpreadsheet,
    title: "CSV Import",
    description:
      "Bulk import your trips from spreadsheets. Upload a CSV file and schedule multiple trips in seconds.",
  },
  {
    icon: Users,
    title: "Driver Management",
    description:
      "Easily manage your driver roster. Add, edit, or remove drivers and set their weekly availability.",
  },
  {
    icon: CalendarDays,
    title: "Calendar View",
    description:
      "Visual overview of all scheduled trips and driver availability. See your entire operation at a glance.",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description:
      "Changes sync instantly across the platform. Everyone stays on the same page, always.",
  },
  {
    icon: Shield,
    title: "Conflict Prevention",
    description:
      "Smart scheduling prevents double-booking and ensures drivers are only assigned when available.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-muted/30 py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage trips
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed to streamline your trip scheduling workflow
            and keep your drivers organized.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20"
            >
              {/* Icon */}
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="size-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
