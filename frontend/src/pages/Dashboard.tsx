import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, ClipboardList, TrendingUp, CalendarDays } from "lucide-react";

const adminStats = [
  { label: "Tổng sinh viên", value: "1,245", icon: Users, change: "+12%" },
  { label: "Tổng giáo viên", value: "86", icon: GraduationCap, change: "+3%" },
  { label: "Môn học", value: "42", icon: BookOpen, change: "0%" },
  { label: "Lớp học", value: "38", icon: ClipboardList, change: "+2%" },
];

const teacherStats = [
  { label: "Sinh viên phụ trách", value: "156", icon: Users, change: "+5%" },
  { label: "Môn giảng dạy", value: "4", icon: BookOpen, change: "" },
  { label: "Lịch dạy tuần này", value: "12", icon: CalendarDays, change: "" },
  { label: "Bài chấm chờ", value: "28", icon: ClipboardList, change: "-8%" },
];

const studentStats = [
  { label: "Môn đang học", value: "6", icon: BookOpen, change: "" },
  { label: "Điểm trung bình", value: "8.2", icon: TrendingUp, change: "+0.3" },
  { label: "Lịch học tuần này", value: "18", icon: CalendarDays, change: "" },
  { label: "Bài tập chưa nộp", value: "3", icon: ClipboardList, change: "" },
];

export default function Dashboard() {
  const { user } = useAuth();

  const roleGreeting: Record<string, string> = {
    admin: "Quản trị viên",
    teacher: "Giáo viên",
    student: "Sinh viên",
  };

  const stats =
    user?.role === "admin"
      ? adminStats
      : user?.role === "teacher"
        ? teacherStats
        : studentStats;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Xin chào, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Vai trò: {roleGreeting[user?.role || "student"]} — Tổng quan hệ thống
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className="text-xs text-muted-foreground mt-1">{stat.change} so với năm trước</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hoạt động gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>• Sinh viên Trần Văn C đã nộp bài tập môn Toán cao cấp</p>
            <p>• Lớp CNTT-K20A đã được cập nhật danh sách sinh viên</p>
            <p>• Giáo viên Nguyễn Văn A đã nhập điểm môn Lập trình Web</p>
            <p>• Lịch thi học kỳ 2 đã được công bố</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
