"use client";
import { useAuthContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentSession, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentSession) {
      router.replace("/");
    }
  }, [loading, currentSession, router]);

  if (loading) return <div>Loading...</div>;
  if (!currentSession) return null;

  return <>{children}</>;
}
