# STEP IT Services Platform

## Overview

This is a full-stack web application for STEP, a Vietnamese IT services company providing comprehensive IT infrastructure solutions (cloud services, hosting, servers, software licensing). The platform functions as a marketing website with lead generation via contact forms, offering transparent performance benchmarks, personalized user experiences, and comprehensive content via a blog system. It aims to showcase STEP's services, provide detailed information on IT solutions, and streamline lead acquisition.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, built using Vite.
- **Routing**: Wouter for lightweight client-side routing.
- **UI/UX**: Radix UI components styled with shadcn/ui and Tailwind CSS (custom CSS variables for theming).
- **State Management**: React Query for server state.
- **Form Handling**: React Hook Form with Zod validation.
- **Animations**: Framer Motion for smooth page transitions, component animations, and interactive elements.
- **Key UI Components**: Header (mega menu), Hero, Services grid, Statistics, Testimonials, Resources (blog), Footer, ContactForm, Blog (public & admin), Performance Benchmarking, Personalization system, Tooltip system.
- **Design Principles**: Mobile-first, responsive design, accessibility (ARIA labels, keyboard navigation), optimized images, custom SVG icons with brand colors, Inter font.

### Backend
- **Runtime**: Node.js with Express.js framework.
- **Language**: TypeScript with ES modules.
- **Database**: PostgreSQL with Drizzle ORM.
- **API Design**: RESTful API with JSON responses.
- **Key Features**:
    - **Contact Management**: CRUD for contact form submissions.
    - **Blog Management**: Full CRUD operations for articles (including title, slug, content, category, tags, images, publication status) with an admin interface.
    - **Data Flow**: Client-side Zod validation -> React Query -> Express.js backend -> PostgreSQL via Drizzle ORM.

### Core Features
- **Personalization System**: Multi-step onboarding (name, role, service interests) appearing after 10 seconds for first-time visitors, saving preferences to LocalStorage. Dynamically adjusts hero sections, service recommendations, and CTAs based on user profiles.
- **Performance Benchmark Visualization**: Interactive dashboard with multi-tab interface displaying response time, throughput, resource usage, uptime, and security metrics using Recharts. Compares hosting plans (Basic, Advanced, Pro, Enterprise) with real performance data and integrates plan recommendations with contact forms.
- **Email Services Landing Pages**: Dedicated pages for Email Service Comparison (`/Dịch vụ/Email`) and Enterprise Email Solutions (`/Sản Phẩm & Dịch Vụ/Email`), providing detailed comparisons, pricing tiers, and lead generation forms.
- **Private Email Server Page**: Dedicated page for private email server solutions (`/Sản Phẩm & Dịch Vụ/Email Server Riêng`).
- **Hosting Services**: Nested structure for various hosting types (`/Sản Phẩm & Dịch Vụ/Hosting/`) including:
    - **NVME Hosting**: High-performance, developer-focused.
    - **WordPress Hosting**: Optimized for WordPress users.
    - **Laravel Hosting**: Tailored for PHP/Laravel developers with specific features.
    - **Reseller Hosting**: For businesses offering hosting services.
- **Domain Services Landing Page**: Comprehensive page for domain registration, transfer, DNS management, and protection, featuring a domain search tool and pricing plans.
- **Interactive Tooltip System**: Contextual tooltips providing detailed information on features, benefits, and tips, with intelligent positioning and rich content.
- **Technical Certifications Showcase**: Display of 6 professional certifications (MCT, Linux LPI, DLP Safetica, VCP5, Cisco CCNA, CEH) with animated cards.
- **Customers & Partners Portfolio**: Comprehensive showcase of service partners (VMware, CMC Corp, VZAM, Aruba, FPT, Dell, etc.) and customers (Medlatec, BSG, Sở Văn Hóa Hà Nội, VETC, etc.).
- **4-Step Service Process**: Visual workflow from consultation to full operation services with arrow connectors and detailed descriptions.
- **Detailed IT Services**: Specialized services including equipment rental, server maintenance, network security, warranty services, and IT training.
- **Cloud Server Services**: Comprehensive cloud server solutions page (`/Cloud/Cloud Server`) featuring 6-tier package system (Basic 1/2, Pro 1/2, Enterprise 1/2) with component-based pricing structure. Includes interactive pricing calculator with payment cycle discounts (3-36 months: 3-36% off), detailed component pricing (CPU: 60k VND/core, RAM: 60k VND/GB, SSD: 3k VND/GB, HDD: 1k VND/GB, IP: 100k VND/IP, Bandwidth: 100k VND/100Mbps), complimentary services (SSL Certificate, Monitoring & Alert, 24/7 Support, Migration Service), and premium add-ons (Server Management: 1M VND/tháng, Database Optimization: 3-5M VND/lần, Load Balancer, AI/ML Support).
- **ServerConfigurator Advanced Features**:
  - **Voucher Discount System**: Percentage-based discount (0-100%) applied BEFORE VAT calculation. Real-time cost breakdown display and inclusion in PDF quotes.
  - **VAT Toggle**: Optional 10% VAT calculation applied AFTER voucher discount. Dynamic PDF notes that accurately reflect VAT inclusion status.
  - **Professional PDF Quotes**: Auto-generated quotes with complete cost breakdown (Subtotal → Voucher Discount → After Voucher → VAT → Grand Total), dynamic terms & conditions based on selected options.
- **CEO/CTO Focused Messaging** (Home Page `/`):
  - **Business-Focused Value Propositions**: ROI 300%+, TCO reduction 60%, compliance guarantees (ISO 27001, SOC 2, Luật An Ninh Mạng 2019).
  - **Quantified IT Challenges**: Specific VND amounts (CapEx 500M-2B VND), turnover rates (>25%), compliance penalties (3% revenue), ransomware costs (500M VND average).
  - **Strategic Solutions**: OpEx model for predictable costs, managed services (MTTR <15 min), SLA with 10x compensation, compliance-ready infrastructure.
  - **ROI-Driven Testimonials**: Customer success stories with concrete business metrics (58% TCO reduction, 320% ROI, 350M VND annual savings on personnel).

## External Dependencies

- **Database Provider**: Neon Database (serverless PostgreSQL).
- **UI Component Primitives**: Radix UI.
- **Form Validation**: Zod.
- **Date Utilities**: date-fns.
- **Icons**: Lucide React.
- **Charting Library**: Recharts.
- **ORM**: Drizzle ORM.
- **Database Migrations**: Drizzle Kit.
- **Build Tools**: Vite, ESBuild.
- **TypeScript Execution**: tsx.