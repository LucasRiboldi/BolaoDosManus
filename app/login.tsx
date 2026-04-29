import { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ScreenContainer } from "@/components/screen-container";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Erro de Login", error.message || "Falha ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="flex-1 justify-center gap-6">
          {/* Header */}
          <View className="items-center gap-2 mb-8">
            <Text className="text-4xl font-bold text-foreground">⚽</Text>
            <Text className="text-3xl font-bold text-foreground">Bolão Copa 2026</Text>
            <Text className="text-base text-muted">Faça suas apostas e compete!</Text>
          </View>

          {/* Email Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Email</Text>
            <TextInput
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              placeholder="seu@email.com"
              placeholderTextColor="#687076"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* Password Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Senha</Text>
            <TextInput
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              placeholder="Sua senha"
              placeholderTextColor="#687076"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity
            className={`${loading ? "bg-primary opacity-60" : "bg-primary"} rounded-lg py-4 items-center mt-4`}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-base font-semibold text-background">
              {loading ? "Entrando..." : "Entrar"}
            </Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row justify-center gap-1 mt-4">
            <Text className="text-base text-muted">Não tem conta? </Text>
            <TouchableOpacity onPress={() => router.push("/register" as any)} disabled={loading}>
              <Text className="text-base font-semibold text-primary">Registre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
