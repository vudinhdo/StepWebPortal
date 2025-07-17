import { contacts, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  markContactAsRead(id: number): Promise<Contact | undefined>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  currentId: number;

  constructor() {
    this.contacts = new Map();
    this.currentId = 1;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
      isRead: false,
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async markContactAsRead(id: number): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (contact) {
      const updatedContact = { ...contact, isRead: true };
      this.contacts.set(id, updatedContact);
      return updatedContact;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
