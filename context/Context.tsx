"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

interface UserContextType {
  currentUser: User | null;
  fetchUserInfo: () => Promise<void>;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUserInfo = useCallback(async () => {
    const supabase = await createClient();

    if (!supabase) {
      console.error("Supabase client is not initialized!");
      return;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
      return;
    }

    if (!user) {
      console.warn("No user found (not authenticated)");
      return;
    }

    setCurrentUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, fetchUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
