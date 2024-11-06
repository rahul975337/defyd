import { Contacts, Tasks } from "@/behaviour";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Detail() {
  const { contactId } = useLocalSearchParams();
  const [task, setTask] = useState("");
  return (
    <SafeAreaView className="flex-1 items-center">
      <Text>{contactId}</Text>
      <Button title="Back" onPress={() => router.back()} />
      <Text>Detail</Text>
      <Text>{Contacts.getContactById(contactId as string)?.name}</Text>
      <TextInput value={task} onChangeText={setTask} />
      <Button
        title="Create Task"
        onPress={() => {
          Tasks.createTask({
            id: "1",
            title: task,
            description: "Test",
            contactId: contactId as string,
          });
        }}
      />
      <Button
        title="Get Tasks"
        onPress={() => {
          Tasks.getTasksByContactId(contactId as string).then((tasks) => {
            Alert.alert(JSON.stringify(tasks[0].title));
          });
        }}
      />
    </SafeAreaView>
  );
}
