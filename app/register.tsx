import { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useFirestore } from "@/hooks/use-firestore";
import { ScreenContainer } from "@/components/screen-container";

export default function RegisterScreen() {
  const router = useRouter();
  const { createUser } = useFirestore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUser(userCredential.user.uid, email, name);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Erro de Registro", error.message || "Falha ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer containerClassName="bg-gradient-to-b from-blue-600 to-blue-900">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between py-8 px-6">
          {/* Header */}
          <View className="items-center pt-8">
            <Text className="text-6xl mb-4">⚽</Text>
            <Text className="text-3xl font-bold text-white mb-1">Criar Conta</Text>
            <Text className="text-sm text-blue-100">Junte-se ao bolão</Text>
          </View>

          {/* Formulário */}
          <View className="gap-5">
            {/* Nome Input */}
            <View>
              <Text className="text-white font-semibold mb-3 text-base">Nome</Text>
              <TextInput
                placeholder="Seu nome completo"
                placeholderTextColor="#93c5fd"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                editable={!loading}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-base"
                style={{ color: '#fff' }}
              />
            </View>

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

            {/* Confirmar Senha Input */}
            <View>
              <Text className="text-white font-semibold mb-3 text-base">Confirmar Senha</Text>
              <View className="flex-row items-center bg-white/10 border border-white/20 rounded-xl px-4 py-4">
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#93c5fd"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  editable={!loading}
                  className="flex-1 text-white text-base"
                  style={{ color: '#fff' }}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Text className="text-xl text-blue-200">
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Botão Registrar */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              className="bg-yellow-400 rounded-xl py-4 items-center mt-4"
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator size="large" color="#1e40af" />
              ) : (
                <Text className="text-blue-900 font-bold text-lg">Criar Conta</Text>
              )}
            </TouchableOpacity>

            {/* Botão Voltar */}
            <TouchableOpacity
              onPress={() => router.back()}
              disabled={loading}
              className="border-2 border-white rounded-xl py-4 items-center"
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">Voltar</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="items-center pb-4">
            <Text className="text-white/60 text-xs text-center">
              Já tem conta? Faça login na tela anterior
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
