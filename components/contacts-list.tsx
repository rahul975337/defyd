import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { withContacts } from "./with-contacts";
import { Contact, ContactTypes } from "expo-contacts";
import { useCallback } from "react";
import { router } from "expo-router";
import { ContactModel } from "@/behaviour";

const listEmptyComponent = () => (
  <Text className="mt-25 self-center text-center text-light_gray_border">
    No contacts found
  </Text>
);

const ContactCard = ({ id, name, phoneNumbers }: Contact) => {
  const handlePress = useCallback(() => {
    router.push({ pathname: "/detail", params: { contactId: id } });
  }, []);

  return (
    <Pressable
      className="w-full items-start rounded-md bg-white p-4 elevation-sm"
      onPress={handlePress}
    >
      <Text className="text-black">{name}</Text>
      {phoneNumbers?.map((phoneNumber, index) => {
        return (
          <Text
            className="text-black"
            key={`${phoneNumber}-${index.toString()}`}
          >
            {phoneNumber.number}
          </Text>
        );
      })}
    </Pressable>
  );
};

function ContactsList({ contacts }: { contacts: ContactModel[] }) {
  return (
    <FlatList
      ListEmptyComponent={listEmptyComponent}
      ListFooterComponent={
        !contacts ? (
          <ActivityIndicator
            animating={!contacts}
            color={"#000"}
            size={"small"}
          />
        ) : null
      }
      ItemSeparatorComponent={() => <View className="h-6" />}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
      data={contacts}
      keyExtractor={(item) => item.phoneNumber}
      onEndReachedThreshold={0.2}
      renderItem={({ item }) => (
        <ContactCard
          id={item.id}
          phoneNumbers={item.phoneNumber}
          name={item.name}
          contactType={ContactTypes.Person}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

export const withContactsList = withContacts(ContactsList);
