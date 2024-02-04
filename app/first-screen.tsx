import { Image, StyleSheet } from "react-native";
import React from "react";
import { Text, View, Pressable } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";

const FirstScreen = () => {
  const { navigate } = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
      }}
    >
      <Image
        style={styles.wallpaper}
        source={require("../assets/images/wallpaper.jpg")}
      />
      {/* Main */}
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          padding: 20,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Pressable style={styles.playButton} onPress={() => navigate("(tabs)")}>
          {({ pressed }) => (
            <Text
              style={[
                styles.text,
                {
                  color: pressed ? "orange" : "black",
                },
              ]}
            >
              PLAY
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
    backgroundColor: "orange",
  },
  wallpaper: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 16,
    fontFamily: "titan-one",
    color: "orange",
  },
  playButton: {
    height: 75,
    width: 150,
    borderRadius: 8,
    padding: 12,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FirstScreen;
