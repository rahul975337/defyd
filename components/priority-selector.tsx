import { PriorityColors } from "@/constants/Colors";
import { Pressable, Text } from "react-native";
import clsx from "clsx";
import { Priority } from "@/types";

export const PrioritySelector = ({
  selectedPriority,
  setSelectedPriority,
}: {
  selectedPriority: Priority | null;
  setSelectedPriority: (priority: Priority) => void;
}) => {
  const handleSelectPriority = (priority: Priority) => () => {
    setSelectedPriority(priority);
  };

  return (
    <>
      {Object.keys(PriorityColors).map((priority) => (
        <Pressable
          className="border border-gray-200 rounded-2xl h-8 w-20 items-center justify-center"
          style={{
            backgroundColor:
              priority === selectedPriority
                ? PriorityColors[priority as keyof typeof PriorityColors]
                : "white",
            borderColor:
              priority === selectedPriority
                ? "transparent"
                : PriorityColors[priority as keyof typeof PriorityColors],
          }}
          key={priority}
          onPress={handleSelectPriority(priority as Priority)}
        >
          <Text
            className={clsx("text-xs font-semibold")}
            style={{
              color:
                priority === selectedPriority
                  ? "white"
                  : PriorityColors[priority as keyof typeof PriorityColors],
            }}
          >
            {priority.toLocaleUpperCase()}
          </Text>
        </Pressable>
      ))}
    </>
  );
};
