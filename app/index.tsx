import { Header } from "@/components/header";
import { contactsAtom, filteredContactsAtom } from "@/data";
import { useContacts } from "@/hooks/useContacts";
import clsx from "clsx";
import { Contact } from "expo-contacts";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
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
  const contacts = useAtomValue(contactsAtom);
  const filteredContacts = useAtomValue(filteredContactsAtom(searchText));

  const handleViewAll = useCallback(() => {
    router.push({ pathname: "/all" });
  }, []);

  useContacts();

  return (
    <SafeAreaView className="flex-1 p-5 bg-white">
      <View className="p-5">
        <Header
          title={<Image source={require("@/assets/images/defyd-logo.png")} />}
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
          value={searchText}
          onChangeText={setSearchText}
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
        data={searchText.length > 2 ? filteredContacts : contacts}
        keyExtractor={(item) => item.phoneNumbers?.[0]?.number ?? ""}
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => <ContactCard {...item} />}
        showsVerticalScrollIndicator={false}
      />
      <Pressable
        className="absolute bottom-5 right-5 bg-red-500 p-4 rounded-md"
        onPress={handleViewAll}
      >
        <Text className="text-white">View All</Text>
      </Pressable>
    </SafeAreaView>
  );
}
