"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { Session, type User } from "@supabase/supabase-js";

interface UserContextType {
  currentUser: User | null;
  currentSession: Session | null;
  loading: boolean;
  error: string | null;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = await createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (error) throw error;

      setCurrentSession(session);
      setCurrentUser(user);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch user", err.message);
      setCurrentUser(null);
      setCurrentSession(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const supabase = createClient();

    fetchUserInfo();

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Small delay to let router.push() or page navigation finish first
        setTimeout(() => {
          setCurrentSession(session);
          setCurrentUser(session?.user ?? null);
        }, 300);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchUserInfo]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentSession,
        loading,
        error,
        refetchUser: fetchUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useAuthContext must be used within a UserProvider");
  return context;
};
