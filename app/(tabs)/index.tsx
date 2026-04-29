import { useEffect, useState } from "react";
import { ScrollView, Text, View, FlatList } from "react-native";
import { useAuth } from "@/lib/auth-context";
import { useFirestore } from "@/hooks/use-firestore";
import { RankingEntry } from "@/lib/types";
import { ScreenContainer } from "@/components/screen-container";

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

  const renderRankingItem = ({ item, index }: { item: RankingEntry; index: number }) => {
    const isCurrentUser = item.userId === appUser?.id;

    return (
      <View
        className={`flex-row items-center px-4 py-3 border-b border-border ${
          isCurrentUser ? "bg-primary bg-opacity-10" : ""
        }`}
      >
        <Text className="w-12 text-base font-bold text-foreground text-center">{item.position}º</Text>
        <View className="flex-1 gap-1">
          <Text className={`text-base font-semibold ${isCurrentUser ? "text-primary" : "text-foreground"}`}>
            {item.userName}
            {isCurrentUser && " (Você)"}
          </Text>
          <Text className="text-xs text-muted">
            Grupos: {item.groupPoints} | Mata-Mata: {item.knockoutPoints}
          </Text>
        </View>
        <Text className="text-lg font-bold text-primary">{item.totalPoints}</Text>
      </View>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="bg-primary rounded-lg p-6 gap-2">
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
