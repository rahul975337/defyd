import React from "react";
import { View, Text, Pressable } from "react-native";
import clsx from "clsx";

export interface TabItem {
  id: "date" | "priority" | "reminders";
  label: "Today" | "Priority" | "Reminders";
}

interface SelectableTabProps {
  items: TabItem[];
  selectedId: TabItem["id"];
  onSelect: (id: TabItem["id"]) => void;
}

export function SelectableTab({
  items,
  selectedId,
  onSelect,
}: SelectableTabProps) {
  return (
    <View className="w-full flex-row p-3 gap-3">
      {items.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => onSelect(item.id)}
          className={clsx(
            "px-3 py-2 rounded-md border border-gray-200",
            selectedId === item.id && "border-green-700"
          )}
        >
          <Text
            className={clsx(
              "text-md",
              selectedId === item.id ? "text-green-700" : "text-gray-700"
            )}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
