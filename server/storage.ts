import { 
  contacts, articles, domainContacts, services, testimonials, pageContents, siteSettings, emailPopupLeads,
  type Contact, type InsertContact, type DomainContact, type InsertDomainContact, 
  type Article, type InsertArticle, type UpdateArticle,
  type Service, type InsertService, type UpdateService,
  type Testimonial, type InsertTestimonial, type UpdateTestimonial,
  type PageContent, type InsertPageContent, type UpdatePageContent,
  type SiteSetting, type InsertSiteSetting,
  type EmailPopupLead, type InsertEmailPopupLead
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

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
}

export class DatabaseStorage implements IStorage {
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values({
        ...insertContact,
        phone: insertContact.phone || null,
        company: insertContact.company || null,
        service: insertContact.service || null,
      })
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    const allContacts = await db.select().from(contacts);
    return allContacts.sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact || undefined;
  }

  async markContactAsRead(id: number): Promise<Contact | undefined> {
    const [contact] = await db
      .update(contacts)
      .set({ isRead: true })
      .where(eq(contacts.id, id))
      .returning();
    return contact || undefined;
  }

  // Domain Contact methods
  async createDomainContact(insertDomainContact: InsertDomainContact): Promise<DomainContact> {
    const [domainContact] = await db
      .insert(domainContacts)
      .values(insertDomainContact)
      .returning();
    return domainContact;
  }

  async getDomainContacts(): Promise<DomainContact[]> {
    const allDomainContacts = await db.select().from(domainContacts);
    return allDomainContacts.sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getDomainContact(id: number): Promise<DomainContact | undefined> {
    const [domainContact] = await db.select().from(domainContacts).where(eq(domainContacts.id, id));
    return domainContact || undefined;
  }

  async markDomainContactAsRead(id: number): Promise<DomainContact | undefined> {
    const [domainContact] = await db
      .update(domainContacts)
      .set({ isRead: true })
      .where(eq(domainContacts.id, id))
      .returning();
    return domainContact || undefined;
  }

  // Article methods
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db
      .insert(articles)
      .values({
        ...insertArticle,
        tags: insertArticle.tags || [],
        imageUrl: insertArticle.imageUrl || null,
      })
      .returning();
    return article;
  }

  async updateArticle(id: number, updateArticle: UpdateArticle): Promise<Article | undefined> {
    const [article] = await db
      .update(articles)
      .set({
        ...updateArticle,
        updatedAt: new Date(),
      })
      .where(eq(articles.id, id))
      .returning();
    return article || undefined;
  }

  async deleteArticle(id: number): Promise<boolean> {
    const result = await db.delete(articles).where(eq(articles.id, id));
    return result.rowCount > 0;
  }

  async getArticles(): Promise<Article[]> {
    const allArticles = await db.select().from(articles).orderBy(desc(articles.createdAt));
    return allArticles;
  }

  async getPublishedArticles(): Promise<Article[]> {
    const publishedArticles = await db
      .select()
      .from(articles)
      .where(eq(articles.isPublished, true))
      .orderBy(desc(articles.createdAt));
    return publishedArticles;
  }

  async getFeaturedArticles(): Promise<Article[]> {
    const featuredArticles = await db
      .select()
      .from(articles)
      .where(and(eq(articles.isPublished, true), eq(articles.isFeatured, true)))
      .orderBy(desc(articles.createdAt));
    return featuredArticles;
  }

  async getArticle(id: number): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article || undefined;
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.slug, slug));
    return article || undefined;
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    const categoryArticles = await db
      .select()
      .from(articles)
      .where(and(eq(articles.category, category), eq(articles.isPublished, true)))
      .orderBy(desc(articles.createdAt));
    return categoryArticles;
  }

  // Service methods implementation
  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db
      .insert(services)
      .values(insertService)
      .returning();
    return service;
  }

  async updateService(id: number, updateService: UpdateService): Promise<Service | undefined> {
    const [service] = await db
      .update(services)
      .set({ ...updateService, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return service || undefined;
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id));
    return result.rowCount > 0;
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(services.order, desc(services.createdAt));
  }

  async getActiveServices(): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(services.order);
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(and(eq(services.category, category), eq(services.isActive, true)))
      .orderBy(services.order);
  }

  // Testimonial methods implementation
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(insertTestimonial)
      .returning();
    return testimonial;
  }

  async updateTestimonial(id: number, updateTestimonial: UpdateTestimonial): Promise<Testimonial | undefined> {
    const [testimonial] = await db
      .update(testimonials)
      .set({ ...updateTestimonial, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return testimonial || undefined;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return result.rowCount > 0;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(testimonials.order, desc(testimonials.createdAt));
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(testimonials.order);
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }

  // Page Content methods implementation
  async createPageContent(insertPageContent: InsertPageContent): Promise<PageContent> {
    const [content] = await db
      .insert(pageContents)
      .values(insertPageContent)
      .returning();
    return content;
  }

  async updatePageContent(id: number, updatePageContent: UpdatePageContent): Promise<PageContent | undefined> {
    const [content] = await db
      .update(pageContents)
      .set({ ...updatePageContent, updatedAt: new Date() })
      .where(eq(pageContents.id, id))
      .returning();
    return content || undefined;
  }

  async deletePageContent(id: number): Promise<boolean> {
    const result = await db.delete(pageContents).where(eq(pageContents.id, id));
    return result.rowCount > 0;
  }

  async getPageContents(): Promise<PageContent[]> {
    return await db.select().from(pageContents).orderBy(pageContents.pageName, pageContents.order);
  }

  async getPageContentsByPage(pageName: string): Promise<PageContent[]> {
    return await db
      .select()
      .from(pageContents)
      .where(and(eq(pageContents.pageName, pageName), eq(pageContents.isActive, true)))
      .orderBy(pageContents.order);
  }

  async getPageContent(id: number): Promise<PageContent | undefined> {
    const [content] = await db.select().from(pageContents).where(eq(pageContents.id, id));
    return content || undefined;
  }

  // Site Settings methods implementation
  async createSiteSetting(insertSiteSetting: InsertSiteSetting): Promise<SiteSetting> {
    const [setting] = await db
      .insert(siteSettings)
      .values(insertSiteSetting)
      .returning();
    return setting;
  }

  async updateSiteSetting(key: string, value: string): Promise<SiteSetting | undefined> {
    const [setting] = await db
      .update(siteSettings)
      .set({ value, updatedAt: new Date() })
      .where(eq(siteSettings.key, key))
      .returning();
    return setting || undefined;
  }

  async getSiteSettings(): Promise<SiteSetting[]> {
    return await db.select().from(siteSettings).orderBy(siteSettings.category, siteSettings.key);
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting || undefined;
  }

  async getSiteSettingsByCategory(category: string): Promise<SiteSetting[]> {
    return await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.category, category))
      .orderBy(siteSettings.key);
  }

  // Email Popup Lead methods implementation
  async createEmailPopupLead(insertEmailPopupLead: InsertEmailPopupLead): Promise<EmailPopupLead> {
    const [lead] = await db
      .insert(emailPopupLeads)
      .values(insertEmailPopupLead)
      .returning();
    return lead;
  }

  async getEmailPopupLeads(): Promise<EmailPopupLead[]> {
    return await db.select().from(emailPopupLeads).orderBy(desc(emailPopupLeads.createdAt));
  }

  async getEmailPopupLead(id: number): Promise<EmailPopupLead | undefined> {
    const [lead] = await db.select().from(emailPopupLeads).where(eq(emailPopupLeads.id, id));
    return lead || undefined;
  }

  async markEmailPopupLeadAsProcessed(id: number): Promise<EmailPopupLead | undefined> {
    const [lead] = await db
      .update(emailPopupLeads)
      .set({ isProcessed: true })
      .where(eq(emailPopupLeads.id, id))
      .returning();
    return lead || undefined;
  }
}

export const storage = new DatabaseStorage();
