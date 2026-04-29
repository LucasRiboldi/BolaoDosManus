import { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, FlatList, Alert } from "react-native";
import { useAuth } from "@/lib/auth-context";
import { useFirestore } from "@/hooks/use-firestore";
import { KNOCKOUT_BRACKET } from "@/lib/world-cup-data";
import { KnockoutBet, KnockoutMatch } from "@/lib/types";
import { ScreenContainer } from "@/components/screen-container";

const ROUND_NAMES: Record<string, string> = {
  round32: "Rodada de 32",
  round16: "Oitavas de Final",
  quarterfinal: "Quartas de Final",
  semifinal: "Semifinais",
  final: "Final",
};

const ROUND_ORDER = ["round32", "round16", "quarterfinal", "semifinal", "final"];

export default function KnockoutScreen() {
  const { appUser } = useAuth();
  const { saveBet, getUserBets } = useFirestore();
  const [selectedRound, setSelectedRound] = useState("round32");
  const [bets, setBets] = useState<Record<string, string>>({});
  const [userBets, setUserBets] = useState<KnockoutBet[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!appUser) return;
    loadUserBets();
  }, [appUser]);

  const loadUserBets = async () => {
    if (!appUser) return;
    try {
      const userKnockoutBets = await getUserBets(appUser.id, "knockout");
      setUserBets(userKnockoutBets as KnockoutBet[]);

      // Populate bets state
      const betsMap: Record<string, string> = {};
      userKnockoutBets.forEach((bet: any) => {
        betsMap[bet.matchId] = bet.winnerTeam || "";
      });
      setBets(betsMap);
    } catch (error) {
      console.error("Erro ao carregar apostas:", error);
    }
  };

  const handleBetChange = (matchId: string, team: string) => {
    setBets((prev) => ({
      ...prev,
      [matchId]: prev[matchId] === team ? "" : team,
    }));
  };

  const handleSaveBet = async (match: KnockoutMatch) => {
    if (!appUser) return;

    const selectedTeam = bets[match.id];
    if (!selectedTeam) {
      Alert.alert("Erro", "Por favor, escolha um time");
      return;
    }

    try {
      setLoading(true);
      const knockoutBet: KnockoutBet = {
        id: `${appUser.id}_${match.id}`,
        userId: appUser.id,
        matchId: match.id,
        winnerTeam: selectedTeam,
        createdAt: new Date(),
        updatedAt: new Date(),
        confirmed: true,
      };

      await saveBet(knockoutBet);
      Alert.alert("Sucesso", "Aposta salva com sucesso!");
      loadUserBets();
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar aposta");
    } finally {
      setLoading(false);
    }
  };

  const matches = KNOCKOUT_BRACKET[selectedRound] || [];

  const renderMatchCard = ({ item: match }: { item: KnockoutMatch }) => {
    const selectedTeam = bets[match.id];
    const existingBet = userBets.find((b) => b.matchId === match.id);

    // Mock teams for display (in a real app, these would come from the bracket)
    const mockTeams = [
      { name: "Brasil", flag: "🇧🇷" },
      { name: "Argentina", flag: "🇦🇷" },
      { name: "França", flag: "🇫🇷" },
      { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { name: "Alemanha", flag: "🇩🇪" },
      { name: "Espanha", flag: "🇪🇸" },
      { name: "Itália", flag: "🇮🇹" },
      { name: "Holanda", flag: "🇳🇱" },
    ];

    return (
      <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
        {/* Match Header */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-xs text-muted">Partida {match.matchNumber}</Text>
          {existingBet && <Text className="text-xs bg-success text-background px-2 py-1 rounded">Confirmada</Text>}
        </View>

        {/* Team Selection */}
        <View className="gap-2">
          {mockTeams.slice(0, 2).map((team, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center p-3 rounded border-2 ${
                selectedTeam === team.name
                  ? "border-primary bg-primary bg-opacity-10"
                  : "border-border bg-background"
              }`}
              onPress={() => handleBetChange(match.id, team.name)}
              disabled={loading}
            >
              <Text className="text-2xl mr-3">{team.flag}</Text>
              <Text className={`flex-1 font-semibold ${selectedTeam === team.name ? "text-primary" : "text-foreground"}`}>
                {team.name}
              </Text>
              {selectedTeam === team.name && <Text className="text-lg text-primary">✓</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className={`${loading ? "bg-primary opacity-60" : "bg-primary"} rounded py-2 items-center mt-3`}
          onPress={() => handleSaveBet(match)}
          disabled={loading || !selectedTeam}
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
            <Text className="text-2xl font-bold text-foreground">Mata-Mata</Text>
            <Text className="text-sm text-muted">Escolha o time que passa de fase!</Text>
          </View>

          {/* Round Selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2 -mx-4 px-4">
            <View className="flex-row gap-2">
              {ROUND_ORDER.map((round) => (
                <TouchableOpacity
                  key={round}
                  className={`px-3 py-2 rounded-full whitespace-nowrap ${
                    selectedRound === round ? "bg-primary" : "bg-surface border border-border"
                  }`}
                  onPress={() => setSelectedRound(round)}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedRound === round ? "text-background" : "text-foreground"
                    }`}
                  >
                    {ROUND_NAMES[round]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Matches List */}
          {matches.length > 0 ? (
            <FlatList
              data={matches}
              renderItem={renderMatchCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-base text-muted">Nenhuma partida nesta fase</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
