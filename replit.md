# STEP IT Services Platform

## Overview
This full-stack web application serves as the online presence for STEP, a Vietnamese IT services company specializing in comprehensive IT infrastructure solutions (cloud, hosting, servers, software licensing). The platform's primary goal is to showcase STEP's services, provide detailed information on IT solutions, and generate leads through contact forms. It features transparent performance benchmarks, personalized user experiences, and a comprehensive blog system, aiming to streamline lead acquisition and offer a robust digital marketing tool.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, powered by Vite.
- **Routing**: Wouter for lightweight client-side navigation.
- **UI/UX**: Radix UI components styled with shadcn/ui and Tailwind CSS (custom theming).
- **State Management**: React Query for server state.
- **Form Handling**: React Hook Form with Zod validation.
- **Animations**: Framer Motion for interactive elements and transitions.
- **Design Principles**: Mobile-first, responsive, accessibility-focused (ARIA, keyboard navigation), optimized images, custom SVG icons, Inter font, responsive breakpoints.
- **Key Features**: Mega menu header, dynamic hero sections, services grid, statistics, testimonials, blog, contact forms, performance benchmarking visualization, personalization system, interactive tooltips, comprehensive FAQ sections. Specific offerings include dedicated pages for Email Services, Private Email Server, various Hosting types (General, NVMe, WordPress, Laravel, Reseller), Domain Services, and Cloud Server solutions. An advanced Server Configurator generates professional PDF quotes.

### Backend
- **Runtime**: Node.js with Express.js.
- **Language**: TypeScript with ES modules.
- **Database**: PostgreSQL with Drizzle ORM.
- **API Design**: RESTful API with JSON responses.
- **Core Features**:
    - **Contact Management**: CRUD operations for form submissions.
    - **Blog Management**: Full CRUD for articles, including an admin interface.
    - **Data Flow**: Client-side validation (Zod) -> React Query -> Express.js -> PostgreSQL via Drizzle ORM.

### Core System Design
- **Personalization System**: Onboarding for first-time visitors, saving preferences to LocalStorage, dynamically adjusting content based on user profiles.
- **Performance Benchmark Visualization**: Interactive dashboard using Recharts, comparing hosting plans and integrating recommendations with contact forms.
- **Hosting Services**: Structured content for various hosting types, emphasizing performance, security, and competitive differentiation with detailed technical features, comparisons, testimonials, and FAQs. Aggressive promotional messaging and a focus on licensed software stacks (cPanel/WHM, LiteSpeed Enterprise, Imunify360).
- **Cloud Server Solutions**: Component-based pricing with an interactive calculator, complimentary services, and premium add-ons.
- **Server Configurator**: A multi-tabbed interface for configuring cloud servers with contextual tooltips, quick presets, customer info collection, flexible payment cycles, GPU/OS selection, and a professional PDF quote generation feature with VAT calculation and voucher discounts. Includes sticky pricing sidebar on desktop and mobile-optimized layouts.
- **Certifications & Portfolio**: Showcase of professional certifications and a comprehensive portfolio of partners and customers.
- **Service Process**: A visual 4-step workflow for service delivery.

## External Dependencies
- **Database**: Neon Database (serverless PostgreSQL).
- **UI Components**: Radix UI.
- **Form Validation**: Zod.
- **Date Utilities**: date-fns.
- **Icons**: Lucide React.
- **Charting**: Recharts.
- **ORM**: Drizzle ORM.
- **Database Migrations**: Drizzle Kit.
- **Build Tools**: Vite, ESBuild.
- **TypeScript Execution**: tsx.