import { atom } from "jotai";
import { Contact } from "expo-contacts";
import { ContactsService } from "@/behaviour";
import { Value } from "@/types";
import { atomFamily } from "jotai/utils";

const baseContactsAtom = atom<Value<Contact[]>>([]);

baseContactsAtom.onMount = (setAtom) => {
  setAtom(ContactsService.contacts);
  return ContactsService.subscribe("onContactsChange", setAtom);
};

export const contactsAtom = atom((get) => get(baseContactsAtom));

export const filteredContactsAtom = atomFamily((searchText: string) =>
  atom((get) =>
    get(contactsAtom)?.filter((contact) =>
      contact.name?.toLowerCase().includes(searchText.toLowerCase())
    )
  )
);
