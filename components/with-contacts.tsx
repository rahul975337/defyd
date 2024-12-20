import { ContactsService } from "@/behaviour";
import { withObservables } from "@nozbe/watermelondb/react";

export const withContacts = withObservables(["contacts"], () => ({
  contacts: ContactsService.getContacts().observe(),
}));

export const withContactsWithTasks = withObservables(["contacts"], () => ({
  contacts: ContactsService.getContactsWithTasks().observe(),
}));
