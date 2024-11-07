import { Contacts } from "@/behaviour";
import { Contact } from "expo-contacts";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const useContacts = () => {
  const [areContactsLoaded, setAreContactsLoaded] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const loadContacts = useCallback(() => {
    Contacts.loadContacts().then(() => {
      console.log("Contacts loaded");
      setContacts(Contacts.contacts ?? []);
      setAreContactsLoaded(true);
    });
  }, []);

  useEffect(() => {
    Contacts.checkPermission().then((permission) => {
      if (permission) {
        loadContacts();
      } else {
        Contacts.requestPermission().then((permission) => {
          if (permission) {
            loadContacts();
          }
        });
      }
    });
  }, []);

  return { areContactsLoaded, contacts };
};

const ContactItem = ({ contact }: { contact: Contact }) => {
  return (
    <Pressable
      onPress={() => {
        router.push({ pathname: "/detail", params: { contactId: contact.id } });
      }}
      className="w-full p-4 bg-yellow-500"
    >
      <Text>{contact.id}</Text>
      <Text>{contact.name}</Text>
      {contact.phoneNumbers?.map((phone) => (
        <Text key={phone.number}>{phone.number}</Text>
      ))}
    </Pressable>
  );
};

export default function App() {
  const { areContactsLoaded, contacts } = useContacts();
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      {areContactsLoaded ? (
        <View className="flex-1 w-full items-center">
          <FlatList
            data={contacts}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-full h-2" />}
            keyExtractor={(item) => item.phoneNumbers?.[0]?.number ?? ""}
            renderItem={({ item }) => <ContactItem contact={item} />}
          />
        </View>
      ) : (
        <ActivityIndicator color="red" size="large" />
      )}
    </SafeAreaView>
  );
}
