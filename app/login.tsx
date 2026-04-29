import { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ScreenContainer } from "@/components/screen-container";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <ScreenContainer containerClassName="bg-gradient-to-b from-blue-600 to-blue-900">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between py-8 px-6">
          {/* Header com Logo */}
          <View className="items-center pt-12">
            <Text className="text-7xl mb-4">⚽</Text>
            <Text className="text-4xl font-bold text-white mb-2">Bolão 2026</Text>
            <Text className="text-lg text-blue-100">Copa do Mundo</Text>
          </View>

          {/* Formulário */}
          <View className="gap-6">
            {/* Email Input */}
            <View>
              <Text className="text-white font-semibold mb-3 text-base">Email</Text>
              <TextInput
                placeholder="seu@email.com"
                placeholderTextColor="#93c5fd"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-base"
                style={{ color: '#fff' }}
              />
            </View>

            {/* Senha Input */}
            <View>
              <Text className="text-white font-semibold mb-3 text-base">Senha</Text>
              <View className="flex-row items-center bg-white/10 border border-white/20 rounded-xl px-4 py-4">
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#93c5fd"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  editable={!loading}
                  className="flex-1 text-white text-base"
                  style={{ color: '#fff' }}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text className="text-xl text-blue-200">
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Botão Login */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className="bg-yellow-400 rounded-xl py-4 items-center mt-4"
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator size="large" color="#1e40af" />
              ) : (
                <Text className="text-blue-900 font-bold text-lg">Entrar</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center gap-3 my-2">
              <View className="flex-1 h-px bg-white/20" />
              <Text className="text-white/60 text-sm">ou</Text>
              <View className="flex-1 h-px bg-white/20" />
            </View>

            {/* Botão Registrar */}
            <TouchableOpacity
              onPress={() => router.push("/register" as any)}
              disabled={loading}
              className="border-2 border-white rounded-xl py-4 items-center"
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">Criar Conta</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="items-center gap-4 pb-4">
            <Text className="text-white/60 text-xs text-center">
              Faça suas apostas e compete com amigos
            </Text>
            <View className="flex-row gap-3 justify-center">
              <Text className="text-3xl">🇧🇷</Text>
              <Text className="text-3xl">🇩🇪</Text>
              <Text className="text-3xl">🇫🇷</Text>
              <Text className="text-3xl">🇦🇷</Text>
              <Text className="text-3xl">🇪🇸</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
