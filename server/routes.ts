import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertArticleSchema, updateArticleSchema } from "@shared/schema";
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
      res.json({ success: true, contact });
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

  const httpServer = createServer(app);
  return httpServer;
}
