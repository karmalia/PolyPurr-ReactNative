import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "@/components/Themed";
import { router } from "expo-router";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

type Props = {
  isDone: boolean;
  isSelected: boolean;
  word: { word: string; matchId: string };

  langCode: "tr" | "en";
  dispatch: Dispatch<
    SetStateAction<{
      turkish: {
        word: string;
        matchId: string;
      };
      english: {
        word: string;
        matchId: string;
      };
    }>
  >;
  value: {
    turkish: { word: string; matchId: string };
    english: { word: string; matchId: string };
  };
};

enum ELangCode {
  "tr" = "turkish",
  "en" = "english",
}

const CrossWordCard = ({
  isDone,
  word,
  langCode,
  dispatch,
  value,
  isSelected,
}: Props) => {
  const colorScheme = useColorScheme();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = isSelected ? withSpring(1.2) : withSpring(1);
  }, [isSelected]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scale }],
      }}
    >
      <Pressable
        style={{
          backgroundColor: isSelected
            ? Colors.light.accentColor
            : Colors.light.lightOrange,
          height: 80,
          borderWidth: 2,
          borderColor: Colors.light.secondaryColor,
          width: 130,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => dispatch({ ...value, [ELangCode[langCode]]: word })}
      >
        <Text
          style={[
            styles.title,
            {
              color: isSelected
                ? Colors[colorScheme ?? "light"].secondaryColor
                : Colors[colorScheme ?? "light"].secondaryColor,
            },
          ]}
        >
          {word.word}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default CrossWordCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 100,
    backgroundColor: "transparent",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    letterSpacing: 1,
  },
});
