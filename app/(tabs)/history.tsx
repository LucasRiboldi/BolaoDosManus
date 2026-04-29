import { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, FlatList, Alert } from "react-native";
import { useAuth } from "@/lib/auth-context";
import { useFirestore } from "@/hooks/use-firestore";
import { GroupBet, KnockoutBet } from "@/lib/types";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type BetType = "group" | "knockout";

export default function HistoryScreen() {
  const { appUser } = useAuth();
  const { getUserBets } = useFirestore();
  const [groupBets, setGroupBets] = useState<GroupBet[]>([]);
  const [knockoutBets, setKnockoutBets] = useState<KnockoutBet[]>([]);
  const [selectedTab, setSelectedTab] = useState<BetType>("group");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appUser) return;
    loadBets();
  }, [appUser]);

  const loadBets = async () => {
    try {
      setLoading(true);
      const groupData = await getUserBets(appUser?.id || "", "group");
      const knockoutData = await getUserBets(appUser?.id || "", "knockout");

      setGroupBets(groupData as GroupBet[]);
      setKnockoutBets(knockoutData as KnockoutBet[]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar histórico de apostas");
    } finally {
      setLoading(false);
    }
  };

  const calculateGroupBetStatus = (bet: GroupBet) => {
    if (!bet.points) return { status: "pending", label: "Pendente", color: "text-warning" };
    if (bet.points === 10) return { status: "perfect", label: "Acerto Exato!", color: "text-success" };
    if (bet.points === 5) return { status: "partial", label: "Acerto Parcial", color: "text-primary" };
    return { status: "wrong", label: "Errou", color: "text-error" };
  };

  const calculateKnockoutBetStatus = (bet: KnockoutBet) => {
    if (!bet.points) return { status: "pending", label: "Pendente", color: "text-warning" };
    if (bet.points === 10) return { status: "correct", label: "Acertou!", color: "text-success" };
    return { status: "wrong", label: "Errou", color: "text-error" };
  };

  const renderGroupBet = ({ item }: { item: any }) => {
    const status = calculateGroupBetStatus(item);

    return (
      <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2">
            <MaterialIcons
              name={
                status.status === "perfect"
                  ? "check-circle"
                  : status.status === "partial"
                    ? "info"
                    : status.status === "pending"
                      ? "schedule"
                      : "cancel"
              }
              size={20}
              color={
                status.status === "perfect"
                  ? "#22C55E"
                  : status.status === "partial"
                    ? "#0a7ea4"
                    : status.status === "pending"
                      ? "#F59E0B"
                      : "#EF4444"
              }
            />
            <Text className={`font-semibold ${status.color}`}>{status.label}</Text>
          </View>
          <Text className="text-lg font-bold text-primary">{item.points || 0} pts</Text>
        </View>

        <View className="flex-row items-center justify-between gap-2 mb-3">
          <View className="flex-1 items-center">
            <Text className="text-2xl mb-1">🏠</Text>
            <Text className="text-xs text-muted text-center">Sua aposta</Text>
            <Text className="text-lg font-bold text-foreground">{item.homeGoals}</Text>
          </View>

          <View className="items-center">
            <Text className="text-lg font-bold text-muted">vs</Text>
          </View>

          <View className="flex-1 items-center">
            <Text className="text-2xl mb-1">✈️</Text>
            <Text className="text-xs text-muted text-center">Sua aposta</Text>
            <Text className="text-lg font-bold text-foreground">{item.awayGoals}</Text>
          </View>
        </View>

        <View className="border-t border-border pt-2">
          <Text className="text-xs text-muted">
            Partida ID: {item.matchId}
          </Text>
          <Text className="text-xs text-muted">
            {new Date(item.createdAt).toLocaleDateString("pt-BR")} às{" "}
            {new Date(item.createdAt).toLocaleTimeString("pt-BR")}
          </Text>
        </View>
      </View>
    );
  };

  const renderKnockoutBet = ({ item }: { item: any }) => {
    const status = calculateKnockoutBetStatus(item);

    return (
      <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2">
            <MaterialIcons
              name={status.status === "correct" ? "check-circle" : status.status === "pending" ? "schedule" : "cancel"}
              size={20}
              color={status.status === "correct" ? "#22C55E" : status.status === "pending" ? "#F59E0B" : "#EF4444"}
            />
            <Text className={`font-semibold ${status.color}`}>{status.label}</Text>
          </View>
          <Text className="text-lg font-bold text-primary">{item.points || 0} pts</Text>
        </View>

        <View className="bg-background rounded p-3 mb-3">
          <Text className="text-sm text-muted mb-1">Seu palpite:</Text>
          <Text className="text-lg font-bold text-foreground">{item.winnerTeam}</Text>
        </View>

        <View className="border-t border-border pt-2">
          <Text className="text-xs text-muted">
            Partida ID: {item.matchId}
          </Text>
          <Text className="text-xs text-muted">
            {new Date(item.createdAt).toLocaleDateString("pt-BR")} às{" "}
            {new Date(item.createdAt).toLocaleTimeString("pt-BR")}
          </Text>
        </View>
      </View>
    );
  };

  const displayBets = selectedTab === "group" ? groupBets : knockoutBets;
  const totalPoints =
    selectedTab === "group"
      ? groupBets.reduce((sum, bet) => sum + (bet.points || 0), 0)
      : knockoutBets.reduce((sum, bet) => sum + (bet.points || 0), 0);

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4 p-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">📋 Histórico</Text>
            <Text className="text-sm text-muted">Revise suas apostas e pontos</Text>
          </View>

          {/* Tab Selector */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              className={`flex-1 py-3 rounded-lg items-center ${
                selectedTab === "group" ? "bg-primary" : "bg-surface border border-border"
              }`}
              onPress={() => setSelectedTab("group")}
            >
              <Text
                className={`font-semibold ${selectedTab === "group" ? "text-background" : "text-foreground"}`}
              >
                Grupos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-3 rounded-lg items-center ${
                selectedTab === "knockout" ? "bg-primary" : "bg-surface border border-border"
              }`}
              onPress={() => setSelectedTab("knockout")}
            >
              <Text
                className={`font-semibold ${selectedTab === "knockout" ? "text-background" : "text-foreground"}`}
              >
                Mata-Mata
              </Text>
            </TouchableOpacity>
          </View>

          {/* Points Summary */}
          <View className="bg-primary rounded-lg p-4 gap-2">
            <Text className="text-sm text-background opacity-80">
              Pontos em {selectedTab === "group" ? "Grupos" : "Mata-Mata"}
            </Text>
            <Text className="text-3xl font-bold text-background">{totalPoints}</Text>
          </View>

          {/* Bets List */}
          {loading ? (
            <View className="items-center justify-center py-8">
              <Text className="text-sm text-muted">Carregando histórico...</Text>
            </View>
          ) : displayBets.length > 0 ? (
            <FlatList
              data={displayBets}
              renderItem={selectedTab === "group" ? renderGroupBet : renderKnockoutBet}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-sm text-muted">
                Nenhuma aposta em {selectedTab === "group" ? "Grupos" : "Mata-Mata"}
              </Text>
            </View>
          )}

          {/* Info Card */}
          <View className="bg-surface rounded-lg p-4 gap-2 border border-border">
            <Text className="text-sm font-semibold text-foreground">📊 Legenda</Text>
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="check-circle" size={16} color="#22C55E" />
                <Text className="text-xs text-foreground">Acerto Exato (10 pts)</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="info" size={16} color="#0a7ea4" />
                <Text className="text-xs text-foreground">Acerto Parcial (5 pts)</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="schedule" size={16} color="#F59E0B" />
                <Text className="text-xs text-foreground">Pendente (aguardando resultado)</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="cancel" size={16} color="#EF4444" />
                <Text className="text-xs text-foreground">Errou (0 pts)</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
