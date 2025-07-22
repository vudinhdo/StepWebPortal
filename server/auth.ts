import { Request, Response, NextFunction } from "express";
import { storage } from "./storage";

// Simple authentication middleware for CMS
let currentUser: { id: number; username: string; role: string } | null = null;

// Default admin user credentials (in production, use encrypted passwords)
const DEFAULT_ADMIN = {
  username: "admin",
  password: "admin123", // In production, use proper password hashing
  role: "admin"
};

export function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  if (!currentUser) {
    return res.status(401).json({ success: false, message: "Không có quyền truy cập" });
  }
  next();
}

export async function loginAdmin(username: string, password: string) {
  // Simple authentication (in production, use proper password hashing)
  if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
    currentUser = {
      id: 1,
      username: DEFAULT_ADMIN.username,
      role: DEFAULT_ADMIN.role
    };
    return currentUser;
  }
  return null;
}

export function logoutAdmin() {
  currentUser = null;
}

export function getCurrentUser() {
  return currentUser;
}

export function isAuthenticated() {
  return currentUser !== null;
}