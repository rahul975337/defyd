import { Header } from "@/components/header";
import { TaskList } from "@/components/task-list";
import { router } from "expo-router";
import { Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { TaskModel } from "@/behaviour";
import { withTasks } from "@/components";

function All({ tasks }: { tasks: TaskModel[] }) {
  const handleCreateTask = () => {
    router.push({ pathname: "/create-task" });
  };

  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-white">
      <Header
        showBackButton
        title="All Tasks"
        titleClassName="text-xl font-medium"
      />

      <TaskList tasks={tasks} />
      <Pressable
        className="absolute bottom-4 rounded-full bg-logo_red p-4"
        onPress={handleCreateTask}
      >
        <Image
          source={require("@/assets/images/add.png")}
          className="h-8 w-8"
          resizeMode="contain"
          tintColor={"white"}
        />
      </Pressable>
    </SafeAreaView>
  );
}

export default withTasks(All);
