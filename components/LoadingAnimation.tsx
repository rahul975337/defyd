import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  withDelay,
} from "react-native-reanimated";
import { useEffect } from "react";

export function LoadingAnimation() {
  const dots = Array(3)
    .fill(0)
    .map(() => useSharedValue(0));

  useEffect(() => {
    dots.forEach((dot, index) => {
      dot.value = withRepeat(
        withSequence(
          withDelay(index * 200, withTiming(1, { duration: 500 })),
          withTiming(0, { duration: 500 })
        ),
        -1,
        true
      );
    });
  }, []);

  const animatedDots = dots.map((dot) =>
    useAnimatedStyle(() => ({
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "#D10000",
      marginHorizontal: 5,
      opacity: dot.value,
      transform: [{ scale: 1 + dot.value * 0.5 }],
    }))
  );

  return (
    <View className="flex-row items-center justify-center">
      {animatedDots.map((style, index) => (
        <Animated.View key={index} style={style} />
      ))}
    </View>
  );
}
