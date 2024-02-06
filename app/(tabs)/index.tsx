import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import CrossWordCard from "@/components/cross-words/cross-word-card/cross-word-card.android";
import { FontAwesome } from "@expo/vector-icons";
import LevelSelectionCard from "@/components/cross-words/level-selection-card/level-selection-card";

export default function TabOneScreen() {
  const levelList: {
    title: string;
    icon: React.ComponentProps<typeof FontAwesome>["name"];
    href: string;
  }[] = [
    {
      title: "Level A1",
      icon: "paw",
      href: "/cross-words/level-a1",
    },
    {
      title: "Level A2",
      icon: "paw",
      href: "/cross-words/level-a2",
    },
  ];

  return (
    <View style={styles.container}>
      {levelList.map((level, index) => (
        <LevelSelectionCard
          key={index}
          title={level.title}
          icon={level.icon}
          href={level.href}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
