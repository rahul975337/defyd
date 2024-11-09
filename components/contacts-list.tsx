import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { withContacts } from "./with-contacts";
import { useCallback, useMemo, useState } from "react";
import { router } from "expo-router";
import { ContactModel } from "@/behaviour";
import clsx from "clsx";

// Debounce function
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const listEmptyComponent = () => (
  <Text className="mt-25 self-center text-center text-light_gray_border">
    No contacts found
  </Text>
);

const ContactCard = ({
  id,
  name,
  phoneNumber,
}: {
  id: string;
  name: string;
  phoneNumber: string;
}) => {
  const handlePress = useCallback(() => {
    router.push({ pathname: "/detail", params: { contactId: id } });
  }, [id]);

  return (
    <Pressable
      className="w-full items-start rounded-md bg-white p-4 elevation-md"
      onPress={handlePress}
    >
      <Text className="text-black">{name}</Text>
      <Text className="text-black">{phoneNumber}</Text>
    </Pressable>
  );
};

function _ContactsList({ contacts }: { contacts: ContactModel[] }) {
  const [searchText, setSearchText] = useState("");

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((text: string) => {
      setSearchText(text);
    }, 300),
    []
  );

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [contacts, searchText]);

  return (
    <>
      <View className="flex-row items-center mb-10">
        <TextInput
          allowFontScaling={false}
          className={clsx(
            "h-14 w-full content-center justify-center rounded-md elevation-md bg-white pl-12 "
          )}
          editable={true}
          key="contacts-search-text"
          onChangeText={handleSearch}
          placeholder="Search contacts"
          placeholderTextColor={"#999"}
          selectionColor={"#000"}
        />
        <Image
          className="absolute ml-2 h-6 w-6"
          source={require("@/assets/images/search.png")}
          tintColor={"#E0E0E0"}
        />
      </View>
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
        data={filteredContacts}
        keyExtractor={(item) => item.phoneNumber}
        onEndReachedThreshold={0.2}
        contentContainerClassName="p-5"
        renderItem={({ item }) => (
          <ContactCard
            id={item.id}
            phoneNumber={item.phoneNumber}
            name={item.name}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

export const ContactsList = withContacts(_ContactsList);
