import {
  requestPermissionsAsync,
  getContactsAsync,
  getPermissionsAsync,
  Contact,
} from "expo-contacts";
import { ContactModel, database } from "./db";
import { Q } from "@nozbe/watermelondb";

export class ContactsService {
  static async checkPermission() {
    const { status } = await getPermissionsAsync();
    return status === "granted";
  }

  static async requestPermission() {
    const { status } = await requestPermissionsAsync();
    return status === "granted";
  }

  private static async loadFromDevice() {
    const { status } = await getPermissionsAsync();
    if (status === "granted") {
      const { data } = await getContactsAsync();
      return data;
    }
    return null;
  }

  static getContacts() {
    return database.get<ContactModel>("contacts").query();
  }

  private static async addContacts(contacts: Contact[]) {
    await database.write(async () => {
      const contactRecords = contacts.map((contact) =>
        database.get<ContactModel>("contacts").prepareCreate((record) => {
          record.name = contact.name;
          record.phoneNumber = contact.phoneNumbers?.[0].number;
        })
      );

      await database.batch(...contactRecords);
    });
  }

  private static async syncContacts() {
    const contacts = await this.loadFromDevice();
    if (contacts) {
      this.addContacts(contacts);
    }
  }

  static async load() {
    const contacts = await this.getContacts();
    if (contacts.length === 0) {
      await this.syncContacts();
    }
  }

  static getContactById(id: string) {
    return database.get<ContactModel>("contacts").findAndObserve(id);
  }

  static getContactsWithTasks() {
    return database
      .get<ContactModel>("contacts")
      .query(Q.on("tasks", Q.where("contact_id", Q.notEq(null))));
  }
}
