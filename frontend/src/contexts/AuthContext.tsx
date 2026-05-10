import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import api, { tokenStorage } from "@/lib/api";

export type UserRole = "admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

function normalizeRole(role: string): UserRole {
  const lower = role.toLowerCase().replace(/^role_/, "");
  if (lower === "admin" || lower === "teacher" || lower === "student") {
    return lower as UserRole;
  }
  return "student";
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = tokenStorage.getAccess();
    if (!token) return;

    const payload = decodeJwtPayload(token);
    if (!payload) {
      tokenStorage.clear();
      return;
    }

    const exp = payload.exp as number | undefined;
    if (exp && Date.now() / 1000 >= exp) {
      tokenStorage.clear();
      return;
    }

    const username = (payload.sub as string) ?? "";
    const role = normalizeRole((payload.role as string) ?? "student");
    setUser({ id: username, name: username, role });
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const { data } = await api.post("/auth/login", {
      identifier: username,
      password,
    });

    const { accessToken, refreshToken, role } = data.data;
    tokenStorage.save(accessToken, refreshToken);

    setUser({
      id: username,
      name: username,
      role: normalizeRole(role),
    });

    return true;
  }, []);

  const logout = useCallback(() => {
    api.post("/auth/logout").catch(() => {});
    tokenStorage.clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
