import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authenticateAdmin, loginAdmin, logoutAdmin, getCurrentUser, isAuthenticated } from "./auth";
import { 
  insertContactSchema, insertDomainContactSchema, insertArticleSchema, updateArticleSchema,
  insertServiceSchema, updateServiceSchema, insertTestimonialSchema, updateTestimonialSchema,
  insertPageContentSchema, updatePageContentSchema, insertSiteSettingSchema, insertEmailPopupLeadSchema,
  loginSchema, insertServerEquipmentSchema, updateServerEquipmentSchema,
  insertEquipmentCategorySchema, updateEquipmentCategorySchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, id: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dữ liệu không hợp lệ",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Lỗi máy chủ nội bộ" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Get single contact
  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contact = await storage.getContact(id);
      if (!contact) {
        res.status(404).json({ 
          success: false, 
          message: "Không tìm thấy liên hệ" 
        });
        return;
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Mark contact as read
  app.patch("/api/contacts/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contact = await storage.markContactAsRead(id);
      if (!contact) {
        res.status(404).json({ 
          success: false, 
          message: "Không tìm thấy liên hệ" 
        });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Domain contact form submission
  app.post("/api/domain-contact", async (req, res) => {
    try {
      const validatedData = insertDomainContactSchema.parse(req.body);
      const domainContact = await storage.createDomainContact(validatedData);
      res.json({ success: true, id: domainContact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dữ liệu không hợp lệ",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Lỗi máy chủ nội bộ" 
        });
      }
    }
  });

  // Get all domain contacts (for admin purposes)
  app.get("/api/domain-contacts", async (req, res) => {
    try {
      const domainContacts = await storage.getDomainContacts();
      res.json(domainContacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Get single domain contact
  app.get("/api/domain-contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const domainContact = await storage.getDomainContact(id);
      if (!domainContact) {
        res.status(404).json({ 
          success: false, 
          message: "Không tìm thấy liên hệ tên miền" 
        });
        return;
      }
      res.json(domainContact);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Mark domain contact as read
  app.patch("/api/domain-contacts/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const domainContact = await storage.markDomainContactAsRead(id);
      if (!domainContact) {
        res.status(404).json({ 
          success: false, 
          message: "Không tìm thấy liên hệ tên miền" 
        });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Blog/Article routes
  
  // Create article
  app.post("/api/articles", async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.json({ success: true, article });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dữ liệu không hợp lệ",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Lỗi máy chủ nội bộ" 
        });
      }
    }
  });

  // Update article
  app.patch("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateArticleSchema.parse(req.body);
      const article = await storage.updateArticle(id, validatedData);
      if (!article) {
        res.status(404).json({ 
          success: false, 
          message: "Không tìm thấy bài viết" 
        });
        return;
      }
      res.json({ success: true, article });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dữ liệu không hợp lệ",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Lỗi máy chủ nội bộ" 
        });
      }
    }
  });

  // Delete article
  app.delete("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteArticle(id);
      if (!success) {
        res.status(404).json({ 
          success: false, 
          message: "Không tìm thấy bài viết" 
        });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Get all articles (for admin)
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Get published articles (for public)
  app.get("/api/articles/published", async (req, res) => {
    try {
      const articles = await storage.getPublishedArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Get featured articles
  app.get("/api/articles/featured", async (req, res) => {
    try {
      const articles = await storage.getFeaturedArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Get articles by category
  app.get("/api/articles/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const articles = await storage.getArticlesByCategory(category);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Get single article by ID
  app.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getArticle(id);
      if (!article) {
        res.status(404).json({ 
          success: false, 
          message: "Không tìm thấy bài viết" 
        });
        return;
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Get article by slug
  app.get("/api/articles/slug/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const article = await storage.getArticleBySlug(slug);
      if (!article) {
        res.status(404).json({ 
          success: false, 
          message: "Không tìm thấy bài viết" 
        });
        return;
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Get articles by category
  app.get("/api/articles/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const articles = await storage.getArticlesByCategory(category);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Lỗi máy chủ nội bộ" 
      });
    }
  });

  // Services API routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.json({ success: true, id: service.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  app.patch("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateServiceSchema.parse(req.body);
      const service = await storage.updateService(id, validatedData);
      if (!service) {
        res.status(404).json({ success: false, message: "Không tìm thấy dịch vụ" });
        return;
      }
      res.json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteService(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Không tìm thấy dịch vụ" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // Testimonials API routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json({ success: true, id: testimonial.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  app.patch("/api/testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateTestimonialSchema.parse(req.body);
      const testimonial = await storage.updateTestimonial(id, validatedData);
      if (!testimonial) {
        res.status(404).json({ success: false, message: "Không tìm thấy testimonial" });
        return;
      }
      res.json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteTestimonial(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Không tìm thấy testimonial" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // Page Contents API routes
  app.get("/api/page-contents", async (req, res) => {
    try {
      const pageContents = await storage.getPageContents();
      res.json(pageContents);
    } catch (error) {
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  app.post("/api/page-contents", async (req, res) => {
    try {
      const validatedData = insertPageContentSchema.parse(req.body);
      const pageContent = await storage.createPageContent(validatedData);
      res.json({ success: true, data: pageContent });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  app.patch("/api/page-contents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updatePageContentSchema.parse(req.body);
      const pageContent = await storage.updatePageContent(id, validatedData);
      if (!pageContent) {
        res.status(404).json({ success: false, message: "Không tìm thấy nội dung trang" });
        return;
      }
      res.json({ success: true, data: pageContent });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  app.delete("/api/page-contents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePageContent(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Không tìm thấy nội dung trang" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // Site Settings API routes
  app.get("/api/site-settings", async (req, res) => {
    try {
      const siteSettings = await storage.getSiteSettings();
      res.json(siteSettings);
    } catch (error) {
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  app.post("/api/site-settings", async (req, res) => {
    try {
      const validatedData = insertSiteSettingSchema.parse(req.body);
      const siteSetting = await storage.createSiteSetting(validatedData);
      res.json({ success: true, key: siteSetting.key });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  // Email Popup Leads API routes
  app.get("/api/email-leads", async (req, res) => {
    try {
      const emailLeads = await storage.getEmailPopupLeads();
      res.json(emailLeads);
    } catch (error) {
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  app.post("/api/email-leads", async (req, res) => {
    try {
      const validatedData = insertEmailPopupLeadSchema.parse(req.body);
      const emailLead = await storage.createEmailPopupLead(validatedData);
      res.json({ success: true, id: emailLead.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  // Domain Contacts API route
  app.get("/api/domain-contacts", async (req, res) => {
    try {
      const domainContacts = await storage.getDomainContacts();
      res.json(domainContacts);
    } catch (error) {
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // Authentication routes for CMS
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const user = await loginAdmin(validatedData.username, validatedData.password);
      
      if (user) {
        res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
      } else {
        res.status(401).json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không đúng" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dữ liệu không hợp lệ",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Lỗi máy chủ nội bộ" 
        });
      }
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    logoutAdmin();
    res.json({ success: true, message: "Đã đăng xuất thành công" });
  });

  app.get("/api/auth/user", (req, res) => {
    const user = getCurrentUser();
    if (user) {
      res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
    } else {
      res.status(401).json({ success: false, message: "Chưa đăng nhập" });
    }
  });

  app.get("/api/auth/status", (req, res) => {
    res.json({ success: true, authenticated: isAuthenticated() });
  });

  // Page Content Management Routes
  app.get("/api/page-contents", async (req, res) => {
    try {
      const { page } = req.query;
      const contents = page 
        ? await storage.getPageContentsByPage(page as string)
        : await storage.getPageContents();
      res.json(contents);
    } catch (error) {
      console.error("Error fetching page contents:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  app.post("/api/page-contents", async (req, res) => {
    try {
      const content = await storage.createPageContent(req.body);
      res.json({ success: true, data: content });
    } catch (error) {
      console.error("Error creating page content:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  app.patch("/api/page-contents/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const content = await storage.updatePageContent(parseInt(id), req.body);
      if (!content) {
        return res.status(404).json({ success: false, message: "Không tìm thấy nội dung" });
      }
      res.json({ success: true, data: content });
    } catch (error) {
      console.error("Error updating page content:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  app.delete("/api/page-contents/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deletePageContent(parseInt(id));
      if (!success) {
        return res.status(404).json({ success: false, message: "Không tìm thấy nội dung" });
      }
      res.json({ success: true, message: "Đã xóa nội dung" });
    } catch (error) {
      console.error("Error deleting page content:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // ========== SERVER EQUIPMENT ROUTES ==========
  
  // Get all equipment (public - active only)
  app.get("/api/equipment", async (req, res) => {
    try {
      const { category, subCategory, search, featured } = req.query;
      
      let equipment;
      if (search) {
        equipment = await storage.searchServerEquipments(search as string);
      } else if (category) {
        equipment = await storage.getServerEquipmentsByCategory(category as string);
      } else if (subCategory) {
        equipment = await storage.getServerEquipmentsBySubCategory(subCategory as string);
      } else if (featured === 'true') {
        equipment = await storage.getFeaturedServerEquipments();
      } else {
        equipment = await storage.getActiveServerEquipments();
      }
      
      res.json(equipment);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // Get all equipment for admin (includes inactive)
  app.get("/api/admin/equipment", async (req, res) => {
    try {
      const equipment = await storage.getServerEquipments();
      res.json(equipment);
    } catch (error) {
      console.error("Error fetching all equipment:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // Get single equipment
  app.get("/api/equipment/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const equipment = await storage.getServerEquipment(id);
      if (!equipment) {
        return res.status(404).json({ success: false, message: "Không tìm thấy thiết bị" });
      }
      res.json(equipment);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // Create equipment (admin)
  app.post("/api/equipment", async (req, res) => {
    try {
      const validatedData = insertServerEquipmentSchema.parse(req.body);
      const equipment = await storage.createServerEquipment(validatedData);
      res.json({ success: true, data: equipment });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dữ liệu không hợp lệ",
          errors: error.errors 
        });
      } else {
        console.error("Error creating equipment:", error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  // Bulk create equipment (admin - for import)
  app.post("/api/equipment/bulk", async (req, res) => {
    try {
      const { items } = req.body;
      if (!Array.isArray(items)) {
        return res.status(400).json({ success: false, message: "Items must be an array" });
      }
      
      const validatedItems = items.map(item => insertServerEquipmentSchema.parse(item));
      const created = await storage.bulkCreateServerEquipments(validatedItems);
      res.json({ success: true, count: created.length, data: created });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dữ liệu không hợp lệ",
          errors: error.errors 
        });
      } else {
        console.error("Error bulk creating equipment:", error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  // Update equipment (admin)
  app.patch("/api/equipment/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateServerEquipmentSchema.parse(req.body);
      const equipment = await storage.updateServerEquipment(id, validatedData);
      if (!equipment) {
        return res.status(404).json({ success: false, message: "Không tìm thấy thiết bị" });
      }
      res.json({ success: true, data: equipment });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dữ liệu không hợp lệ",
          errors: error.errors 
        });
      } else {
        console.error("Error updating equipment:", error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  // Delete equipment (admin)
  app.delete("/api/equipment/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteServerEquipment(id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Không tìm thấy thiết bị" });
      }
      res.json({ success: true, message: "Đã xóa thiết bị" });
    } catch (error) {
      console.error("Error deleting equipment:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // ========== EQUIPMENT CATEGORIES ROUTES ==========
  
  // Get all categories (public - active only)
  app.get("/api/equipment-categories", async (req, res) => {
    try {
      const categories = await storage.getActiveEquipmentCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching equipment categories:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // Get all categories for admin (includes inactive)
  app.get("/api/admin/equipment-categories", async (req, res) => {
    try {
      const categories = await storage.getEquipmentCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching all equipment categories:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // Get single category
  app.get("/api/equipment-categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const category = await storage.getEquipmentCategory(id);
      if (!category) {
        return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching equipment category:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  // Create category (admin)
  app.post("/api/equipment-categories", async (req, res) => {
    try {
      const validatedData = insertEquipmentCategorySchema.parse(req.body);
      const category = await storage.createEquipmentCategory(validatedData);
      res.json({ success: true, data: category });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dữ liệu không hợp lệ",
          errors: error.errors 
        });
      } else {
        console.error("Error creating equipment category:", error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  // Update category (admin)
  app.patch("/api/equipment-categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateEquipmentCategorySchema.parse(req.body);
      const category = await storage.updateEquipmentCategory(id, validatedData);
      if (!category) {
        return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
      }
      res.json({ success: true, data: category });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dữ liệu không hợp lệ",
          errors: error.errors 
        });
      } else {
        console.error("Error updating equipment category:", error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
    }
  });

  // Delete category (admin)
  app.delete("/api/equipment-categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteEquipmentCategory(id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
      }
      res.json({ success: true, message: "Đã xóa danh mục" });
    } catch (error) {
      console.error("Error deleting equipment category:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
