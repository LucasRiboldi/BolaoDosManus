import { Share } from "react-native";
import * as Linking from "expo-linking";
import { RankingEntry } from "@/lib/types";

/**
 * Serviço de compartilhamento em redes sociais
 */

export class SharingService {
  /**
   * Compartilha ranking no WhatsApp
   */
  static async shareToWhatsApp(user: RankingEntry, allRanking: RankingEntry[]) {
    try {
      const topPlayers = allRanking.slice(0, 5);
      const topText = topPlayers
        .map((p, i) => `${i + 1}. ${p.userName} - ${p.totalPoints}pts`)
        .join("\n");

      const message = `🏆 *Bolão Copa 2026* 🏆\n\n` +
        `Estou em *${user.position}º lugar* com *${user.totalPoints} pontos*!\n\n` +
        `*Top 5 do Ranking:*\n${topText}\n\n` +
        `Você também quer competir? Baixe o app e faça suas apostas! ⚽`;

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      await Linking.openURL(whatsappUrl);
    } catch (error) {
      console.error("Erro ao compartilhar no WhatsApp:", error);
      throw error;
    }
  }

  /**
   * Compartilha ranking no Instagram (via stories)
   */
  static async shareToInstagram(user: RankingEntry) {
    try {
      const message = `🏆 Estou em ${user.position}º lugar no Bolão Copa 2026 com ${user.totalPoints} pontos! ⚽ #BolaoCopa2026 #Copa2026`;

      const instagramUrl = `instagram://share?text=${encodeURIComponent(message)}`;
      
      // Tentar abrir Instagram
      try {
        await Linking.openURL(instagramUrl);
      } catch {
        // Se Instagram não estiver instalado, usar Share nativo
        await Share.share({
          message,
          title: "Bolão Copa 2026",
        });
      }
    } catch (error) {
      console.error("Erro ao compartilhar no Instagram:", error);
      throw error;
    }
  }

  /**
   * Compartilha ranking via Share nativo (iOS/Android)
   */
  static async shareRanking(user: RankingEntry, allRanking: RankingEntry[]) {
    try {
      const topPlayers = allRanking.slice(0, 5);
      const topText = topPlayers
        .map((p, i) => `${i + 1}. ${p.userName} - ${p.totalPoints}pts`)
        .join("\n");

      const message = `🏆 Bolão Copa 2026 🏆\n\n` +
        `Estou em ${user.position}º lugar com ${user.totalPoints} pontos!\n\n` +
        `Top 5 do Ranking:\n${topText}\n\n` +
        `Baixe o app e compete comigo! ⚽`;

      await Share.share({
        message,
        title: "Bolão Copa 2026",
        url: "https://bolao-copa-2026.app", // URL do seu app
      });
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      throw error;
    }
  }

  /**
   * Gera link de convite para amigos
   */
  static generateInviteLink(userId: string): string {
    const deepLink = `bolao-copa-2026://invite?user=${userId}`;
    return deepLink;
  }

  /**
   * Compartilha convite para amigos
   */
  static async shareInvite(userName: string, userId: string) {
    try {
      const inviteLink = this.generateInviteLink(userId);
      const message = `🎉 ${userName} te convidou para o Bolão Copa 2026! ⚽\n\n` +
        `Compete com seus amigos e suba no ranking!\n\n` +
        `${inviteLink}`;

      await Share.share({
        message,
        title: "Convite - Bolão Copa 2026",
      });
    } catch (error) {
      console.error("Erro ao compartilhar convite:", error);
      throw error;
    }
  }

  /**
   * Compartilha resultado de uma partida
   */
  static async shareMatchResult(
    homeTeam: string,
    awayTeam: string,
    homeGoals: number,
    awayGoals: number,
    userBet: { homeGoals: number; awayGoals: number },
    points: number
  ) {
    try {
      const isCorrect = userBet.homeGoals === homeGoals && userBet.awayGoals === awayGoals;
      const emoji = isCorrect ? "✅" : "❌";

      const message = `${emoji} Resultado: ${homeTeam} ${homeGoals} x ${awayGoals} ${awayTeam}\n\n` +
        `Minha aposta: ${userBet.homeGoals} x ${userBet.awayGoals}\n` +
        `Pontos ganhos: ${points} 🎯\n\n` +
        `Bolão Copa 2026 ⚽`;

      await Share.share({
        message,
        title: "Resultado - Bolão Copa 2026",
      });
    } catch (error) {
      console.error("Erro ao compartilhar resultado:", error);
      throw error;
    }
  }

  /**
   * Abre WhatsApp com mensagem pré-preenchida
   */
  static async openWhatsAppChat(phoneNumber: string, message: string) {
    try {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      await Linking.openURL(url);
    } catch (error) {
      console.error("Erro ao abrir WhatsApp:", error);
      throw error;
    }
  }

  /**
   * Abre Instagram profile
   */
  static async openInstagramProfile(username: string) {
    try {
      const url = `https://www.instagram.com/${username}`;
      await Linking.openURL(url);
    } catch (error) {
      console.error("Erro ao abrir Instagram:", error);
      throw error;
    }
  }
}
