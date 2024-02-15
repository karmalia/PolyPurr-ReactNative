import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import FirstScreen from "@/app/first-screen";
import Colors from "@/constants/Colors";
import { useFirstLaunch } from "@/utils/use-first-launch";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "titan-one": require("../assets/fonts/TitanOne-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        initialRouteName='first-screen'
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].tabBackground,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Sıra önemli! */}

        <Stack.Screen
          name='(tabs)'
          options={{ headerShown: false, title: "Tab Ones" }}
        />
        <Stack.Screen name='first-screen' options={{ headerShown: false }} />
        <Stack.Screen
          name='cross-words/[level]'
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
