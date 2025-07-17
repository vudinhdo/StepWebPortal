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
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Query (@tanstack/react-query) for server state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
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
- PostgreSQL database (via Neon Database)
- Environment variable: `DATABASE_URL` for database connection

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