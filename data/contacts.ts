import { atom } from "jotai";
import { Contact } from "expo-contacts";
import { ContactsService } from "@/behaviour";
import { Value } from "@/types";

const baseContactsAtom = atom<Value<Contact[]>>([]);

baseContactsAtom.onMount = (setAtom) => {
  setAtom(ContactsService.contacts);
  return ContactsService.subscribe("onContactsChange", setAtom);
};

export const contactsAtom = atom((get) => get(baseContactsAtom));
