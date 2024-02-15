import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "@/components/Themed";
import { router } from "expo-router";

type SelectionCardProps = {
  title: string;
  href: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
};

const LevelSelectionCard = ({ title, icon, href }: SelectionCardProps) => {
  const colorScheme = useColorScheme();
  return (
    <Pressable
      onPressOut={() => {
        router.push({
          pathname: href,
        });
      }}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.card,
            {
              borderWidth: 3,
              borderRadius: 10,
              borderColor: Colors[colorScheme ?? "light"].secondaryColor,
              backgroundColor: pressed
                ? Colors[colorScheme ?? "light"].darkOrange
                : "transparent",
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              {
                color: Colors[colorScheme ?? "light"].text,
              },
            ]}
          >
            {title}
          </Text>
          <FontAwesome
            color={
              pressed
                ? Colors[colorScheme ?? "light"].secondaryColor
                : Colors[colorScheme ?? "light"].text
            }
            name={icon}
            size={28}
            style={{ marginBottom: -3 }}
          />
        </View>
      )}
    </Pressable>
  );
};

export default LevelSelectionCard;

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
    fontSize: 30,

    fontWeight: "bold",
  },
});
