import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * Serviço de notificações push
 * Usa Expo Notifications que integra com Firebase Cloud Messaging
 */

export class NotificationsService {
  /**
   * Inicializa o serviço de notificações
   */
  static async initialize() {
    try {
      // Configurar comportamento das notificações
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });

      // Solicitar permissão no iOS
      if (Platform.OS === "ios") {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.warn("Permissão de notificações não concedida");
        }
      }

      // Solicitar permissão no Android
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      console.log("Notificações inicializadas");
    } catch (error) {
      console.error("Erro ao inicializar notificações:", error);
    }
  }

  /**
   * Obtém o token de notificação do dispositivo
   */
  static async getDeviceToken(): Promise<string | null> {
    try {
      const token = await Notifications.getExpoPushTokenAsync();
      return token.data;
    } catch (error) {
      console.error("Erro ao obter token de notificação:", error);
      return null;
    }
  }

  /**
   * Agenda uma notificação local
   */
  static async scheduleNotification(
    title: string,
    body: string,
    delayInSeconds: number,
    data?: Record<string, any>
  ) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
          sound: true,
          badge: 1,
        },
        trigger: {
          type: "time" as any,
          seconds: delayInSeconds,
        },
      });
    } catch (error) {
      console.error("Erro ao agendar notificação:", error);
    }
  }

  /**
   * Agenda notificação para 1 hora antes de uma partida
   */
  static async scheduleMatchReminder(
    matchId: string,
    homeTeam: string,
    awayTeam: string,
    matchDate: Date
  ) {
    try {
      const now = new Date();
      const oneHourBefore = new Date(matchDate.getTime() - 60 * 60 * 1000);

      // Só agendar se a notificação ainda não passou
      if (oneHourBefore > now) {
        const delayInSeconds = Math.floor(
          (oneHourBefore.getTime() - now.getTime()) / 1000
        );

        await this.scheduleNotification(
          "Partida começando em 1 hora! ⚽",
          `${homeTeam} vs ${awayTeam}`,
          delayInSeconds,
          { matchId, type: "match_reminder" }
        );

        console.log(`Notificação agendada para ${oneHourBefore}`);
      }
    } catch (error) {
      console.error("Erro ao agendar lembrete de partida:", error);
    }
  }

  /**
   * Envia notificação de resultado
   */
  static async notifyMatchResult(
    homeTeam: string,
    awayTeam: string,
    homeGoals: number,
    awayGoals: number
  ) {
    try {
      const result = homeGoals > awayGoals ? homeTeam : awayGoals > homeGoals ? awayTeam : "Empate";

      await this.scheduleNotification(
        "Resultado disponível! 📊",
        `${homeTeam} ${homeGoals} x ${awayGoals} ${awayTeam}`,
        2 // Notificação imediata (2 segundos)
      );
    } catch (error) {
      console.error("Erro ao notificar resultado:", error);
    }
  }

  /**
   * Envia notificação de mudança no ranking
   */
  static async notifyRankingChange(userName: string, newPosition: number, points: number) {
    try {
      await this.scheduleNotification(
        "Você subiu no ranking! 🎉",
        `${userName} agora está em ${newPosition}º lugar com ${points} pontos`,
        2
      );
    } catch (error) {
      console.error("Erro ao notificar mudança de ranking:", error);
    }
  }

  /**
   * Listener para notificações recebidas
   */
  static onNotificationReceived(callback: (notification: Notifications.Notification) => void) {
    return Notifications.addNotificationReceivedListener(callback);
  }

  /**
   * Listener para notificações respondidas (clicadas)
   */
  static onNotificationResponse(
    callback: (response: Notifications.NotificationResponse) => void
  ) {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }

  /**
   * Remove listener de notificação
   */
  static removeListener(subscription: Notifications.EventSubscription) {
    subscription.remove();
  }

  /**
   * Remove todas as notificações agendadas
   */
  static async clearAllNotifications() {
    try {
      await Notifications.dismissAllNotificationsAsync();
    } catch (error) {
      console.error("Erro ao limpar notificações:", error);
    }
  }
}
