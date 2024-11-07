import { Image, Pressable } from "react-native";

import { ReactNode } from "react";
import { router } from "expo-router";
import clsx from "clsx";

export const RoundedBottomModalWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Pressable
      style={{ flex: 1, width: "100%", backgroundColor: "#00000070" }}
      onPress={router.back}
    >
      <Pressable
        className={clsx(
          "flex absolute bottom-0 w-full rounded-t-md justify-center items-center bg-white",
          className
        )}
      >
        {children}
      </Pressable>
    </Pressable>
  );
};
