import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";
import dummyData from "../../dummyData.json";
import _ from "lodash";
import CrossWordCard from "@/components/cross-words/cross-word-card/cross-word-card.android";

const turkish = _.shuffle(dummyData.filter((item) => item.langCode === "tr"));
const english = _.shuffle(dummyData.filter((item) => item.langCode === "en"));

const CrossWordsPage = () => {
  const params = useLocalSearchParams();
  const [finishedWords, setFinishedWords] = useState<string[]>([]);
  const [countDown, setCountDown] = React.useState(3);
  const colorScheme = useColorScheme();
  const [words, setWords] = useState({
    turkish: {
      word: "",
      matchId: "",
    },
    english: {
      word: "",
      matchId: "",
    },
  });

  useEffect(() => {
    if (words.turkish.word === "" || words.english.word === "") return;

    if (words.turkish.matchId && words.english.matchId) {
      if (words.turkish.matchId !== words.english.matchId) {
        setWords({
          turkish: {
            word: "",
            matchId: "",
          },

          english: {
            word: "",
            matchId: "",
          },
        });
      }
    }

    if (words.turkish.matchId === words.english.matchId) {
      setTimeout(() => {
        setWords({
          turkish: {
            word: "",
            matchId: "",
          },

          english: {
            word: "",
            matchId: "",
          },
        });
        setFinishedWords([
          ...finishedWords,
          words.turkish.word,
          words.english.word,
        ]);
      }, 1000);
    }
  }, [words]);

  React.useEffect(() => {
    if (countDown > 0) {
      const interval = setInterval(() => {
        if (countDown >= 0) {
          setCountDown((c) => c - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [countDown]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
      ]}
    >
      {countDown === 0 ? (
        <View
          style={{
            width: "90%",
            height: "90%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={[
              styles.column,
              {
                rowGap: 25,
              },
            ]}
          >
            {turkish
              .filter((word) => !finishedWords.includes(word.word))
              .map((item, index) => (
                <CrossWordCard
                  key={index}
                  isSelected={words.turkish.word === item.word}
                  word={{ word: item.word, matchId: item.matchId }}
                  langCode={item.langCode as "tr" | "en"}
                  isDone={finishedWords.includes(item.word)}
                  dispatch={setWords}
                  value={words}
                />
              ))}
          </View>
          <View
            style={[
              styles.column,
              {
                rowGap: 25,
              },
            ]}
          >
            {english
              .filter((word) => !finishedWords.includes(word.word))
              .map((item, index) => (
                <CrossWordCard
                  key={index}
                  isSelected={words.english.word === item.word}
                  word={{ word: item.word, matchId: item.matchId }}
                  langCode={item.langCode as "tr" | "en"}
                  isDone={finishedWords.includes(item.word)}
                  dispatch={setWords}
                  value={words}
                />
              ))}
          </View>
        </View>
      ) : (
        <Text
          style={{
            color: Colors[colorScheme ?? "light"].secondaryColor,
            fontSize: 52,
          }}
        >
          {countDown}
        </Text>
      )}
    </View>
  );
};

export default CrossWordsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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
  column: {
    justifyContent: "center",
    alignItems: "center",
  },
});
