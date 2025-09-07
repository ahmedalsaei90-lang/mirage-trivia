import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "../state/auth";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async () => {
    if (!email || !password) return Alert.alert("Enter email & password");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert("Sign up error", error.message);
    else Alert.alert("Check Supabase → auth.users, profile row auto-created");
  };

  const onSignIn = async () => {
    if (!email || !password) return Alert.alert("Enter email & password");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert("Sign in error", error.message);
  };

  return (
    <View style={styles.c}>
      <Text style={styles.title}>Profile</Text>

      {user ? (
        <>
          <Text style={styles.label}>Signed in as:</Text>
          <Text style={styles.value}>{user.email}</Text>
          <View style={{ height: 12 }} />
          <Button title="Sign Out" onPress={signOut} />
        </>
      ) : (
        <>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="email"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="password"
            secureTextEntry
            style={styles.input}
          />

          <Button title="Sign Up" onPress={onSignUp} />
          <View style={{ height: 8 }} />
          <Button title="Sign In" onPress={onSignIn} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  c: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16 },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 16, marginBottom: 12 },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 10,
    padding: 12, marginBottom: 12, backgroundColor: "#fff",
  },
});
