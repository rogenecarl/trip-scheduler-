# Trip Scheduler - Implementation Guide

## Project Overview

**Trip Scheduler** is a web application for Peak Transport that automates driver assignment to trips using AI (Gemini). Users can manage drivers, import trips via CSV or manual entry, and let AI automatically assign available drivers based on their schedules.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Package Manager | pnpm |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui (new-york style) |
| Icons | Lucide React |
| Forms | react-hook-form + zod |
| State Management | Zustand + TanStack Query |
| Date Handling | date-fns |
| CSV Parsing | papaparse |
| AI | Google Gemini (gemini-2.5-flash) |
| Database | PostgreSQL + Prisma |
| Data Fetching | Server Actions |

---

## Design System

### Design Principles

1. **Consistency**: Same patterns, spacing, and components across all pages
2. **Clarity**: Clear visual hierarchy, obvious actions, readable text
3. **Efficiency**: Minimize clicks, show relevant info upfront
4. **Feedback**: Loading states, success/error messages, hover effects
5. **Accessibility**: Keyboard navigation, ARIA labels, sufficient contrast
6. **Responsiveness**: Mobile-first, works on all screen sizes

---

### Color Palette

```css
/* Primary Colors */
--background: #ffffff          /* White - main background */
--foreground: #0a0a0a          /* Near black - primary text */

/* Neutral Colors */
--muted: #f5f5f5               /* Light gray - secondary backgrounds */
--muted-foreground: #737373    /* Medium gray - secondary text */
--border: #e5e5e5              /* Light gray - borders */

/* Accent Colors */
--primary: #171717             /* Dark - primary buttons */
--primary-foreground: #fafafa  /* White - text on primary */

/* Semantic Colors */
--success: #22c55e             /* Green - success states */
--warning: #f59e0b             /* Amber - warning states */
--destructive: #ef4444         /* Red - error/delete states */
--info: #3b82f6                /* Blue - info states */

/* Status Badge Colors */
--status-pending: #fef3c7      /* Amber bg */
--status-pending-text: #92400e /* Amber text */
--status-assigned: #dcfce7     /* Green bg */
--status-assigned-text: #166534 /* Green text */
--status-canceled: #fee2e2     /* Red bg */
--status-canceled-text: #991b1b /* Red text */
```

---

### Typography

```css
/* Font Family */
font-family: 'Geist Sans', system-ui, sans-serif;
font-family-mono: 'Geist Mono', monospace; /* For Trip IDs */

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px - labels, captions */
--text-sm: 0.875rem;    /* 14px - secondary text, table cells */
--text-base: 1rem;      /* 16px - body text */
--text-lg: 1.125rem;    /* 18px - lead text */
--text-xl: 1.25rem;     /* 20px - card titles */
--text-2xl: 1.5rem;     /* 24px - section titles */
--text-3xl: 1.875rem;   /* 30px - page titles */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

---

### Spacing System

```css
/* Base unit: 4px */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */

/* Common Patterns */
Page padding: p-4 md:p-6 lg:p-8
Card padding: p-6
Card gap: gap-6
Section gap: gap-8
Form field gap: gap-4
Button padding: px-4 py-2
Table cell padding: px-4 py-3
```

---

### Border Radius

```css
--radius-sm: 0.25rem;   /* 4px - small elements */
--radius-md: 0.375rem;  /* 6px - buttons, inputs */
--radius-lg: 0.5rem;    /* 8px - cards */
--radius-xl: 0.75rem;   /* 12px - dialogs */
--radius-full: 9999px;  /* Pills, avatars */
```

---

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

---

### Component Patterns

#### Page Layout Pattern
```tsx
// Every page follows this structure
<div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
  {/* Page Header */}
  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
        Page Title
      </h1>
      <p className="text-muted-foreground">
        Brief description of the page
      </p>
    </div>
    <div className="flex gap-3">
      {/* Action buttons */}
    </div>
  </div>

  {/* Page Content */}
  <div className="grid gap-6">
    {/* Content sections */}
  </div>
</div>
```

#### Card Pattern
```tsx
<Card>
  <CardHeader className="pb-3">
    <CardTitle className="text-lg font-medium">Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardFooter className="border-t pt-4">
    {/* Optional footer actions */}
  </CardFooter>
</Card>
```

#### Table Pattern
```tsx
<div className="rounded-lg border">
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50">
        <TableHead className="font-medium">Column</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="hover:bg-muted/50">
        <TableCell>Content</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

#### Form Pattern
```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl>
            <Input placeholder="Placeholder" {...field} />
          </FormControl>
          <FormDescription>Helper text</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

#### Dialog Pattern
```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Description text</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Dialog content */}
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleAction}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Empty State Pattern
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="rounded-full bg-muted p-4 mb-4">
    <IconName className="h-8 w-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-medium mb-1">No items yet</h3>
  <p className="text-muted-foreground mb-4 max-w-sm">
    Description of what to do next
  </p>
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Add Item
  </Button>
</div>
```

#### Loading State Pattern
```tsx
// Skeleton for cards
<Card>
  <CardHeader>
    <Skeleton className="h-5 w-32" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-8 w-24" />
  </CardContent>
</Card>

// Skeleton for table rows
<TableRow>
  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
</TableRow>

// Full page loading
<div className="flex items-center justify-center h-64">
  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
</div>
```

#### Status Badge Pattern
```tsx
// Consistent badge variants
<Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
  Pending
</Badge>

<Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
  Assigned
</Badge>

<Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
  Canceled
</Badge>

<Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
  Active
</Badge>
```

#### Day Badge Pattern (for availability)
```tsx
// Available day
<span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-xs font-medium">
  Mon
</span>

// Unavailable day
<span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground text-xs font-medium">
  Tue
</span>
```

---

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Default | < 640px | Mobile: single column, bottom nav |
| sm | ≥ 640px | Small tablet: 2 columns |
| md | ≥ 768px | Tablet: sidebar visible |
| lg | ≥ 1024px | Desktop: full layout |
| xl | ≥ 1280px | Large desktop: max-width container |

---

## Folder Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx                    # Root layout with sidebar
│   ├── page.tsx                      # Dashboard
│   ├── drivers/
│   │   └── page.tsx                  # Manage drivers
│   ├── trips/
│   │   └── page.tsx                  # View/add trips
│   ├── assignments/
│   │   └── page.tsx                  # AI assignments
│   ├── calendar/
│   │   └── page.tsx                  # Availability calendar
│   └── chat/
│       └── page.tsx                  # AI chat (optional)
│
├── actions/
│   ├── driver-actions.ts             # Driver CRUD server actions
│   ├── trip-actions.ts               # Trip CRUD server actions
│   ├── assignment-actions.ts         # Assignment server actions
│   ├── ai-actions.ts                 # Gemini AI server actions
│   └── chat-actions.ts               # Chat server actions
│
├── components/
│   ├── ui/                           # shadcn/ui components
│   │
│   ├── layout/
│   │   ├── sidebar.tsx               # Desktop sidebar
│   │   ├── header.tsx                # Page header
│   │   ├── mobile-nav.tsx            # Mobile bottom navigation
│   │   └── nav-link.tsx              # Navigation link component
│   │
│   ├── dashboard/
│   │   ├── stats-card.tsx            # Single stat card
│   │   ├── stats-grid.tsx            # Grid of stat cards
│   │   ├── quick-actions.tsx         # Quick action buttons
│   │   └── recent-trips.tsx          # Recent trips table
│   │
│   ├── drivers/
│   │   ├── driver-table.tsx          # Drivers data table
│   │   ├── driver-form.tsx           # Add/edit driver form
│   │   ├── driver-dialog.tsx         # Dialog wrapper for form
│   │   ├── availability-picker.tsx   # Day selection component
│   │   └── delete-driver-dialog.tsx  # Delete confirmation
│   │
│   ├── trips/
│   │   ├── trip-table.tsx            # Trips data table
│   │   ├── trip-form.tsx             # Manual trip entry form
│   │   ├── trip-dialog.tsx           # Dialog wrapper for form
│   │   ├── csv-import.tsx            # CSV upload component
│   │   ├── csv-preview.tsx           # Preview parsed CSV
│   │   └── delete-trip-dialog.tsx    # Delete confirmation
│   │
│   ├── assignments/
│   │   ├── assignment-table.tsx      # Assignments data table
│   │   ├── assignment-card.tsx       # Single assignment card
│   │   ├── edit-assignment-dialog.tsx # Change driver dialog
│   │   ├── auto-assign-button.tsx    # AI assign trigger
│   │   └── export-dropdown.tsx       # Export options
│   │
│   ├── calendar/
│   │   ├── calendar-view.tsx         # Main calendar component
│   │   ├── calendar-header.tsx       # Month navigation
│   │   ├── calendar-grid.tsx         # Day grid
│   │   ├── calendar-day.tsx          # Single day cell
│   │   ├── day-detail-sheet.tsx      # Day details sidebar
│   │   └── driver-avatar.tsx         # Small driver indicator
│   │
│   └── chat/
│       ├── chat-container.tsx        # Main chat layout
│       ├── message-list.tsx          # Message history
│       ├── message-bubble.tsx        # Single message
│       └── chat-input.tsx            # Input with send button
│
├── hooks/
│   ├── use-drivers.ts                # Driver state with server actions
│   ├── use-trips.ts                  # Trip state with server actions
│   ├── use-assignments.ts            # Assignment state with server actions
│   ├── use-ai-assign.ts              # AI assignment hook
│   ├── use-chat.ts                   # Chat functionality
│   └── use-mobile.ts                 # Mobile detection
│
├── lib/
│   ├── utils.ts                      # Utility functions
│   ├── types.ts                      # TypeScript interfaces
│   ├── constants.ts                  # App constants
│   ├── gemini.ts                     # Gemini AI client
│   ├── csv-parser.ts                 # CSV parsing logic
│   └── prisma.ts                     # Prisma client
│
├── store/
│   └── app-store.ts                  # Zustand store
│
└── prisma/
    └── schema.prisma                 # Database schema
```

---

## Data Types

```typescript
// lib/types.ts

export interface Driver {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  availability: DriverAvailability[];
}

export interface DriverAvailability {
  id: string;
  driverId: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  isAvailable: boolean;
}

export interface Trip {
  id: string;
  tripId: string;        // e.g., "T-115JCVWMY"
  tripDate: Date;
  dayOfWeek: number;     // 0-6
  tripStage: string;     // "Upcoming" | "Canceled"
  weekUploadId?: string;
  createdAt: Date;
  assignment?: TripAssignment;
}

export interface TripAssignment {
  id: string;
  tripId: string;
  driverId: string;
  driver?: Driver;
  assignedAt: Date;
  isAutoAssigned: boolean;
  aiReasoning?: string;
}

export interface WeekUpload {
  id: string;
  fileName: string;
  uploadedAt: Date;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  totalTrips: number;
  assignedTrips: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

// Helper types
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DAY_NAMES = [
  "Sunday",
  "Monday", 
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
] as const;

export const DAY_NAMES_SHORT = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
] as const;
```

---

## Page Specifications

### Navigation Structure

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (Desktop)              │  MAIN CONTENT             │
├─────────────────────────────────┼───────────────────────────┤
│                                 │                           │
│  ┌─────────────────────────┐   │   ┌─────────────────────┐ │
│  │ 🚚 Trip Scheduler       │   │   │  Header + Actions   │ │
│  └─────────────────────────┘   │   └─────────────────────┘ │
│                                 │                           │
│  ┌─────────────────────────┐   │   ┌─────────────────────┐ │
│  │ 📊 Dashboard            │   │   │                     │ │
│  │ 🚛 Trips                │   │   │   Page Content      │ │
│  │ 👥 Drivers              │   │   │                     │ │
│  │ 📋 Assignments          │   │   │                     │ │
│  │ 📅 Calendar             │   │   │                     │ │
│  │ 💬 Chat                 │   │   │                     │ │
│  └─────────────────────────┘   │   └─────────────────────┘ │
│                                 │                           │
└─────────────────────────────────┴───────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  MOBILE BOTTOM NAV                                          │
├─────────────────────────────────────────────────────────────┤
│   📊        🚛        👥        📋        📅               │
│  Home     Trips    Drivers   Assign   Calendar             │
└─────────────────────────────────────────────────────────────┘
```

---

### Page 1: Dashboard (`/`)

**Purpose**: Overview of the system, quick stats, and shortcuts to common actions.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard                                                   │
│  Overview of your trip scheduling system                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────┐ │
│  │ Total       │ │ This Week   │ │ Assigned    │ │Pending │ │
│  │ Drivers     │ │ Trips       │ │             │ │        │ │
│  │     12      │ │     48      │ │     42      │ │   6    │ │
│  │ 👥 +2 new   │ │ 🚛 ↑12%     │ │ ✅ 87.5%   │ │ ⏳     │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────┘ │
│                                                              │
│  ┌──────────────────────────────┐ ┌────────────────────────┐ │
│  │ Quick Actions                │ │ Recent Activity        │ │
│  │                              │ │                        │ │
│  │ [+ Add Driver]               │ │ • Trip T-123 assigned  │ │
│  │ [+ Add Trip]                 │ │ • CSV imported (12)    │ │
│  │ [📁 Import CSV]              │ │ • Driver John added    │ │
│  │ [🤖 Auto-Assign]             │ │                        │ │
│  └──────────────────────────────┘ └────────────────────────┘ │
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Pending Assignments                          [View All →]││
│  │                                                          ││
│  │ Trip ID      │ Date       │ Day    │ Status   │ Action  ││
│  │ T-115JCV...  │ Jan 15     │ Wed    │ Pending  │ [Assign]││
│  │ T-114MJQ...  │ Jan 15     │ Wed    │ Pending  │ [Assign]││
│  │ T-116S9V...  │ Jan 16     │ Thu    │ Pending  │ [Assign]││
│  └──────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Components**:
- `StatsGrid`: 4 stat cards in responsive grid
- `QuickActions`: Action buttons card
- `RecentActivity`: Activity feed (optional)
- `PendingTrips`: Table of unassigned trips

---

### Page 2: Drivers (`/drivers`)

**Purpose**: Manage drivers and their weekly availability.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Drivers                                      [+ Add Driver] │
│  Manage your drivers and their availability                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 🔍 Search drivers...                      [Filter ▾]    ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Name          │ Availability              │ Actions      ││
│  ├───────────────┼───────────────────────────┼──────────────┤│
│  │ John Smith    │ ● ● ● ● ○ ○ ○            │ [Edit] [Del] ││
│  │               │ S M T W T F S            │              ││
│  ├───────────────┼───────────────────────────┼──────────────┤│
│  │ Maria Garcia  │ ○ ● ● ● ● ● ○            │ [Edit] [Del] ││
│  │               │ S M T W T F S            │              ││
│  ├───────────────┼───────────────────────────┼──────────────┤│
│  │ Alex Johnson  │ ● ○ ○ ○ ● ● ●            │ [Edit] [Del] ││
│  │               │ S M T W T F S            │              ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  Showing 3 of 12 drivers                    [← 1 2 3 ... →] │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ADD/EDIT DRIVER DIALOG                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Add New Driver                                     [X]  ││
│  │                                                          ││
│  │ Name *                                                   ││
│  │ ┌─────────────────────────────────────────────────────┐ ││
│  │ │ Enter driver name                                   │ ││
│  │ └─────────────────────────────────────────────────────┘ ││
│  │                                                          ││
│  │ Available Days *                                         ││
│  │ Select the days this driver is available                 ││
│  │                                                          ││
│  │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ││
│  │ │ Sun │ │ Mon │ │ Tue │ │ Wed │ │ Thu │ │ Fri │ │ Sat │ ││
│  │ │  ○  │ │  ●  │ │  ●  │ │  ●  │ │  ●  │ │  ○  │ │  ○  │ ││
│  │ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ ││
│  │                                                          ││
│  │                              [Cancel]  [Save Driver]     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Components**:
- `DriverTable`: Data table with search/filter
- `DriverDialog`: Add/Edit dialog
- `DriverForm`: Form with name + availability
- `AvailabilityPicker`: 7-day toggle component
- `DeleteDriverDialog`: Confirmation dialog

---

### Page 3: Trips (`/trips`)

**Purpose**: View, add, and import trips.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Trips                                          [+ Add Trip] │
│  Manage trips and import from CSV                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ [Manual Entry]  [Import CSV]                            ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  MANUAL ENTRY TAB:                                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Trip ID *                    Date *                      ││
│  │ ┌───────────────────────┐   ┌───────────────────────┐   ││
│  │ │ T-                    │   │ 📅 Pick a date        │   ││
│  │ └───────────────────────┘   └───────────────────────┘   ││
│  │                                                          ││
│  │                                          [Add Trip]      ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  IMPORT CSV TAB:                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  ┌───────────────────────────────────────────────────┐  ││
│  │  │                                                   │  ││
│  │  │        📁 Drag & drop your CSV file here         │  ││
│  │  │              or click to browse                   │  ││
│  │  │                                                   │  ││
│  │  └───────────────────────────────────────────────────┘  ││
│  │                                                          ││
│  │  Expected columns: Trip ID, Stop 1 Planned Arrival Date  ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ All Trips                                   [Filter ▾]   ││
│  │                                                          ││
│  │ Trip ID       │ Date       │ Day  │ Status   │ Driver   ││
│  ├───────────────┼────────────┼──────┼──────────┼──────────┤│
│  │ T-115JCVWMY   │ Jan 15     │ Wed  │ Assigned │ John S.  ││
│  │ T-114MJQ2Q2   │ Jan 15     │ Wed  │ Pending  │ -        ││
│  │ T-116S9V7GD   │ Jan 16     │ Thu  │ Pending  │ -        ││
│  └──────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Components**:
- `TripTabs`: Tab navigation (Manual/CSV)
- `TripForm`: Manual entry form
- `CSVImport`: Drag-drop uploader
- `CSVPreview`: Preview before import
- `TripTable`: Data table with filters

---

### Page 4: Assignments (`/assignments`)

**Purpose**: View and manage driver assignments, run AI auto-assign.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Assignments                                                 │
│  View and manage driver assignments                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ Total Trips │ │ Assigned    │ │ Pending     │            │
│  │     48      │ │     42      │ │     6       │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │  [🤖 Auto-Assign with AI]              [Export ▾]       ││
│  │                                                          ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Trip ID      │ Date    │ Day │ Driver      │ Reasoning   ││
│  ├──────────────┼─────────┼─────┼─────────────┼─────────────┤│
│  │ T-115JCVWMY  │ Jan 15  │ Wed │ John Smith  │ Available,  ││
│  │              │         │     │ [Change ▾]  │ balanced    ││
│  ├──────────────┼─────────┼─────┼─────────────┼─────────────┤│
│  │ T-114MJQ2Q2  │ Jan 15  │ Wed │ ⚠️ Pending  │ -           ││
│  │              │         │     │ [Assign ▾]  │             ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  AI PROCESSING MODAL:                                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │   🤖 AI is assigning drivers...                         ││
│  │                                                          ││
│  │   ████████████░░░░░░░░ 60%                              ││
│  │                                                          ││
│  │   Processing 48 trips...                                 ││
│  │   ✓ 29 assigned                                          ││
│  │   ⏳ 19 remaining                                        ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Components**:
- `AssignmentStats`: Summary cards
- `AutoAssignButton`: Triggers AI assignment
- `AssignmentTable`: Main data table
- `EditAssignmentDialog`: Change driver dropdown
- `ExportDropdown`: CSV/Clipboard options
- `AIProcessingModal`: Loading state for AI

---

### Page 5: Calendar (`/calendar`)

**Purpose**: Visual calendar showing driver availability per day.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Calendar                                                    │
│  View driver availability by date                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  [←]       January 2026        [→]         [Today]      ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Sun    │ Mon    │ Tue    │ Wed    │ Thu    │ Fri  │ Sat ││
│  ├────────┼────────┼────────┼────────┼────────┼──────┼─────┤│
│  │        │        │        │   1    │   2    │   3  │  4  ││
│  │        │        │        │ 🟢 4   │ 🟢 5   │ 🟢 4 │🟢 3 ││
│  │        │        │        │ 📦 2   │ 📦 3   │ 📦 1 │📦 2 ││
│  ├────────┼────────┼────────┼────────┼────────┼──────┼─────┤│
│  │   5    │   6    │   7    │   8    │   9    │  10  │ 11  ││
│  │ 🟢 3   │ 🟢 6   │ 🟢 6   │ 🟢 6   │ 🟢 5   │ 🟢 4 │🟢 3 ││
│  │ 📦 0   │ 📦 5   │ 📦 4   │ 📦 6   │ 📦 3   │ 📦 2 │📦 1 ││
│  ├────────┼────────┼────────┼────────┼────────┼──────┼─────┤│
│  │  ...   │  ...   │  ...   │  ...   │  ...   │ ...  │ ... ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  Legend: 🟢 Available drivers  📦 Trips scheduled            │
│                                                              │
│  DAY DETAIL SHEET (click on day):                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Wednesday, January 15, 2026                        [X]  ││
│  │                                                          ││
│  │ Available Drivers (4)                                    ││
│  │ ┌─────────────────────────────────────────────────────┐ ││
│  │ │ 👤 John Smith                                       │ ││
│  │ │ 👤 Maria Garcia                                     │ ││
│  │ │ 👤 Alex Johnson                                     │ ││
│  │ │ 👤 Sarah Wilson                                     │ ││
│  │ └─────────────────────────────────────────────────────┘ ││
│  │                                                          ││
│  │ Scheduled Trips (2)                                      ││
│  │ ┌─────────────────────────────────────────────────────┐ ││
│  │ │ T-115JCVWMY → John Smith                            │ ││
│  │ │ T-114MJQ2Q2 → Pending                               │ ││
│  │ └─────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Components**:
- `CalendarHeader`: Month navigation
- `CalendarGrid`: 7-column day grid
- `CalendarDay`: Single day cell
- `DayDetailSheet`: Slide-out details
- `DriverAvatar`: Small driver indicator

---

### Page 6: Chat (`/chat`) - Optional

**Purpose**: AI chat assistant for questions and commands.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  AI Assistant                                                │
│  Ask questions about schedules and drivers                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │  ┌─────────────────────────────────────────────────────┐ ││
│  │  │ 🤖 Hi! I'm your Trip Scheduler assistant.          │ ││
│  │  │    I can help you with:                            │ ││
│  │  │    • Check driver availability                     │ ││
│  │  │    • View trip assignments                         │ ││
│  │  │    • Answer scheduling questions                   │ ││
│  │  └─────────────────────────────────────────────────────┘ ││
│  │                                                          ││
│  │                    ┌────────────────────────────────────┐││
│  │                    │ Who is available on Thursday?     │││
│  │                    └────────────────────────────────────┘││
│  │                                                          ││
│  │  ┌─────────────────────────────────────────────────────┐ ││
│  │  │ 🤖 There are 5 drivers available on Thursday:      │ ││
│  │  │                                                     │ ││
│  │  │    1. John Smith (2 trips assigned)                │ ││
│  │  │    2. Maria Garcia (1 trip assigned)               │ ││
│  │  │    3. Alex Johnson (3 trips assigned)              │ ││
│  │  │    4. Sarah Wilson (0 trips assigned)              │ ││
│  │  │    5. Mike Brown (1 trip assigned)                 │ ││
│  │  │                                                     │ ││
│  │  │    Sarah Wilson has the lightest workload.         │ ││
│  │  └─────────────────────────────────────────────────────┘ ││
│  │                                                          ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Type your message...                            [Send]   ││
│  └──────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Components**:
- `ChatContainer`: Main layout
- `MessageList`: Scrollable messages
- `MessageBubble`: User/AI message
- `ChatInput`: Input field + send button

---

## Implementation Phases

### Phase 1: Layout & Navigation

**Prompt for Claude Code CLI**:

```
Create the main layout and navigation for Trip Scheduler app.

REQUIREMENTS:

1. Root Layout (app/layout.tsx):
- Wrap with necessary providers
- Include Toaster for notifications
- Set up metadata (title, description)

2. Dashboard Layout with Sidebar:
- Create components/layout/sidebar.tsx
- Logo: "Trip Scheduler" with Truck icon
- Navigation links with icons:
  • Dashboard (/) - LayoutDashboard
  • Trips (/trips) - Package
  • Drivers (/drivers) - Users
  • Assignments (/assignments) - ClipboardCheck
  • Calendar (/calendar) - CalendarDays
  • Chat (/chat) - MessageSquare
- Active state: bg-muted rounded-lg
- Hover state: bg-muted/50
- Sidebar width: w-64
- Collapsible on tablet (md breakpoint)

3. Header (components/layout/header.tsx):
- Mobile menu trigger (Sheet)
- Page title (dynamic)
- Optional: breadcrumbs

4. Mobile Navigation (components/layout/mobile-nav.tsx):
- Fixed bottom bar on mobile
- 5 icon buttons (Home, Trips, Drivers, Assign, Calendar)
- Active indicator

DESIGN SPECS:
- Sidebar background: bg-background border-r
- Active link: bg-muted text-foreground
- Inactive link: text-muted-foreground hover:text-foreground
- Spacing: p-4 for sidebar, gap-2 for nav items
- Icon size: h-5 w-5
- Font: text-sm font-medium

SHADCN COMPONENTS NEEDED:
- Button
- Sheet (for mobile nav)
- ScrollArea (for sidebar)
- Separator

Create placeholder pages for all routes that just show the page title.
```

---

### Phase 2: Dashboard Page

**Prompt for Claude Code CLI**:

```
Create the Dashboard page (app/page.tsx) for Trip Scheduler using Server Actions.

REQUIREMENTS:

1. Page Header:
- Title: "Dashboard"
- Subtitle: "Overview of your trip scheduling system"

2. Stats Cards Grid (components/dashboard/stats-grid.tsx):
- 4 cards in responsive grid (1 col mobile, 2 col sm, 4 col lg)
- Each card shows:
  • Icon (in muted circle)
  • Label (text-sm text-muted-foreground)
  • Value (text-2xl font-semibold)
  • Optional trend indicator
- Cards:
  • Total Drivers (Users icon) - blue
  • Trips This Week (Package icon) - green
  • Assigned (ClipboardCheck icon) - emerald
  • Pending (Clock icon) - amber

3. Quick Actions Card (components/dashboard/quick-actions.tsx):
- Title: "Quick Actions"
- Buttons in grid (2 cols):
  • Add Driver → /drivers (with dialog trigger)
  • Add Trip → /trips
  • Import CSV → /trips?tab=csv
  • Auto-Assign → /assignments

4. Pending Trips Table (components/dashboard/pending-trips.tsx):
- Title: "Pending Assignments" with "View All" link
- Show only unassigned trips (max 5)
- Columns: Trip ID, Date, Day, Status, Action
- Action: "Assign" button
- Empty state if no pending trips

DESIGN SPECS:
- Page padding: p-4 md:p-6 lg:p-8
- Section gap: gap-6 lg:gap-8
- Card padding: p-6
- Stats card: border rounded-lg
- Fetch data using server actions

SHADCN COMPONENTS:
- Card, CardHeader, CardTitle, CardContent
- Button
- Table, TableHeader, TableBody, TableRow, TableCell
- Badge
- Skeleton (for loading)

SERVER ACTIONS (actions/dashboard-actions.ts):
```typescript
"use server"

import { prisma } from "@/lib/prisma";
import { startOfWeek, endOfWeek } from "date-fns";

export async function getDashboardStats() {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);

  const [totalDrivers, tripsThisWeek, assignedTrips, pendingTrips] = await Promise.all([
    prisma.driver.count({ where: { isActive: true } }),
    prisma.trip.count({
      where: {
        tripDate: { gte: weekStart, lte: weekEnd },
        tripStage: "Upcoming"
      }
    }),
    prisma.trip.count({
      where: {
        tripDate: { gte: weekStart, lte: weekEnd },
        tripStage: "Upcoming",
        assignment: { isNot: null }
      }
    }),
    prisma.trip.count({
      where: {
        tripDate: { gte: weekStart, lte: weekEnd },
        tripStage: "Upcoming",
        assignment: null
      }
    })
  ]);

  return { totalDrivers, tripsThisWeek, assignedTrips, pendingTrips };
}

export async function getPendingTrips(limit = 5) {
  return prisma.trip.findMany({
    where: {
      tripStage: "Upcoming",
      assignment: null
    },
    orderBy: { tripDate: "asc" },
    take: limit
  });
}
```

PAGE COMPONENT (app/page.tsx):
```typescript
import { getDashboardStats, getPendingTrips } from "@/actions/dashboard-actions";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { PendingTrips } from "@/components/dashboard/pending-trips";

export default async function DashboardPage() {
  const [stats, pendingTrips] = await Promise.all([
    getDashboardStats(),
    getPendingTrips(5)
  ]);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of your trip scheduling system
        </p>
      </div>

      <StatsGrid stats={stats} />

      <div className="grid gap-6 md:grid-cols-2">
        <QuickActions />
        <PendingTrips trips={pendingTrips} />
      </div>
    </div>
  );
}
```
```

---

### Phase 3: Drivers Page

**Prompt for Claude Code CLI**:

```
Create the Drivers management page (app/drivers/page.tsx) for Trip Scheduler using Server Actions.

REQUIREMENTS:

1. Page Header:
- Title: "Drivers"
- Subtitle: "Manage your drivers and their availability"
- "Add Driver" button (opens dialog)

2. Search & Filter Bar:
- Search input with icon
- Optional: Filter by availability

3. Driver Table (components/drivers/driver-table.tsx):
- Columns:
  • Name (sortable)
  • Availability (7 day indicators)
  • Actions (Edit, Delete)
- Responsive: Table on desktop, Cards on mobile
- Empty state with illustration

4. Availability Display:
- 7 circles/badges for Sun-Sat
- Filled (bg-primary) = available
- Outline (bg-muted) = unavailable
- Show day abbreviation below

5. Add/Edit Dialog (components/drivers/driver-dialog.tsx):
- Title: "Add Driver" or "Edit Driver"
- Form fields:
  • Name input (required)
  • Availability picker (7 toggles)
- Validation:
  • Name required, min 2 chars
  • At least 1 day selected
- Actions: Cancel, Save

6. Availability Picker (components/drivers/availability-picker.tsx):
- 7 toggle buttons in a row
- Each shows day abbreviation
- Toggle on/off with visual feedback
- Accessible labels

7. Delete Confirmation:
- AlertDialog
- "Are you sure you want to delete {name}?"
- Cancel and Delete buttons

DESIGN SPECS:
- Table row hover: hover:bg-muted/50
- Day indicator size: h-8 w-8 rounded-full
- Dialog max-width: sm:max-w-md
- Form spacing: space-y-4

SHADCN COMPONENTS:
- Table, Dialog, AlertDialog
- Input, Button, Form
- Toggle or custom checkbox buttons
- Toast (sonner) for success/error

SERVER ACTIONS (actions/driver-actions.ts):
```typescript
"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const driverSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  availability: z.array(z.number()).min(1, "Select at least one day")
});

export async function getDrivers() {
  return prisma.driver.findMany({
    where: { isActive: true },
    include: { availability: true },
    orderBy: { name: "asc" }
  });
}

export async function createDriver(formData: FormData) {
  const name = formData.get("name") as string;
  const availability = JSON.parse(formData.get("availability") as string);

  const validated = driverSchema.parse({ name, availability });

  const driver = await prisma.driver.create({
    data: {
      name: validated.name,
      availability: {
        create: validated.availability.map(day => ({
          dayOfWeek: day,
          isAvailable: true
        }))
      }
    }
  });

  revalidatePath("/drivers");
  return { success: true, driver };
}

export async function updateDriver(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const availability = JSON.parse(formData.get("availability") as string);

  // Delete existing availability and recreate
  await prisma.driverAvailability.deleteMany({ where: { driverId: id } });
  
  const driver = await prisma.driver.update({
    where: { id },
    data: {
      name,
      availability: {
        create: availability.map((day: number) => ({
          dayOfWeek: day,
          isAvailable: true
        }))
      }
    }
  });

  revalidatePath("/drivers");
  return { success: true, driver };
}

export async function deleteDriver(id: string) {
  await prisma.driver.update({
    where: { id },
    data: { isActive: false }
  });

  revalidatePath("/drivers");
  return { success: true };
}
```

HOOKS (hooks/use-drivers.ts):
- Use TanStack Query for data fetching
- useQuery to fetch drivers (calls server action)
- useMutation for create/update/delete
- Invalidate queries on mutation success
```

---

### Phase 4: Trips Page

**Prompt for Claude Code CLI**:

```
Create the Trips page (app/trips/page.tsx) for Trip Scheduler using Server Actions.

REQUIREMENTS:

1. Page Header:
- Title: "Trips"
- Subtitle: "Manage trips and import from CSV"
- "Add Trip" button

2. Tab Navigation:
- Tab 1: "Manual Entry"
- Tab 2: "Import CSV"
- Clean tab styling

3. Manual Entry Tab:
- Trip Form (components/trips/trip-form.tsx):
  • Trip ID input (required, format: T-XXXXXXXX)
  • Date picker (required)
  • Submit button: "Add Trip"
- Validation with zod:
  • tripId: required, starts with "T-"
  • date: required, valid date

4. Import CSV Tab:
- CSV Import Zone (components/trips/csv-import.tsx):
  • Drag & drop area with dashed border
  • "Drop CSV here or click to browse"
  • File input (hidden, triggered by click)
  • Accept only .csv files

5. CSV Processing:
- Parse CSV using papaparse
- Extract columns:
  • "Trip ID" → tripId
  • "Stop 1 Planned Arrival Date" → tripDate
  • "Trip Stage" → filter out "Canceled"
- Group by Trip ID (duplicates = 1 trip)
- Calculate dayOfWeek from date

6. CSV Preview (components/trips/csv-preview.tsx):
- Show parsed trips in table
- Columns: Trip ID, Date, Day, Status
- "Import X Trips" button
- "Cancel" button

7. Trips Table (components/trips/trip-table.tsx):
- All trips list
- Columns: Trip ID, Date, Day, Status, Driver
- Status badge:
  • Pending (amber)
  • Assigned (green)
- Filter by status
- Delete action

DESIGN SPECS:
- Dropzone: border-2 border-dashed rounded-lg p-8
- Dropzone hover: border-primary bg-muted/50
- Tab content padding: pt-6
- Form max-width: max-w-md

SHADCN COMPONENTS:
- Tabs, TabsList, TabsTrigger, TabsContent
- Input, Button, Form
- Calendar (date picker)
- Table
- Badge
- Toast

LIBRARIES:
- papaparse for CSV parsing
- date-fns for date handling

SERVER ACTIONS (actions/trip-actions.ts):
```typescript
"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const tripSchema = z.object({
  tripId: z.string().startsWith("T-", "Trip ID must start with T-"),
  tripDate: z.coerce.date()
});

export async function getTrips() {
  return prisma.trip.findMany({
    include: { assignment: { include: { driver: true } } },
    orderBy: { tripDate: "asc" }
  });
}

export async function createTrip(formData: FormData) {
  const tripId = formData.get("tripId") as string;
  const tripDate = new Date(formData.get("tripDate") as string);
  
  const validated = tripSchema.parse({ tripId, tripDate });
  const dayOfWeek = tripDate.getDay();

  // Check if trip already exists
  const existing = await prisma.trip.findFirst({
    where: { tripId: validated.tripId }
  });

  if (existing) {
    return { success: false, error: "Trip ID already exists" };
  }

  const trip = await prisma.trip.create({
    data: {
      tripId: validated.tripId,
      tripDate: validated.tripDate,
      dayOfWeek,
      tripStage: "Upcoming"
    }
  });

  revalidatePath("/trips");
  return { success: true, trip };
}

export async function importTripsFromCSV(trips: {
  tripId: string;
  tripDate: Date;
  dayOfWeek: number;
}[]) {
  const results = [];

  for (const trip of trips) {
    // Skip if already exists
    const existing = await prisma.trip.findFirst({
      where: { tripId: trip.tripId }
    });

    if (!existing) {
      const created = await prisma.trip.create({
        data: {
          tripId: trip.tripId,
          tripDate: trip.tripDate,
          dayOfWeek: trip.dayOfWeek,
          tripStage: "Upcoming"
        }
      });
      results.push(created);
    }
  }

  revalidatePath("/trips");
  return { success: true, imported: results.length };
}

export async function deleteTrip(id: string) {
  await prisma.trip.delete({ where: { id } });
  revalidatePath("/trips");
  return { success: true };
}
```

CSV PARSING (lib/csv-parser.ts):
```typescript
import Papa from "papaparse";
import { getDay, parse } from "date-fns";

interface CSVRow {
  "Trip ID": string;
  "Stop 1 Planned Arrival Date": string;
  "Trip Stage": string;
}

export function parseTripsCSV(file: File): Promise<ParsedTrip[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const trips = new Map<string, ParsedTrip>();
        
        for (const row of results.data) {
          // Skip canceled trips
          if (row["Trip Stage"] === "Canceled") continue;
          
          const tripId = row["Trip ID"];
          if (!tripId || trips.has(tripId)) continue;
          
          const dateStr = row["Stop 1 Planned Arrival Date"];
          const tripDate = parse(dateStr, "M/d/yy", new Date());
          
          trips.set(tripId, {
            tripId,
            tripDate,
            dayOfWeek: getDay(tripDate)
          });
        }
        
        resolve(Array.from(trips.values()));
      },
      error: (error) => reject(error)
    });
  });
}
```
```

---

### Phase 5: Assignments Page

**Prompt for Claude Code CLI**:

```
Create the Assignments page (app/assignments/page.tsx) for Trip Scheduler using Server Actions.

REQUIREMENTS:

1. Page Header:
- Title: "Assignments"
- Subtitle: "View and manage driver assignments"

2. Stats Summary:
- 3 cards inline: Total, Assigned, Pending
- Compact design

3. Action Bar:
- "Auto-Assign with AI" button (primary, with sparkles icon)
- Export dropdown:
  • Export to CSV
  • Copy to Clipboard

4. Assignments Table (components/assignments/assignment-table.tsx):
- Columns:
  • Trip ID (monospace font)
  • Date
  • Day
  • Driver (dropdown to change)
  • AI Reasoning (truncated, tooltip)
- Pending rows highlighted
- Sortable columns

5. Driver Selection:
- Dropdown showing only available drivers for that day
- Shows driver name
- "Unassigned" option
- Filter drivers by dayOfWeek

6. AI Auto-Assign Flow:
- Click "Auto-Assign" button
- Show processing modal
- Call Gemini API via server action
- Update assignments
- Show results summary
- Toast notification

7. AI Processing Modal:
- Title: "AI is assigning drivers..."
- Progress indicator
- Stats: X assigned, X remaining
- Cancel button (optional)

8. Export Functionality:
- CSV format: Trip ID, Date, Day, Driver Name
- Clipboard: Same format, tab-separated
- Success toast

DESIGN SPECS:
- Action bar: flex justify-between items-center
- Stats cards: inline-flex gap-4
- Monospace for Trip ID: font-mono text-sm
- Reasoning tooltip: max-w-xs

SHADCN COMPONENTS:
- Table
- Select (for driver dropdown)
- DropdownMenu (for export)
- Dialog (for AI modal)
- Progress
- Tooltip
- Toast

SERVER ACTIONS (actions/assignment-actions.ts):
```typescript
"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAssignments() {
  return prisma.trip.findMany({
    where: { tripStage: "Upcoming" },
    include: {
      assignment: {
        include: { driver: true }
      }
    },
    orderBy: { tripDate: "asc" }
  });
}

export async function getAssignmentStats() {
  const [total, assigned, pending] = await Promise.all([
    prisma.trip.count({ where: { tripStage: "Upcoming" } }),
    prisma.trip.count({ 
      where: { 
        tripStage: "Upcoming",
        assignment: { isNot: null }
      }
    }),
    prisma.trip.count({ 
      where: { 
        tripStage: "Upcoming",
        assignment: null
      }
    })
  ]);

  return { total, assigned, pending };
}

export async function updateAssignment(tripId: string, driverId: string | null) {
  if (driverId === null) {
    // Remove assignment
    await prisma.tripAssignment.delete({
      where: { tripId }
    });
  } else {
    // Upsert assignment
    await prisma.tripAssignment.upsert({
      where: { tripId },
      create: {
        tripId,
        driverId,
        isAutoAssigned: false
      },
      update: {
        driverId,
        isAutoAssigned: false,
        isManualOverride: true
      }
    });
  }

  revalidatePath("/assignments");
  return { success: true };
}

export async function getAvailableDriversForDay(dayOfWeek: number) {
  return prisma.driver.findMany({
    where: {
      isActive: true,
      availability: {
        some: {
          dayOfWeek,
          isAvailable: true
        }
      }
    },
    orderBy: { name: "asc" }
  });
}
```

EXPORT FUNCTION (client-side):
```typescript
export function exportToCSV(assignments: Assignment[]) {
  const headers = ["Trip ID", "Date", "Day", "Driver"];
  const rows = assignments.map(a => [
    a.tripId,
    format(a.tripDate, "yyyy-MM-dd"),
    DAY_NAMES[a.dayOfWeek],
    a.assignment?.driver?.name || "Unassigned"
  ]);

  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `assignments-${format(new Date(), "yyyy-MM-dd")}.csv`;
  link.click();
}

export function copyToClipboard(assignments: Assignment[]) {
  const rows = assignments.map(a => 
    `${a.tripId}\t${format(a.tripDate, "yyyy-MM-dd")}\t${DAY_NAMES[a.dayOfWeek]}\t${a.assignment?.driver?.name || "Unassigned"}`
  );
  navigator.clipboard.writeText(rows.join("\n"));
}
```
```

---

### Phase 6: Calendar Page

**Prompt for Claude Code CLI**:

```
Create the Calendar page (app/calendar/page.tsx) for Trip Scheduler.

REQUIREMENTS:

1. Page Header:
- Title: "Calendar"
- Subtitle: "View driver availability by date"

2. Calendar Header (components/calendar/calendar-header.tsx):
- Previous month button
- Current month/year display (e.g., "January 2026")
- Next month button
- "Today" button

3. Calendar Grid (components/calendar/calendar-grid.tsx):
- 7 columns (Sun-Sat)
- Day name headers
- 5-6 rows for dates
- Current month dates
- Previous/next month dates (muted)

4. Calendar Day Cell (components/calendar/calendar-day.tsx):
- Date number (top-left)
- Today indicator (ring or background)
- Available drivers count (green badge)
- Trips count (blue badge)
- Clickable to open details
- Hover effect

5. Day Detail Sheet (components/calendar/day-detail-sheet.tsx):
- Slides in from right
- Header: Full date (e.g., "Wednesday, January 15, 2026")
- Section: Available Drivers
  • List of driver names
  • Empty state if none
- Section: Scheduled Trips
  • Trip ID with assigned driver
  • Status badge
- Close button

6. Visual Indicators:
- 🟢 Number = Available drivers
- 📦 Number = Trips scheduled
- Color intensity based on count (optional)

DESIGN SPECS:
- Grid: grid-cols-7 gap-px bg-border
- Day cell: bg-background p-2 min-h-24
- Today: ring-2 ring-primary
- Outside month: text-muted-foreground/50
- Sheet width: w-80 md:w-96

SHADCN COMPONENTS:
- Button
- Sheet, SheetContent, SheetHeader
- Badge
- ScrollArea
- Separator

DATE HANDLING:
- Use date-fns
- startOfMonth, endOfMonth
- eachDayOfInterval
- format, isSameMonth, isToday
- getDay for day of week

RESPONSIVE:
- Desktop: Full calendar grid
- Mobile: Scrollable horizontally or list view
```

---

### Phase 7: AI Integration

**Prompt for Claude Code CLI**:

```
Create Gemini AI integration for Trip Scheduler auto-assignment using Server Actions.

REQUIREMENTS:

1. Gemini Client (lib/gemini.ts):
- Initialize GoogleGenerativeAI
- Use gemini-2.5-flash model
- Environment variable: GEMINI_API_KEY (server-side only, no NEXT_PUBLIC)

2. Server Action (actions/ai-actions.ts):
```typescript
"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

interface AssignmentResult {
  success: boolean;
  assignments?: {
    tripId: string;
    driverId: string;
    reasoning: string;
  }[];
  summary?: string;
  warnings?: string[];
  error?: string;
}

export async function autoAssignDrivers(): Promise<AssignmentResult> {
  try {
    // Fetch unassigned trips
    const trips = await prisma.trip.findMany({
      where: { assignment: null, tripStage: "Upcoming" },
      select: { id: true, tripId: true, tripDate: true, dayOfWeek: true }
    });

    // Fetch active drivers with availability
    const drivers = await prisma.driver.findMany({
      where: { isActive: true },
      include: { availability: { where: { isAvailable: true } } }
    });

    // Call Gemini AI
    const prompt = buildAssignmentPrompt(trips, drivers);
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    
    // Parse and save assignments
    const parsed = JSON.parse(response);
    
    // Create assignments in database
    for (const assignment of parsed.assignments) {
      await prisma.tripAssignment.create({
        data: {
          tripId: assignment.tripId,
          driverId: assignment.driverId,
          isAutoAssigned: true,
          aiReasoning: assignment.reasoning
        }
      });
    }

    return {
      success: true,
      assignments: parsed.assignments,
      summary: parsed.summary,
      warnings: parsed.warnings
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
```

3. Assignment Prompt Template:
- Role: Fleet scheduling assistant
- Task: Assign drivers to trips
- Rules:
  • Only assign if driver available on that day
  • Balance workload across drivers
  • Provide brief reasoning
- Input: JSON of trips and drivers
- Output: JSON format only

4. Hook (hooks/use-ai-assign.ts):
- Uses React Query useMutation
- Calls server action
- Handles loading/error states
- Invalidates queries on success

```typescript
"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { autoAssignDrivers } from "@/actions/ai-actions";
import { toast } from "sonner";

export function useAIAssign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: autoAssignDrivers,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.summary || "Drivers assigned successfully");
        queryClient.invalidateQueries({ queryKey: ["trips"] });
        queryClient.invalidateQueries({ queryKey: ["assignments"] });
      } else {
        toast.error(data.error || "Failed to assign drivers");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while assigning drivers");
    }
  });
}
```

5. Error Handling:
- API errors → return error in result
- Parse errors → fallback message
- No available drivers → warning in output
- Rate limiting → retry logic

ENVIRONMENT:
- Add GEMINI_API_KEY to .env.local (server-side, no NEXT_PUBLIC prefix)
- Add to .env.example as placeholder
```

---

### Phase 8: Chat Page (Optional)

**Prompt for Claude Code CLI**:

```
Create the AI Chat page (app/chat/page.tsx) for Trip Scheduler using Server Actions.

REQUIREMENTS:

1. Page Layout:
- Full height container
- Messages area (scrollable)
- Input area (fixed bottom)

2. Chat Container (components/chat/chat-container.tsx):
- Flex column layout
- ScrollArea for messages
- Auto-scroll to bottom

3. Message List (components/chat/message-list.tsx):
- Map through messages
- Group by date (optional)
- Loading indicator for AI response

4. Message Bubble (components/chat/message-bubble.tsx):
- User messages: Right-aligned, primary bg
- AI messages: Left-aligned, muted bg
- Avatar/icon
- Timestamp (optional)
- Markdown support for AI responses

5. Chat Input (components/chat/chat-input.tsx):
- Textarea (auto-resize)
- Send button
- Enter to send (Shift+Enter for newline)
- Disabled while loading

6. AI Context:
- Send current data context:
  • Drivers (names, availability)
  • Trips (IDs, dates, assignments)
  • Stats summary
- AI can reference actual data

7. Suggested Questions:
- Show when chat is empty:
  • "Who is available on Thursday?"
  • "How many trips are unassigned?"
  • "Which driver has the most trips?"

8. Chat Functionality:
- Create hooks/use-chat.ts
- Store messages in React state
- Clear chat option
- Handle errors gracefully

DESIGN SPECS:
- User message: bg-primary text-primary-foreground
- AI message: bg-muted
- Border radius: rounded-2xl
- Max bubble width: max-w-[80%]
- Input area: border-t p-4

SHADCN COMPONENTS:
- ScrollArea
- Textarea
- Button
- Avatar

SERVER ACTION (actions/chat-actions.ts):
```typescript
"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function sendChatMessage(message: string) {
  try {
    // Get current context
    const [drivers, trips, stats] = await Promise.all([
      prisma.driver.findMany({
        where: { isActive: true },
        include: { availability: true }
      }),
      prisma.trip.findMany({
        where: { tripStage: "Upcoming" },
        include: { assignment: { include: { driver: true } } }
      }),
      getStats()
    ]);

    const prompt = `
You are Trip Scheduler AI assistant for Peak Transport.

CONTEXT:
- Total Drivers: ${drivers.length}
- Total Trips: ${stats.total}
- Assigned: ${stats.assigned}
- Pending: ${stats.pending}

DRIVERS:
${JSON.stringify(drivers.map(d => ({
  name: d.name,
  availableDays: d.availability
    .filter(a => a.isAvailable)
    .map(a => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][a.dayOfWeek])
})), null, 2)}

TRIPS:
${JSON.stringify(trips.slice(0, 20).map(t => ({
  tripId: t.tripId,
  date: t.tripDate,
  day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][t.dayOfWeek],
  driver: t.assignment?.driver?.name || "Unassigned"
})), null, 2)}

USER QUESTION: ${message}

Respond helpfully and concisely. Reference actual data when possible.
If user wants to make changes, explain what actions to take in the app.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return { success: true, response };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to get response"
    };
  }
}

async function getStats() {
  const [total, assigned, pending] = await Promise.all([
    prisma.trip.count({ where: { tripStage: "Upcoming" } }),
    prisma.trip.count({ 
      where: { tripStage: "Upcoming", assignment: { isNot: null } }
    }),
    prisma.trip.count({ 
      where: { tripStage: "Upcoming", assignment: null }
    })
  ]);
  return { total, assigned, pending };
}
```

HOOK (hooks/use-chat.ts):
```typescript
"use client"

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendChatMessage } from "@/actions/chat-actions";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const mutation = useMutation({
    mutationFn: sendChatMessage,
    onMutate: (message) => {
      // Add user message immediately
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
        createdAt: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
    },
    onSuccess: (data) => {
      if (data.success && data.response) {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.response,
          createdAt: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    }
  });

  const sendMessage = (content: string) => {
    mutation.mutate(content);
  };

  const clearChat = () => setMessages([]);

  return {
    messages,
    sendMessage,
    clearChat,
    isLoading: mutation.isPending
  };
}
```
```

---

### Phase 9: Polish & Testing

**Prompt for Claude Code CLI**:

```
Polish and finalize Trip Scheduler app.

TASKS:

1. Loading States:
- Add Skeleton components to all pages
- Show while data is loading
- Consistent skeleton patterns

2. Empty States:
- All tables/lists have empty states
- Illustration + message + action button
- Consistent design

3. Error Handling:
- Form validation messages
- API error toasts
- Fallback UI for errors

4. Responsive Audit:
- Test all pages at 320px, 768px, 1024px, 1440px
- Fix any overflow issues
- Ensure touch targets are 44px+

5. Accessibility:
- All buttons have aria-labels
- Form inputs have labels
- Focus states visible
- Keyboard navigation works

6. Performance:
- Lazy load heavy components
- Optimize images (if any)
- Minimize re-renders

7. Consistency Check:
- Same spacing across pages
- Same button styles
- Same card patterns
- Same typography

8. Final Touches:
- Page transitions (optional)
- Hover animations
- Success animations (optional)

TEST CHECKLIST:
- [ ] Add driver → appears in list
- [ ] Edit driver → changes saved
- [ ] Delete driver → removed from list
- [ ] Add trip manually → appears in list
- [ ] Import CSV → trips created
- [ ] Auto-assign → drivers assigned
- [ ] Change assignment → updates
- [ ] Export CSV → downloads file
- [ ] Calendar shows correct data
- [ ] Chat responds correctly
- [ ] All pages responsive
- [ ] All forms validate
- [ ] All toasts work
```

---

## Environment Variables

```env
# .env.local

# Database
DATABASE_URL="postgresql://..."

# AI (Server-side only - no NEXT_PUBLIC prefix)
GEMINI_API_KEY="your-gemini-api-key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Getting Started Commands

```bash
# Install dependencies
pnpm install

# Install shadcn components
pnpm dlx shadcn@latest add button card dialog table input form tabs badge toast alert-dialog sheet scroll-area separator skeleton select dropdown-menu calendar progress tooltip textarea avatar

# Install additional packages
pnpm add date-fns papaparse @tanstack/react-query zustand @google/generative-ai
pnpm add -D @types/papaparse

# Set up Prisma (initial setup)
pnpm dlx prisma generate
pnpm dlx prisma migrate dev --name init

# Run development server
pnpm dev
```

---

## Prisma Migration Commands

```bash
# Initial migration (first time setup)
pnpm dlx prisma migrate dev --name init

# Add new migration (when schema changes)
pnpm dlx prisma migrate dev --name added_driver_field
pnpm dlx prisma migrate dev --name added_trip_status
pnpm dlx prisma migrate dev --name updated_assignment_table

# Generate Prisma client (after schema changes)
pnpm dlx prisma generate

# View database in browser
pnpm dlx prisma studio

# Reset database (warning: deletes all data)
pnpm dlx prisma migrate reset

# Deploy migrations to production
pnpm dlx prisma migrate deploy

# Check migration status
pnpm dlx prisma migrate status
```

### Migration Best Practices

1. **Naming Conventions**: Use descriptive names
   - `init` - Initial schema
   - `add_driver_email` - Adding a field
   - `remove_unused_fields` - Removing fields
   - `update_trip_relations` - Changing relations

2. **Before Migrating**:
   - Review schema changes
   - Backup production data if needed
   - Test migration on development first

3. **Migration Files Location**: `prisma/migrations/`

---

## Success Criteria

- [ ] All 6 pages implemented and functional
- [ ] Consistent UI/UX across all pages
- [ ] Fully responsive (mobile to desktop)
- [ ] All CRUD operations work
- [ ] CSV import parses correctly
- [ ] AI assignment works with Gemini
- [ ] Calendar displays correct availability
- [ ] Export functionality works
- [ ] All forms have validation
- [ ] Loading and empty states implemented
- [ ] Toast notifications for all actions
- [ ] Keyboard accessible
- [ ] No console errors