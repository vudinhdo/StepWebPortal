import { contacts, articles, type Contact, type InsertContact, type Article, type InsertArticle, type UpdateArticle } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  markContactAsRead(id: number): Promise<Contact | undefined>;
  
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
}

export const storage = new DatabaseStorage();
