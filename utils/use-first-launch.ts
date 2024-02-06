import { useEffect, useState } from "react";
import AsyncStorage from "react-native";

// Custom hook to check if it's the first launch
export function useFirstLaunch() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched === null) {
          await AsyncStorage.setItem("hasLaunched", true);
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        // Handle errors here if necessary
        setIsFirstLaunch(false);
      }
    }

    checkFirstLaunch();
  }, []);

  return isFirstLaunch;
}
