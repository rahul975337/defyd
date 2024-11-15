import {
  requestPermissionsAsync,
  getContactsAsync,
  getPermissionsAsync,
  Contact,
} from "expo-contacts";
import { ContactModel, database } from "./db";
import { Q } from "@nozbe/watermelondb";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";

export class BackgroundTask {
  static readonly BACKGROUND_FETCH_TASK = "background-fetch";

  static async register() {
    console.log("Register method called.");
    const { status, isRegistered } = await this.check();
    if (isRegistered) {
      console.log("Task is already registered, skipping registration.");
      return;
    }

    if (status !== BackgroundFetch.BackgroundFetchStatus.Available) {
      console.log(`Background fetch is not available. Status: ${status}`);
      return;
    }

    try {
      await BackgroundFetch.registerTaskAsync(this.BACKGROUND_FETCH_TASK, {
        minimumInterval: 0,
        stopOnTerminate: false,
        startOnBoot: true,
      });
      console.log("Background task registered successfully.");
    } catch (error) {
      console.error("Failed to register background task:", error);
    }
  }

  static async unregister() {
    console.log("unregister");
    const { status, isRegistered } = await this.check();
    if (!isRegistered) return;
    await BackgroundFetch.unregisterTaskAsync(this.BACKGROUND_FETCH_TASK);
  }

  static async check() {
    console.log("check");
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      this.BACKGROUND_FETCH_TASK
    );
    return { status, isRegistered };
  }

  static async define() {
    console.log("define called");
    TaskManager.defineTask(this.BACKGROUND_FETCH_TASK, async () => {
      console.log("Defining background task");
      try {
        await ContactsService.load();
        await this.unregister();
        return BackgroundFetch.BackgroundFetchResult.NewData;
      } catch {
        console.error("Error loading contacts");
        return BackgroundFetch.BackgroundFetchResult.Failed;
      }
    });
  }
}

export class ContactsService {
  static async checkPermission() {
    const { status } = await getPermissionsAsync();
    console.log("checkPermission", JSON.stringify(status));
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

  private static async sync() {
    console.log("sync called");
    const contacts = await this.loadFromDevice();
    if (contacts) {
      this.addContacts(contacts);
    }
  }

  static async load() {
    console.log("load");
    const contacts = await this.getContacts();
    if (contacts.length === 0) {
      await this.sync();
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
