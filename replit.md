# STEP IT Services Platform

## Overview

This is a full-stack web application for STEP, a Vietnamese IT services company that provides comprehensive IT infrastructure solutions including cloud services, hosting, servers, and software licensing. The platform serves as a marketing website with contact form functionality to generate leads from potential customers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming and advanced animations
- **State Management**: React Query (@tanstack/react-query) for server state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (DatabaseStorage implementation)
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Development**: Full-stack development with Vite middleware integration

## Key Components

### Database Schema
The application uses a simple contact management system with a single `contacts` table:
- `id`: Primary key (serial)
- `name`: Contact name (required)
- `email`: Contact email (required)
- `phone`: Optional phone number
- `company`: Optional company name
- `service`: Optional service interest
- `message`: Contact message (required)
- `createdAt`: Timestamp
- `isRead`: Boolean flag for contact status

### API Endpoints
- `POST /api/contact`: Submit new contact form
- `GET /api/contacts`: Retrieve all contacts (admin)
- `GET /api/contacts/:id`: Retrieve specific contact
- `PUT /api/contacts/:id/read`: Mark contact as read

### UI Components
- **Header**: Navigation with mega menu for services
- **Hero**: Main landing section with call-to-action
- **Services**: Grid layout showcasing IT services
- **Statistics**: Key metrics and achievements
- **Testimonials**: Customer testimonials with imagery
- **Resources**: Blog-style content cards
- **Footer**: Company info and additional CTAs
- **ContactForm**: Modal form for lead generation

## Data Flow

1. **User Interaction**: Visitors browse the marketing website and can open contact forms
2. **Form Submission**: Contact forms are validated client-side with Zod schemas
3. **API Processing**: Form data is sent to Express.js backend via React Query
4. **Database Storage**: Contact information is stored in PostgreSQL via Drizzle ORM
5. **Response Handling**: Success/error feedback is shown via toast notifications

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives
- **Validation**: Zod for schema validation
- **Date Handling**: date-fns for date formatting
- **Icons**: Lucide React for consistent iconography

### Development Dependencies
- **Build Tools**: Vite, ESBuild for production builds
- **Development**: tsx for TypeScript execution
- **Database Tools**: Drizzle Kit for migrations
- **Code Quality**: TypeScript for type safety

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations handle schema changes

### Environment Requirements
- Node.js environment with ES modules support
- PostgreSQL database (via Neon Database) - **ACTIVE**
- Environment variables: `DATABASE_URL`, `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` for database connection

### Production Setup
- **Start Command**: `npm start` runs the bundled server
- **Static Assets**: Express serves built React app
- **Database**: Automatic connection via Drizzle ORM
- **Error Handling**: Centralized error middleware

### Development Features
- **Hot Reload**: Vite dev server with HMR
- **Type Safety**: Full TypeScript coverage
- **Database**: Push schema changes with `npm run db:push`
- **Development Server**: `npm run dev` for local development

The architecture prioritizes simplicity and developer experience while providing a robust foundation for a marketing website with lead generation capabilities. The application is designed to be easily deployable and maintainable for a growing IT services business.

## Recent System Optimizations (January 2025)

### Performance & Mobile Optimization
- **Header System**: Completely rebuilt with proper accessibility (SheetTitle, SheetDescription)
- **Mobile Menu**: Enhanced with collapsible categories and smooth animations
- **Mega Menu**: Optimized positioning (w-[95vw] max-w-7xl) to prevent overflow issues
- **Responsive Design**: Implemented comprehensive breakpoints for mobile-first approach
- **Performance**: Added smooth scrolling, reduced motion support, and optimized image loading

### Custom Brand Icons
- **Icon System**: Created custom SVG icons for each service category aligned with STEP branding
- **Brand Consistency**: All icons use STEP brand colors (hsl(207,100%,40%))
- **Visual Enhancement**: Added gradient backgrounds and hover effects for better user engagement

### Accessibility & UX Improvements
- **Focus Management**: Added proper focus styles for keyboard navigation
- **Screen Reader Support**: Implemented proper ARIA labels and descriptions
- **Mobile Touch Targets**: Optimized button sizes and spacing for mobile devices
- **Loading States**: Enhanced visual feedback during form submissions and API calls

### Technical Optimizations
- **CSS Performance**: Optimized animations and transitions with hardware acceleration
- **Responsive Images**: Implemented proper image sizing and optimization
- **Typography**: Enhanced text scaling and readability across all devices
- **Button Interactions**: Added micro-interactions and hover effects for better user experience

The system is now fully optimized for production use with excellent mobile performance and accessibility standards.