import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Linking from "expo-linking";
import { supabase } from "./src/lib/supabase";
import ProfileScreen from "./src/screens/Profile";

const Tab = createBottomTabNavigator();

// Simple placeholder screen used for Home/LeaderBoard/QuizZone
const Screen = ({ title }: { title: string }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text style={{ fontSize: 22 }}>{title}</Text>
  </View>
);

// --- PlayZone (same as you had; keep or simplify) ---
const PlayZone = () => {
  const [code, setCode] = useState("TEST");

  const simulateJoin = () => {
    const url = `miragetrivia://join?code=${encodeURIComponent(code)}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, textAlign: "center", marginVertical: 8 }}>
        DEV: Simulate Join Link
      </Text>
      <Text style={{ marginBottom: 8 }}>Join by code (UI placeholder)</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Enter code"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
        }}
      />
      <View style={{ height: 12 }} />
      <Button title="Open miragetrivia://join?code=..." onPress={simulateJoin} />
    </View>
  );
};

// Optional: deep link handling (keep if you had it)
const SCHEME = "miragetrivia";
const prefix = Linking.createURL("/");

const linking = {
  prefixes: [prefix, `${SCHEME}://`],
  config: {
    screens: {
      Home: "",
      LeaderBoard: "leaderboard",
      "Quiz Zone": "quiz",
      "Play Zone": "play",
      Profile: "profile",
    },
  },
};

export default function App() {
  // Example deep-link listener
  useEffect(() => {
    const sub = Linking.addEventListener("url", ({ url }) => {
      // handleURL(url) // add your code if needed
    });
    return () => sub.remove();
  }, []);

  // Wrapper components so we can use `component={...}`
  const HomeTab = () => <Screen title="Home" />;
  const LeaderBoardTab = () => <Screen title="LeaderBoard" />;
  const QuizZoneTab = () => <Screen title="Quiz Zone" />;

  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: "#fff" },
  };

  return (
    <NavigationContainer linking={linking} theme={theme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="LeaderBoard" component={LeaderBoardTab} />
        <Tab.Screen name="Quiz Zone" component={QuizZoneTab} />
        <Tab.Screen name="Play Zone" component={PlayZone} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
