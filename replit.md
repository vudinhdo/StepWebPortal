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
- **Key UI Components**: Header (mega menu), Hero, Services grid, Statistics, Testimonials, Resources (blog), Footer, ContactForm, Blog (public & admin), Performance Benchmarking, Personalization system, Tooltip system, FAQ section (homepage and Cloud Server page), ServerConfigurator with mobile-optimized layout.
- **Design Principles**: Mobile-first, responsive design, accessibility (ARIA labels, keyboard navigation), optimized images, custom SVG icons with brand colors, Inter font, large touch targets for mobile (py-6 buttons), responsive breakpoints for optimal viewing across devices.

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
    - **General Hosting (Main/Flagship)**: Comprehensive technology-agnostic hosting solution marketed as "SIÊU PHẨM" (premium product) with aggressive promotional messaging. Features 18 packages (HT-Starter-1 to HT-Enterprise-6) ranging from 50K-3.5M VNĐ/month. Hero section emphasizes speed ("nhanh gấp 10 lần Apache"), security ("chặn 100% DDoS/malware"), and affordability with promotional offers: 30% discount (7-day limited), free migration (2-hour completion), 24/7/365 support (Zalo OA + ticket + hotline 0985.636.289), 30-day money-back guarantee with 200% refund promise. Licensed software stack: cPanel/WHM (unlimited accounts), AlmaLinux OS (enterprise RHEL-compatible), LiteSpeed Enterprise (HTTP/3, 5-10x performance, marketed as 10x faster), Imunify360 (AI-powered security), WAF (ModSecurity, OWASP rules), NVMe SSD RAID 10, MySQL/MariaDB optimized, Cloudflare CDN, JetBackup automated backups, multi-PHP versions (7.4-8.3), resource monitoring, advanced performance tools, 24/7 expert support. Marketing copy includes package categorization (Cơ bản 50K for blogs, Business 150K-350K for SMEs, Enterprise 750K+ for large portals), urgency messaging ("ĐỪNG ĐỂ WEBSITE CHẬM = MẤT KHÁCH"), and tagline "STEP – Hosting Việt Nam, tốc độ thế giới! 50K/tháng – Doanh nghiệp bạn đáng giá hơn thế!" Includes 12 technical features section highlighting licensed stack, grid/table comparison views, competitor comparison (8 metrics vs generic hosting providers), 3 customer testimonials, and 12-item FAQ covering cPanel, AlmaLinux, LiteSpeed, Imunify360, WAF, migration, PHP versions, JetBackup, uptime SLA, upgrades, limits, and Redis/Memcached. Positioned as flagship general-purpose hosting offering with premium branding and aggressive competitive positioning.
    - **NVMe Hosting**: Comprehensive NVMe SSD hosting solution with 18 packages (NV-Starter-1 to NV-Enterprise-6), from 80K/month to custom enterprise solutions. Features ultra-fast NVMe storage (PCIe 4.0), high IOPS (10K-3M), low latency (< 100µs), dedicated resources (1-96 vCores, 1-256GB RAM), automated backups (weekly to real-time), advanced security (Imunify360, DDoS protection), CDN integration, 24/7 expert support. Includes 12 technical features section, grid/table comparison views, competitor comparison (8 metrics), 3 customer testimonials, and 12-item FAQ covering NVMe technology, IOPS requirements, migration, backups, SSL, and resource planning.
    - **WordPress Hosting**: Comprehensive WordPress hosting solution with 18 packages (WP-Starter-1 to WP-Enterprise-6), from 50K/month to custom enterprise solutions. Features LiteSpeed server, LSCache, NVMe SSD, CloudLinux OS, Imunify360 security, multiple PHP versions, Cloudflare CDN, JetBackup, email hosting, 24/7 support. Includes technical features section, comparison table view, competitor comparison, testimonials, and 12-item FAQ.
    - **Laravel Hosting**: Comprehensive Laravel hosting solution with 18 packages (LV-Starter-1 to LV-Enterprise-6), from 60K/month to custom enterprise solutions. Optimized for Laravel framework with PHP 8.1-8.3, Composer 2, full SSH/SFTP access, Git + CI/CD integration (GitHub Actions, Jenkins), Redis + Memcached caching, Laravel Horizon + Queue workers, advanced cron scheduler, NVMe SSD storage, Imunify360 security, LiteSpeed server, automated backups (hourly to real-time), 24/7 Laravel-expert support. Includes 12 technical features section, grid/table comparison views, competitor comparison (8 metrics), 3 developer testimonials, and 12-item FAQ covering deployment, migrations, Horizon, SSH access, CI/CD pipelines, and resource planning.
    - **Reseller Hosting**: For businesses offering hosting services.
- **Domain Services Landing Page**: Comprehensive page for domain registration, transfer, DNS management, and protection, featuring a domain search tool and pricing plans.
- **Interactive Tooltip System**: Contextual tooltips providing detailed information on features, benefits, and tips, with intelligent positioning and rich content.
- **Technical Certifications Showcase**: Display of 6 professional certifications (MCT, Linux LPI, DLP Safetica, VCP5, Cisco CCNA, CEH) with animated cards.
- **Customers & Partners Portfolio**: Comprehensive showcase of service partners (VMware, CMC Corp, VZAM, Aruba, FPT, Dell, etc.) and customers (Medlatec, BSG, Sở Văn Hóa Hà Nội, VETC, etc.).
- **4-Step Service Process**: Visual workflow from consultation to full operation services with arrow connectors and detailed descriptions.
- **Detailed IT Services**: Specialized services including equipment rental, server maintenance, network security, warranty services, and IT training.
- **Cloud Server Services**: Comprehensive cloud server solutions page (`/Cloud/Cloud Server`) featuring 6-tier package system (Basic 1/2, Pro 1/2, Enterprise 1/2) with component-based pricing structure. Includes interactive pricing calculator with flexible payment cycles (1-60 months), detailed component pricing (CPU: 60k VND/core, RAM: 60k VND/GB, SSD: 3k VND/GB, HDD: 1k VND/GB, IP: 100k VND/IP, Bandwidth: 100k VND/100Mbps), complimentary services (SSL Certificate, Monitoring & Alert, 24/7 Support), and premium add-ons (Server Management, Database Optimization, Website Speed Optimization, Load Balancer, AI/ML Support).
- **FAQ Section**: Comprehensive 10-question FAQ using Accordion component, displayed on both homepage (/) and Cloud Server page (/Cloud/Cloud Server). Covers Cloud Server basics, datacenter locations, scalability, compliance, migration, GPU/AI support, SLA uptime, payment methods, backup options (3 bản/tuần, giữ lại 3 bản gần nhất, restore từ 10 phút trở lên tùy dung lượng), and 24/7 support channels.
- **Server Configurator (Cloud Server) with Quote Generation**: Advanced cloud server configuration tool with:
    - **User Instructions**: 7-step guided workflow to help users understand the configuration process
    - **Customer Information Collection**: Form capturing customer details (name, phone, email*, company, tax code) with email validation requirement
    - **Flexible Payment Cycles**: 1-60 months input (no automatic discounts)
    - **GPU Selection**: Checkbox-based selection with "Dedicated GPU" labeling (NVIDIA Tesla T4, V100, A100 options)
    - **Operating System Selection**: Checkbox-based single-selection including Ubuntu, CentOS, Windows Server (Trial 180-day free), and custom OS input option ("Khác - Tự nhập")
    - **Additional Services Per Server**: 6 services including Server Management (1M VND/month), Database Optimization (3M VND/occurrence), Migration Service (1M VND/site), Load Balancer (2M VND/month), AI/ML Support (1.5M VND/month), and Website Speed Optimization (500k VND/occurrence - one-time fee)
    - **Other Services Selection**: Ability to add other STEP services (Hosting, Email, Domain) with quantity selection
    - **Professional PDF Quote Generation**: Automated quote generation featuring official company information (MST: 0108230633, địa chỉ, email: info@step.com.vn, website: http://step.com.vn/), customer information, detailed server specifications with component table (including Dedicated GPU and OS with trial/custom labels), additional services table (showing one-time vs monthly fees separately), other services section (with subtotal, VAT, and total), voucher discounts, VAT calculation, and simplified bank account details footer (3 bullet points: Chủ tài khoản, Số tài khoản: 6223399, Ngân hàng: Hàng Hải Việt Nam). Uses embedded Vietnamese fonts (Roboto Regular & Bold) for proper diacritics rendering. Custom OS validation prevents PDF generation if OS set to "custom" but customOS field is empty/whitespace
    - **Enhanced Pricing Features**: Voucher discount system (percentage-based, applied before VAT), VAT toggle (10%)
    - **Calculation Order**: Subtotal → Voucher Discount → VAT (if enabled)

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