import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import UsersPage from "./pages/UsersPage";
import ProfilePage from "./pages/ProfilePage";
import StudentProfilePage from "./pages/StudentProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
      <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
      <p>Trang này đang được phát triển...</p>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<StudentsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/student-profile" element={<StudentProfilePage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
