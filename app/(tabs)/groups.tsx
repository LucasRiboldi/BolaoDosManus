import { useState, useEffect } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { useAuth } from "@/lib/auth-context";
import { useFirestore } from "@/hooks/use-firestore";
import { GROUPS } from "@/lib/world-cup-data";
import { GroupBet, Match } from "@/lib/types";
import { ScreenContainer } from "@/components/screen-container";

export default function GroupsScreen() {
  const { appUser } = useAuth();
  const { saveBet, getUserBets } = useFirestore();
  const [selectedGroup, setSelectedGroup] = useState("A");
  const [bets, setBets] = useState<Record<string, { home: string; away: string }>>({});
  const [userBets, setUserBets] = useState<GroupBet[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!appUser) return;
    loadUserBets();
  }, [appUser]);

  const loadUserBets = async () => {
    if (!appUser) return;
    try {
      const userGroupBets = await getUserBets(appUser.id, "group");
      setUserBets(userGroupBets as GroupBet[]);

      // Populate bets state
      const betsMap: Record<string, { home: string; away: string }> = {};
      userGroupBets.forEach((bet: any) => {
        betsMap[bet.matchId] = {
          home: bet.homeGoals?.toString() || "",
          away: bet.awayGoals?.toString() || "",
        };
      });
      setBets(betsMap);
    } catch (error) {
      console.error("Erro ao carregar apostas:", error);
    }
  };

  const handleBetChange = (matchId: string, team: "home" | "away", value: string) => {
    setBets((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [team]: value,
      },
    }));
  };

  const handleSaveBet = async (match: Match) => {
    if (!appUser) return;

    const bet = bets[match.id];
    if (!bet || bet.home === "" || bet.away === "") {
      Alert.alert("Erro", "Por favor, preencha os gols de ambos os times");
      return;
    }

    try {
      setLoading(true);
      const groupBet: GroupBet = {
        id: `${appUser.id}_${match.id}`,
        userId: appUser.id,
        matchId: match.id,
        homeGoals: parseInt(bet.home),
        awayGoals: parseInt(bet.away),
        createdAt: new Date(),
        updatedAt: new Date(),
        confirmed: true,
      };

      await saveBet(groupBet);
      Alert.alert("Sucesso", "Aposta salva com sucesso!");
      loadUserBets();
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar aposta");
    } finally {
      setLoading(false);
    }
  };

  const group = GROUPS[selectedGroup];
  const matches = group.matches;

  const renderMatchCard = ({ item: match }: { item: Match }) => {
    const bet = bets[match.id] || { home: "", away: "" };
    const existingBet = userBets.find((b) => b.matchId === match.id);

    return (
      <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
        {/* Match Header */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-xs text-muted">
            {new Date(match.date).toLocaleDateString("pt-BR")}
          </Text>
          {existingBet && <Text className="text-xs bg-success text-background px-2 py-1 rounded">Confirmada</Text>}
        </View>

        {/* Teams */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1 items-center">
            <Text className="text-2xl mb-1">{match.homeTeamFlag}</Text>
            <Text className="text-sm font-semibold text-foreground text-center">{match.homeTeam}</Text>
          </View>

          <Text className="text-lg font-bold text-muted mx-2">vs</Text>

          <View className="flex-1 items-center">
            <Text className="text-2xl mb-1">{match.awayTeamFlag}</Text>
            <Text className="text-sm font-semibold text-foreground text-center">{match.awayTeam}</Text>
          </View>
        </View>

        {/* Score Input */}
        <View className="flex-row items-center gap-2 mb-4">
          <TextInput
            className="flex-1 bg-background border border-border rounded px-3 py-2 text-foreground text-center"
            placeholder="0"
            keyboardType="numeric"
            value={bet.home}
            onChangeText={(value) => handleBetChange(match.id, "home", value)}
            maxLength={2}
            editable={!loading}
          />
          <Text className="text-lg font-bold text-foreground">-</Text>
          <TextInput
            className="flex-1 bg-background border border-border rounded px-3 py-2 text-foreground text-center"
            placeholder="0"
            keyboardType="numeric"
            value={bet.away}
            onChangeText={(value) => handleBetChange(match.id, "away", value)}
            maxLength={2}
            editable={!loading}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className={`${loading ? "bg-primary opacity-60" : "bg-primary"} rounded py-2 items-center`}
          onPress={() => handleSaveBet(match)}
          disabled={loading}
        >
          <Text className="text-sm font-semibold text-background">
            {existingBet ? "Atualizar" : "Confirmar Aposta"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4 p-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Fase de Grupos</Text>
            <Text className="text-sm text-muted">Acerte o placar e ganhe pontos!</Text>
          </View>

          {/* Group Selector */}
          <View className="flex-row gap-2 flex-wrap">
            {Object.keys(GROUPS).map((groupName) => (
              <TouchableOpacity
                key={groupName}
                className={`px-4 py-2 rounded-full ${
                  selectedGroup === groupName ? "bg-primary" : "bg-surface border border-border"
                }`}
                onPress={() => setSelectedGroup(groupName)}
              >
                <Text
                  className={`font-semibold ${
                    selectedGroup === groupName ? "text-background" : "text-foreground"
                  }`}
                >
                  Grupo {groupName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Matches List */}
          <FlatList
            data={matches}
            renderItem={renderMatchCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
