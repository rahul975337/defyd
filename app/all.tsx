import { Header } from "@/components/header";
import { TaskList } from "@/components/task-list";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { TaskModel } from "@/behaviour";
import { withTaskByContactId, withTasks } from "@/components";
import { useLocalSearchParams } from "expo-router";

function All({ tasks }: { tasks: TaskModel[] }) {
  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-white">
      <Header
        showBackButton
        title="All Tasks"
        titleClassName="text-xl font-medium"
      />

      <TaskList tasks={tasks} />
    </SafeAreaView>
  );
}
const Tasks = withTasks(All);
const TasksByContactId = withTaskByContactId(All);
export default function Wrapper() {
  const { contactId } = useLocalSearchParams();
  return contactId ? <TasksByContactId contactId={contactId} /> : <Tasks />;
}
