import { Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Text, View, Pressable } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, {
  SharedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
function getRandomLocation(index: number) {
  return `${Math.floor(Math.random() * 100)}%`;
}

const pawns = [
  {
    top: "10%",
    scale: 1,
    size: 30,
    left: "10%",
  },
  {
    top: "20%",
    scale: 1,
    size: 30,
    left: "80%",
  },
  {
    top: "30%",
    scale: 1,
    size: 30,
    left: "15%",
  },
  {
    top: "20%",
    scale: 1,
    size: 30,
    left: "40%",
  },
  {
    top: "30%",
    scale: 1,
    size: 30,
    left: "90%",
  },
  {
    top: "70%",
    scale: 1,
    size: 30,
    left: "20%",
  },
  {
    top: "75%",
    scale: 1,
    size: 30,
    left: "75%",
  },
  {
    top: "85%",
    scale: 1,
    size: 30,
    left: "85%",
  },
  {
    top: "90%",
    scale: 1,
    size: 30,
    left: "20%",
  },
  {
    top: "5%",
    scale: 1,
    size: 30,
    left: "50%",
  },
];

const FirstScreen = () => {
  const { navigate } = useNavigation();
  const width = useSharedValue(0);
  const playScale = useSharedValue(0);

  pawns.forEach((paw, i) => {
    paw.scale = useSharedValue(0);
  });

  useEffect(() => {
    setTimeout(() => {
      width.value = withSpring(375);
      playScale.value = withSpring(1);
    }, 1100);

    pawns.forEach((paw, i) => {
      const delay = i * 100; // 100ms delay for each subsequent icon
      setTimeout(() => {
        paw.scale.value = withSpring(1); // Spring animation to scale value 1
      }, delay);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        backgroundColor: Colors.light.backgroundColor,
      }}
    >
      <View
        style={[
          styles.wallpaperWrapper,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Animated.View
          style={{
            width: width,

            height: width,
          }}
        >
          <Image
            style={[styles.icon]}
            source={require("../assets/images/icon.png")}
            resizeMode='contain'
          />
        </Animated.View>
      </View>

      {/* Main */}
      {pawns.map((paw, i) => {
        return (
          <Animated.View
            style={{
              position: "absolute",
              top: paw.top,
              left: paw.left,
              transform: [{ scale: paw.scale }],
            }}
            key={i}
          >
            <FontAwesome
              name='paw'
              style={{
                fontSize: paw.size,
                color: Colors.light.tint,
              }}
            />
          </Animated.View>
        );
      })}

      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          padding: 60,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Animated.View
          style={{
            transform: [{ scale: playScale }],
          }}
        >
          <Pressable
            onPress={() => navigate("(tabs)")}
            style={{
              height: 100,
              width: 175,
              borderRadius: 10,
            }}
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.playButton,
                  {
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    borderColor: pressed
                      ? "transparent"
                      : Colors.light.secondaryColor,
                    backgroundColor: pressed
                      ? Colors.light.lightOrange
                      : "white",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      color: pressed
                        ? Colors.light.secondaryColor
                        : Colors.light.text,
                    },
                  ]}
                >
                  PLAY
                </Text>
              </View>
            )}
          </Pressable>
        </Animated.View>
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
  wallpaperWrapper: {
    height: "100%",
    backgroundColor: "transparent",
  },
  icon: { width: "50%", height: "50%", top: "25%", left: "25%" },
  text: {
    fontSize: 24,
    fontFamily: "titan-one",
  },
  playButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FirstScreen;
