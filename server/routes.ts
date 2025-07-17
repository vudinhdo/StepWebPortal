import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
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

  const httpServer = createServer(app);
  return httpServer;
}
