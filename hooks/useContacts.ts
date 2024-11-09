import { useEffect } from "react";

import { ContactsService } from "@/behaviour";

export const useContacts = () => {
  useEffect(() => {
    ContactsService.checkPermission().then((permission) => {
      if (permission) {
        ContactsService.load();
      } else {
        ContactsService.requestPermission().then((permission) => {
          if (permission) {
            ContactsService.load();
          }
        });
      }
    });
  }, []);
};
