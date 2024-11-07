import { TasksService } from "@/behaviour";
import { RoundedBottomModalWrapper } from "@/components";
import { Priority, Task } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Pressable, TextInput } from "react-native";
import { View } from "react-native";
import { SelectableTab, TabItem, PrioritySelector } from "@/components";
import clsx from "clsx";
import React from "react";
import { useAtomValue } from "jotai";
import { taskByIdAtom } from "@/data";

const taskOptions: TabItem[] = [
  { id: "priority", label: "Priority" },
  { id: "date", label: "Today" },
  { id: "reminders", label: "Reminders" },
];

export default function UpdateTask() {
  const { taskId } = useLocalSearchParams();
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(
    TasksService.getTask(taskId as string)?.priority ?? null
  );
  const task = useAtomValue(taskByIdAtom(taskId as string));
  const [taskState, setTaskState] = useState<Task>({
    id: task?.id ?? "",
    title: task?.title ?? "",
    description: task?.description ?? "",
    contactId: task?.contactId ?? "",
    createdAt: task?.createdAt ?? new Date(),
    updatedAt: task?.updatedAt ?? new Date(),
  });

  const [selectedOption, setSelectedOption] =
    useState<TabItem["id"]>("priority");

  const handleAddTask = useCallback(() => {
    TasksService.updateTask({
      ...taskState,
      priority: selectedPriority ?? undefined,
    });
    router.back();
  }, [task, selectedPriority, taskState]);

  return (
    <RoundedBottomModalWrapper className="">
      <View className="w-full p-5">
        <TextInput
          autoFocus
          className="text-2xl"
          cursorColor={"#D10000"}
          placeholder="Task Name"
          value={taskState.title}
          onChangeText={(text) => {
            setTaskState({ ...taskState, title: text });
          }}
        />
        <TextInput
          cursorColor={"#D10000"}
          className="text-lg"
          numberOfLines={5}
          placeholder="Description"
          value={taskState.description}
          onChangeText={(text) =>
            setTaskState({ ...taskState, description: text })
          }
        />
      </View>
      <SelectableTab
        items={taskOptions}
        selectedId={selectedOption}
        onSelect={setSelectedOption}
      />

      <View className="w-full border-t border-gray-200"></View>
      <View className="w-full flex-row justify-between p-3">
        <View className="w-[70%] flex-row justify-around">
          {selectedOption === "priority" ? (
            <PrioritySelector
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}
            />
          ) : null}
        </View>
        <Pressable
          disabled={!taskState.title}
          className={clsx(
            "self-end rounded-full bg-logo_red p-3",
            !taskState.title && "opacity-50"
          )}
          onPress={handleAddTask}
        >
          <Image
            source={require("@/assets/images/add.png")}
            className="h-5 w-5"
            resizeMode="contain"
            tintColor={"white"}
          />
        </Pressable>
      </View>
    </RoundedBottomModalWrapper>
  );
}
