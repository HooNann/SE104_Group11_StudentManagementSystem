import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);


const mockDatabase = [
  { id: "1", username: "admin", password: "123", name: "Bùi Nguyên Bảo", role: "admin", status: "ACTIVE" },
  { id: "2", username: "teacher", password: "123", name: "Nguyễn Văn Chiến", role: "teacher", status: "ACTIVE" },
  { id: "3", username: "student", password: "123", name: "Trần Nhật Duy", role: "student", status: "ACTIVE" },
  { id: "4", username: "badboy", password: "123", name: "Kẻ phá bĩnh", role: "student", status: "LOCKED" }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    
    const currentUser = mockDatabase.find(u => u.username === username && u.password === password);

    if (currentUser) {
      if (currentUser.status !== "ACTIVE") {
        alert("TÀI KHOẢN CỦA BẠN ĐÃ BỊ KHÓA! Vui lòng liên hệ Admin để biết thêm chi tiết.");
        return false;
      }

      console.log("Quyền đã được cấp:", currentUser.role);

      setUser({
        id: currentUser.id,
        name: currentUser.name,
        role: currentUser.role as UserRole, 
      });
      
      return true;
    } else {
      alert("Sai tài khoản hoặc mật khẩu! (Gợi ý: admin/123, teacher/123, student/123)");
      return false;
    }
  }, []);

  const logout = useCallback(() => setUser(null), []);

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