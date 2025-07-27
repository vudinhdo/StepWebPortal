import { 
  type Contact, type InsertContact, type DomainContact, type InsertDomainContact, 
  type Article, type InsertArticle, type UpdateArticle,
  type Service, type InsertService, type UpdateService,
  type Testimonial, type InsertTestimonial, type UpdateTestimonial,
  type PageContent, type InsertPageContent, type UpdatePageContent,
  type SiteSetting, type InsertSiteSetting,
  type EmailPopupLead, type InsertEmailPopupLead,
  type AdminUser, type InsertAdminUser, type ActivityLog, type InsertActivityLog, type WebsiteBackup, type InsertWebsiteBackup
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

  // Page content management
  async getPageContents(): Promise<any[]> {
    return this.pageContents || [];
  }

  async getPageContentsByPage(pageName: string): Promise<any[]> {
    return (this.pageContents || []).filter((content: any) => content.pageName === pageName);
  }

  async createPageContent(data: any): Promise<any> {
    const newContent = {
      id: this.generateId(),
      ...data,
      updatedAt: new Date()
    };
    this.pageContents = this.pageContents || [];
    this.pageContents.push(newContent);
    return newContent;
  }

  async updatePageContent(id: number, data: any): Promise<any> {
    this.pageContents = this.pageContents || [];
    const index = this.pageContents.findIndex((content: any) => content.id === id);
    if (index >= 0) {
      this.pageContents[index] = {
        ...this.pageContents[index],
        ...data,
        updatedAt: new Date()
      };
      return this.pageContents[index];
    }
    return null;
  }

  async deletePageContent(id: number): Promise<boolean> {
    this.pageContents = this.pageContents || [];
    const index = this.pageContents.findIndex((content: any) => content.id === id);
    if (index >= 0) {
      this.pageContents.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const storage = new MemStorage();