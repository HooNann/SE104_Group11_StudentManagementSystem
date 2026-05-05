import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, School } from "lucide-react";
import ExportButtons from "@/components/ExportButtons";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const departmentData = [
  { khoa: "CNTT", soLuong: 320 },
  { khoa: "Kinh tế", soLuong: 280 },
  { khoa: "Ngoại ngữ", soLuong: 195 },
  { khoa: "Cơ khí", soLuong: 150 },
  { khoa: "Điện tử", soLuong: 175 },
];

const academicData = [
  { name: "Giỏi", value: 180, color: "hsl(var(--success))" },
  { name: "Khá", value: 350, color: "hsl(var(--primary))" },
  { name: "Trung bình", value: 420, color: "hsl(var(--warning))" },
  { name: "Yếu", value: 70, color: "hsl(var(--destructive))" },
];

const totalStudents = departmentData.reduce((s, d) => s + d.soLuong, 0);

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Báo cáo</h1>
          <p className="text-muted-foreground">Thống kê tổng quan hệ thống</p>
        </div>
        <ExportButtons filenamePrefix="bao-cao" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng số sinh viên</p>
              <p className="text-3xl font-bold text-foreground">{totalStudents.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-accent/50 p-3">
              <School className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng số lớp học</p>
              <p className="text-3xl font-bold text-foreground">42</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thống kê sinh viên theo khoa</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="khoa" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 13,
                  }}
                  formatter={(value: number) => [`${value} sinh viên`, "Số lượng"]}
                />
                <Bar dataKey="soLuong" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tỉ lệ học lực</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={academicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {academicData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value} sinh viên`, "Số lượng"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
