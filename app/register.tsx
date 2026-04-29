import { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
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
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="flex-1 justify-center gap-6">
          {/* Header */}
          <View className="items-center gap-2 mb-8">
            <Text className="text-4xl font-bold text-foreground">⚽</Text>
            <Text className="text-3xl font-bold text-foreground">Criar Conta</Text>
            <Text className="text-base text-muted">Junte-se ao bolão!</Text>
          </View>

          {/* Name Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Nome Completo</Text>
            <TextInput
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              placeholder="Seu nome"
              placeholderTextColor="#687076"
              value={name}
              onChangeText={setName}
              editable={!loading}
            />
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

          {/* Confirm Password Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Confirmar Senha</Text>
            <TextInput
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              placeholder="Confirme sua senha"
              placeholderTextColor="#687076"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity
            className={`${loading ? "bg-primary opacity-60" : "bg-primary"} rounded-lg py-4 items-center mt-4`}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text className="text-base font-semibold text-background">
              {loading ? "Criando conta..." : "Criar Conta"}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center gap-1 mt-4">
            <Text className="text-base text-muted">Já tem conta? </Text>
            <TouchableOpacity onPress={() => router.back()} disabled={loading}>
              <Text className="text-base font-semibold text-primary">Faça login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
