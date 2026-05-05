import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, School } from "lucide-react";
import ExportButtons from "@/components/ExportButtons";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState } from "react";

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

const studentDetails = [
  { maSV: "SV001", hoTen: "Nguyễn Văn An", khoa: "CNTT", lop: "CNTT1", avg: 8.8, rank: "Giỏi" },
  { maSV: "SV002", hoTen: "Trần Thị Bình", khoa: "CNTT", lop: "CNTT1", avg: 8.2, rank: "Khá" },
  { maSV: "SV003", hoTen: "Lê Hoàng Cường", khoa: "Kinh tế", lop: "KT2", avg: 6.5, rank: "Trung bình" },
  { maSV: "SV004", hoTen: "Phạm Minh Đức", khoa: "Kinh tế", lop: "KT2", avg: 5.8, rank: "Trung bình" },
  { maSV: "SV005", hoTen: "Hoàng Thị Em", khoa: "CNTT", lop: "CNTT2", avg: 9.1, rank: "Giỏi" },
  { maSV: "SV006", hoTen: "Vũ Quốc Phong", khoa: "CNTT", lop: "CNTT2", avg: 4.5, rank: "Yếu" },
];

const totalStudents = departmentData.reduce((s, d) => s + d.soLuong, 0);

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  
  const filteredStudents = studentDetails.filter(s => 
    s.hoTen.toLowerCase().includes(search.toLowerCase()) || 
    s.maSV.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
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

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Danh sách sinh viên chi tiết</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Dựa trên kết quả học tập kỳ hiện tại</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm MSSV hoặc Họ tên..."
                className="pl-9 h-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">MSSV</TableHead>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Khoa</TableHead>
                <TableHead>Lớp</TableHead>
                <TableHead className="text-center">Điểm TB</TableHead>
                <TableHead className="text-center">Xếp loại</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((s) => (
                <TableRow key={s.maSV}>
                  <TableCell className="pl-6 font-medium">{s.maSV}</TableCell>
                  <TableCell>{s.hoTen}</TableCell>
                  <TableCell>{s.khoa}</TableCell>
                  <TableCell>{s.lop}</TableCell>
                  <TableCell className="text-center font-bold">{s.avg.toFixed(1)}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        s.rank === "Giỏi" ? "default" :
                        s.rank === "Khá" ? "secondary" :
                        s.rank === "Trung bình" ? "outline" : "destructive"
                      }
                    >
                      {s.rank}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
