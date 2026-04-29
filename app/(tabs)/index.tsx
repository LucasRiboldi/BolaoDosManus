import { useEffect, useState } from "react";
import { ScrollView, Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/lib/auth-context";
import { useFirestore } from "@/hooks/use-firestore";
import { RankingEntry } from "@/lib/types";
import { ScreenContainer } from "@/components/screen-container";
import { SharingService } from "@/lib/sharing-service";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HomeScreen() {
  const { appUser } = useAuth();
  const { subscribeToRanking } = useFirestore();
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToRanking((newRanking) => {
      setRanking(newRanking);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [subscribeToRanking]);

  const userPosition = ranking.findIndex((entry) => entry.userId === appUser?.id) + 1;
  const userRanking = ranking.find((r) => r.userId === appUser?.id);

  const handleShareWhatsApp = async () => {
    if (!userRanking) return;
    try {
      await SharingService.shareToWhatsApp(userRanking, ranking);
    } catch (error) {
      Alert.alert("Erro", "Falha ao compartilhar no WhatsApp");
    }
  };

  const handleShareInstagram = async () => {
    if (!userRanking) return;
    try {
      await SharingService.shareToInstagram(userRanking);
    } catch (error) {
      Alert.alert("Erro", "Falha ao compartilhar no Instagram");
    }
  };

  const handleShareGeneral = async () => {
    if (!userRanking) return;
    try {
      await SharingService.shareRanking(userRanking, ranking);
    } catch (error) {
      Alert.alert("Erro", "Falha ao compartilhar");
    }
  };

  const getBadge = (position: number) => {
    switch (position) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return null;
    }
  };

  const renderRankingItem = ({ item, index }: { item: RankingEntry; index: number }) => {
    const isCurrentUser = item.userId === appUser?.id;
    const badge = getBadge(item.position);
    const isMedalist = item.position <= 3;

    return (
      <View
        className={`flex-row items-center px-4 py-3 border-b border-border ${
          isMedalist ? "bg-primary bg-opacity-5" : ""
        } ${
          isCurrentUser ? "bg-primary bg-opacity-10" : ""
        }`}
      >
        {/* Badge */}
        <View className="w-12 items-center justify-center">
          {badge ? (
            <Text className="text-2xl">{badge}</Text>
          ) : (
            <Text className="text-base font-bold text-foreground text-center">{item.position}º</Text>
          )}
        </View>

        {/* User Info */}
        <View className="flex-1 gap-1">
          <Text className={`text-base font-semibold ${
            isCurrentUser ? "text-primary" : isMedalist ? "text-primary" : "text-foreground"
          }`}>
            {item.userName}
            {isCurrentUser && " (Você)"}
          </Text>
          <Text className="text-xs text-muted">
            Grupos: {item.groupPoints} | Mata-Mata: {item.knockoutPoints}
          </Text>
        </View>

        {/* Points */}
        <View className="items-center">
          {isMedalist && <Text className="text-xs font-bold text-primary mb-1">⭐</Text>}
          <Text className="text-lg font-bold text-primary">{item.totalPoints}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="bg-primary rounded-lg p-6 gap-4">
            <View>
              <Text className="text-base text-background opacity-80">Bem-vindo,</Text>
              <Text className="text-3xl font-bold text-background">{appUser?.name}</Text>
              {userPosition > 0 && (
                <Text className="text-base text-background mt-2">
                  Você está em <Text className="font-bold">{userPosition}º lugar</Text> com{" "}
                  <Text className="font-bold">
                    {ranking.find((r) => r.userId === appUser?.id)?.totalPoints || 0} pontos
                  </Text>
                </Text>
              )}
            </View>

            {/* Share Buttons */}
            <View className="flex-row gap-2 mt-2">
              <TouchableOpacity
                className="flex-1 bg-background rounded py-2 items-center flex-row justify-center gap-2"
                onPress={handleShareWhatsApp}
              >
                <Text className="text-lg">💬</Text>
                <Text className="text-xs font-semibold text-primary">WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-background rounded py-2 items-center flex-row justify-center gap-2"
                onPress={handleShareInstagram}
              >
                <Text className="text-lg">📸</Text>
                <Text className="text-xs font-semibold text-primary">Instagram</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-background rounded py-2 items-center flex-row justify-center gap-2"
                onPress={handleShareGeneral}
              >
                <MaterialIcons name="share" size={16} color="#0a7ea4" />
                <Text className="text-xs font-semibold text-primary">Compartilhar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Ranking Title */}
          <View className="px-4">
            <Text className="text-2xl font-bold text-foreground">Ranking</Text>
            <Text className="text-sm text-muted mt-1">
              {ranking.length} apostadores competindo
            </Text>
          </View>

          {/* Ranking List */}
          {loading ? (
            <View className="items-center justify-center py-8">
              <Text className="text-base text-muted">Carregando ranking...</Text>
            </View>
          ) : ranking.length > 0 ? (
            <FlatList
              data={ranking}
              renderItem={renderRankingItem}
              keyExtractor={(item) => item.userId}
              scrollEnabled={false}
              className="bg-surface rounded-lg overflow-hidden mx-4"
            />
          ) : (
            <View className="items-center justify-center py-8 px-4">
              <Text className="text-base text-muted text-center">
                Nenhum apostador registrado ainda. Seja o primeiro!
              </Text>
            </View>
          )}

          {/* Info Box */}
          <View className="mx-4 bg-surface rounded-lg p-4 gap-2 mb-6">
            <Text className="text-sm font-semibold text-foreground">Como funciona?</Text>
            <Text className="text-xs text-muted leading-relaxed">
              Faça suas apostas na fase de grupos (acerte o placar) e no mata-mata (escolha o vencedor). Ganhe pontos e
              suba no ranking!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
