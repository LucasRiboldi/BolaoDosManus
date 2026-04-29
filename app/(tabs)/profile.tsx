import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ScreenContainer } from "@/components/screen-container";

export default function ProfileScreen() {
  const { appUser, firebaseUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert("Logout", "Tem certeza que deseja sair?", [
      { text: "Cancelar", onPress: () => {} },
      {
        text: "Sair",
        onPress: async () => {
          try {
            await signOut(auth);
            router.replace("/login" as any);
          } catch (error) {
            Alert.alert("Erro", "Falha ao fazer logout");
          }
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 p-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Perfil</Text>
          </View>

          {/* User Info Card */}
          <View className="bg-primary rounded-lg p-6 gap-4">
            <View className="items-center">
              <View className="w-16 h-16 rounded-full bg-background items-center justify-center mb-4">
                <Text className="text-4xl">👤</Text>
              </View>
              <Text className="text-2xl font-bold text-background">{appUser?.name}</Text>
              <Text className="text-sm text-background opacity-80 mt-1">{appUser?.email}</Text>
            </View>

            <View className="border-t border-white border-opacity-20 pt-4">
              <View className="flex-row justify-around">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-background">{appUser?.totalPoints || 0}</Text>
                  <Text className="text-xs text-background opacity-80 mt-1">Pontos Totais</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-background">-</Text>
                  <Text className="text-xs text-background opacity-80 mt-1">Posição</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Account Info */}
          <View className="bg-surface rounded-lg p-4 gap-3">
            <Text className="text-lg font-semibold text-foreground">Informações da Conta</Text>
            <View className="gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted">Email</Text>
                <Text className="text-sm text-foreground font-semibold">{appUser?.email}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted">Membro desde</Text>
                <Text className="text-sm text-foreground font-semibold">
                  {appUser?.createdAt
                    ? new Date(appUser.createdAt).toLocaleDateString("pt-BR")
                    : "N/A"}
                </Text>
              </View>
            </View>
          </View>

          {/* App Info */}
          <View className="bg-surface rounded-lg p-4 gap-3">
            <Text className="text-lg font-semibold text-foreground">Sobre o App</Text>
            <View className="gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted">Versão</Text>
                <Text className="text-sm text-foreground font-semibold">1.0.0</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted">Copa do Mundo</Text>
                <Text className="text-sm text-foreground font-semibold">2026</Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            className="bg-error rounded-lg py-4 items-center mt-4"
            onPress={handleLogout}
          >
            <Text className="text-base font-semibold text-background">Sair da Conta</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="items-center py-4">
            <Text className="text-xs text-muted text-center">
              Bolão Copa 2026 © 2026{"\n"}Todos os direitos reservados
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
