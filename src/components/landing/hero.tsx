import Link from "next/link";
import { ArrowRight, Calendar, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 size-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium">
                <Sparkles className="size-4 text-primary" />
                <span>AI-Powered Scheduling</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Smart Trip Scheduling,{" "}
              <span className="text-primary">Powered by AI</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground sm:text-xl max-w-xl mx-auto lg:mx-0">
              Automatically assign drivers to trips based on their availability.
              Save time, reduce errors, and keep your operations running smoothly.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="gap-2">
                <Link href="/schedule">
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-8 border-t pt-8">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold sm:text-3xl">100%</div>
                <div className="text-sm text-muted-foreground">Automated</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold sm:text-3xl">24/7</div>
                <div className="text-sm text-muted-foreground">Availability</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold sm:text-3xl">0</div>
                <div className="text-sm text-muted-foreground">Scheduling Conflicts</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:pl-8">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main card */}
              <div className="rounded-2xl border bg-card p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Today&apos;s Schedule</h3>
                  <span className="text-sm text-muted-foreground">3 trips</span>
                </div>
                <div className="space-y-3">
                  {[
                    { id: "TRIP-001", driver: "John D.", time: "09:00 AM" },
                    { id: "TRIP-002", driver: "Sarah M.", time: "11:30 AM" },
                    { id: "TRIP-003", driver: "Mike R.", time: "02:00 PM" },
                  ].map((trip) => (
                    <div
                      key={trip.id}
                      className="flex items-center justify-between rounded-lg border bg-muted/50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                          <Users className="size-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{trip.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {trip.driver}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{trip.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating card - Calendar */}
              <div className="absolute -right-4 -bottom-4 rounded-xl border bg-card p-4 shadow-lg sm:-right-8 sm:-bottom-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-green-100">
                    <Calendar className="size-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">All Drivers Assigned</div>
                    <div className="text-xs text-muted-foreground">Automatically</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
