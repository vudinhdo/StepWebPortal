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
- **Blog Management**: Full CRUD operations for articles with admin interface

## Key Components

### Database Schema
The application uses two main tables for data management:

#### Contacts Table
- `id`: Primary key (serial)
- `name`: Contact name (required)
- `email`: Contact email (required)
- `phone`: Optional phone number
- `company`: Optional company name
- `service`: Optional service interest
- `message`: Contact message (required)
- `createdAt`: Timestamp
- `isRead`: Boolean flag for contact status

#### Articles Table (Blog System)
- `id`: Primary key (serial)
- `title`: Article title (required)
- `slug`: URL-friendly slug (required)
- `excerpt`: Article summary (required)
- `content`: Full article content (required)
- `category`: Article category (required)
- `tags`: Array of tags
- `imageUrl`: Optional featured image
- `author`: Article author (default: "STEP Team")
- `isPublished`: Publication status
- `isFeatured`: Featured article flag
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### API Endpoints

#### Contact Management
- `POST /api/contact`: Submit new contact form
- `GET /api/contacts`: Retrieve all contacts (admin)
- `GET /api/contacts/:id`: Retrieve specific contact
- `PATCH /api/contacts/:id/read`: Mark contact as read

#### Blog/Article Management
- `POST /api/articles`: Create new article
- `PATCH /api/articles/:id`: Update existing article
- `DELETE /api/articles/:id`: Delete article
- `GET /api/articles`: Get all articles (admin)
- `GET /api/articles/published`: Get published articles (public)
- `GET /api/articles/featured`: Get featured articles
- `GET /api/articles/category/:category`: Get articles by category
- `GET /api/articles/:id`: Get single article by ID
- `GET /api/articles/slug/:slug`: Get article by slug

### UI Components
- **Header**: Navigation with mega menu for services and blog link
- **Hero**: Main landing section with call-to-action
- **Services**: Grid layout showcasing IT services
- **Statistics**: Key metrics and achievements
- **Testimonials**: Customer testimonials with imagery
- **Resources**: Dynamic blog articles from database
- **Footer**: Company info and additional CTAs
- **ContactForm**: Modal form for lead generation
- **Blog**: Public blog listing with search and categories
- **Admin**: Blog management interface with full CRUD operations

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

### Animated Page Transitions (January 2025)
- **Page Transitions**: Implemented smooth page transitions between routes using framer-motion
- **Component Animations**: Added entrance animations to Hero, Services, Statistics, and Testimonials sections
- **Stagger Effects**: Applied sequential animations for service cards and statistics with proper timing
- **Hover Interactions**: Enhanced interactive elements with scale, rotation, and movement animations
- **Background Animations**: Added floating background elements with smooth pulsing effects
- **Performance Optimized**: Used viewport-based triggers to animate only when elements are visible

The system is now fully optimized for production use with excellent mobile performance, accessibility standards, and engaging animation effects.

## Personalized User Experience System (January 2025)

### Welcome Screen Flow
- **Smart Timing**: Welcome screen appears after 10 seconds for first-time visitors
- **Multi-Step Onboarding**: 3-step process collecting name, role, and interests
- **Role-Based Targeting**: 7 predefined roles (CEO, CTO, IT Manager, Developer, SysAdmin, Business Owner, Other)
- **Interest Selection**: 8 service categories with visual selection interface
- **Progress Tracking**: Visual progress bar and smooth step transitions
- **Skip Option**: Users can bypass personalization while maintaining experience

### Personalized Content Engine
- **Dynamic Hero Section**: Replaces standard hero with personalized greeting and recommendations
- **Role-Specific Recommendations**: Curated service suggestions based on user role
- **Interest-Based Filtering**: Highlighted services matching user selections
- **Personalized Benefits**: Role-specific value propositions and success metrics
- **Smart CTAs**: Contextual call-to-action buttons based on user profile

### Personalization Management
- **Persistent Storage**: User preferences saved in localStorage for return visits
- **Settings Panel**: Expandable settings widget for viewing and managing personalization
- **Edit Capability**: Users can modify their preferences without losing context
- **Reset Function**: Complete personalization reset with fresh welcome screen
- **Privacy Focused**: All data stored locally, no external tracking

### User Experience Features
- **Time-Based Greetings**: Dynamic welcome messages based on time of day
- **Animated Interactions**: Smooth transitions between personalization steps
- **Responsive Design**: Optimized for all device sizes and touch interactions
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Performance Optimized**: Lazy loading and efficient state management

The personalization system creates a tailored experience for each visitor while maintaining the professional STEP brand identity and ensuring optimal conversion rates.

## Interactive Tooltip System (January 2025)

### Smart Tooltip Features
- **Intelligent Positioning**: Auto-calculates optimal position to stay within viewport
- **Trigger Options**: Support for both hover (desktop) and click (mobile) interactions
- **Rich Content**: Displays features, benefits, tips, and call-to-action buttons
- **Type-Based Styling**: Different visual styles for info, feature, benefit, and tip tooltips
- **Portal Rendering**: Uses React portals for proper z-index management
- **Responsive Design**: Adapts to different screen sizes and orientations

### Content Structure
- **Title & Description**: Clear explanations of complex features
- **Feature Lists**: Detailed functionality breakdowns
- **Benefit Badges**: Highlight key advantages
- **Tips Section**: Helpful usage recommendations
- **Interactive CTAs**: Action buttons for deeper engagement
- **Visual Indicators**: Color-coded icons for different tooltip types

### User Experience Enhancements
- **Smooth Animations**: Framer-motion powered entrance/exit effects
- **Smart Delays**: Configurable hover delays to prevent accidental triggers
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Performance**: Optimized rendering with viewport calculations
- **Mobile Friendly**: Touch-optimized interactions for mobile devices

### Implementation Areas
- **Service Cards**: Enhanced service descriptions with detailed tooltips
- **Feature Showcase**: Interactive demonstrations of complex functionality
- **Technical Specifications**: Detailed explanations of technical features
- **Pricing Information**: Comprehensive pricing breakdowns with benefits

The tooltip system significantly improves user understanding of complex features while maintaining clean interface design.

## Enhanced Navigation System (January 2025)

### Mega Menu Redesign
- **Eliminated Duplicates**: Removed redundant blue highlighted sections from dropdown menu
- **Added Icons**: Integrated Lucide React icons for all navigation items and menu sections
- **Clean Layout**: Streamlined 3-column grid layout without redundant content
- **Elegant Animations**: Spring-based animations with stagger effects and smooth transitions
- **Smart Positioning**: Auto-calculated positioning to prevent viewport overflow

### Navigation Enhancements
- **Icon Integration**: Added icons to all main navigation items (Home, Services, Blog, Contact)
- **Hover Effects**: Enhanced hover states with color transitions and icon animations
- **Dropdown Indicators**: Rotating chevron icons that respond to hover states
- **Consistent Branding**: Updated all colors to use STEP brand color (hsl(207,100%,40%))

### Mobile Menu Improvements
- **Collapsible Categories**: Smooth accordion-style navigation for mobile devices
- **Icon Consistency**: Matching icons between desktop and mobile views
- **Touch Optimized**: Proper touch targets and smooth animations for mobile interaction
- **Visual Hierarchy**: Clear section separation with background colors and spacing

### Animation Features
- **Spring Physics**: Natural motion with spring-based transitions
- **Staggered Entry**: Sequential appearance of menu items for polished feel
- **Micro Interactions**: Hover effects, scale transforms, and position shifts
- **Performance Optimized**: Hardware-accelerated animations for smooth performance

The navigation system now provides a professional, intuitive experience with consistent iconography and elegant animations throughout all user interactions.

## Blog Management System (January 2025)

### Core Features
- **Full CRUD Operations**: Create, read, update, and delete articles
- **Publication Control**: Draft and published states with featured article support
- **Category System**: Organized content categorization
- **Tag Support**: Flexible tagging system for better content discovery
- **Rich Content**: Support for markdown-style content with images
- **SEO-Friendly**: URL slugs and meta descriptions
- **Responsive Design**: Mobile-optimized blog interface

### Admin Interface
- **Article Editor**: Rich form interface for content creation
- **Publication Controls**: Toggle publish and featured status
- **Category Management**: Predefined categories for consistent organization
- **Image Integration**: Featured image support with URL input
- **Tag Management**: Comma-separated tag input system
- **Seed Data**: Sample content generator for testing

### Public Blog Features
- **Search Functionality**: Real-time article search
- **Category Filtering**: Filter articles by category
- **Featured Articles**: Highlighted content section
- **Responsive Grid**: Mobile-first article grid layout
- **Author Attribution**: Article author display
- **Publication Dates**: Formatted creation dates
- **Dynamic Integration**: Homepage resources section pulls from actual articles

### Database Integration
- **PostgreSQL Storage**: Full article data persistence
- **Drizzle ORM**: Type-safe database operations
- **Query Optimization**: Efficient data retrieval with proper indexing
- **Data Validation**: Zod schema validation for all inputs

The blog system provides STEP with a comprehensive content management solution for sharing technical insights, company news, and industry trends with their audience.

## Domain Services Landing Page (January 2025)

### Professional Domain Page Features
- **Comprehensive Domain Services**: Full landing page for domain registration, transfer, DNS management, and domain protection
- **Cloudflare-Inspired Design**: Clean, modern layout following Cloudflare's professional design patterns
- **Domain Search Tool**: Interactive domain availability checker with popular TLD pricing
- **Service Sections**: Detailed explanations of 4 core services with benefits and features
- **Pricing Plans**: Three-tier pricing structure (Basic, Professional, Enterprise)
- **Social Proof**: Customer testimonials and statistics
- **CTA Integration**: Strategic call-to-action sections for lead generation

### Page Structure
- **Hero Section**: Domain search tool with statistics and popular TLD options
- **Services Grid**: Four main services (Registration, Transfer, DNS Management, Protection)
- **Pricing Section**: Transparent pricing with popular plan highlighting
- **Testimonials**: Customer feedback and ratings
- **Final CTA**: Conversion-focused call-to-action section

### Navigation Integration
- Added `/domain` route to application routing
- Updated mega menu to link to domain page
- Consistent branding and navigation flow