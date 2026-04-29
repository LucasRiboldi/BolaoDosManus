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
        className={`flex-row items-center px-4 py-4 border-b border-white/10 ${
          isMedalist ? "bg-yellow-400/5" : ""
        } ${
          isCurrentUser ? "bg-blue-400/10 border-l-4 border-l-yellow-400" : ""
        }`}
      >
        {/* Badge/Position */}
        <View className="w-14 items-center justify-center">
          {badge ? (
            <Text className="text-3xl">{badge}</Text>
          ) : (
            <View className="bg-white/10 rounded-full w-10 h-10 items-center justify-center">
              <Text className="text-sm font-bold text-white">{item.position}</Text>
            </View>
          )}
        </View>

        {/* User Info */}
        <View className="flex-1 gap-1 ml-2">
          <Text className={`text-base font-semibold ${
            isCurrentUser ? "text-yellow-400" : isMedalist ? "text-yellow-300" : "text-white"
          }`}>
            {item.userName}
            {isCurrentUser && " (Você)"}
          </Text>
          <View className="flex-row gap-3">
            <Text className="text-xs text-blue-200">
              ⚽ {item.groupPoints}
            </Text>
            <Text className="text-xs text-blue-200">
              🏆 {item.knockoutPoints}
            </Text>
          </View>
        </View>

        {/* Points */}
        <View className="items-center">
          <Text className="text-2xl font-bold text-yellow-400">{item.totalPoints}</Text>
          <Text className="text-xs text-blue-200 mt-1">pts</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer containerClassName="bg-gradient-to-b from-blue-600 to-blue-900">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header com Saudação */}
          <View className="px-6 pt-6">
            <View className="flex-row justify-between items-start mb-4">
              <View>
                <Text className="text-sm text-blue-200">Bem-vindo de volta,</Text>
                <Text className="text-3xl font-bold text-white mt-1">{appUser?.name?.split(' ')[0]}</Text>
              </View>
              <View className="w-10" />
            </View>

            {/* Card de Posição */}
            {userPosition > 0 && (
              <View className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl p-4 mb-2">
                <Text className="text-blue-900 text-xs font-semibold mb-2">SUA POSIÇÃO</Text>
                <View className="flex-row justify-between items-end">
                  <View>
                    <Text className="text-blue-900 text-sm">Posição</Text>
                    <Text className="text-4xl font-bold text-blue-900 mt-1">{userPosition}º</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-blue-900 text-sm">Pontos</Text>
                    <Text className="text-3xl font-bold text-blue-900 mt-1">
                      {ranking.find((r) => r.userId === appUser?.id)?.totalPoints || 0}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Share Buttons */}
            <View className="flex-row gap-2 mt-4">
              <TouchableOpacity
                className="flex-1 bg-white/10 border border-white/20 rounded-xl py-3 items-center flex-row justify-center gap-2"
                onPress={handleShareWhatsApp}
              >
                <Text className="text-lg">💬</Text>
                <Text className="text-xs font-semibold text-white">WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-white/10 border border-white/20 rounded-xl py-3 items-center flex-row justify-center gap-2"
                onPress={handleShareInstagram}
              >
                <Text className="text-lg">📸</Text>
                <Text className="text-xs font-semibold text-white">Instagram</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-white/10 border border-white/20 rounded-xl py-3 items-center flex-row justify-center gap-2"
                onPress={handleShareGeneral}
              >
                <MaterialIcons name="share" size={16} color="#fff" />
                <Text className="text-xs font-semibold text-white">Compartilhar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Ranking Section */}
          <View className="px-6">
            <Text className="text-2xl font-bold text-white mb-2">🏆 Ranking</Text>
            <Text className="text-sm text-blue-200">
              {ranking.length} apostadores competindo
            </Text>
          </View>

          {/* Ranking List */}
          {loading ? (
            <View className="items-center justify-center py-12">
              <Text className="text-base text-blue-200">Carregando ranking...</Text>
            </View>
          ) : ranking.length > 0 ? (
            <View className="mx-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <FlatList
                data={ranking}
                renderItem={renderRankingItem}
                keyExtractor={(item) => item.userId}
                scrollEnabled={false}
              />
            </View>
          ) : (
            <View className="items-center justify-center py-12 px-6">
              <Text className="text-lg text-blue-100 text-center font-semibold mb-2">
                Sem apostadores ainda
              </Text>
              <Text className="text-sm text-blue-200 text-center">
                Convide seus amigos para começar a competir!
              </Text>
            </View>
          )}

          {/* Info Card */}
          <View className="mx-6 bg-white/5 border border-white/10 rounded-2xl p-4 gap-3">
            <View className="flex-row gap-2 items-start">
              <Text className="text-2xl">⚽</Text>
              <View className="flex-1">
                <Text className="text-white font-semibold text-sm">Fase de Grupos</Text>
                <Text className="text-blue-200 text-xs mt-1">Acerte o placar para ganhar 10 pontos</Text>
              </View>
            </View>
            <View className="flex-row gap-2 items-start">
              <Text className="text-2xl">🏆</Text>
              <View className="flex-1">
                <Text className="text-white font-semibold text-sm">Mata-Mata</Text>
                <Text className="text-blue-200 text-xs mt-1">Escolha o vencedor para ganhar 5 pontos</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
