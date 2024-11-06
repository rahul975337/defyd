import { Contacts } from "@/behaviour";
import { Contact } from "expo-contacts";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
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

export default function App() {
  const { areContactsLoaded, contacts } = useContacts();
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      {areContactsLoaded ? (
        <View className="flex-1 w-full items-center">
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.phoneNumbers?.[0]?.number ?? ""}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />
        </View>
      ) : (
        <ActivityIndicator color="red" size="large" />
      )}
    </SafeAreaView>
  );
}
