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
  type EquipmentCategory, type InsertEquipmentCategory, type UpdateEquipmentCategory,
  type EquipmentOrder, type InsertEquipmentOrder
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

  // Equipment Order methods
  createEquipmentOrder(order: InsertEquipmentOrder): Promise<EquipmentOrder>;
  getEquipmentOrders(): Promise<EquipmentOrder[]>;
  getEquipmentOrder(id: number): Promise<EquipmentOrder | undefined>;
  getEquipmentOrderByNumber(orderNumber: string): Promise<EquipmentOrder | undefined>;
  updateEquipmentOrderStatus(id: number, status: string): Promise<EquipmentOrder | undefined>;
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
  private equipmentOrders: EquipmentOrder[] = [];

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
        name: "Máy Chủ H3C",
        slug: "may-chu-h3c",
        description: "Máy chủ H3C UniServer - Công nghệ tiên tiến, giá cạnh tranh",
        icon: "server",
        isActive: true,
        displayOrder: 3,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 4,
        name: "Máy Chủ ASUS",
        slug: "may-chu-asus",
        description: "Máy chủ ASUS RS Series - Hiệu năng đáng tin cậy",
        icon: "server",
        isActive: true,
        displayOrder: 4,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 5,
        name: "Hệ Thống Lưu Trữ",
        slug: "he-thong-luu-tru",
        description: "NAS, SAN, Storage - Lưu trữ dữ liệu an toàn, đáng tin cậy",
        icon: "database",
        isActive: true,
        displayOrder: 5,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 6,
        name: "Linh Kiện Dell",
        slug: "linh-kien-dell",
        description: "Linh kiện, phụ kiện chính hãng cho máy chủ Dell",
        icon: "cpu",
        isActive: true,
        displayOrder: 6,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 7,
        name: "Linh Kiện HPE",
        slug: "linh-kien-hpe",
        description: "Linh kiện, phụ kiện chính hãng cho máy chủ HPE",
        icon: "cpu",
        isActive: true,
        displayOrder: 7,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 8,
        name: "Card Mạng & GPU",
        slug: "card-mang-gpu",
        description: "Card mạng, GPU và các thiết bị mở rộng",
        icon: "network",
        isActive: true,
        displayOrder: 8,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 9,
        name: "Thiết Bị Khác",
        slug: "thiet-bi-khac",
        description: "Các thiết bị máy chủ và phụ kiện khác",
        icon: "box",
        isActive: true,
        displayOrder: 9,
        parentId: null,
        createdAt: new Date()
      }
    ];

    // Sample server equipment from Excel inventory (matching actual schema)
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
        specs: {
          cpu: "2x Intel Xeon E5-2680 v4 (14C/28T, 2.4GHz)",
          ram: "64GB DDR4 ECC",
          storage: "4x 600GB SAS 10K",
          networkCard: "2x 10GbE",
          raidController: "PERC H730",
          powerSupply: "2x 750W",
          formFactor: "1U Rack",
          warranty: "3 năm"
        },
        condition: "refurbished",
        priceEndUser: 16000000,
        priceDealer: 14000000,
        priceMD: 12000000,
        stockCount: 5,
        isActive: true,
        isFeatured: true,
        displayOrder: 1,
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
        specs: {
          cpu: "2x Intel Xeon Gold 6130 (16C/32T, 2.1GHz)",
          ram: "128GB DDR4 ECC",
          storage: "8x 1.2TB SAS 10K",
          networkCard: "4x 10GbE",
          raidController: "PERC H740P",
          powerSupply: "2x 750W",
          formFactor: "1U Rack",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 58000000,
        priceDealer: 52000000,
        priceMD: 45000000,
        stockCount: 3,
        isActive: true,
        isFeatured: true,
        displayOrder: 2,
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
        specs: {
          cpu: "2x Intel Xeon Gold 6248 (20C/40T, 2.5GHz)",
          ram: "256GB DDR4 ECC",
          storage: "8x 1.8TB SAS 10K",
          networkCard: "4x 10GbE + 2x 25GbE",
          raidController: "PERC H740P",
          powerSupply: "2x 1100W",
          formFactor: "2U Rack",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 85000000,
        priceDealer: 75000000,
        priceMD: 65000000,
        stockCount: 2,
        isActive: true,
        isFeatured: true,
        displayOrder: 3,
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
        specs: {
          cpu: "2x Intel Xeon E5-2690 v4 (14C/28T, 2.6GHz)",
          ram: "128GB DDR4 ECC",
          storage: "24x 1.2TB SAS 10K",
          networkCard: "4x 10GbE",
          raidController: "PERC H730P",
          powerSupply: "2x 1100W",
          formFactor: "2U Rack",
          warranty: "3 năm"
        },
        condition: "refurbished",
        priceEndUser: 52000000,
        priceDealer: 45000000,
        priceMD: 38000000,
        stockCount: 4,
        isActive: true,
        isFeatured: false,
        displayOrder: 4,
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
        specs: {
          cpu: "Intel Xeon E-2224G (4C/4T, 3.5GHz)",
          ram: "16GB DDR4 ECC",
          storage: "1TB SATA HDD",
          networkCard: "1x 1GbE",
          raidController: "Onboard SATA",
          powerSupply: "1x 300W",
          formFactor: "Tower",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 12000000,
        priceDealer: 10500000,
        priceMD: 8500000,
        stockCount: 10,
        isActive: true,
        isFeatured: false,
        displayOrder: 5,
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
        specs: {
          cpu: "2x Intel Xeon Gold 5218 (16C/32T, 2.3GHz)",
          ram: "128GB DDR4 ECC",
          storage: "4x 960GB SSD SAS",
          networkCard: "4x 10GbE",
          raidController: "Smart Array P408i-a",
          powerSupply: "2x 800W",
          formFactor: "1U Rack",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 70000000,
        priceDealer: 62000000,
        priceMD: 55000000,
        stockCount: 4,
        isActive: true,
        isFeatured: true,
        displayOrder: 6,
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
        specs: {
          cpu: "2x Intel Xeon Gold 6242 (16C/32T, 2.8GHz)",
          ram: "256GB DDR4 ECC",
          storage: "8x 1.2TB SAS 10K",
          networkCard: "4x 10GbE + 2x 25GbE",
          raidController: "Smart Array P816i-a",
          powerSupply: "2x 800W",
          formFactor: "2U Rack",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 92000000,
        priceDealer: 82000000,
        priceMD: 72000000,
        stockCount: 3,
        isActive: true,
        isFeatured: true,
        displayOrder: 7,
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
        specs: {
          networkCard: "2x 10GbE SFP+",
          formFactor: "PCIe x8",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 4800000,
        priceDealer: 4200000,
        priceMD: 3500000,
        stockCount: 20,
        isActive: true,
        isFeatured: false,
        displayOrder: 8,
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
        specs: {
          ram: "48GB GDDR6",
          powerSupply: "Requires 295W",
          formFactor: "PCIe x16",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 120000000,
        priceDealer: 108000000,
        priceMD: 95000000,
        stockCount: 2,
        isActive: true,
        isFeatured: true,
        displayOrder: 9,
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
        specs: {
          ram: "32GB GDDR5",
          powerSupply: "Requires 225W",
          formFactor: "PCIe x16",
          warranty: "1 năm"
        },
        condition: "refurbished",
        priceEndUser: 26000000,
        priceDealer: 22000000,
        priceMD: 18000000,
        stockCount: 5,
        isActive: true,
        isFeatured: false,
        displayOrder: 10,
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
        specs: {
          ram: "2GB Cache",
          raidController: "12Gbps SAS, RAID 0/1/5/6/10/50/60",
          formFactor: "Mini Monolithic",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 6500000,
        priceDealer: 5500000,
        priceMD: 4500000,
        stockCount: 15,
        isActive: true,
        isFeatured: false,
        displayOrder: 11,
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
        specs: {
          ram: "2GB Cache",
          raidController: "12Gbps SAS, RAID 0/1/5/6/10/50/60",
          formFactor: "Modular",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 7200000,
        priceDealer: 6200000,
        priceMD: 5200000,
        stockCount: 12,
        isActive: true,
        isFeatured: false,
        displayOrder: 12,
        tags: ["hpe", "raid", "controller", "smart-array"],
        imageUrl: null,
        note: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Dell PowerEdge R450 Series
      {
        id: 13,
        name: "Dell PowerEdge R450 8x2.5\" Basic",
        partNumber: "R450-8SFF-BASIC",
        category: "may-chu-dell",
        subCategory: "Rack Server 1U",
        brand: "Dell",
        model: "PowerEdge R450",
        description: "Máy chủ Dell PowerEdge R450 1U với 8 bay 2.5\", hỗ trợ Intel Xeon 3rd Gen",
        specs: {
          cpu: "1x Intel Xeon Silver 4310 2.1GHz 12C/24T",
          ram: "16GB DDR4 RDIMM 3200MT/s",
          storage: "1x 1.2TB SAS 10K 2.5\"",
          networkCard: "Broadcom 5719 Quad Port 1GbE",
          raidController: "Dell PERC H755 8GB Cache",
          powerSupply: "2x 800W Redundant",
          formFactor: "1U Rack - 8x2.5\"",
          warranty: "3 năm ProSupport"
        },
        condition: "new",
        priceEndUser: 45000000,
        priceDealer: 40000000,
        priceMD: 35000000,
        stockCount: 5,
        isActive: true,
        isFeatured: true,
        displayOrder: 13,
        tags: ["dell", "poweredge", "r450", "1u", "rack", "gen3"],
        imageUrl: null,
        note: "Phù hợp cho doanh nghiệp vừa và nhỏ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        name: "Dell PowerEdge R450 8x2.5\" Pro",
        partNumber: "R450-8SFF-PRO",
        category: "may-chu-dell",
        subCategory: "Rack Server 1U",
        brand: "Dell",
        model: "PowerEdge R450",
        description: "Máy chủ Dell PowerEdge R450 1U cấu hình cao với 2 CPU",
        specs: {
          cpu: "2x Intel Xeon Silver 4310 2.1GHz 12C/24T",
          ram: "64GB DDR4 RDIMM 3200MT/s",
          storage: "1x 1.2TB SAS + 1x 960GB SSD SAS",
          networkCard: "Broadcom 5719 Quad Port 1GbE",
          raidController: "Dell PERC H755 8GB Cache",
          powerSupply: "2x 600W Redundant",
          formFactor: "1U Rack - 8x2.5\"",
          warranty: "3 năm ProSupport"
        },
        condition: "new",
        priceEndUser: 72000000,
        priceDealer: 65000000,
        priceMD: 58000000,
        stockCount: 3,
        isActive: true,
        isFeatured: true,
        displayOrder: 14,
        tags: ["dell", "poweredge", "r450", "1u", "rack", "pro", "dual-cpu"],
        imageUrl: null,
        note: "Cấu hình Pro với 2 CPU và SSD",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Dell PowerEdge R750xs
      {
        id: 15,
        name: "Dell PowerEdge R750xs 8x2.5\" Standard",
        partNumber: "R750XS-8SFF",
        category: "may-chu-dell",
        subCategory: "Rack Server 2U",
        brand: "Dell",
        model: "PowerEdge R750xs",
        description: "Máy chủ Dell PowerEdge R750xs 2U thế hệ mới với Intel Xeon 3rd Gen",
        specs: {
          cpu: "2x Intel Xeon Gold 5318Y 2.1GHz 24C/48T",
          ram: "128GB DDR4 RDIMM 3200MT/s",
          storage: "4x 1.2TB SAS 10K",
          networkCard: "Broadcom 5720 Quad Port 1GbE + 10GbE",
          raidController: "Dell PERC H755 8GB Cache",
          powerSupply: "2x 800W Titanium",
          formFactor: "2U Rack - 8x2.5\"",
          warranty: "3 năm ProSupport"
        },
        condition: "new",
        priceEndUser: 125000000,
        priceDealer: 112000000,
        priceMD: 98000000,
        stockCount: 2,
        isActive: true,
        isFeatured: true,
        displayOrder: 15,
        tags: ["dell", "poweredge", "r750xs", "2u", "rack", "enterprise"],
        imageUrl: null,
        note: "Máy chủ enterprise cao cấp",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // HPE ProLiant DL360 Gen10 Plus
      {
        id: 16,
        name: "HPE ProLiant DL360 Gen10 Plus 8SFF Basic",
        partNumber: "DL360G10P-8SFF-BASIC",
        category: "may-chu-hpe",
        subCategory: "Rack Server 1U",
        brand: "HPE",
        model: "ProLiant DL360 Gen10 Plus",
        description: "Máy chủ HPE ProLiant DL360 Gen10 Plus 1U với 8 bay 2.5\"",
        specs: {
          cpu: "1x Intel Xeon Silver 4309Y 2.8GHz 8C/16T",
          ram: "32GB DDR4 3200MT/s ECC",
          storage: "1x 1.2TB SAS 10K 2.5\"",
          networkCard: "Broadcom BCM57416 10Gb 2-port",
          raidController: "HPE Smart Array E208i-p",
          powerSupply: "1x 800W Platinum",
          formFactor: "1U Rack - 8x2.5\"",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 55000000,
        priceDealer: 48000000,
        priceMD: 42000000,
        stockCount: 4,
        isActive: true,
        isFeatured: true,
        displayOrder: 16,
        tags: ["hpe", "proliant", "dl360", "gen10plus", "1u", "rack"],
        imageUrl: null,
        note: "Thế hệ mới nhất của dòng DL360",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        name: "HPE ProLiant DL360 Gen10 Plus 4LFF Pro",
        partNumber: "DL360G10P-4LFF-PRO",
        category: "may-chu-hpe",
        subCategory: "Rack Server 1U",
        brand: "HPE",
        model: "ProLiant DL360 Gen10 Plus",
        description: "Máy chủ HPE ProLiant DL360 Gen10 Plus 1U với 4 bay 3.5\" cho storage",
        specs: {
          cpu: "2x Intel Xeon Silver 4310 2.1GHz 12C/24T",
          ram: "64GB DDR4 3200MT/s ECC",
          storage: "2x 2TB SAS 7.2K + 1x 960GB SSD SAS",
          networkCard: "Broadcom BCM5719 4-port 1GbE",
          raidController: "Broadcom MegaRAID MR416i-a 4GB",
          powerSupply: "2x 800W Titanium",
          formFactor: "1U Rack - 4x3.5\"",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 78000000,
        priceDealer: 70000000,
        priceMD: 62000000,
        stockCount: 3,
        isActive: true,
        isFeatured: false,
        displayOrder: 17,
        tags: ["hpe", "proliant", "dl360", "gen10plus", "1u", "rack", "lff"],
        imageUrl: null,
        note: "Phù hợp cho file server với bay 3.5\"",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // HPE ProLiant DL360 Gen11
      {
        id: 18,
        name: "HPE ProLiant DL360 Gen11 8SFF",
        partNumber: "DL360G11-8SFF",
        category: "may-chu-hpe",
        subCategory: "Rack Server 1U",
        brand: "HPE",
        model: "ProLiant DL360 Gen11",
        description: "Máy chủ HPE ProLiant DL360 Gen11 thế hệ mới nhất với Intel Xeon 4th Gen",
        specs: {
          cpu: "1x Intel Xeon Gold 5411N 1.9GHz 24C/48T",
          ram: "32GB DDR5 4800MT/s ECC",
          storage: "1x 2.4TB SAS 10K 512e",
          networkCard: "Broadcom BCM5719 4-port 1GbE",
          raidController: "HPE MR416i-p 8GB Cache",
          powerSupply: "2x 800W Platinum",
          formFactor: "1U Rack - 8x2.5\"",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 95000000,
        priceDealer: 85000000,
        priceMD: 75000000,
        stockCount: 2,
        isActive: true,
        isFeatured: true,
        displayOrder: 18,
        tags: ["hpe", "proliant", "dl360", "gen11", "1u", "rack", "ddr5", "4th-gen"],
        imageUrl: null,
        note: "Thế hệ mới nhất với DDR5 và Intel Xeon 4th Gen",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // H3C UniServer Series
      {
        id: 19,
        name: "H3C UniServer R4700 G5 10SFF",
        partNumber: "R4700G5-10SFF",
        category: "may-chu-h3c",
        subCategory: "Rack Server 1U",
        brand: "H3C",
        model: "UniServer R4700 G5",
        description: "Máy chủ H3C UniServer R4700 G5 1U với 10 bay 2.5\"",
        specs: {
          cpu: "2x Intel Xeon Gold 5318Y 2.1GHz 24C/48T",
          ram: "64GB DDR4 3200MT/s ECC",
          storage: "4x 600GB SAS 10K",
          networkCard: "2x 10GbE SFP+",
          raidController: "H3C HBA 9311-8i",
          powerSupply: "2x 800W Redundant",
          formFactor: "1U Rack - 10x2.5\"",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 68000000,
        priceDealer: 60000000,
        priceMD: 52000000,
        stockCount: 4,
        isActive: true,
        isFeatured: true,
        displayOrder: 19,
        tags: ["h3c", "uniserver", "r4700", "g5", "1u", "rack"],
        imageUrl: null,
        note: "Giải pháp máy chủ giá cạnh tranh từ H3C",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        name: "H3C UniServer R4900 G5 12LFF",
        partNumber: "R4900G5-12LFF",
        category: "may-chu-h3c",
        subCategory: "Rack Server 2U",
        brand: "H3C",
        model: "UniServer R4900 G5",
        description: "Máy chủ H3C UniServer R4900 G5 2U với 12 bay 3.5\" cho storage",
        specs: {
          cpu: "2x Intel Xeon Gold 6330 2.0GHz 28C/56T",
          ram: "128GB DDR4 3200MT/s ECC",
          storage: "8x 4TB SAS 7.2K",
          networkCard: "4x 10GbE SFP+",
          raidController: "H3C RAID Controller 4GB Cache",
          powerSupply: "2x 1200W Redundant",
          formFactor: "2U Rack - 12x3.5\"",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 145000000,
        priceDealer: 130000000,
        priceMD: 115000000,
        stockCount: 2,
        isActive: true,
        isFeatured: true,
        displayOrder: 20,
        tags: ["h3c", "uniserver", "r4900", "g5", "2u", "rack", "storage"],
        imageUrl: null,
        note: "Tối ưu cho storage với 12 bay 3.5\"",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        name: "H3C UniServer R4700 G6 10SFF",
        partNumber: "R4700G6-10SFF",
        category: "may-chu-h3c",
        subCategory: "Rack Server 1U",
        brand: "H3C",
        model: "UniServer R4700 G6",
        description: "Máy chủ H3C UniServer R4700 G6 thế hệ mới với Intel Xeon 4th Gen",
        specs: {
          cpu: "2x Intel Xeon Gold 5418Y 2.0GHz 24C/48T",
          ram: "64GB DDR5 4800MT/s ECC",
          storage: "4x 960GB SSD NVMe",
          networkCard: "2x 25GbE SFP28",
          raidController: "H3C RAID Controller 8GB Cache",
          powerSupply: "2x 800W Titanium",
          formFactor: "1U Rack - 10x2.5\"",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 115000000,
        priceDealer: 102000000,
        priceMD: 90000000,
        stockCount: 3,
        isActive: true,
        isFeatured: true,
        displayOrder: 21,
        tags: ["h3c", "uniserver", "r4700", "g6", "1u", "rack", "ddr5", "nvme"],
        imageUrl: null,
        note: "Thế hệ G6 mới nhất với DDR5 và NVMe",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ASUS Server
      {
        id: 22,
        name: "ASUS RS500A-E11-RS12U",
        partNumber: "RS500A-E11",
        category: "may-chu-asus",
        subCategory: "Rack Server 1U",
        brand: "ASUS",
        model: "RS500A-E11-RS12U",
        description: "Máy chủ ASUS RS500A-E11 1U AMD EPYC với 12 bay 2.5\"",
        specs: {
          cpu: "1x AMD EPYC 7313 3.0GHz 16C/32T",
          ram: "64GB DDR4 3200MT/s ECC",
          storage: "4x 960GB SSD NVMe",
          networkCard: "2x 10GbE RJ45",
          raidController: "ASUS PIKE II 3108 1GB",
          powerSupply: "2x 800W Platinum",
          formFactor: "1U Rack - 12x2.5\"",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 75000000,
        priceDealer: 67000000,
        priceMD: 58000000,
        stockCount: 3,
        isActive: true,
        isFeatured: true,
        displayOrder: 22,
        tags: ["asus", "rs500a", "amd", "epyc", "1u", "rack"],
        imageUrl: null,
        note: "Máy chủ AMD EPYC hiệu năng cao",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        name: "ASUS RS720A-E11-RS24U",
        partNumber: "RS720A-E11",
        category: "may-chu-asus",
        subCategory: "Rack Server 2U",
        brand: "ASUS",
        model: "RS720A-E11-RS24U",
        description: "Máy chủ ASUS RS720A-E11 2U AMD EPYC dual socket với 24 bay",
        specs: {
          cpu: "2x AMD EPYC 7443 2.85GHz 24C/48T",
          ram: "256GB DDR4 3200MT/s ECC",
          storage: "8x 1.92TB SSD NVMe",
          networkCard: "4x 25GbE SFP28",
          raidController: "ASUS PIKE II 3108 2GB",
          powerSupply: "2x 1600W Platinum",
          formFactor: "2U Rack - 24x2.5\"",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 185000000,
        priceDealer: 165000000,
        priceMD: 145000000,
        stockCount: 2,
        isActive: true,
        isFeatured: true,
        displayOrder: 23,
        tags: ["asus", "rs720a", "amd", "epyc", "2u", "rack", "dual-socket"],
        imageUrl: null,
        note: "Server AMD EPYC dual socket cao cấp",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Storage Systems - NAS
      {
        id: 24,
        name: "Synology NAS RS4021xs+",
        partNumber: "RS4021XS+",
        category: "he-thong-luu-tru",
        subCategory: "NAS",
        brand: "Synology",
        model: "RS4021xs+",
        description: "Thiết bị lưu trữ NAS Synology RS4021xs+ 16-bay rackmount enterprise",
        specs: {
          cpu: "Intel Xeon D-1541 8C/16T 2.1GHz",
          ram: "16GB DDR4 ECC (lên đến 64GB)",
          storage: "16 bay 3.5\"/2.5\" (mở rộng 40 bay)",
          networkCard: "2x 10GbE RJ45 + 4x 1GbE RJ45",
          raidController: "Hỗ trợ RAID 0/1/5/6/10/F1",
          powerSupply: "Redundant PSU",
          formFactor: "2U Rackmount",
          warranty: "5 năm"
        },
        condition: "new",
        priceEndUser: 134200000,
        priceDealer: 120000000,
        priceMD: 108000000,
        stockCount: 2,
        isActive: true,
        isFeatured: true,
        displayOrder: 24,
        tags: ["synology", "nas", "storage", "16-bay", "enterprise", "xs+"],
        imageUrl: null,
        note: "NAS enterprise cao cấp với bảo hành 5 năm",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        name: "Synology NAS RS2821RP+",
        partNumber: "RS2821RP+",
        category: "he-thong-luu-tru",
        subCategory: "NAS",
        brand: "Synology",
        model: "RS2821RP+",
        description: "Thiết bị lưu trữ NAS Synology RS2821RP+ 16-bay với nguồn dự phòng",
        specs: {
          cpu: "AMD Ryzen V1500B 4C/8T 2.2GHz",
          ram: "4GB DDR4 ECC (lên đến 32GB)",
          storage: "16 bay (mở rộng 28 bay)",
          networkCard: "4x 1GbE RJ45 (nâng cấp 10GbE qua PCIe)",
          raidController: "Hỗ trợ RAID 0/1/5/6/10/F1",
          powerSupply: "Redundant PSU",
          formFactor: "2U Rackmount",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 83500000,
        priceDealer: 75000000,
        priceMD: 67000000,
        stockCount: 3,
        isActive: true,
        isFeatured: false,
        displayOrder: 25,
        tags: ["synology", "nas", "storage", "16-bay", "redundant-psu"],
        imageUrl: null,
        note: "NAS 16-bay với nguồn dự phòng",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        name: "Synology NAS RS2423RP+",
        partNumber: "RS2423RP+",
        category: "he-thong-luu-tru",
        subCategory: "NAS",
        brand: "Synology",
        model: "RS2423RP+",
        description: "Thiết bị lưu trữ NAS Synology RS2423RP+ 12-bay với 10GbE",
        specs: {
          cpu: "AMD Ryzen V1780B 4C/8T 3.35GHz",
          ram: "8GB DDR4 ECC (lên đến 32GB)",
          storage: "12 bay (mở rộng 24 bay)",
          networkCard: "2x 10GbE RJ45 + 2x 1GbE RJ45",
          raidController: "Hỗ trợ RAID 0/1/5/6/10/F1",
          powerSupply: "Redundant PSU",
          formFactor: "2U Rackmount",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 71000000,
        priceDealer: 64000000,
        priceMD: 57000000,
        stockCount: 4,
        isActive: true,
        isFeatured: true,
        displayOrder: 26,
        tags: ["synology", "nas", "storage", "12-bay", "10gbe"],
        imageUrl: null,
        note: "NAS 12-bay với 10GbE tích hợp",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Storage Systems - SAN
      {
        id: 27,
        name: "Synology SAN UC3200",
        partNumber: "UC3200",
        category: "he-thong-luu-tru",
        subCategory: "SAN",
        brand: "Synology",
        model: "UC3200",
        description: "Thiết bị lưu trữ SAN Synology UC3200 12-bay Dual Controller Active-Active iSCSI",
        specs: {
          cpu: "Quad Core 2.4GHz (Turbo 2.7GHz)",
          ram: "8GB RAM (lên đến 64GB)",
          storage: "12 bay SAS (mở rộng 36 bay)",
          networkCard: "1x 10GbE Base-T",
          raidController: "Dual Controller Active-Active",
          powerSupply: "Redundant PSU",
          formFactor: "2U Rackmount",
          warranty: "5 năm"
        },
        condition: "new",
        priceEndUser: 152500000,
        priceDealer: 137000000,
        priceMD: 122000000,
        stockCount: 1,
        isActive: true,
        isFeatured: true,
        displayOrder: 27,
        tags: ["synology", "san", "storage", "iscsi", "dual-controller", "enterprise"],
        imageUrl: null,
        note: "SAN enterprise với Dual Controller Active-Active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        name: "Synology SAN UC3400",
        partNumber: "UC3400",
        category: "he-thong-luu-tru",
        subCategory: "SAN",
        brand: "Synology",
        model: "UC3400",
        description: "Thiết bị lưu trữ SAN Synology UC3400 12-bay thế hệ mới với SAS 12Gb/s",
        specs: {
          cpu: "Quad Core 2.4GHz (Turbo 2.7GHz)",
          ram: "8GB RAM (lên đến 64GB)",
          storage: "12 bay SAS 12Gb/s (mở rộng 36 bay)",
          networkCard: "1x 10GbE Base-T + 2x 1GbE RJ45 + PCIe slot",
          raidController: "Dual Controller Active-Active",
          powerSupply: "Redundant PSU",
          formFactor: "2U Rackmount",
          warranty: "5 năm"
        },
        condition: "new",
        priceEndUser: 208370000,
        priceDealer: 187000000,
        priceMD: 167000000,
        stockCount: 1,
        isActive: true,
        isFeatured: true,
        displayOrder: 28,
        tags: ["synology", "san", "storage", "iscsi", "dual-controller", "enterprise", "sas-12g"],
        imageUrl: null,
        note: "SAN cao cấp với SAS 12Gb/s",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        name: "Infortrend EonStor GSe 1012-D",
        partNumber: "GSE1012D",
        category: "he-thong-luu-tru",
        subCategory: "SAN",
        brand: "Infortrend",
        model: "EonStor GSe 1012-D",
        description: "Thiết bị lưu trữ SAN Infortrend EonStor GSe 1012-D 12-bay hybrid",
        specs: {
          cpu: "Dual Core",
          ram: "8GB DDR4 ECC",
          storage: "12 bay 3.5\" SATA/SAS",
          networkCard: "4x 1GbE iSCSI",
          raidController: "Hardware RAID",
          powerSupply: "Redundant PSU",
          formFactor: "2U Rackmount",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 95500000,
        priceDealer: 86000000,
        priceMD: 76000000,
        stockCount: 2,
        isActive: true,
        isFeatured: false,
        displayOrder: 29,
        tags: ["infortrend", "san", "storage", "eonstor", "hybrid"],
        imageUrl: null,
        note: "Storage SAN hybrid với giá cạnh tranh",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Additional Dell Components
      {
        id: 30,
        name: "Dell RAM 32GB DDR4 3200MT/s RDIMM",
        partNumber: "DELL-32GB-DDR4",
        category: "linh-kien-dell",
        subCategory: "RAM",
        brand: "Dell",
        model: "32GB RDIMM",
        description: "RAM Dell 32GB DDR4 3200MT/s Dual Rank ECC RDIMM",
        specs: {
          ram: "32GB DDR4 3200MT/s ECC RDIMM",
          formFactor: "RDIMM",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 3200000,
        priceDealer: 2800000,
        priceMD: 2400000,
        stockCount: 50,
        isActive: true,
        isFeatured: false,
        displayOrder: 30,
        tags: ["dell", "ram", "ddr4", "ecc", "rdimm"],
        imageUrl: null,
        note: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        name: "Dell SSD 960GB SAS 12Gbps RI",
        partNumber: "DELL-960GB-SSD",
        category: "linh-kien-dell",
        subCategory: "SSD",
        brand: "Dell",
        model: "960GB SSD SAS RI",
        description: "Ổ cứng Dell 960GB SSD SAS 12Gbps Read Intensive 2.5\" Hot-plug",
        specs: {
          storage: "960GB SSD SAS 12Gbps",
          formFactor: "2.5\" Hot-plug",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 8500000,
        priceDealer: 7500000,
        priceMD: 6500000,
        stockCount: 30,
        isActive: true,
        isFeatured: false,
        displayOrder: 31,
        tags: ["dell", "ssd", "sas", "960gb", "hot-plug"],
        imageUrl: null,
        note: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        name: "Dell HDD 2.4TB SAS 10K 512e",
        partNumber: "DELL-2.4TB-SAS",
        category: "linh-kien-dell",
        subCategory: "HDD",
        brand: "Dell",
        model: "2.4TB SAS 10K",
        description: "Ổ cứng Dell 2.4TB SAS 12Gbps 10K 512e 2.5\" Hot-plug",
        specs: {
          storage: "2.4TB SAS 12Gbps 10K",
          formFactor: "2.5\" Hot-plug",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 6800000,
        priceDealer: 6000000,
        priceMD: 5200000,
        stockCount: 40,
        isActive: true,
        isFeatured: false,
        displayOrder: 32,
        tags: ["dell", "hdd", "sas", "2.4tb", "10k", "hot-plug"],
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

  // Equipment Order methods
  async createEquipmentOrder(order: InsertEquipmentOrder): Promise<EquipmentOrder> {
    const newOrder: EquipmentOrder = {
      id: this.equipmentOrders.length + 1,
      ...order,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.equipmentOrders.push(newOrder);
    return newOrder;
  }

  async getEquipmentOrders(): Promise<EquipmentOrder[]> {
    return [...this.equipmentOrders].sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getEquipmentOrder(id: number): Promise<EquipmentOrder | undefined> {
    return this.equipmentOrders.find(o => o.id === id);
  }

  async getEquipmentOrderByNumber(orderNumber: string): Promise<EquipmentOrder | undefined> {
    return this.equipmentOrders.find(o => o.orderNumber === orderNumber);
  }

  async updateEquipmentOrderStatus(id: number, status: string): Promise<EquipmentOrder | undefined> {
    const index = this.equipmentOrders.findIndex(o => o.id === id);
    if (index !== -1) {
      this.equipmentOrders[index] = { 
        ...this.equipmentOrders[index], 
        status,
        updatedAt: new Date()
      };
      return this.equipmentOrders[index];
    }
    return undefined;
  }
}

export const storage = new MemStorage();