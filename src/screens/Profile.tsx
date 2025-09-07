import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { supabase } from "../lib/supabase";

export default function ProfileScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert("Sign up error", error.message);
    else Alert.alert("Success", "Check your email to confirm, then sign in.");
  };

  const signIn = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert("Sign in error", error.message);
    else Alert.alert("Signed in", `User: ${data.user?.email}`);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    Alert.alert("Signed out");
  };

  return (
    <View style={{ flex:1, padding:20, gap:12, justifyContent:"center" }}>
      <Text style={{ fontSize:22, fontWeight:"600" }}>Profile</Text>
      <TextInput
        placeholder="email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{borderWidth:1,borderColor:"#E5E7EB",padding:12,borderRadius:8}}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="password"
        secureTextEntry
        style={{borderWidth:1,borderColor:"#E5E7EB",padding:12,borderRadius:8}}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Sign In" onPress={signIn} />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
