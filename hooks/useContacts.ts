import { useEffect } from "react";

import { useCallback } from "react";

import { Contact } from "expo-contacts";
import { useState } from "react";
import { ContactsService } from "@/behaviour";

export const useContacts = () => {
  const [areContactsLoaded, setAreContactsLoaded] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const loadContacts = useCallback(() => {
    ContactsService.loadContacts().then(() => {
      console.log("Contacts loaded");
      setContacts(ContactsService.contacts ?? []);
      setAreContactsLoaded(true);
    });
  }, []);

  useEffect(() => {
    ContactsService.checkPermission().then((permission) => {
      if (permission) {
        loadContacts();
      } else {
        ContactsService.requestPermission().then((permission) => {
          if (permission) {
            loadContacts();
          }
        });
      }
    });
  }, []);

  return { areContactsLoaded, contacts };
};
