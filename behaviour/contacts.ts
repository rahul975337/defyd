import { Value } from "@/types";
import {
  requestPermissionsAsync,
  getContactsAsync,
  getPermissionsAsync,
  Contact,
} from "expo-contacts";
import { EventEmitter } from "fbemitter";
// import AsyncStorage from "@react-native-async-storage/async-storage";
export class ContactsService {
  private static _emitter = new EventEmitter();
  private static _contacts: Value<Contact[]> = null;

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
      this.changeContacts(data);
    }
  }

  private static async loadFromStorage() {
    // const contacts = await AsyncStorage.getItem("contacts");
    // this.changeContacts(contacts ? JSON.parse(contacts) : null);
  }

  static async loadContacts() {
    if (this.contacts) return;
    await this.loadFromStorage();
    if (this.contacts) return;
    await this.loadFromDevice();
    if (this.contacts) {
      // await AsyncStorage.setItem("contacts", JSON.stringify(this.contacts));
    } else {
      this.changeContacts(null);
    }
  }

  static get contacts() {
    return this._contacts;
  }

  static getContactById(id: string) {
    return this.contacts?.find((contact) => contact.id === id);
  }

  private static changeContacts(value: Value<Contact[]>) {
    this._contacts = value;
    if (value) {
      // storage.set(StorageKey.PopularRides, JSON.stringify(value));
    } else {
      // storage.delete(StorageKey.PopularRides);
    }
    this._emitter.emit("onContactsChange", value);
  }

  public static subscribe(
    event: "onContactsChange",
    callback: (value: Value<Contact[]>) => void
  ) {
    const subscription = this._emitter.addListener(event, callback);
    return subscription.remove.bind(subscription);
  }
}
