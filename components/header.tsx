import clsx from "clsx";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export const Header = React.memo(function Header({
  title,
  showBackButton = false,
  className,
  subTitle,
  subTitleColor,
  titleClassName,
}: {
  title: string | JSX.Element;
  showBackButton?: boolean;
  className?: string;
  subTitle?: string | JSX.Element;
  subTitleColor?: string;
  titleClassName?: string;
}) {
  return (
    <View className={`${className} w-full flex-row justify-center py-3.5`}>
      {showBackButton ? (
        <View className="z-10">
          <Pressable className="self-center" onPress={router.back}>
            <Image
              style={{
                height: 24,
                width: 24,
              }}
              resizeMode="contain"
              source={require("../assets/images/back.png")}
            />
          </Pressable>
        </View>
      ) : null}
      <View className={clsx("flex-1 items-center", showBackButton && "pr-8")}>
        {typeof title === "string" ? (
          <Text
            className={`${titleClassName}`}
            key={title.toUpperCase().split(" ").join("_")}
          >
            {title}
          </Text>
        ) : (
          title
        )}
        {subTitle && typeof subTitle === "string" ? (
          <Text
            className={`text-center text-${subTitleColor || "spanish_grey"}`}
            key={subTitle.toUpperCase().split(" ").join("_")}
          >
            {subTitle}
          </Text>
        ) : subTitle ? (
          subTitle
        ) : null}
      </View>
    </View>
  );
});
