import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { db } from "@/lib/firebase";
import { collection, addDoc, writeBatch, doc } from "firebase/firestore";

const ADMIN_EMAILS = ["admin@bolao.com", "seu-email@gmail.com"]; // Adicione emails de admin

export default function AdminScreen() {
  const { appUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  // Verificar se é admin
  if (!appUser || !ADMIN_EMAILS.includes(appUser.email)) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-error font-semibold">Acesso Negado</Text>
        <Text className="text-sm text-muted mt-2">Apenas administradores podem acessar esta página</Text>
        <TouchableOpacity
          className="mt-6 bg-primary px-6 py-3 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-background font-semibold">Voltar</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  /**
   * Seleciona e processa arquivo JSON
   */
  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
      });

      if (!result.canceled && result.assets[0]) {
        const fileUri = result.assets[0].uri;
        await processJsonFile(fileUri);
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao selecionar arquivo");
    }
  };

  /**
   * Processa arquivo JSON e importa para Firestore
   */
  const processJsonFile = async (fileUri: string) => {
    try {
      setLoading(true);
      setUploadStatus("Lendo arquivo...");

      // Ler arquivo
      const response = await fetch(fileUri);
      const jsonData = await response.json();

      // Validar estrutura do JSON
      if (!jsonData.matches || !Array.isArray(jsonData.matches)) {
        throw new Error("JSON inválido: esperado campo 'matches' com array de partidas");
      }

      setUploadStatus(`Importando ${jsonData.matches.length} partidas...`);

      // Usar batch para importar múltiplos documentos
      const batch = writeBatch(db);
      const matchesRef = collection(db, "matches");

      jsonData.matches.forEach((match: any, index: number) => {
        const docRef = doc(matchesRef);
        batch.set(docRef, {
          id: match.id || `match_${Date.now()}_${index}`,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          homeTeamFlag: match.homeTeamFlag,
          awayTeamFlag: match.awayTeamFlag,
          homeGoals: match.homeGoals || null,
          awayGoals: match.awayGoals || null,
          date: new Date(match.date),
          group: match.group,
          status: match.status || "scheduled",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      await batch.commit();

      setUploadStatus("✅ Importação concluída!");
      Alert.alert("Sucesso", `${jsonData.matches.length} partidas importadas com sucesso!`);

      // Limpar status após 2 segundos
      setTimeout(() => setUploadStatus(""), 2000);
    } catch (error: any) {
      const errorMessage = error.message || "Erro ao processar arquivo";
      setUploadStatus(`❌ ${errorMessage}`);
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Exemplo de JSON para download
   */
  const downloadJsonExample = () => {
    const example = {
      matches: [
        {
          id: "match_1",
          homeTeam: "Brasil",
          awayTeam: "Sérvia",
          homeTeamFlag: "🇧🇷",
          awayTeamFlag: "🇷🇸",
          homeGoals: null,
          awayGoals: null,
          date: "2026-06-20T20:00:00Z",
          group: "A",
          status: "scheduled",
        },
        {
          id: "match_2",
          homeTeam: "Argentina",
          awayTeam: "México",
          homeTeamFlag: "🇦🇷",
          awayTeamFlag: "🇲🇽",
          homeGoals: 2,
          awayGoals: 1,
          date: "2026-06-20T23:00:00Z",
          group: "A",
          status: "finished",
        },
      ],
    };

    const jsonString = JSON.stringify(example, null, 2);
    Alert.alert(
      "Exemplo de JSON",
      jsonString,
      [
        {
          text: "Copiar",
          onPress: () => {
            // Copiar para clipboard
            console.log("JSON copiado");
          },
        },
        { text: "Fechar", onPress: () => {} },
      ]
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 p-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Painel Admin</Text>
            <Text className="text-sm text-muted">Gerenciar dados das partidas</Text>
          </View>

          {/* Admin Info */}
          <View className="bg-primary rounded-lg p-4 gap-2">
            <Text className="text-sm text-background opacity-80">Usuário Admin</Text>
            <Text className="text-lg font-bold text-background">{appUser?.name}</Text>
            <Text className="text-sm text-background opacity-80">{appUser?.email}</Text>
          </View>

          {/* Upload Section */}
          <View className="bg-surface rounded-lg p-6 gap-4 border border-border">
            <View className="gap-2">
              <Text className="text-lg font-semibold text-foreground">Upload de Dados</Text>
              <Text className="text-sm text-muted">
                Importe um arquivo JSON com os dados das partidas da Copa 2026
              </Text>
            </View>

            {/* Upload Button */}
            <TouchableOpacity
              className={`${loading ? "bg-primary opacity-60" : "bg-primary"} rounded-lg py-4 items-center`}
              onPress={handlePickFile}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-base font-semibold text-background">
                  📁 Selecionar Arquivo JSON
                </Text>
              )}
            </TouchableOpacity>

            {/* Status */}
            {uploadStatus && (
              <View className="bg-background rounded p-3 border border-border">
                <Text className="text-sm text-foreground text-center">{uploadStatus}</Text>
              </View>
            )}
          </View>

          {/* JSON Format Section */}
          <View className="bg-surface rounded-lg p-6 gap-4 border border-border">
            <View className="gap-2">
              <Text className="text-lg font-semibold text-foreground">Formato do JSON</Text>
              <Text className="text-sm text-muted">
                O arquivo deve conter um array de partidas com os seguintes campos:
              </Text>
            </View>

            {/* Fields List */}
            <View className="gap-2 bg-background rounded p-3">
              <Text className="text-xs font-mono text-foreground">id: string (único)</Text>
              <Text className="text-xs font-mono text-foreground">homeTeam: string</Text>
              <Text className="text-xs font-mono text-foreground">awayTeam: string</Text>
              <Text className="text-xs font-mono text-foreground">homeTeamFlag: string (emoji)</Text>
              <Text className="text-xs font-mono text-foreground">awayTeamFlag: string (emoji)</Text>
              <Text className="text-xs font-mono text-foreground">homeGoals: number | null</Text>
              <Text className="text-xs font-mono text-foreground">awayGoals: number | null</Text>
              <Text className="text-xs font-mono text-foreground">date: ISO 8601 string</Text>
              <Text className="text-xs font-mono text-foreground">group: string (A-H)</Text>
              <Text className="text-xs font-mono text-foreground">status: "scheduled" | "finished"</Text>
            </View>

            {/* Example Button */}
            <TouchableOpacity
              className="border border-primary rounded-lg py-3 items-center"
              onPress={downloadJsonExample}
            >
              <Text className="text-sm font-semibold text-primary">Ver Exemplo de JSON</Text>
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <View className="bg-warning bg-opacity-10 rounded-lg p-4 gap-2 border border-warning">
            <Text className="text-sm font-semibold text-warning">⚠️ Instruções Importantes</Text>
            <Text className="text-xs text-foreground leading-relaxed">
              • Certifique-se de que o JSON está bem formatado{"\n"}
              • Use IDs únicos para cada partida{"\n"}
              • Datas devem estar no formato ISO 8601{"\n"}
              • Gols podem ser null se a partida não terminou{"\n"}
              • Grupos devem ser A-H para fase de grupos
            </Text>
          </View>

          {/* Footer */}
          <TouchableOpacity
            className="border border-primary rounded-lg py-3 items-center mt-4"
            onPress={() => router.back()}
          >
            <Text className="text-sm font-semibold text-primary">Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
