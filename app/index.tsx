import { Header } from "@/components/header";
import { useContacts } from "@/hooks/useContacts";
import clsx from "clsx";
import { Contact } from "expo-contacts";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const { areContactsLoaded, contacts } = useContacts();
  const changeSearchText = useCallback(async (text: string) => {
    setSearchText(text);

    if (text.length >= 3) {
      const data = contacts.filter((contact) =>
        contact.name?.toLowerCase().includes(text.toLowerCase())
      );
      if (data.length > 0) {
        setFilteredContacts(data);
      }
    } else {
      setFilteredContacts([]);
    }
  }, []);
  return (
    <SafeAreaView className="flex-1 p-5 bg-white">
      <View className="p-5">
        <Header
          title={
            <Image source={require("@/assets/images/defyd-logo-white.png")} />
          }
        />
      </View>

      <View className="flex-row items-center mb-10">
        <TextInput
          allowFontScaling={false}
          className={clsx(
            "h-14 w-full content-center justify-center rounded-md border-[#E0E0E0] pl-12 border-[1px]"
          )}
          editable={true}
          key="contacts-search-text"
          onChangeText={changeSearchText}
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
          !areContactsLoaded ? (
            <ActivityIndicator
              animating={!areContactsLoaded}
              color={"#000"}
              size={"small"}
            />
          ) : null
        }
        ItemSeparatorComponent={() => <View className="h-6" />}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        data={searchText.length > 2 ? filteredContacts : contacts}
        keyExtractor={(item) => item.phoneNumbers?.[0]?.number ?? ""}
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => <ContactCard {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
