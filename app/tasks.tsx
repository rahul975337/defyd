import { Header } from "@/components/header";
import { allTasksAtom } from "@/data";
import { useAtomValue } from "jotai";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TaskCard = ({ title }: { title: string }) => (
  <View className="w-full p-4 border border-gray-200 rounded-md">
    <Text>{title}</Text>
  </View>
);

const listEmptyComponent = () => (
  <Text className="mt-25 self-center text-center text-light_gray_border">
    No tasks found
  </Text>
);

export default function TaskList() {
  const tasks = useAtomValue(allTasksAtom);

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Header showBackButton title="Tasks" />
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskCard title={item.title} />}
        ListEmptyComponent={listEmptyComponent}
      />
    </SafeAreaView>
  );
}
