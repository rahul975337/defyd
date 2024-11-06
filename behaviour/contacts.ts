import {
  requestPermissionsAsync,
  getContactsAsync,
  getPermissionsAsync,
  Contact,
} from "expo-contacts";
// import AsyncStorage from "@react-native-async-storage/async-storage";
export class Contacts {
  private static _contacts: Contact[] | null = null;

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
    return [];
  }

  private static async loadFromStorage(): Promise<Contact[] | null> {
    // const contacts = await AsyncStorage.getItem("contacts");
    // return contacts ? JSON.parse(contacts) : null;
    return null;
  }

  static async loadContacts() {
    if (this.contacts) return;

    this._contacts = await this.loadFromStorage(); // If not already loaded from storage.

    if (this.contacts) return;

    this._contacts = await this.loadFromDevice(); // If not present in storage

    if (this.contacts) {
      // await AsyncStorage.setItem("contacts", JSON.stringify(this.contacts));
    } else {
      this._contacts = [];
    }
  }

  static get contacts() {
    return this._contacts;
  }
}
