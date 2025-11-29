import { 
  type Contact, type InsertContact, type DomainContact, type InsertDomainContact, 
  type Article, type InsertArticle, type UpdateArticle,
  type Service, type InsertService, type UpdateService,
  type Testimonial, type InsertTestimonial, type UpdateTestimonial,
  type PageContent, type InsertPageContent, type UpdatePageContent,
  type SiteSetting, type InsertSiteSetting,
  type EmailPopupLead, type InsertEmailPopupLead,
  type AdminUser, type InsertAdminUser, type ActivityLog, type InsertActivityLog, type WebsiteBackup, type InsertWebsiteBackup,
  type ServerEquipment, type InsertServerEquipment, type UpdateServerEquipment,
  type EquipmentCategory, type InsertEquipmentCategory, type UpdateEquipmentCategory
} from "@shared/schema";

export interface IStorage {
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  markContactAsRead(id: number): Promise<Contact | undefined>;
  
  // Domain Contact methods
  createDomainContact(contact: InsertDomainContact): Promise<DomainContact>;
  getDomainContacts(): Promise<DomainContact[]>;
  getDomainContact(id: number): Promise<DomainContact | undefined>;
  markDomainContactAsRead(id: number): Promise<DomainContact | undefined>;
  
  // Article methods
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: UpdateArticle): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;
  getArticles(): Promise<Article[]>;
  getPublishedArticles(): Promise<Article[]>;
  getFeaturedArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  
  // Service methods
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: UpdateService): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  getServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getServicesByCategory(category: string): Promise<Service[]>;
  
  // Testimonial methods
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: UpdateTestimonial): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  getTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  
  // Page Content methods
  createPageContent(content: InsertPageContent): Promise<PageContent>;
  updatePageContent(id: number, content: UpdatePageContent): Promise<PageContent | undefined>;
  deletePageContent(id: number): Promise<boolean>;
  getPageContents(): Promise<PageContent[]>;
  getPageContentsByPage(pageName: string): Promise<PageContent[]>;
  getPageContent(id: number): Promise<PageContent | undefined>;
  
  // Site Settings methods
  createSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting>;
  updateSiteSetting(key: string, value: string): Promise<SiteSetting | undefined>;
  getSiteSettings(): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  getSiteSettingsByCategory(category: string): Promise<SiteSetting[]>;
  
  // Email Popup Lead methods
  createEmailPopupLead(lead: InsertEmailPopupLead): Promise<EmailPopupLead>;
  getEmailPopupLeads(): Promise<EmailPopupLead[]>;
  getEmailPopupLead(id: number): Promise<EmailPopupLead | undefined>;
  markEmailPopupLeadAsProcessed(id: number): Promise<EmailPopupLead | undefined>;

  // Admin User methods
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  getAdminUsers(): Promise<AdminUser[]>;
  getAdminUser(id: number): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  updateAdminUser(id: number, user: Partial<AdminUser>): Promise<AdminUser | undefined>;
  deleteAdminUser(id: number): Promise<boolean>;
  
  // Activity Log methods
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  getActivityLogs(): Promise<ActivityLog[]>;
  getActivityLogsByUser(userId: number): Promise<ActivityLog[]>;
  
  // Website Backup methods
  createWebsiteBackup(backup: InsertWebsiteBackup): Promise<WebsiteBackup>;
  getWebsiteBackups(): Promise<WebsiteBackup[]>;
  getWebsiteBackup(id: number): Promise<WebsiteBackup | undefined>;
  deleteWebsiteBackup(id: number): Promise<boolean>;

  // Server Equipment methods
  createServerEquipment(equipment: InsertServerEquipment): Promise<ServerEquipment>;
  updateServerEquipment(id: number, equipment: UpdateServerEquipment): Promise<ServerEquipment | undefined>;
  deleteServerEquipment(id: number): Promise<boolean>;
  getServerEquipments(): Promise<ServerEquipment[]>;
  getActiveServerEquipments(): Promise<ServerEquipment[]>;
  getFeaturedServerEquipments(): Promise<ServerEquipment[]>;
  getServerEquipment(id: number): Promise<ServerEquipment | undefined>;
  getServerEquipmentsByCategory(category: string): Promise<ServerEquipment[]>;
  getServerEquipmentsBySubCategory(subCategory: string): Promise<ServerEquipment[]>;
  searchServerEquipments(query: string): Promise<ServerEquipment[]>;
  bulkCreateServerEquipments(equipments: InsertServerEquipment[]): Promise<ServerEquipment[]>;

  // Equipment Category methods
  createEquipmentCategory(category: InsertEquipmentCategory): Promise<EquipmentCategory>;
  updateEquipmentCategory(id: number, category: UpdateEquipmentCategory): Promise<EquipmentCategory | undefined>;
  deleteEquipmentCategory(id: number): Promise<boolean>;
  getEquipmentCategories(): Promise<EquipmentCategory[]>;
  getActiveEquipmentCategories(): Promise<EquipmentCategory[]>;
  getEquipmentCategory(id: number): Promise<EquipmentCategory | undefined>;
  getEquipmentCategoryBySlug(slug: string): Promise<EquipmentCategory | undefined>;
}

export class MemStorage implements IStorage {
  private contacts: Contact[] = [];
  private articles: Article[] = [];
  private services: Service[] = [];
  private testimonials: Testimonial[] = [];
  private pageContents: PageContent[] = [];
  private siteSettings: SiteSetting[] = [];
  private domainContacts: DomainContact[] = [];
  private emailPopupLeads: EmailPopupLead[] = [];
  private adminUsers: AdminUser[] = [];
  private activityLogs: ActivityLog[] = [];
  private websiteBackups: WebsiteBackup[] = [];
  private serverEquipments: ServerEquipment[] = [];
  private equipmentCategories: EquipmentCategory[] = [];

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample admin user
    this.adminUsers = [
      {
        id: 1,
        username: "admin",
        email: "admin@step.com.vn",
        password: "admin123",
        role: "admin",
        lastLogin: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Sample articles
    this.articles = [
      {
        id: 1,
        title: "Xu hướng Cloud Computing 2025",
        slug: "xu-huong-cloud-computing-2025",
        excerpt: "Khám phá những xu hướng mới nhất trong lĩnh vực điện toán đám mây năm 2025",
        content: "Cloud computing đang phát triển mạnh mẽ với nhiều công nghệ mới nhất như AI-driven automation, serverless computing và edge computing. Các doanh nghiệp ngày càng chuyển đổi sang cloud để tối ưu hóa chi phí và tăng khả năng mở rộng.",
        category: "Công nghệ",
        tags: ["cloud", "technology", "2025"],
        imageUrl: "/images/cloud-computing.jpg",
        author: "STEP Team",
        isPublished: true,
        isFeatured: true,
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2025-01-01")
      },
      {
        id: 2,
        title: "Tối ưu hóa WordPress Performance",
        slug: "toi-uu-hoa-wordpress-performance",
        excerpt: "Hướng dẫn chi tiết cách tăng tốc website WordPress",
        content: "WordPress là CMS phổ biến nhất thế giới, nhưng để có performance tốt cần áp dụng nhiều kỹ thuật như caching, CDN, tối ưu database và sử dụng hosting chất lượng cao.",
        category: "WordPress",
        tags: ["wordpress", "performance", "optimization"],
        imageUrl: "/images/wordpress-optimization.jpg",
        author: "STEP Team",
        isPublished: true,
        isFeatured: false,
        createdAt: new Date("2025-01-15"),
        updatedAt: new Date("2025-01-15")
      },
      {
        id: 3,
        title: "Bảo mật website với SSL Certificate",
        slug: "bao-mat-website-voi-ssl-certificate",
        excerpt: "Tầm quan trọng của SSL và cách cài đặt chứng chỉ SSL cho website",
        content: "SSL Certificate không chỉ bảo vệ dữ liệu mà còn tăng độ tin cậy và cải thiện SEO ranking. Hướng dẫn cài đặt SSL miễn phí và tối ưu hóa bảo mật.",
        category: "Bảo mật",
        tags: ["ssl", "security", "https"],
        imageUrl: "/images/ssl-security.jpg",
        author: "STEP Team",
        isPublished: true,
        isFeatured: true,
        createdAt: new Date("2025-01-20"),
        updatedAt: new Date("2025-01-20")
      }
    ];

    // Sample services
    this.services = [
      {
        id: 1,
        name: "Cloud Hosting",
        description: "Giải pháp hosting đám mây với hiệu suất cao và độ tin cậy 99.9%",
        icon: "cloud",
        category: "hosting",
        features: ["SSD NVMe", "CDN miễn phí", "SSL certificate", "Backup tự động", "24/7 Support"],
        pricing: { basic: 200000, pro: 500000, enterprise: 1000000 },
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "WordPress Hosting",
        description: "Hosting chuyên biệt cho WordPress với tối ưu hóa cao",
        icon: "wordpress",
        category: "hosting",
        features: ["WordPress tối ưu", "Auto Update", "Staging Site", "Premium Themes"],
        pricing: { basic: 150000, pro: 350000, enterprise: 750000 },
        isActive: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Sample testimonials
    this.testimonials = [
      {
        id: 1,
        clientName: "Nguyễn Văn Minh",
        clientTitle: "Giám đốc IT",
        company: "TechCorp Vietnam",
        content: "STEP đã giúp chúng tôi chuyển đổi hạ tầng IT một cách hoàn hảo. Dịch vụ cloud hosting rất ổn định và support team phản hồi nhanh chóng.",
        rating: 5,
        imageUrl: "/images/client-1.jpg",
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Sample page contents
    this.pageContents = [
      {
        id: 1,
        pageName: "home",
        section: "hero",
        title: "Giải pháp IT toàn diện cho doanh nghiệp",
        subtitle: "STEP Technology - Đối tác đáng tin cậy",
        content: "Chúng tôi cung cấp dịch vụ hosting, cloud computing, và các giải pháp IT chuyên nghiệp",
        imageUrl: "/images/hero-bg.jpg",
        ctaText: "Khám phá dịch vụ",
        ctaUrl: "/services",
        metadata: { backgroundType: "gradient", showStats: true },
        isActive: true,
        order: 1,
        updatedAt: new Date()
      }
    ];

    // Sample equipment categories
    this.equipmentCategories = [
      {
        id: 1,
        name: "Máy Chủ Dell",
        slug: "may-chu-dell",
        description: "Máy chủ Dell PowerEdge - Giải pháp máy chủ hàng đầu thế giới",
        icon: "server",
        isActive: true,
        displayOrder: 1,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 2,
        name: "Máy Chủ HPE",
        slug: "may-chu-hpe",
        description: "Máy chủ HPE ProLiant - Hiệu năng cao, độ tin cậy vượt trội",
        icon: "server",
        isActive: true,
        displayOrder: 2,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 3,
        name: "Linh Kiện Dell",
        slug: "linh-kien-dell",
        description: "Linh kiện, phụ kiện chính hãng cho máy chủ Dell",
        icon: "cpu",
        isActive: true,
        displayOrder: 3,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 4,
        name: "Linh Kiện HPE",
        slug: "linh-kien-hpe",
        description: "Linh kiện, phụ kiện chính hãng cho máy chủ HPE",
        icon: "cpu",
        isActive: true,
        displayOrder: 4,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 5,
        name: "Card Mạng & GPU",
        slug: "card-mang-gpu",
        description: "Card mạng, GPU và các thiết bị mở rộng",
        icon: "network",
        isActive: true,
        displayOrder: 5,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 6,
        name: "Thiết Bị Khác",
        slug: "thiet-bi-khac",
        description: "Các thiết bị máy chủ và phụ kiện khác",
        icon: "box",
        isActive: true,
        displayOrder: 6,
        parentId: null,
        createdAt: new Date()
      }
    ];

    // Sample server equipment from Excel inventory
    this.serverEquipments = [
      {
        id: 1,
        name: "Dell PowerEdge R630",
        partNumber: "R630-BASE",
        category: "may-chu-dell",
        subCategory: "Rack Server",
        brand: "Dell",
        model: "PowerEdge R630",
        description: "Máy chủ Dell PowerEdge R630 1U, hiệu năng cao cho môi trường doanh nghiệp",
        cpu: "2x Intel Xeon E5-2680 v4 (14C/28T, 2.4GHz)",
        ram: "64GB DDR4 ECC",
        storage: "4x 600GB SAS 10K",
        networkCard: "2x 10GbE",
        raidController: "PERC H730",
        powerSupply: "2x 750W",
        formFactor: "1U Rack",
        warranty: "3 năm",
        condition: "Refurbished",
        costPrice: 12000000,
        salePrice: 14000000,
        listPrice: 16000000,
        stockQuantity: 5,
        isActive: true,
        isFeatured: true,
        tags: ["dell", "rack", "1u", "enterprise"],
        imageUrl: null,
        note: "Bảo hành 3 năm, hỗ trợ kỹ thuật 24/7",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Dell PowerEdge R640",
        partNumber: "R640-BASE",
        category: "may-chu-dell",
        subCategory: "Rack Server",
        brand: "Dell",
        model: "PowerEdge R640",
        description: "Máy chủ Dell PowerEdge R640 1U thế hệ mới, hỗ trợ NVMe",
        cpu: "2x Intel Xeon Gold 6130 (16C/32T, 2.1GHz)",
        ram: "128GB DDR4 ECC",
        storage: "8x 1.2TB SAS 10K",
        networkCard: "4x 10GbE",
        raidController: "PERC H740P",
        powerSupply: "2x 750W",
        formFactor: "1U Rack",
        warranty: "3 năm",
        condition: "New",
        costPrice: 45000000,
        salePrice: 52000000,
        listPrice: 58000000,
        stockQuantity: 3,
        isActive: true,
        isFeatured: true,
        tags: ["dell", "rack", "1u", "nvme", "enterprise"],
        imageUrl: null,
        note: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Dell PowerEdge R740",
        partNumber: "R740-BASE",
        category: "may-chu-dell",
        subCategory: "Rack Server",
        brand: "Dell",
        model: "PowerEdge R740",
        description: "Máy chủ Dell PowerEdge R740 2U với khả năng mở rộng cao",
        cpu: "2x Intel Xeon Gold 6248 (20C/40T, 2.5GHz)",
        ram: "256GB DDR4 ECC",
        storage: "8x 1.8TB SAS 10K",
        networkCard: "4x 10GbE + 2x 25GbE",
        raidController: "PERC H740P",
        powerSupply: "2x 1100W",
        formFactor: "2U Rack",
        warranty: "3 năm",
        condition: "New",
        costPrice: 65000000,
        salePrice: 75000000,
        listPrice: 85000000,
        stockQuantity: 2,
        isActive: true,
        isFeatured: true,
        tags: ["dell", "rack", "2u", "gpu-ready", "enterprise"],
        imageUrl: null,
        note: "Hỗ trợ lắp GPU, lý tưởng cho AI/ML workloads",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Dell PowerEdge R730XD",
        partNumber: "R730XD-BASE",
        category: "may-chu-dell",
        subCategory: "Rack Server",
        brand: "Dell",
        model: "PowerEdge R730XD",
        description: "Máy chủ Dell R730XD 2U storage-optimized với 24 bay",
        cpu: "2x Intel Xeon E5-2690 v4 (14C/28T, 2.6GHz)",
        ram: "128GB DDR4 ECC",
        storage: "24x 1.2TB SAS 10K",
        networkCard: "4x 10GbE",
        raidController: "PERC H730P",
        powerSupply: "2x 1100W",
        formFactor: "2U Rack",
        warranty: "3 năm",
        condition: "Refurbished",
        costPrice: 38000000,
        salePrice: 45000000,
        listPrice: 52000000,
        stockQuantity: 4,
        isActive: true,
        isFeatured: false,
        tags: ["dell", "rack", "2u", "storage", "24-bay"],
        imageUrl: null,
        note: "Lý tưởng cho storage server, database server",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: "Dell PowerEdge T40",
        partNumber: "T40-BASE",
        category: "may-chu-dell",
        subCategory: "Tower Server",
        brand: "Dell",
        model: "PowerEdge T40",
        description: "Máy chủ Dell Tower T40 nhỏ gọn cho SMB",
        cpu: "Intel Xeon E-2224G (4C/4T, 3.5GHz)",
        ram: "16GB DDR4 ECC",
        storage: "1TB SATA HDD",
        networkCard: "1x 1GbE",
        raidController: "Onboard SATA",
        powerSupply: "1x 300W",
        formFactor: "Tower",
        warranty: "1 năm",
        condition: "New",
        costPrice: 8500000,
        salePrice: 10500000,
        listPrice: 12000000,
        stockQuantity: 10,
        isActive: true,
        isFeatured: false,
        tags: ["dell", "tower", "smb", "entry-level"],
        imageUrl: null,
        note: "Phù hợp cho văn phòng nhỏ, file server",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: "HPE ProLiant DL360 Gen10",
        partNumber: "DL360G10-BASE",
        category: "may-chu-hpe",
        subCategory: "Rack Server",
        brand: "HPE",
        model: "ProLiant DL360 Gen10",
        description: "Máy chủ HPE ProLiant DL360 Gen10 1U hiệu năng cao",
        cpu: "2x Intel Xeon Gold 5218 (16C/32T, 2.3GHz)",
        ram: "128GB DDR4 ECC",
        storage: "4x 960GB SSD SAS",
        networkCard: "4x 10GbE",
        raidController: "Smart Array P408i-a",
        powerSupply: "2x 800W",
        formFactor: "1U Rack",
        warranty: "3 năm",
        condition: "New",
        costPrice: 55000000,
        salePrice: 62000000,
        listPrice: 70000000,
        stockQuantity: 4,
        isActive: true,
        isFeatured: true,
        tags: ["hpe", "rack", "1u", "ssd", "enterprise"],
        imageUrl: null,
        note: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: "HPE ProLiant DL380 Gen10",
        partNumber: "DL380G10-BASE",
        category: "may-chu-hpe",
        subCategory: "Rack Server",
        brand: "HPE",
        model: "ProLiant DL380 Gen10",
        description: "Máy chủ HPE ProLiant DL380 Gen10 2U đa năng",
        cpu: "2x Intel Xeon Gold 6242 (16C/32T, 2.8GHz)",
        ram: "256GB DDR4 ECC",
        storage: "8x 1.2TB SAS 10K",
        networkCard: "4x 10GbE + 2x 25GbE",
        raidController: "Smart Array P816i-a",
        powerSupply: "2x 800W",
        formFactor: "2U Rack",
        warranty: "3 năm",
        condition: "New",
        costPrice: 72000000,
        salePrice: 82000000,
        listPrice: 92000000,
        stockQuantity: 3,
        isActive: true,
        isFeatured: true,
        tags: ["hpe", "rack", "2u", "versatile", "enterprise"],
        imageUrl: null,
        note: "Best-seller, phù hợp mọi workload",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: "Intel X710-DA2 Dual 10GbE SFP+",
        partNumber: "X710-DA2",
        category: "card-mang-gpu",
        subCategory: "Network Card",
        brand: "Intel",
        model: "X710-DA2",
        description: "Card mạng Intel X710-DA2 Dual Port 10GbE SFP+",
        cpu: null,
        ram: null,
        storage: null,
        networkCard: "2x 10GbE SFP+",
        raidController: null,
        powerSupply: null,
        formFactor: "PCIe x8",
        warranty: "1 năm",
        condition: "New",
        costPrice: 3500000,
        salePrice: 4200000,
        listPrice: 4800000,
        stockQuantity: 20,
        isActive: true,
        isFeatured: false,
        tags: ["intel", "nic", "10gbe", "sfp+"],
        imageUrl: null,
        note: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: "NVIDIA Quadro RTX 8000",
        partNumber: "RTX8000-48GB",
        category: "card-mang-gpu",
        subCategory: "GPU",
        brand: "NVIDIA",
        model: "Quadro RTX 8000",
        description: "NVIDIA Quadro RTX 8000 48GB GDDR6 - GPU workstation cao cấp",
        cpu: null,
        ram: "48GB GDDR6",
        storage: null,
        networkCard: null,
        raidController: null,
        powerSupply: "Requires 295W",
        formFactor: "PCIe x16",
        warranty: "3 năm",
        condition: "New",
        costPrice: 95000000,
        salePrice: 108000000,
        listPrice: 120000000,
        stockQuantity: 2,
        isActive: true,
        isFeatured: true,
        tags: ["nvidia", "gpu", "rtx", "ai", "rendering"],
        imageUrl: null,
        note: "Cho AI/ML training, rendering chuyên nghiệp",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: "NVIDIA Tesla M10",
        partNumber: "TESLA-M10",
        category: "card-mang-gpu",
        subCategory: "GPU",
        brand: "NVIDIA",
        model: "Tesla M10",
        description: "NVIDIA Tesla M10 32GB - GPU cho VDI và virtualization",
        cpu: null,
        ram: "32GB GDDR5",
        storage: null,
        networkCard: null,
        raidController: null,
        powerSupply: "Requires 225W",
        formFactor: "PCIe x16",
        warranty: "1 năm",
        condition: "Refurbished",
        costPrice: 18000000,
        salePrice: 22000000,
        listPrice: 26000000,
        stockQuantity: 5,
        isActive: true,
        isFeatured: false,
        tags: ["nvidia", "gpu", "tesla", "vdi", "virtualization"],
        imageUrl: null,
        note: "Hỗ trợ 32 user VDI đồng thời",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: "Dell PERC H730P RAID Controller",
        partNumber: "H730P-2GB",
        category: "linh-kien-dell",
        subCategory: "RAID Controller",
        brand: "Dell",
        model: "PERC H730P",
        description: "Dell PERC H730P Mini RAID Controller 2GB Cache",
        cpu: null,
        ram: "2GB Cache",
        storage: null,
        networkCard: null,
        raidController: "12Gbps SAS, RAID 0/1/5/6/10/50/60",
        powerSupply: null,
        formFactor: "Mini Monolithic",
        warranty: "1 năm",
        condition: "New",
        costPrice: 4500000,
        salePrice: 5500000,
        listPrice: 6500000,
        stockQuantity: 15,
        isActive: true,
        isFeatured: false,
        tags: ["dell", "raid", "controller", "h730p"],
        imageUrl: null,
        note: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: "HPE Smart Array P408i-a",
        partNumber: "P408I-A-SR",
        category: "linh-kien-hpe",
        subCategory: "RAID Controller",
        brand: "HPE",
        model: "Smart Array P408i-a",
        description: "HPE Smart Array P408i-a SR Gen10 Controller",
        cpu: null,
        ram: "2GB Cache",
        storage: null,
        networkCard: null,
        raidController: "12Gbps SAS, RAID 0/1/5/6/10/50/60",
        powerSupply: null,
        formFactor: "Modular",
        warranty: "1 năm",
        condition: "New",
        costPrice: 5200000,
        salePrice: 6200000,
        listPrice: 7200000,
        stockQuantity: 12,
        isActive: true,
        isFeatured: false,
        tags: ["hpe", "raid", "controller", "smart-array"],
        imageUrl: null,
        note: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const newContact: Contact = {
      id: this.contacts.length + 1,
      ...contact,
      createdAt: new Date(),
      isRead: false
    };
    this.contacts.push(newContact);
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    return [...this.contacts];
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.find(c => c.id === id);
  }

  async markContactAsRead(id: number): Promise<Contact | undefined> {
    const contact = this.contacts.find(c => c.id === id);
    if (contact) {
      contact.isRead = true;
    }
    return contact;
  }

  // Domain Contact methods
  async createDomainContact(contact: InsertDomainContact): Promise<DomainContact> {
    const newContact: DomainContact = {
      id: this.domainContacts.length + 1,
      ...contact,
      createdAt: new Date(),
      isRead: false
    };
    this.domainContacts.push(newContact);
    return newContact;
  }

  async getDomainContacts(): Promise<DomainContact[]> {
    return [...this.domainContacts];
  }

  async getDomainContact(id: number): Promise<DomainContact | undefined> {
    return this.domainContacts.find(c => c.id === id);
  }

  async markDomainContactAsRead(id: number): Promise<DomainContact | undefined> {
    const contact = this.domainContacts.find(c => c.id === id);
    if (contact) {
      contact.isRead = true;
    }
    return contact;
  }

  // Article methods
  async createArticle(article: InsertArticle): Promise<Article> {
    const newArticle: Article = {
      id: this.articles.length + 1,
      ...article,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  async updateArticle(id: number, article: UpdateArticle): Promise<Article | undefined> {
    const index = this.articles.findIndex(a => a.id === id);
    if (index !== -1) {
      this.articles[index] = { ...this.articles[index], ...article, updatedAt: new Date() };
      return this.articles[index];
    }
    return undefined;
  }

  async deleteArticle(id: number): Promise<boolean> {
    const index = this.articles.findIndex(a => a.id === id);
    if (index !== -1) {
      this.articles.splice(index, 1);
      return true;
    }
    return false;
  }

  async getArticles(): Promise<Article[]> {
    return [...this.articles];
  }

  async getPublishedArticles(): Promise<Article[]> {
    return this.articles.filter(a => a.isPublished);
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return this.articles.filter(a => a.isPublished && a.isFeatured);
  }

  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.find(a => a.id === id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return this.articles.find(a => a.slug === slug);
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return this.articles.filter(a => a.category === category && a.isPublished);
  }

  // Service methods
  async createService(service: InsertService): Promise<Service> {
    const newService: Service = {
      id: this.services.length + 1,
      ...service,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.services.push(newService);
    return newService;
  }

  async updateService(id: number, service: UpdateService): Promise<Service | undefined> {
    const index = this.services.findIndex(s => s.id === id);
    if (index !== -1) {
      this.services[index] = { ...this.services[index], ...service, updatedAt: new Date() };
      return this.services[index];
    }
    return undefined;
  }

  async deleteService(id: number): Promise<boolean> {
    const index = this.services.findIndex(s => s.id === id);
    if (index !== -1) {
      this.services.splice(index, 1);
      return true;
    }
    return false;
  }

  async getServices(): Promise<Service[]> {
    return [...this.services];
  }

  async getActiveServices(): Promise<Service[]> {
    return this.services.filter(s => s.isActive);
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.find(s => s.id === id);
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return this.services.filter(s => s.category === category && s.isActive);
  }

  // Testimonial methods
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const newTestimonial: Testimonial = {
      id: this.testimonials.length + 1,
      ...testimonial,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.testimonials.push(newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(id: number, testimonial: UpdateTestimonial): Promise<Testimonial | undefined> {
    const index = this.testimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      this.testimonials[index] = { ...this.testimonials[index], ...testimonial, updatedAt: new Date() };
      return this.testimonials[index];
    }
    return undefined;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const index = this.testimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      this.testimonials.splice(index, 1);
      return true;
    }
    return false;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return [...this.testimonials];
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return this.testimonials.filter(t => t.isActive);
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.find(t => t.id === id);
  }

  // Page Content methods
  async createPageContent(content: InsertPageContent): Promise<PageContent> {
    const newContent: PageContent = {
      id: this.pageContents.length + 1,
      ...content,
      updatedAt: new Date()
    };
    this.pageContents.push(newContent);
    return newContent;
  }

  async updatePageContent(id: number, content: UpdatePageContent): Promise<PageContent | undefined> {
    const index = this.pageContents.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pageContents[index] = { ...this.pageContents[index], ...content, updatedAt: new Date() };
      return this.pageContents[index];
    }
    return undefined;
  }

  async deletePageContent(id: number): Promise<boolean> {
    const index = this.pageContents.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pageContents.splice(index, 1);
      return true;
    }
    return false;
  }

  async getPageContents(): Promise<PageContent[]> {
    return [...this.pageContents];
  }

  async getPageContentsByPage(pageName: string): Promise<PageContent[]> {
    return this.pageContents.filter(p => p.pageName === pageName && p.isActive);
  }

  async getPageContent(id: number): Promise<PageContent | undefined> {
    return this.pageContents.find(p => p.id === id);
  }

  // Site Settings methods
  async createSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting> {
    const newSetting: SiteSetting = {
      id: this.siteSettings.length + 1,
      ...setting,
      updatedAt: new Date()
    };
    this.siteSettings.push(newSetting);
    return newSetting;
  }

  async updateSiteSetting(key: string, value: string): Promise<SiteSetting | undefined> {
    const setting = this.siteSettings.find(s => s.key === key);
    if (setting) {
      setting.value = value;
      setting.updatedAt = new Date();
      return setting;
    }
    return undefined;
  }

  async getSiteSettings(): Promise<SiteSetting[]> {
    return [...this.siteSettings];
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    return this.siteSettings.find(s => s.key === key);
  }

  async getSiteSettingsByCategory(category: string): Promise<SiteSetting[]> {
    return this.siteSettings.filter(s => s.category === category);
  }

  // Email Popup Lead methods
  async createEmailPopupLead(lead: InsertEmailPopupLead): Promise<EmailPopupLead> {
    const newLead: EmailPopupLead = {
      id: this.emailPopupLeads.length + 1,
      ...lead,
      createdAt: new Date(),
      isProcessed: false
    };
    this.emailPopupLeads.push(newLead);
    return newLead;
  }

  async getEmailPopupLeads(): Promise<EmailPopupLead[]> {
    return [...this.emailPopupLeads];
  }

  async getEmailPopupLead(id: number): Promise<EmailPopupLead | undefined> {
    return this.emailPopupLeads.find(l => l.id === id);
  }

  async markEmailPopupLeadAsProcessed(id: number): Promise<EmailPopupLead | undefined> {
    const lead = this.emailPopupLeads.find(l => l.id === id);
    if (lead) {
      lead.isProcessed = true;
    }
    return lead;
  }

  // Admin User methods
  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const newUser: AdminUser = {
      id: this.adminUsers.length + 1,
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.adminUsers.push(newUser);
    return newUser;
  }

  async getAdminUsers(): Promise<AdminUser[]> {
    return [...this.adminUsers];
  }

  async getAdminUser(id: number): Promise<AdminUser | undefined> {
    return this.adminUsers.find(u => u.id === id);
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    return this.adminUsers.find(u => u.username === username);
  }

  async updateAdminUser(id: number, user: Partial<AdminUser>): Promise<AdminUser | undefined> {
    const index = this.adminUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      this.adminUsers[index] = { ...this.adminUsers[index], ...user, updatedAt: new Date() };
      return this.adminUsers[index];
    }
    return undefined;
  }

  async deleteAdminUser(id: number): Promise<boolean> {
    const index = this.adminUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      this.adminUsers.splice(index, 1);
      return true;
    }
    return false;
  }

  // Activity Log methods
  async createActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    const newLog: ActivityLog = {
      id: this.activityLogs.length + 1,
      ...log,
      createdAt: new Date()
    };
    this.activityLogs.push(newLog);
    return newLog;
  }

  async getActivityLogs(): Promise<ActivityLog[]> {
    return [...this.activityLogs];
  }

  async getActivityLogsByUser(userId: number): Promise<ActivityLog[]> {
    return this.activityLogs.filter(l => l.userId === userId);
  }

  // Website Backup methods
  async createWebsiteBackup(backup: InsertWebsiteBackup): Promise<WebsiteBackup> {
    const newBackup: WebsiteBackup = {
      id: this.websiteBackups.length + 1,
      ...backup,
      createdAt: new Date()
    };
    this.websiteBackups.push(newBackup);
    return newBackup;
  }

  async getWebsiteBackups(): Promise<WebsiteBackup[]> {
    return [...this.websiteBackups];
  }

  async getWebsiteBackup(id: number): Promise<WebsiteBackup | undefined> {
    return this.websiteBackups.find(b => b.id === id);
  }

  async deleteWebsiteBackup(id: number): Promise<boolean> {
    const index = this.websiteBackups.findIndex(b => b.id === id);
    if (index !== -1) {
      this.websiteBackups.splice(index, 1);
      return true;
    }
    return false;
  }

  // Server Equipment methods
  async createServerEquipment(equipment: InsertServerEquipment): Promise<ServerEquipment> {
    const newEquipment: ServerEquipment = {
      id: this.serverEquipments.length + 1,
      ...equipment,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.serverEquipments.push(newEquipment);
    return newEquipment;
  }

  async updateServerEquipment(id: number, equipment: UpdateServerEquipment): Promise<ServerEquipment | undefined> {
    const index = this.serverEquipments.findIndex(e => e.id === id);
    if (index !== -1) {
      this.serverEquipments[index] = { ...this.serverEquipments[index], ...equipment, updatedAt: new Date() };
      return this.serverEquipments[index];
    }
    return undefined;
  }

  async deleteServerEquipment(id: number): Promise<boolean> {
    const index = this.serverEquipments.findIndex(e => e.id === id);
    if (index !== -1) {
      this.serverEquipments.splice(index, 1);
      return true;
    }
    return false;
  }

  async getServerEquipments(): Promise<ServerEquipment[]> {
    return [...this.serverEquipments];
  }

  async getActiveServerEquipments(): Promise<ServerEquipment[]> {
    return this.serverEquipments.filter(e => e.isActive);
  }

  async getFeaturedServerEquipments(): Promise<ServerEquipment[]> {
    return this.serverEquipments.filter(e => e.isActive && e.isFeatured);
  }

  async getServerEquipment(id: number): Promise<ServerEquipment | undefined> {
    return this.serverEquipments.find(e => e.id === id);
  }

  async getServerEquipmentsByCategory(category: string): Promise<ServerEquipment[]> {
    return this.serverEquipments.filter(e => e.category === category && e.isActive);
  }

  async getServerEquipmentsBySubCategory(subCategory: string): Promise<ServerEquipment[]> {
    return this.serverEquipments.filter(e => e.subCategory === subCategory && e.isActive);
  }

  async searchServerEquipments(query: string): Promise<ServerEquipment[]> {
    const lowerQuery = query.toLowerCase();
    return this.serverEquipments.filter(e => 
      e.isActive && (
        e.name.toLowerCase().includes(lowerQuery) ||
        e.model?.toLowerCase().includes(lowerQuery) ||
        e.partNumber.toLowerCase().includes(lowerQuery) ||
        e.description?.toLowerCase().includes(lowerQuery)
      )
    );
  }

  async bulkCreateServerEquipments(equipments: InsertServerEquipment[]): Promise<ServerEquipment[]> {
    const created: ServerEquipment[] = [];
    for (const equipment of equipments) {
      const newEquipment = await this.createServerEquipment(equipment);
      created.push(newEquipment);
    }
    return created;
  }

  // Equipment Category methods
  async createEquipmentCategory(category: InsertEquipmentCategory): Promise<EquipmentCategory> {
    const newCategory: EquipmentCategory = {
      id: this.equipmentCategories.length + 1,
      ...category,
      createdAt: new Date()
    };
    this.equipmentCategories.push(newCategory);
    return newCategory;
  }

  async updateEquipmentCategory(id: number, category: UpdateEquipmentCategory): Promise<EquipmentCategory | undefined> {
    const index = this.equipmentCategories.findIndex(c => c.id === id);
    if (index !== -1) {
      this.equipmentCategories[index] = { ...this.equipmentCategories[index], ...category };
      return this.equipmentCategories[index];
    }
    return undefined;
  }

  async deleteEquipmentCategory(id: number): Promise<boolean> {
    const index = this.equipmentCategories.findIndex(c => c.id === id);
    if (index !== -1) {
      this.equipmentCategories.splice(index, 1);
      return true;
    }
    return false;
  }

  async getEquipmentCategories(): Promise<EquipmentCategory[]> {
    return [...this.equipmentCategories];
  }

  async getActiveEquipmentCategories(): Promise<EquipmentCategory[]> {
    return this.equipmentCategories.filter(c => c.isActive);
  }

  async getEquipmentCategory(id: number): Promise<EquipmentCategory | undefined> {
    return this.equipmentCategories.find(c => c.id === id);
  }

  async getEquipmentCategoryBySlug(slug: string): Promise<EquipmentCategory | undefined> {
    return this.equipmentCategories.find(c => c.slug === slug);
  }
}

export const storage = new MemStorage();