import { Header } from "@/components/header";
import { TaskList } from "@/components/task-list";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { TaskModel } from "@/behaviour";
import { withTasks, withTaskByContactId } from "@/components";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ContactModel } from "@/behaviour";
import { withContactsWithTasks } from "@/components/with-contacts";

const FilterByContactPicker = ({
  contacts,
  onContactChange,
}: {
  contacts: ContactModel[];
  onContactChange: (contactId: string | null) => void;
}) => {
  const [selectedContact, setSelectedContact] = useState<string | null>("all");

  const handleFilterChange = (value: string | null) => {
    setSelectedContact(value);
    onContactChange(value);
  };

  return (
    <View className="w-full mb-4">
      <Picker
        selectedValue={selectedContact}
        onValueChange={(value) => handleFilterChange(value)}
        className="w-full"
        selectionColor={"#D10000"}
        dropdownIconRippleColor={"transparent"}
        dropdownIconColor={"#D10000"}
      >
        <Picker.Item label="All Contacts" value="all" />
        {contacts.map((contact) => (
          <Picker.Item
            key={contact.id}
            label={contact.name}
            value={contact.id}
          />
        ))}
      </Picker>
    </View>
  );
};

const EnhancedFilterByContactPicker = withContactsWithTasks(
  FilterByContactPicker
);

function All({ tasks }: { tasks: TaskModel[] }) {
  return <TaskList tasks={tasks} />;
}

const Tasks = withTasks(All);
const TasksByContactId = withTaskByContactId(All);

export default function Wrapper() {
  const { contactId } = useLocalSearchParams();
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    contactId as string | null
  );

  const handleContactChange = (contactId: string | null) => {
    if (contactId === "all") {
      setSelectedContactId(null);
    } else {
      setSelectedContactId(contactId);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-white">
      <Header
        showBackButton
        title="All Tasks"
        titleClassName="text-xl font-medium"
      />
      <EnhancedFilterByContactPicker onContactChange={handleContactChange} />
      {selectedContactId ? (
        <TasksByContactId contactId={selectedContactId} />
      ) : (
        <Tasks />
      )}
    </SafeAreaView>
  );
}
