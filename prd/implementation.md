# Trip Scheduler - Product Requirements Document

## Project Overview

**Trip Scheduler** is a web application that allows users to schedule trips and automatically assign available drivers using AI (Gemini). The system manages driver availability and provides an intuitive interface for trip scheduling and driver management.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui (new-york style)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Forms**: react-hook-form + zod
- **State Management**: TanStack Query (for future API integration)
- **Date Handling**: date-fns, react-day-picker

---

## Design Principles

### UI/UX Guidelines

1. **Consistency**: Use the same spacing, typography, and color palette across all pages
2. **Visual Hierarchy**: Clear distinction between primary and secondary actions
3. **Responsive Design**: Mobile-first approach, breakpoints at sm(640px), md(768px), lg(1024px), xl(1280px)
4. **Feedback**: Loading states, hover effects, and toast notifications for all actions
5. **Accessibility**: Proper ARIA labels, keyboard navigation, focus states
6. **Whitespace**: Generous padding and margins for readability

### Design Tokens

```
Colors:
- Primary: neutral-900 (dark mode compatible)
- Background: white / neutral-50
- Muted: neutral-100 / neutral-200
- Accent: blue-600 for CTAs
- Destructive: red-600 for delete actions
- Success: green-600 for confirmations

Typography:
- Headings: Geist Sans, font-semibold
- Body: Geist Sans, font-normal
- Mono: Geist Mono (for IDs/codes)

Spacing:
- Section padding: py-16 md:py-24
- Container max-width: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Card padding: p-6
- Button padding: px-4 py-2
```

---

## Folder Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx                    # Root layout with providers
│   ├── (landing)/
│   │   ├── layout.tsx                # Landing layout with navbar/footer
│   │   └── page.tsx                  # Landing page
│   └── (dashboard)/
│       ├── layout.tsx                # Dashboard layout with sidebar/header
│       ├── schedule/
│       │   └── page.tsx              # Schedule Trip page
│       ├── drivers/
│       │   └── page.tsx              # Drivers CRUD page
│       └── calendar/
│           └── page.tsx              # Driver Schedule Calendar page
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── landing/
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   └── footer.tsx
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── mobile-nav.tsx
│   ├── schedule/
│   │   ├── schedule-form.tsx
│   │   ├── csv-import.tsx
│   │   └── trip-list.tsx
│   ├── drivers/
│   │   ├── driver-table.tsx
│   │   ├── driver-form.tsx
│   │   ├── driver-dialog.tsx
│   │   └── availability-picker.tsx
│   └── calendar/
│       ├── schedule-calendar.tsx
│       ├── calendar-day.tsx
│       └── driver-badge.tsx
├── hooks/
│   ├── use-mobile.ts
│   ├── use-drivers.ts                # Driver state management
│   ├── use-trips.ts                  # Trip state management
│   └── use-local-storage.ts          # Persist data locally
├── lib/
│   ├── utils.ts
│   ├── types.ts                      # TypeScript interfaces
│   ├── constants.ts                  # App constants
│   └── mock-data.ts                  # Mock data for development
└── context/
    ├── QueryProvider.tsx
    └── AppProvider.tsx               # App-wide state context
```

---

## Data Models (TypeScript Interfaces)

```typescript
// lib/types.ts

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
  tripId: string;          // User-provided trip identifier
  date: Date;
  assignedDrivers: string[]; // Driver IDs
  status: 'pending' | 'assigned' | 'completed';
  createdAt: Date;
}

export interface ScheduleEntry {
  date: Date;
  drivers: Driver[];
}
```

---

## Phase 1: Landing Page

### Objective
Create a professional, conversion-focused landing page that introduces the Trip Scheduler application.

### Pages
- `/` - Landing page

### Components to Build

#### 1.1 Navbar (`components/landing/navbar.tsx`)
- **Logo**: Trip Scheduler text/icon on the left
- **Navigation Links**: Features, How it Works, Pricing (placeholder)
- **CTA Button**: "Get Started" → navigates to `/schedule`
- **Mobile**: Hamburger menu with Sheet component
- **Behavior**: Sticky on scroll with blur background

#### 1.2 Hero Section (`components/landing/hero.tsx`)
- **Headline**: "Smart Trip Scheduling, Powered by AI"
- **Subheadline**: Brief description of the value proposition
- **Primary CTA**: "Get Started" button → `/schedule`
- **Secondary CTA**: "Learn More" → scrolls to features
- **Visual**: Abstract illustration or mockup (placeholder div for now)
- **Layout**: Two-column on desktop, stacked on mobile

#### 1.3 Features Section (`components/landing/features.tsx`)
- **Section Title**: "Why Choose Trip Scheduler?"
- **Feature Cards** (3-4 cards in a grid):
  1. **AI-Powered Assignment**: Automatic driver matching based on availability
  2. **CSV Import**: Bulk import trips from spreadsheets
  3. **Driver Management**: Easy CRUD for driver profiles and schedules
  4. **Calendar View**: Visual overview of all scheduled trips
- **Card Design**: Icon + Title + Description
- **Layout**: 2x2 grid on desktop, single column on mobile

#### 1.4 Footer (`components/landing/footer.tsx`)
- **Logo and tagline**
- **Quick Links**: Features, Schedule, Drivers, Calendar
- **Copyright notice**
- **Layout**: Multi-column on desktop, stacked on mobile

### Implementation Checklist
- [ ] Create `(landing)/layout.tsx` with Navbar and Footer
- [ ] Build responsive Navbar with mobile menu
- [ ] Build Hero section with CTAs
- [ ] Build Features section with card grid
- [ ] Build Footer with links
- [ ] Add smooth scroll behavior
- [ ] Test responsiveness on all breakpoints

---

## Phase 2: Dashboard Layout & Schedule Trip Page

### Objective
Create the main application dashboard with a consistent layout and the trip scheduling functionality.

### Pages
- `/schedule` - Schedule Trip page

### Components to Build

#### 2.1 Dashboard Layout (`app/(dashboard)/layout.tsx`)
- **Sidebar** (desktop): Navigation links with icons
  - Schedule Trip
  - Manage Drivers
  - Driver Calendar
- **Header**: Page title, breadcrumbs (optional), user actions
- **Mobile**: Bottom navigation or collapsible sidebar
- **Content Area**: Main content with proper padding

#### 2.2 Sidebar (`components/dashboard/sidebar.tsx`)
- **Logo**: Trip Scheduler (links to landing)
- **Nav Items**: Icon + Label, active state highlighting
- **Responsive**: Hidden on mobile, shown on lg+

#### 2.3 Header (`components/dashboard/header.tsx`)
- **Page Title**: Dynamic based on current route
- **Mobile Menu Toggle**: Sheet-based sidebar for mobile
- **Optional**: Search, notifications placeholder

#### 2.4 Schedule Form (`components/schedule/schedule-form.tsx`)
- **Form Fields**:
  - Trip ID: Text input with validation (required, alphanumeric)
  - Date: Date picker using react-day-picker
- **Submit Button**: "Schedule Trip"
- **Validation**: Using react-hook-form + zod
- **Feedback**: Success toast, error states

#### 2.5 CSV Import (`components/schedule/csv-import.tsx`)
- **Dropzone**: Drag-and-drop area for CSV files
- **File Input**: Fallback click-to-upload
- **Preview**: Show parsed data in a table before confirming
- **Validation**: Check CSV format, show errors
- **Actions**: Import button, clear button

#### 2.6 Trip List (`components/schedule/trip-list.tsx`)
- **Table/Cards**: Display scheduled trips
- **Columns**: Trip ID, Date, Status, Assigned Drivers
- **Empty State**: Illustration + message when no trips
- **Actions**: View details, delete (future: edit)

### Implementation Checklist
- [ ] Create `(dashboard)/layout.tsx` with sidebar and header
- [ ] Build responsive Sidebar component
- [ ] Build Header with mobile menu
- [ ] Create `/schedule/page.tsx`
- [ ] Build Schedule Form with validation
- [ ] Build CSV Import with drag-and-drop
- [ ] Build Trip List with empty state
- [ ] Add tab navigation between manual input and CSV import
- [ ] Implement local storage for trips (temporary)
- [ ] Test responsiveness

---

## Phase 3: Drivers Management Page

### Objective
Create a full CRUD interface for managing drivers and their weekly availability.

### Pages
- `/drivers` - Drivers management page

### Components to Build

#### 3.1 Driver Table (`components/drivers/driver-table.tsx`)
- **Columns**:
  - Name (sortable)
  - Availability (visual pills for available days)
  - Actions (Edit, Delete)
- **Features**:
  - Search/filter by name
  - Pagination (if needed)
  - Responsive: Cards on mobile, table on desktop
- **Empty State**: "No drivers yet" with add button

#### 3.2 Driver Form (`components/drivers/driver-form.tsx`)
- **Fields**:
  - Name: Text input (required)
  - Availability: 7 checkboxes for each day
- **Validation**: Name required, at least one day selected
- **Mode**: Create and Edit (same form, different submit logic)

#### 3.3 Driver Dialog (`components/drivers/driver-dialog.tsx`)
- **Wrapper**: Dialog/Sheet component containing the form
- **Modes**: Add new driver, Edit existing driver
- **Actions**: Save, Cancel
- **Delete Confirmation**: AlertDialog for delete action

#### 3.4 Availability Picker (`components/drivers/availability-picker.tsx`)
- **UI**: Row of 7 toggle buttons (Mon-Sun)
- **Visual**: Filled when available, outlined when not
- **Accessibility**: Proper labels for each day

### Page Layout (`app/(dashboard)/drivers/page.tsx`)
- **Header**: "Manage Drivers" title + "Add Driver" button
- **Content**: Driver table
- **Dialogs**: Add/Edit overlays

### Implementation Checklist
- [ ] Create `/drivers/page.tsx`
- [ ] Build Driver Table with responsive design
- [ ] Build Availability Picker component
- [ ] Build Driver Form with validation
- [ ] Build Driver Dialog (Add/Edit modes)
- [ ] Implement delete confirmation
- [ ] Add search/filter functionality
- [ ] Implement local storage for drivers
- [ ] Add loading and empty states
- [ ] Test CRUD operations

---

## Phase 4: Driver Schedule Calendar Page

### Objective
Create a calendar view showing driver availability and scheduled trips.

### Pages
- `/calendar` - Driver Schedule Calendar

### Components to Build

#### 4.1 Schedule Calendar (`components/calendar/schedule-calendar.tsx`)
- **View Modes**: Month view (default), Week view (optional)
- **Navigation**: Previous/Next month, Today button
- **Current Date**: Highlight today
- **Layout**: 7-column grid for days

#### 4.2 Calendar Day (`components/calendar/calendar-day.tsx`)
- **Date Number**: Prominently displayed
- **Available Drivers**: List/badges of available drivers for that day
- **Scheduled Trips**: Visual indicator of trips on that day
- **Click Action**: Expand to show details (optional)

#### 4.3 Driver Badge (`components/calendar/driver-badge.tsx`)
- **Design**: Small pill with driver name/initials
- **Color Coding**: Different colors for different drivers (optional)
- **Overflow**: "+X more" when too many drivers

### Page Layout (`app/(dashboard)/calendar/page.tsx`)
- **Header**: "Driver Schedule" title + View toggles
- **Filters**: Filter by driver (optional)
- **Legend**: Color coding explanation (if applicable)
- **Content**: Full-width calendar

### Implementation Checklist
- [ ] Create `/calendar/page.tsx`
- [ ] Build Calendar grid layout
- [ ] Build Calendar Day component
- [ ] Build Driver Badge component
- [ ] Implement month navigation
- [ ] Show available drivers per day
- [ ] Add responsive design (scroll on mobile)
- [ ] Add empty states for days without drivers
- [ ] Connect to drivers data
- [ ] Test across different months

---

## Phase 5: Polish & Integration

### Objective
Finalize the frontend, ensure consistency, and prepare for backend integration.

### Tasks

#### 5.1 State Management
- [ ] Create `AppProvider` context for global state
- [ ] Implement `use-drivers.ts` hook with localStorage
- [ ] Implement `use-trips.ts` hook with localStorage
- [ ] Add proper loading states throughout

#### 5.2 UI Polish
- [ ] Audit all pages for consistency
- [ ] Add page transitions/animations (subtle)
- [ ] Implement skeleton loaders
- [ ] Add proper focus states
- [ ] Test keyboard navigation

#### 5.3 Responsive Audit
- [ ] Test on 320px width (small mobile)
- [ ] Test on 768px width (tablet)
- [ ] Test on 1024px width (laptop)
- [ ] Test on 1440px width (desktop)
- [ ] Fix any overflow issues

#### 5.4 Error Handling
- [ ] Add error boundaries
- [ ] Implement form error messages
- [ ] Add fallback UI for failed states

#### 5.5 Documentation
- [ ] Update CLAUDE.md with new structure
- [ ] Add component documentation (optional)
- [ ] Create mock data for testing

---

## Navigation Flow

```
Landing Page (/)
    │
    └── "Get Started" button
            │
            ▼
    Schedule Trip (/schedule)  ◄──┐
            │                      │
            ├── Sidebar ───────────┼──► Manage Drivers (/drivers)
            │                      │
            └── Sidebar ───────────┴──► Driver Calendar (/calendar)
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, bottom nav, stacked cards |
| Tablet | 640-1023px | Two columns, collapsible sidebar |
| Desktop | ≥ 1024px | Full sidebar, multi-column grids |

---

## Component Library Usage

### shadcn/ui Components to Use

| Component | Usage |
|-----------|-------|
| Button | CTAs, form submissions, actions |
| Card | Feature cards, driver cards, trip cards |
| Dialog | Add/Edit modals |
| Sheet | Mobile navigation |
| Table | Driver list, trip list |
| Form | All form handling |
| Input | Text inputs |
| Checkbox | Availability selection |
| Calendar | Date picker |
| Badge | Status indicators, driver pills |
| Tabs | Switch between manual/CSV input |
| Toast (Sonner) | Success/error notifications |
| AlertDialog | Delete confirmations |
| Skeleton | Loading states |
| ScrollArea | Long lists |
| Separator | Visual dividers |

---

## Implementation Order Summary

1. **Phase 1** (Landing Page): ~1 session
   - Navbar, Hero, Features, Footer

2. **Phase 2** (Dashboard + Schedule): ~2 sessions
   - Dashboard layout, Schedule form, CSV import

3. **Phase 3** (Drivers CRUD): ~2 sessions
   - Driver table, Form, Dialogs, Availability picker

4. **Phase 4** (Calendar): ~1-2 sessions
   - Calendar grid, Day component, Driver badges

5. **Phase 5** (Polish): ~1 session
   - State management, UI audit, responsive fixes

---

## Success Criteria

- [ ] All pages are fully responsive (mobile, tablet, desktop)
- [ ] UI is consistent across all pages (spacing, colors, typography)
- [ ] All forms have proper validation and error messages
- [ ] CRUD operations work correctly with localStorage
- [ ] Calendar displays driver availability correctly
- [ ] Navigation is intuitive and keyboard-accessible
- [ ] Loading states are implemented for all async operations
- [ ] Empty states are designed for all list views
