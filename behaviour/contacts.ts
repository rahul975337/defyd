import {
  requestPermissionsAsync,
  getContactsAsync,
  getPermissionsAsync,
  Contact,
} from "expo-contacts";
import { ContactModel, database } from "./db";

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
      await database
        .get<ContactModel>("contacts")
        .create((record) => {
          console.log(contacts[0].phoneNumbers?.[0].number);
          record.name = contacts[0].name;
          record.phoneNumber = contacts[0].phoneNumbers?.[0].number;
        })
        .then(() => console.log("Contact added"))
        .catch((error) => console.log(error));
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
    return database.get<ContactModel>("contacts").find(id);
  }
}
