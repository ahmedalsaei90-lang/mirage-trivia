// PROJECT_ANCHOR: MIRAGE-TRIVIA
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Linking from "expo-linking";
import ProfileScreen from "./src/screens/Profile";
const Tab = createBottomTabNavigator();

// Purple theme
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6C2BD9",
    background: "#F8FAFC",
    text: "#111827",
    card: "#FFFFFF",
    border: "#E5E7EB",
    notification: "#8B5CF6",
  },
};

function useDeepLinks() {
  useEffect(() => {
    const handleUrl = ({ url }: { url: string }) => {
      try {
        const parsed = Linking.parse(url);
        const code = parsed.queryParams?.code as string | undefined;
        if (code) console.log("Join code from deep link:", code);
      } catch (e) {
        console.warn("Deep link parse error", e);
      }
    };
    const sub = Linking.addEventListener("url", handleUrl);
    Linking.getInitialURL().then((url) => url && handleUrl({ url }));
    return () => sub.remove();
  }, []);
}

const Screen = ({ title }: { title: string }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
    <Text style={{ fontSize: 24 }}>{title}</Text>
  </View>
);

function PlayZone() {
  useDeepLinks();
  const [code, setCode] = React.useState("");
  return (
    <View style={{ flex: 1, padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Play Zone</Text>
      {/* DEV: simulate deep link */}
      <Button title="DEV: Simulate Join Link" onPress={() => Linking.openURL("miragetrivia://join?code=TEST")} />
      <Text style={{ marginTop: 16 }}>Join by code (UI placeholder)</Text>
      <TextInput
        placeholder="e.g. A1B2"
        autoCapitalize="characters"
        value={code}
        onChangeText={setCode}
        style={{ borderWidth:1, borderColor:"#E5E7EB", padding:12, borderRadius:8 }}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" children={() => <Screen title="Home" />} />
        <Tab.Screen name="LeaderBoard" children={() => <Screen title="LeaderBoard" />} />
        <Tab.Screen name="Quiz Zone" children={() => <Screen title="Quiz Zone" />} />
        <Tab.Screen name="Play Zone" component={PlayZone} />
        <Tab.Screen name="Profile" component={ProfileScreen} />} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
