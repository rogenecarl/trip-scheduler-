"use client";

import Link from "next/link";
import { Truck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  resources: [
    { label: "Trips", href: "/dashboard/trips" },
    { label: "Drivers", href: "/dashboard/drivers" },
    { label: "Calendar", href: "/dashboard/calendar" },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t bg-gradient-to-b from-muted/30 to-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          className="grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Brand */}
          <motion.div className="sm:col-span-2 lg:col-span-1" variants={itemVariants}>
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <motion.div
                className="flex size-9 items-center justify-center rounded-xl bg-cyan-700 text-primary-foreground shadow-sm"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Truck className="size-5" />
              </motion.div>
              <span className="text-lg font-semibold">Trip Scheduler</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              AI-powered trip scheduling that automatically assigns drivers based
              on their availability. Streamline your fleet operations.
            </p>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-all duration-200 hover:text-cyan-700 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-all duration-200 hover:text-cyan-700 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Get Started</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ready to streamline your trip scheduling? Start using Trip Scheduler
              today.
            </p>
            <motion.div
              className="mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                className="gap-2 group bg-cyan-700 hover:bg-cyan-800 transition-all"
              >
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Trip Scheduler. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-cyan-700"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-cyan-700"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
