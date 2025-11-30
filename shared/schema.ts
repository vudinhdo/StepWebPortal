import { pgTable, text, serial, timestamp, boolean, integer, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin Users table for CMS authentication
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), // hashed password
  role: varchar("role", { length: 20 }).notNull().default("admin"),
  lastLogin: timestamp("last_login"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// CMS Activity Logs
export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => adminUsers.id),
  action: varchar("action", { length: 50 }).notNull(), // 'create', 'update', 'delete'
  resource: varchar("resource", { length: 50 }).notNull(), // 'article', 'service', etc.
  resourceId: integer("resource_id"),
  changes: jsonb("changes"), // what was changed
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: varchar("user_agent", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Website Backups
export const websiteBackups = pgTable("website_backups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: varchar("description", { length: 500 }),
  filePath: varchar("file_path", { length: 255 }).notNull(),
  size: integer("size"), // file size in bytes
  createdBy: integer("created_by").references(() => adminUsers.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isRead: boolean("is_read").default(false),
});

// Domain-specific contact form for lead generation
export const domainContacts = pgTable("domain_contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  desiredDomain: text("desired_domain").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isRead: boolean("is_read").default(false),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  imageUrl: text("image_url"),
  author: text("author").notNull().default("STEP Team"),
  isPublished: boolean("is_published").default(false),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Services management
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // hosting, cloud, domain, server, email, software
  features: text("features").array(),
  pricing: jsonb("pricing"), // flexible pricing structure
  isActive: boolean("is_active").default(true),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Testimonials management
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientTitle: text("client_title"),
  company: text("company"),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Page content management for static pages
export const pageContents = pgTable("page_contents", {
  id: serial("id").primaryKey(),
  pageName: text("page_name").notNull(), // home, about, contact, etc
  section: text("section").notNull(), // hero, services, testimonials, etc
  title: text("title"),
  subtitle: text("subtitle"),
  content: text("content"),
  imageUrl: text("image_url"),
  ctaText: text("cta_text"),
  ctaUrl: text("cta_url"),
  metadata: jsonb("metadata"), // flexible additional data
  isActive: boolean("is_active").default(true),
  order: integer("order").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Settings for global site configuration
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  description: text("description"),
  category: text("category").notNull(), // general, seo, contact, social, etc
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Email popup leads
export const emailPopupLeads = pgTable("email_popup_leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  phone: text("phone"),
  source: text("source").notNull(), // nvme, laravel, wordpress, reseller, etc
  createdAt: timestamp("created_at").defaultNow(),
  isProcessed: boolean("is_processed").default(false),
});

// Server Equipment Inventory
export const serverEquipment = pgTable("server_equipment", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // BASE_DELL, BASE_HPE, OPTION_DELL, OPTION_HPE, OPTION_NGOAI, THIET_BI_KHAC
  subCategory: text("sub_category"), // CPU, RAM, HDD, SSD, NIC, GPU, BackPlane, Main, etc.
  partNumber: text("part_number").notNull(),
  model: text("model"),
  name: text("name").notNull(),
  description: text("description"),
  specs: jsonb("specs"), // flexible specs like {cpu, ram, storage, raid, nic, psu, etc.}
  stockCount: integer("stock_count").default(0),
  priceEndUser: integer("price_end_user"), // VND
  priceDealer: integer("price_dealer"), // VND
  priceMD: integer("price_md"), // VND
  condition: text("condition").default("new"), // new, used, refurbished
  brand: text("brand"), // Dell, HPE, Samsung, Intel, etc.
  imageUrl: text("image_url"),
  tags: text("tags").array(),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  displayOrder: integer("display_order").default(0),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Equipment Categories for better organization
export const equipmentCategories = pgTable("equipment_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  parentId: integer("parent_id"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  isRead: true,
});

export const insertDomainContactSchema = createInsertSchema(domainContacts).omit({
  id: true,
  createdAt: true,
  isRead: true,
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateArticleSchema = createInsertSchema(articles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export const insertPageContentSchema = createInsertSchema(pageContents).omit({
  id: true,
  updatedAt: true,
});

export const updatePageContentSchema = createInsertSchema(pageContents).omit({
  id: true,
  updatedAt: true,
}).partial();

export const insertSiteSettingSchema = createInsertSchema(siteSettings).omit({
  id: true,
  updatedAt: true,
});

export const insertEmailPopupLeadSchema = createInsertSchema(emailPopupLeads).omit({
  id: true,
  createdAt: true,
  isProcessed: true,
});

// Server Equipment schemas
export const insertServerEquipmentSchema = createInsertSchema(serverEquipment).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateServerEquipmentSchema = createInsertSchema(serverEquipment).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

// Equipment Categories schemas
export const insertEquipmentCategorySchema = createInsertSchema(equipmentCategories).omit({
  id: true,
  createdAt: true,
});

export const updateEquipmentCategorySchema = createInsertSchema(equipmentCategories).omit({
  id: true,
  createdAt: true,
}).partial();

// Type exports
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertDomainContact = z.infer<typeof insertDomainContactSchema>;
export type DomainContact = typeof domainContacts.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type UpdateArticle = z.infer<typeof updateArticleSchema>;
export type Article = typeof articles.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type UpdateService = z.infer<typeof updateServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type UpdateTestimonial = z.infer<typeof updateTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type UpdatePageContent = z.infer<typeof updatePageContentSchema>;
export type PageContent = typeof pageContents.$inferSelect;

export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;
export type SiteSetting = typeof siteSettings.$inferSelect;

export type InsertEmailPopupLead = z.infer<typeof insertEmailPopupLeadSchema>;
export type EmailPopupLead = typeof emailPopupLeads.$inferSelect;

// Admin and CMS schemas
export const insertAdminUserSchema = createInsertSchema(adminUsers, {
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const insertActivityLogSchema = createInsertSchema(activityLogs);
export const insertWebsiteBackupSchema = createInsertSchema(websiteBackups);

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type InsertActivityLog = typeof activityLogs.$inferInsert;
export type WebsiteBackup = typeof websiteBackups.$inferSelect;
export type InsertWebsiteBackup = typeof websiteBackups.$inferInsert;

// Server Equipment types
export type InsertServerEquipment = z.infer<typeof insertServerEquipmentSchema>;
export type UpdateServerEquipment = z.infer<typeof updateServerEquipmentSchema>;
export type ServerEquipment = typeof serverEquipment.$inferSelect;

export type InsertEquipmentCategory = z.infer<typeof insertEquipmentCategorySchema>;
export type UpdateEquipmentCategory = z.infer<typeof updateEquipmentCategorySchema>;
export type EquipmentCategory = typeof equipmentCategories.$inferSelect;

// Equipment Orders table
export const equipmentOrders = pgTable("equipment_orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerType: text("customer_type").notNull(), // personal, business
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address").notNull(),
  companyName: text("company_name"),
  companyTaxCode: text("company_tax_code"),
  companyAddress: text("company_address"),
  paymentMethod: text("payment_method").notNull(), // bank_transfer, cod
  items: jsonb("items").notNull(), // array of {productId, productName, quantity, price}
  subtotal: integer("subtotal").notNull(), // VND
  vatAmount: integer("vat_amount").notNull(), // VND  
  totalAmount: integer("total_amount").notNull(), // VND
  notes: text("notes"),
  status: text("status").notNull().default("pending"), // pending, confirmed, processing, shipped, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Equipment Orders schemas
export const insertEquipmentOrderSchema = createInsertSchema(equipmentOrders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertEquipmentOrder = z.infer<typeof insertEquipmentOrderSchema>;
export type EquipmentOrder = typeof equipmentOrders.$inferSelect;
