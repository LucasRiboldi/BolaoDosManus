import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useFirestore } from "@/hooks/use-firestore";
import { User } from "@/lib/types";

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  appUser: User | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getUser } = useFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setFirebaseUser(user);
        if (user) {
          const userData = await getUser(user.uid);
          setAppUser(userData);
        } else {
          setAppUser(null);
        }
      } catch (err: any) {
        setError(err.message || "Erro ao carregar usuário");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [getUser]);

  return (
    <AuthContext.Provider value={{ firebaseUser, appUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
