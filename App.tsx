import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/Home";      // (or placeholder)
import LeaderboardScreen from "./src/screens/Leaderboard";
import QuizZoneScreen from "./src/screens/QuizZone";
import PlayZoneScreen from "./src/screens/PlayZone";
import ProfileScreen from "./src/screens/Profile";
import { useAuth } from "./src/state/auth";

const Tab = createBottomTabNavigator();
const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: "#6f3cff" }};

export default function App() {
  const { init, ready } = useAuth();

  useEffect(() => { init(); }, [init]);

  if (!ready) return null; // simple splash; you can render a loader

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="LeaderBoard" component={LeaderboardScreen} />
        <Tab.Screen name="Quiz Zone" component={QuizZoneScreen} />
        <Tab.Screen name="Play Zone" component={PlayZoneScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/Home";      // (or placeholder)
import LeaderboardScreen from "./src/screens/Leaderboard";
import QuizZoneScreen from "./src/screens/QuizZone";
import PlayZoneScreen from "./src/screens/PlayZone";
import ProfileScreen from "./src/screens/Profile";
import { useAuth } from "./src/state/auth";

const Tab = createBottomTabNavigator();
const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: "#6f3cff" }};

export default function App() {
  const { init, ready } = useAuth();

  useEffect(() => { init(); }, [init]);

  if (!ready) return null; // simple splash; you can render a loader

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="LeaderBoard" component={LeaderboardScreen} />
        <Tab.Screen name="Quiz Zone" component={QuizZoneScreen} />
        <Tab.Screen name="Play Zone" component={PlayZoneScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
