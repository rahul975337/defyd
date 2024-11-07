import { Contacts, Task, Tasks } from "@/behaviour";
import { Header } from "@/components";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TaskList = ({ contactId }: { contactId: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    Tasks.getTasksByContactId(contactId as string).then((res) => {
      setTasks(res);
    });
  }, [contactId]);

  return (
    <View>
      {tasks.map((t1) => (
        <Text>{t1.title}</Text>
      ))}
    </View>
  );
};

export default function Detail() {
  const { contactId } = useLocalSearchParams();
  const [task, setTask] = useState("");
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Header
        title={Contacts.getContactById(contactId as string)?.name ?? ""}
        titleClassName="text-xl font-medium"
      />
      <TextInput
        className="w-full p-4 border border-gray-200 rounded-md"
        value={task}
        onChangeText={setTask}
      />
      <TaskList contactId={contactId as string} />
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
    </SafeAreaView>
  );
}
