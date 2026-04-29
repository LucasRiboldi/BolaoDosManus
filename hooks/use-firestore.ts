import { useCallback } from "react";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  QueryConstraint,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User, GroupBet, KnockoutBet, RankingEntry } from "@/lib/types";

export function useFirestore() {
  // User operations
  const createUser = useCallback(
    async (uid: string, email: string, name: string): Promise<User> => {
      const userData: User = {
        id: uid,
        email,
        name,
        createdAt: new Date(),
        totalPoints: 0,
      };

      await setDoc(doc(db, "users", uid), {
        ...userData,
        createdAt: Timestamp.fromDate(userData.createdAt),
      });

      return userData;
    },
    []
  );

  const getUser = useCallback(async (uid: string): Promise<User | null> => {
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as User;
    }
    return null;
  }, []);

  // Bet operations
  const saveBet = useCallback(async (bet: GroupBet | KnockoutBet) => {
    const collectionName = "homeGoals" in bet ? "groupBets" : "knockoutBets";
    const betData = {
      ...bet,
      createdAt: Timestamp.fromDate(bet.createdAt),
      updatedAt: Timestamp.fromDate(bet.updatedAt),
    };

    await setDoc(doc(db, collectionName, bet.id), betData);
  }, []);

  const getUserBets = useCallback(
    async (userId: string, type: "group" | "knockout") => {
      const collectionName = type === "group" ? "groupBets" : "knockoutBets";
      const q = query(collection(db, collectionName), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      });
    },
    []
  );

  // Ranking operations
  const getRanking = useCallback(async (): Promise<RankingEntry[]> => {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const ranking: RankingEntry[] = [];

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      ranking.push({
        userId: userDoc.id,
        userName: userData.name,
        totalPoints: userData.totalPoints || 0,
        groupPoints: userData.groupPoints || 0,
        knockoutPoints: userData.knockoutPoints || 0,
        position: 0,
      });
    }

    // Sort by total points descending
    ranking.sort((a, b) => b.totalPoints - a.totalPoints);

    // Assign positions
    ranking.forEach((entry, index) => {
      entry.position = index + 1;
    });

    return ranking;
  }, []);

  // Subscribe to real-time updates
  const subscribeToRanking = useCallback((callback: (ranking: RankingEntry[]) => void) => {
    return onSnapshot(collection(db, "users"), (snapshot) => {
      const ranking: RankingEntry[] = [];

      snapshot.docs.forEach((doc) => {
        const userData = doc.data();
        ranking.push({
          userId: doc.id,
          userName: userData.name,
          totalPoints: userData.totalPoints || 0,
          groupPoints: userData.groupPoints || 0,
          knockoutPoints: userData.knockoutPoints || 0,
          position: 0,
        });
      });

      // Sort by total points descending
      ranking.sort((a, b) => b.totalPoints - a.totalPoints);

      // Assign positions
      ranking.forEach((entry, index) => {
        entry.position = index + 1;
      });

      callback(ranking);
    });
  }, []);

  const updateUserPoints = useCallback(async (userId: string, points: number) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const currentPoints = userDoc.data().totalPoints || 0;
      await updateDoc(userRef, {
        totalPoints: currentPoints + points,
      });
    }
  }, []);

  return {
    createUser,
    getUser,
    saveBet,
    getUserBets,
    getRanking,
    subscribeToRanking,
    updateUserPoints,
  };
}
