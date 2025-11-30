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
  type EquipmentOrder, type InsertEquipmentOrder,
  type User, type UpsertUser
} from "@shared/schema";

export interface IStorage {
  // Replit Auth User methods
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
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
  private users: User[] = [];

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
        name: "Switch Mạng",
        slug: "switch-mang",
        description: "Switch Cisco, Juniper, Huawei, H3C - Giải pháp kết nối mạng doanh nghiệp",
        icon: "network",
        isActive: true,
        displayOrder: 9,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 10,
        name: "Module Quang & Dây Quang",
        slug: "module-quang",
        description: "Module quang SFP, QSFP, dây patch cord quang - Kết nối tốc độ cao",
        icon: "cable",
        isActive: true,
        displayOrder: 10,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 11,
        name: "Vật Tư Mạng",
        slug: "vat-tu-mang",
        description: "Patch panel, jack RJ45, tủ rack, phụ kiện hạ tầng mạng",
        icon: "tool",
        isActive: true,
        displayOrder: 11,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 12,
        name: "Cân Bằng Tải",
        slug: "can-bang-tai",
        description: "F5, Citrix, A10 - Load Balancer & ADC cho datacenter",
        icon: "scale",
        isActive: true,
        displayOrder: 12,
        parentId: null,
        createdAt: new Date()
      },
      {
        id: 13,
        name: "Thiết Bị Khác",
        slug: "thiet-bi-khac",
        description: "Các thiết bị máy chủ và phụ kiện khác",
        icon: "box",
        isActive: true,
        displayOrder: 13,
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
      },
      // ==================== SWITCH MẠNG ====================
      // Cisco Switches - Best Sellers 2024-2025
      {
        id: 33,
        name: "Cisco Catalyst 9200L-24P-4G-E",
        partNumber: "C9200L-24P-4G-E",
        category: "switch-mang",
        subCategory: "Switch Layer 2",
        brand: "Cisco",
        model: "Catalyst 9200L",
        description: "Switch Cisco Catalyst 9200L 24 port PoE+ 4x1G uplink, Network Essentials",
        specs: {
          cpu: "ARM Cortex-A9",
          ram: "4GB DRAM",
          storage: "4GB Flash",
          networkCard: "24x 1GbE PoE+ (370W) + 4x 1G SFP",
          formFactor: "1U Rack",
          warranty: "Limited Lifetime"
        },
        condition: "new",
        priceEndUser: 68000000,
        priceDealer: 61000000,
        priceMD: 54000000,
        stockCount: 8,
        isActive: true,
        isFeatured: true,
        displayOrder: 33,
        tags: ["cisco", "catalyst", "switch", "poe", "layer2", "9200"],
        imageUrl: null,
        note: "Best-seller 2024 - Switch PoE+ cho SMB",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 34,
        name: "Cisco Catalyst 9300-48P-E",
        partNumber: "C9300-48P-E",
        category: "switch-mang",
        subCategory: "Switch Layer 3",
        brand: "Cisco",
        model: "Catalyst 9300",
        description: "Switch Cisco Catalyst 9300 48 port PoE+ modular uplinks, Network Essentials",
        specs: {
          cpu: "Quad-Core 2.4GHz",
          ram: "8GB DRAM",
          storage: "16GB Flash",
          networkCard: "48x 1GbE PoE+ (720W) + Modular uplink (10G/25G/40G)",
          formFactor: "1U Rack",
          warranty: "Limited Lifetime"
        },
        condition: "new",
        priceEndUser: 145000000,
        priceDealer: 130000000,
        priceMD: 115000000,
        stockCount: 5,
        isActive: true,
        isFeatured: true,
        displayOrder: 34,
        tags: ["cisco", "catalyst", "switch", "poe", "layer3", "9300", "modular"],
        imageUrl: null,
        note: "Enterprise flagship - Full PoE+ Layer 3",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        name: "Cisco Nexus 93180YC-FX3",
        partNumber: "N9K-C93180YC-FX3",
        category: "switch-mang",
        subCategory: "Switch Datacenter",
        brand: "Cisco",
        model: "Nexus 9300",
        description: "Switch Cisco Nexus 93180YC-FX3 48x 25G SFP28 + 6x 100G QSFP28 cho datacenter",
        specs: {
          cpu: "x86 Multi-core",
          ram: "24GB System Memory",
          storage: "128GB SSD",
          networkCard: "48x 25GbE SFP28 + 6x 100GbE QSFP28",
          formFactor: "1U Rack",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 380000000,
        priceDealer: 342000000,
        priceMD: 304000000,
        stockCount: 2,
        isActive: true,
        isFeatured: true,
        displayOrder: 35,
        tags: ["cisco", "nexus", "switch", "datacenter", "25g", "100g", "spine-leaf"],
        imageUrl: null,
        note: "Datacenter high-performance switch",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Juniper Switches - Best Sellers 2024-2025
      {
        id: 36,
        name: "Juniper EX4400-24P",
        partNumber: "EX4400-24P",
        category: "switch-mang",
        subCategory: "Switch Layer 3",
        brand: "Juniper",
        model: "EX4400",
        description: "Switch Juniper EX4400 24 port PoE+ với Virtual Chassis và EVPN-VXLAN",
        specs: {
          cpu: "Memory 16GB",
          ram: "16GB DDR4",
          storage: "128GB SSD",
          networkCard: "24x 1GbE PoE+ + 4x 10G/25G SFP28",
          formFactor: "1U Rack",
          warranty: "Limited Lifetime"
        },
        condition: "new",
        priceEndUser: 85000000,
        priceDealer: 76500000,
        priceMD: 68000000,
        stockCount: 6,
        isActive: true,
        isFeatured: true,
        displayOrder: 36,
        tags: ["juniper", "ex4400", "switch", "poe", "layer3", "evpn", "vxlan"],
        imageUrl: null,
        note: "Best-seller Juniper cho campus network",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        name: "Juniper EX4650-48Y-AFI",
        partNumber: "EX4650-48Y-AFI",
        category: "switch-mang",
        subCategory: "Switch Datacenter",
        brand: "Juniper",
        model: "EX4650",
        description: "Switch Juniper EX4650 48x 25G SFP28 + 8x 100G QSFP28 cho datacenter spine-leaf",
        specs: {
          cpu: "Memory 32GB",
          ram: "32GB DDR4",
          storage: "256GB SSD",
          networkCard: "48x 25GbE SFP28 + 8x 100GbE QSFP28",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 295000000,
        priceDealer: 265500000,
        priceMD: 236000000,
        stockCount: 3,
        isActive: true,
        isFeatured: true,
        displayOrder: 37,
        tags: ["juniper", "ex4650", "switch", "datacenter", "25g", "100g", "spine-leaf"],
        imageUrl: null,
        note: "High-density datacenter switch",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        name: "Juniper EX2300-24MP",
        partNumber: "EX2300-24MP",
        category: "switch-mang",
        subCategory: "Switch Layer 2",
        brand: "Juniper",
        model: "EX2300",
        description: "Switch Juniper EX2300 24 port multigigabit PoE++ cho WiFi 6E và IoT",
        specs: {
          cpu: "Arm Cortex-A9",
          ram: "2GB DDR3",
          storage: "2GB Flash",
          networkCard: "24x 2.5GbE mGig PoE++ + 4x 10G SFP+",
          formFactor: "1U Rack",
          warranty: "Limited Lifetime"
        },
        condition: "new",
        priceEndUser: 72000000,
        priceDealer: 64800000,
        priceMD: 57600000,
        stockCount: 7,
        isActive: true,
        isFeatured: false,
        displayOrder: 38,
        tags: ["juniper", "ex2300", "switch", "poe++", "multigigabit", "wifi6e"],
        imageUrl: null,
        note: "Lý tưởng cho WiFi 6E AP",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Huawei Switches - Best Sellers 2024-2025
      {
        id: 39,
        name: "Huawei CloudEngine S5735-L24P4S-A1",
        partNumber: "S5735-L24P4S-A1",
        category: "switch-mang",
        subCategory: "Switch Layer 2",
        brand: "Huawei",
        model: "CloudEngine S5735-L",
        description: "Switch Huawei S5735-L 24 port PoE+ với 4x 10G SFP+ uplink",
        specs: {
          cpu: "N/A",
          ram: "1GB",
          storage: "512MB Flash",
          networkCard: "24x 1GbE PoE+ (370W) + 4x 10G SFP+",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 35000000,
        priceDealer: 31500000,
        priceMD: 28000000,
        stockCount: 15,
        isActive: true,
        isFeatured: true,
        displayOrder: 39,
        tags: ["huawei", "cloudengine", "switch", "poe", "s5735", "layer2"],
        imageUrl: null,
        note: "Giá cạnh tranh - Best value 2024",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 40,
        name: "Huawei CloudEngine S6730-H48X6C",
        partNumber: "S6730-H48X6C",
        category: "switch-mang",
        subCategory: "Switch Datacenter",
        brand: "Huawei",
        model: "CloudEngine S6730-H",
        description: "Switch Huawei CloudEngine S6730-H 48x 10G SFP+ 6x 100G QSFP28 datacenter",
        specs: {
          cpu: "N/A",
          ram: "16GB",
          storage: "2GB Flash",
          networkCard: "48x 10GbE SFP+ + 6x 100GbE QSFP28",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 185000000,
        priceDealer: 166500000,
        priceMD: 148000000,
        stockCount: 4,
        isActive: true,
        isFeatured: true,
        displayOrder: 40,
        tags: ["huawei", "cloudengine", "switch", "datacenter", "10g", "100g", "s6730"],
        imageUrl: null,
        note: "Datacenter switch hiệu năng cao",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 41,
        name: "Huawei CloudEngine S5735-S48T4X",
        partNumber: "S5735-S48T4X",
        category: "switch-mang",
        subCategory: "Switch Layer 3",
        brand: "Huawei",
        model: "CloudEngine S5735-S",
        description: "Switch Huawei S5735-S 48 port gigabit Layer 3 với 4x 10G SFP+ uplink",
        specs: {
          cpu: "N/A",
          ram: "2GB",
          storage: "1GB Flash",
          networkCard: "48x 1GbE RJ45 + 4x 10G SFP+",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 28000000,
        priceDealer: 25200000,
        priceMD: 22400000,
        stockCount: 12,
        isActive: true,
        isFeatured: false,
        displayOrder: 41,
        tags: ["huawei", "cloudengine", "switch", "layer3", "s5735", "gigabit"],
        imageUrl: null,
        note: "Layer 3 switch giá tốt",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // H3C Switches - Best Sellers 2024-2025
      {
        id: 42,
        name: "H3C S5130S-28P-EI",
        partNumber: "S5130S-28P-EI",
        category: "switch-mang",
        subCategory: "Switch Layer 2",
        brand: "H3C",
        model: "S5130S-EI",
        description: "Switch H3C S5130S 24 port PoE+ với 4x 10G SFP+ uplink",
        specs: {
          cpu: "N/A",
          ram: "1GB",
          storage: "512MB Flash",
          networkCard: "24x 1GbE PoE+ + 4x 10G SFP+",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 22000000,
        priceDealer: 19800000,
        priceMD: 17600000,
        stockCount: 20,
        isActive: true,
        isFeatured: true,
        displayOrder: 42,
        tags: ["h3c", "s5130s", "switch", "poe", "layer2", "entry-level"],
        imageUrl: null,
        note: "Entry-level PoE switch giá rẻ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 43,
        name: "H3C S6520X-54QC-EI",
        partNumber: "S6520X-54QC-EI",
        category: "switch-mang",
        subCategory: "Switch Datacenter",
        brand: "H3C",
        model: "S6520X-EI",
        description: "Switch H3C S6520X 48x 10G SFP+ 6x 40G/100G QSFP28 datacenter",
        specs: {
          cpu: "N/A",
          ram: "16GB",
          storage: "2GB Flash",
          networkCard: "48x 10GbE SFP+ + 6x 40G/100G QSFP28",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 145000000,
        priceDealer: 130500000,
        priceMD: 116000000,
        stockCount: 3,
        isActive: true,
        isFeatured: true,
        displayOrder: 43,
        tags: ["h3c", "s6520x", "switch", "datacenter", "10g", "100g"],
        imageUrl: null,
        note: "Datacenter switch giá cạnh tranh",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 44,
        name: "H3C S5560X-54C-EI",
        partNumber: "S5560X-54C-EI",
        category: "switch-mang",
        subCategory: "Switch Layer 3",
        brand: "H3C",
        model: "S5560X-EI",
        description: "Switch H3C S5560X 48 port gigabit Layer 3 với 4x 10G SFP+ 2x 40G QSFP+",
        specs: {
          cpu: "N/A",
          ram: "4GB",
          storage: "1GB Flash",
          networkCard: "48x 1GbE + 4x 10G SFP+ + 2x 40G QSFP+",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 48000000,
        priceDealer: 43200000,
        priceMD: 38400000,
        stockCount: 6,
        isActive: true,
        isFeatured: false,
        displayOrder: 44,
        tags: ["h3c", "s5560x", "switch", "layer3", "40g", "campus"],
        imageUrl: null,
        note: "Campus core switch với 40G uplink",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ==================== MODULE QUANG & DÂY QUANG ====================
      // Cisco Optics
      {
        id: 45,
        name: "Cisco SFP-10G-SR",
        partNumber: "SFP-10G-SR",
        category: "module-quang",
        subCategory: "Module SFP+ 10G",
        brand: "Cisco",
        model: "SFP-10G-SR",
        description: "Module quang Cisco 10GBASE-SR SFP+ 850nm MMF 300m",
        specs: {
          networkCard: "10GBASE-SR SFP+",
          formFactor: "SFP+ LC Duplex",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 4500000,
        priceDealer: 4050000,
        priceMD: 3600000,
        stockCount: 50,
        isActive: true,
        isFeatured: true,
        displayOrder: 45,
        tags: ["cisco", "sfp", "10g", "sr", "multimode", "optics"],
        imageUrl: null,
        note: "Best-seller module 10G cho khoảng cách ngắn",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 46,
        name: "Cisco SFP-10G-LR",
        partNumber: "SFP-10G-LR",
        category: "module-quang",
        subCategory: "Module SFP+ 10G",
        brand: "Cisco",
        model: "SFP-10G-LR",
        description: "Module quang Cisco 10GBASE-LR SFP+ 1310nm SMF 10km",
        specs: {
          networkCard: "10GBASE-LR SFP+",
          formFactor: "SFP+ LC Duplex",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 6800000,
        priceDealer: 6120000,
        priceMD: 5440000,
        stockCount: 35,
        isActive: true,
        isFeatured: true,
        displayOrder: 46,
        tags: ["cisco", "sfp", "10g", "lr", "singlemode", "optics"],
        imageUrl: null,
        note: "Module 10G cho khoảng cách 10km",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 47,
        name: "Cisco QSFP-100G-SR4-S",
        partNumber: "QSFP-100G-SR4-S",
        category: "module-quang",
        subCategory: "Module QSFP28 100G",
        brand: "Cisco",
        model: "QSFP-100G-SR4-S",
        description: "Module quang Cisco 100GBASE-SR4 QSFP28 850nm MMF 100m MTP/MPO",
        specs: {
          networkCard: "100GBASE-SR4 QSFP28",
          formFactor: "QSFP28 MTP/MPO",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 18000000,
        priceDealer: 16200000,
        priceMD: 14400000,
        stockCount: 15,
        isActive: true,
        isFeatured: true,
        displayOrder: 47,
        tags: ["cisco", "qsfp28", "100g", "sr4", "multimode", "optics"],
        imageUrl: null,
        note: "Module 100G cho datacenter spine-leaf",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Huawei Optics
      {
        id: 48,
        name: "Huawei OSX010000",
        partNumber: "OSX010000",
        category: "module-quang",
        subCategory: "Module SFP+ 10G",
        brand: "Huawei",
        model: "OSX010000",
        description: "Module quang Huawei 10G SFP+ 850nm MMF 300m",
        specs: {
          networkCard: "10GBASE-SR SFP+",
          formFactor: "SFP+ LC Duplex",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 2800000,
        priceDealer: 2520000,
        priceMD: 2240000,
        stockCount: 60,
        isActive: true,
        isFeatured: true,
        displayOrder: 48,
        tags: ["huawei", "sfp", "10g", "sr", "multimode", "optics"],
        imageUrl: null,
        note: "Module 10G giá tốt - tương thích cao",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 49,
        name: "Huawei QSFP-100G-LR4",
        partNumber: "QSFP-100G-LR4",
        category: "module-quang",
        subCategory: "Module QSFP28 100G",
        brand: "Huawei",
        model: "QSFP-100G-LR4",
        description: "Module quang Huawei 100GBASE-LR4 QSFP28 1310nm SMF 10km",
        specs: {
          networkCard: "100GBASE-LR4 QSFP28",
          formFactor: "QSFP28 LC Duplex",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 45000000,
        priceDealer: 40500000,
        priceMD: 36000000,
        stockCount: 8,
        isActive: true,
        isFeatured: false,
        displayOrder: 49,
        tags: ["huawei", "qsfp28", "100g", "lr4", "singlemode", "optics"],
        imageUrl: null,
        note: "Module 100G long range 10km",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 50,
        name: "Huawei SFP-25G-SR",
        partNumber: "SFP-25G-SR",
        category: "module-quang",
        subCategory: "Module SFP28 25G",
        brand: "Huawei",
        model: "SFP-25G-SR",
        description: "Module quang Huawei 25GBASE-SR SFP28 850nm MMF 100m",
        specs: {
          networkCard: "25GBASE-SR SFP28",
          formFactor: "SFP28 LC Duplex",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 3500000,
        priceDealer: 3150000,
        priceMD: 2800000,
        stockCount: 40,
        isActive: true,
        isFeatured: true,
        displayOrder: 50,
        tags: ["huawei", "sfp28", "25g", "sr", "multimode", "optics"],
        imageUrl: null,
        note: "Module 25G phổ biến cho server kết nối TOR",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // FS.COM Optics & Fiber Cables
      {
        id: 51,
        name: "FS.COM SFP-10GSR-85",
        partNumber: "SFP-10GSR-85",
        category: "module-quang",
        subCategory: "Module SFP+ 10G",
        brand: "FS.COM",
        model: "SFP-10GSR-85",
        description: "Module quang FS.COM 10GBASE-SR SFP+ 850nm MMF 300m - Compatible Cisco/Juniper/Huawei",
        specs: {
          networkCard: "10GBASE-SR SFP+",
          formFactor: "SFP+ LC Duplex",
          warranty: "5 năm"
        },
        condition: "new",
        priceEndUser: 950000,
        priceDealer: 855000,
        priceMD: 760000,
        stockCount: 100,
        isActive: true,
        isFeatured: true,
        displayOrder: 51,
        tags: ["fs.com", "sfp", "10g", "sr", "compatible", "generic"],
        imageUrl: null,
        note: "Best value - Bảo hành 5 năm, tương thích đa hãng",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 52,
        name: "FS.COM Patch Cord OM4 LC-LC 3m",
        partNumber: "FHD-LCLC-OM4-3M",
        category: "module-quang",
        subCategory: "Dây Patch Cord Quang",
        brand: "FS.COM",
        model: "OM4 LC-LC",
        description: "Dây patch cord quang OM4 multimode LC-LC duplex 3m LSZH",
        specs: {
          networkCard: "OM4 Multimode 50/125μm",
          formFactor: "LC Duplex - LC Duplex",
          warranty: "Lifetime"
        },
        condition: "new",
        priceEndUser: 180000,
        priceDealer: 162000,
        priceMD: 144000,
        stockCount: 200,
        isActive: true,
        isFeatured: false,
        displayOrder: 52,
        tags: ["fs.com", "patch cord", "om4", "fiber", "lc-lc", "multimode"],
        imageUrl: null,
        note: "Dây quang chất lượng cao LSZH",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 53,
        name: "FS.COM MTP-12 OM4 Trunk Cable 10m",
        partNumber: "MTP-12-OM4-10M",
        category: "module-quang",
        subCategory: "Dây MTP/MPO",
        brand: "FS.COM",
        model: "MTP-12 OM4",
        description: "Cáp trunk quang MTP-12 OM4 multimode 10m cho 40G/100G SR4",
        specs: {
          networkCard: "12-Fiber MTP/MPO OM4",
          formFactor: "MTP Female - MTP Female",
          warranty: "Lifetime"
        },
        condition: "new",
        priceEndUser: 1200000,
        priceDealer: 1080000,
        priceMD: 960000,
        stockCount: 50,
        isActive: true,
        isFeatured: true,
        displayOrder: 53,
        tags: ["fs.com", "mtp", "mpo", "om4", "trunk", "40g", "100g"],
        imageUrl: null,
        note: "Cho kết nối 40G/100G SR4 QSFP",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ==================== VẬT TƯ MẠNG ====================
      // CommScope/AMP
      {
        id: 54,
        name: "CommScope Patch Panel Cat6A 24 Port",
        partNumber: "760162800",
        category: "vat-tu-mang",
        subCategory: "Patch Panel",
        brand: "CommScope",
        model: "Cat6A UTP 24P",
        description: "Patch panel CommScope Cat6A UTP 24 port 1U cho rack 19\"",
        specs: {
          networkCard: "Cat6A UTP 10Gbps",
          formFactor: "1U 19\" Rack Mount",
          warranty: "25 năm"
        },
        condition: "new",
        priceEndUser: 3800000,
        priceDealer: 3420000,
        priceMD: 3040000,
        stockCount: 30,
        isActive: true,
        isFeatured: true,
        displayOrder: 54,
        tags: ["commscope", "patch panel", "cat6a", "utp", "24port"],
        imageUrl: null,
        note: "Bảo hành 25 năm - Tiêu chuẩn enterprise",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 55,
        name: "CommScope Cat6A UTP Cable 305m",
        partNumber: "884024504/10",
        category: "vat-tu-mang",
        subCategory: "Cáp Mạng",
        brand: "CommScope",
        model: "Cat6A U/UTP",
        description: "Cáp mạng CommScope Cat6A U/UTP 4P 305m thùng - 10Gbps",
        specs: {
          networkCard: "Cat6A U/UTP 10Gbps",
          formFactor: "305m Box",
          warranty: "25 năm"
        },
        condition: "new",
        priceEndUser: 8500000,
        priceDealer: 7650000,
        priceMD: 6800000,
        stockCount: 25,
        isActive: true,
        isFeatured: true,
        displayOrder: 55,
        tags: ["commscope", "cable", "cat6a", "utp", "305m", "10gbps"],
        imageUrl: null,
        note: "Cáp Cat6A chuẩn 10Gbps",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 56,
        name: "CommScope Jack Cat6 SL Series",
        partNumber: "1375055-1",
        category: "vat-tu-mang",
        subCategory: "Jack RJ45",
        brand: "CommScope",
        model: "Cat6 SL Jack",
        description: "Jack RJ45 CommScope Cat6 SL Series Blue - Keystone",
        specs: {
          networkCard: "Cat6 1Gbps",
          formFactor: "Keystone Jack",
          warranty: "25 năm"
        },
        condition: "new",
        priceEndUser: 85000,
        priceDealer: 76500,
        priceMD: 68000,
        stockCount: 500,
        isActive: true,
        isFeatured: false,
        displayOrder: 56,
        tags: ["commscope", "jack", "cat6", "keystone", "rj45"],
        imageUrl: null,
        note: "Jack Cat6 chính hãng CommScope",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Panduit
      {
        id: 57,
        name: "Panduit Patch Panel Cat6A 48 Port",
        partNumber: "DP486X88TGY",
        category: "vat-tu-mang",
        subCategory: "Patch Panel",
        brand: "Panduit",
        model: "Cat6A 48P",
        description: "Patch panel Panduit Cat6A Shielded 48 port 2U High Density",
        specs: {
          networkCard: "Cat6A STP 10Gbps",
          formFactor: "2U 19\" Rack Mount",
          warranty: "Lifetime"
        },
        condition: "new",
        priceEndUser: 12500000,
        priceDealer: 11250000,
        priceMD: 10000000,
        stockCount: 15,
        isActive: true,
        isFeatured: true,
        displayOrder: 57,
        tags: ["panduit", "patch panel", "cat6a", "shielded", "48port", "high-density"],
        imageUrl: null,
        note: "High-density 48 port với shielding",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 58,
        name: "Panduit Jack Cat6A TX6A 10Gig",
        partNumber: "CJ6X88TGBU",
        category: "vat-tu-mang",
        subCategory: "Jack RJ45",
        brand: "Panduit",
        model: "TX6A 10Gig",
        description: "Jack RJ45 Panduit TX6A Cat6A UTP Blue - 10Gbps Ready",
        specs: {
          networkCard: "Cat6A UTP 10Gbps",
          formFactor: "Keystone Jack",
          warranty: "Lifetime"
        },
        condition: "new",
        priceEndUser: 165000,
        priceDealer: 148500,
        priceMD: 132000,
        stockCount: 400,
        isActive: true,
        isFeatured: true,
        displayOrder: 58,
        tags: ["panduit", "jack", "cat6a", "tx6a", "10gig", "keystone"],
        imageUrl: null,
        note: "Jack Cat6A chuẩn 10Gbps Panduit",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 59,
        name: "Panduit Fiber Patch Panel 24LC",
        partNumber: "FAP24WBUDLCZ",
        category: "vat-tu-mang",
        subCategory: "Patch Panel Quang",
        brand: "Panduit",
        model: "FAP 24 LC",
        description: "Patch panel quang Panduit 24 port LC Duplex SM/MM 1U",
        specs: {
          networkCard: "24x LC Duplex (48 Fiber)",
          formFactor: "1U 19\" Rack Mount",
          warranty: "Lifetime"
        },
        condition: "new",
        priceEndUser: 5200000,
        priceDealer: 4680000,
        priceMD: 4160000,
        stockCount: 20,
        isActive: true,
        isFeatured: false,
        displayOrder: 59,
        tags: ["panduit", "patch panel", "fiber", "lc", "24port"],
        imageUrl: null,
        note: "Patch panel quang 24 LC cho datacenter",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Schneider/APC
      {
        id: 60,
        name: "APC NetShelter SX 42U 600mm x 1070mm",
        partNumber: "AR3100",
        category: "vat-tu-mang",
        subCategory: "Tủ Rack",
        brand: "Schneider",
        model: "NetShelter SX 42U",
        description: "Tủ rack APC NetShelter SX 42U 600mm x 1070mm với cửa đục lỗ",
        specs: {
          formFactor: "42U 600mmW x 1070mmD",
          warranty: "2 năm"
        },
        condition: "new",
        priceEndUser: 32000000,
        priceDealer: 28800000,
        priceMD: 25600000,
        stockCount: 5,
        isActive: true,
        isFeatured: true,
        displayOrder: 60,
        tags: ["apc", "schneider", "rack", "netshelter", "42u", "datacenter"],
        imageUrl: null,
        note: "Tủ rack tiêu chuẩn datacenter",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 61,
        name: "APC Smart-UPS 3000VA LCD RM 2U",
        partNumber: "SMT3000RMI2U",
        category: "vat-tu-mang",
        subCategory: "UPS",
        brand: "Schneider",
        model: "Smart-UPS 3000VA",
        description: "Bộ lưu điện APC Smart-UPS 3000VA LCD RM 2U 230V",
        specs: {
          powerSupply: "3000VA / 2700W",
          formFactor: "2U Rack Mount",
          warranty: "3 năm"
        },
        condition: "new",
        priceEndUser: 35000000,
        priceDealer: 31500000,
        priceMD: 28000000,
        stockCount: 8,
        isActive: true,
        isFeatured: true,
        displayOrder: 61,
        tags: ["apc", "schneider", "ups", "smart-ups", "3000va", "rackmount"],
        imageUrl: null,
        note: "UPS cho server rack - Pure Sinewave",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 62,
        name: "APC Metered Rack PDU AP7853",
        partNumber: "AP7853",
        category: "vat-tu-mang",
        subCategory: "PDU",
        brand: "Schneider",
        model: "AP7853",
        description: "APC Metered Rack PDU 32A 230V (20) C13 (4) C19 Zero U",
        specs: {
          powerSupply: "32A 230V - 24 Outlets",
          formFactor: "Zero U Vertical",
          warranty: "2 năm"
        },
        condition: "new",
        priceEndUser: 12000000,
        priceDealer: 10800000,
        priceMD: 9600000,
        stockCount: 12,
        isActive: true,
        isFeatured: false,
        displayOrder: 62,
        tags: ["apc", "schneider", "pdu", "metered", "32a", "rack"],
        imageUrl: null,
        note: "PDU có đồng hồ đo điện năng",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ==================== CÂN BẰNG TẢI (LOAD BALANCER) ====================
      // F5 Networks
      {
        id: 63,
        name: "F5 BIG-IP i2800",
        partNumber: "F5-BIG-I2800",
        category: "can-bang-tai",
        subCategory: "Hardware Load Balancer",
        brand: "F5",
        model: "BIG-IP i2800",
        description: "F5 BIG-IP i2800 Local Traffic Manager - 10Gbps throughput",
        specs: {
          cpu: "Intel Xeon 8-core",
          ram: "32GB DDR4",
          storage: "2x 480GB SSD",
          networkCard: "8x 1GbE + 4x 10GbE SFP+",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 450000000,
        priceDealer: 405000000,
        priceMD: 360000000,
        stockCount: 2,
        isActive: true,
        isFeatured: true,
        displayOrder: 63,
        tags: ["f5", "big-ip", "load-balancer", "adc", "ltm", "enterprise"],
        imageUrl: null,
        note: "Enterprise ADC - Best-seller F5",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 64,
        name: "F5 BIG-IP i4800",
        partNumber: "F5-BIG-I4800",
        category: "can-bang-tai",
        subCategory: "Hardware Load Balancer",
        brand: "F5",
        model: "BIG-IP i4800",
        description: "F5 BIG-IP i4800 Local Traffic Manager - 20Gbps throughput",
        specs: {
          cpu: "Intel Xeon 16-core",
          ram: "64GB DDR4",
          storage: "2x 960GB SSD",
          networkCard: "8x 1GbE + 8x 10GbE SFP+",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 750000000,
        priceDealer: 675000000,
        priceMD: 600000000,
        stockCount: 1,
        isActive: true,
        isFeatured: true,
        displayOrder: 64,
        tags: ["f5", "big-ip", "load-balancer", "adc", "ltm", "high-performance"],
        imageUrl: null,
        note: "High-performance ADC cho datacenter lớn",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 65,
        name: "F5 BIG-IP Virtual Edition - 1Gbps",
        partNumber: "F5-BIG-VE-1G",
        category: "can-bang-tai",
        subCategory: "Virtual Load Balancer",
        brand: "F5",
        model: "BIG-IP VE",
        description: "F5 BIG-IP Virtual Edition 1Gbps - License 1 năm",
        specs: {
          cpu: "Virtual - 4 vCPU",
          ram: "8GB vRAM",
          networkCard: "1Gbps Throughput",
          warranty: "1 năm subscription"
        },
        condition: "new",
        priceEndUser: 85000000,
        priceDealer: 76500000,
        priceMD: 68000000,
        stockCount: 10,
        isActive: true,
        isFeatured: false,
        displayOrder: 65,
        tags: ["f5", "big-ip", "virtual", "ve", "software", "subscription"],
        imageUrl: null,
        note: "Virtual Edition cho cloud/VM",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Citrix NetScaler
      {
        id: 66,
        name: "Citrix NetScaler MPX 5905",
        partNumber: "MPX-5905",
        category: "can-bang-tai",
        subCategory: "Hardware Load Balancer",
        brand: "Citrix",
        model: "MPX 5905",
        description: "Citrix NetScaler MPX 5905 ADC - 5Gbps throughput",
        specs: {
          cpu: "Intel Xeon",
          ram: "16GB DDR4",
          storage: "240GB SSD",
          networkCard: "4x 1GbE + 2x 10GbE SFP+",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 280000000,
        priceDealer: 252000000,
        priceMD: 224000000,
        stockCount: 3,
        isActive: true,
        isFeatured: true,
        displayOrder: 66,
        tags: ["citrix", "netscaler", "mpx", "load-balancer", "adc"],
        imageUrl: null,
        note: "Entry-level hardware ADC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 67,
        name: "Citrix NetScaler MPX 14060",
        partNumber: "MPX-14060",
        category: "can-bang-tai",
        subCategory: "Hardware Load Balancer",
        brand: "Citrix",
        model: "MPX 14060",
        description: "Citrix NetScaler MPX 14060 ADC - 40Gbps SSL throughput",
        specs: {
          cpu: "Intel Xeon Multi-core",
          ram: "64GB DDR4",
          storage: "2x 480GB SSD",
          networkCard: "8x 10GbE SFP+ + 4x 25GbE SFP28",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 680000000,
        priceDealer: 612000000,
        priceMD: 544000000,
        stockCount: 1,
        isActive: true,
        isFeatured: true,
        displayOrder: 67,
        tags: ["citrix", "netscaler", "mpx", "load-balancer", "adc", "ssl-offload"],
        imageUrl: null,
        note: "High-end ADC với SSL acceleration",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 68,
        name: "Citrix ADC VPX 200 - Perpetual",
        partNumber: "ADC-VPX-200",
        category: "can-bang-tai",
        subCategory: "Virtual Load Balancer",
        brand: "Citrix",
        model: "ADC VPX 200",
        description: "Citrix ADC VPX 200Mbps Virtual Appliance - Perpetual License",
        specs: {
          cpu: "Virtual - 2 vCPU",
          ram: "4GB vRAM",
          networkCard: "200Mbps Throughput",
          warranty: "Perpetual + Support"
        },
        condition: "new",
        priceEndUser: 45000000,
        priceDealer: 40500000,
        priceMD: 36000000,
        stockCount: 15,
        isActive: true,
        isFeatured: false,
        displayOrder: 68,
        tags: ["citrix", "adc", "vpx", "virtual", "perpetual"],
        imageUrl: null,
        note: "Virtual ADC license vĩnh viễn",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // A10 Networks
      {
        id: 69,
        name: "A10 Thunder 3030S",
        partNumber: "TH3030S",
        category: "can-bang-tai",
        subCategory: "Hardware Load Balancer",
        brand: "A10 Networks",
        model: "Thunder 3030S",
        description: "A10 Thunder 3030S ADC - 15Gbps L4/L7 throughput",
        specs: {
          cpu: "Intel Multi-core",
          ram: "32GB DDR4",
          storage: "240GB SSD",
          networkCard: "8x 1GbE + 4x 10GbE SFP+",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 320000000,
        priceDealer: 288000000,
        priceMD: 256000000,
        stockCount: 2,
        isActive: true,
        isFeatured: true,
        displayOrder: 69,
        tags: ["a10", "thunder", "load-balancer", "adc", "ddos"],
        imageUrl: null,
        note: "ADC với DDoS protection tích hợp",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 70,
        name: "A10 Thunder 5440S",
        partNumber: "TH5440S",
        category: "can-bang-tai",
        subCategory: "Hardware Load Balancer",
        brand: "A10 Networks",
        model: "Thunder 5440S",
        description: "A10 Thunder 5440S ADC - 40Gbps L4/L7 throughput với FPGA acceleration",
        specs: {
          cpu: "Intel Multi-core + FPGA",
          ram: "64GB DDR4",
          storage: "2x 480GB SSD",
          networkCard: "8x 10GbE SFP+ + 4x 40GbE QSFP+",
          formFactor: "1U Rack",
          warranty: "1 năm"
        },
        condition: "new",
        priceEndUser: 580000000,
        priceDealer: 522000000,
        priceMD: 464000000,
        stockCount: 1,
        isActive: true,
        isFeatured: true,
        displayOrder: 70,
        tags: ["a10", "thunder", "load-balancer", "adc", "fpga", "high-performance"],
        imageUrl: null,
        note: "High-performance với FPGA acceleration",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 71,
        name: "A10 vThunder Virtual Appliance 1Gbps",
        partNumber: "VTH-1G",
        category: "can-bang-tai",
        subCategory: "Virtual Load Balancer",
        brand: "A10 Networks",
        model: "vThunder",
        description: "A10 vThunder Virtual ADC 1Gbps - 1 năm subscription",
        specs: {
          cpu: "Virtual - 4 vCPU",
          ram: "8GB vRAM",
          networkCard: "1Gbps Throughput",
          warranty: "1 năm subscription"
        },
        condition: "new",
        priceEndUser: 65000000,
        priceDealer: 58500000,
        priceMD: 52000000,
        stockCount: 8,
        isActive: true,
        isFeatured: false,
        displayOrder: 71,
        tags: ["a10", "vthunder", "virtual", "adc", "software"],
        imageUrl: null,
        note: "Virtual ADC cho cloud deployment",
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

  // Replit Auth User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // First check by ID, then by email for deduplication
    let existingIndex = this.users.findIndex(u => u.id === userData.id);
    
    // If not found by ID but email exists, find by email to prevent duplicates
    if (existingIndex === -1 && userData.email) {
      existingIndex = this.users.findIndex(u => u.email === userData.email);
    }

    if (existingIndex !== -1) {
      // Update existing user
      this.users[existingIndex] = {
        ...this.users[existingIndex],
        id: userData.id || this.users[existingIndex].id,
        email: userData.email ?? this.users[existingIndex].email,
        firstName: userData.firstName ?? this.users[existingIndex].firstName,
        lastName: userData.lastName ?? this.users[existingIndex].lastName,
        profileImageUrl: userData.profileImageUrl ?? this.users[existingIndex].profileImageUrl,
        role: userData.role ?? this.users[existingIndex].role,
        isAdmin: userData.isAdmin ?? this.users[existingIndex].isAdmin,
        updatedAt: new Date()
      };
      return this.users[existingIndex];
    } else {
      // Create new user - first user is admin, others are viewer
      const isFirstUser = this.users.length === 0;
      const newUser: User = {
        id: userData.id || String(Date.now()),
        email: userData.email || null,
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        profileImageUrl: userData.profileImageUrl || null,
        role: userData.role || (isFirstUser ? 'admin' : 'viewer'),
        isAdmin: userData.isAdmin || isFirstUser,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.users.push(newUser);
      return newUser;
    }
  }

  async updateUserRole(id: string, role: string): Promise<User | undefined> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return undefined;
    
    this.users[index] = {
      ...this.users[index],
      role,
      isAdmin: role === 'admin',
      updatedAt: new Date()
    };
    return this.users[index];
  }

  async getAllUsers(): Promise<User[]> {
    return [...this.users];
  }
}

export const storage = new MemStorage();