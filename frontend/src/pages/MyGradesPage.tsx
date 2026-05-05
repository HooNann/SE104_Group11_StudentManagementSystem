import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award } from "lucide-react";

const grades = [
  { monHoc: "Lập trình Web", tinChi: 3, giuaKy: 8.0, cuoiKy: 7.5 },
  { monHoc: "Cơ sở dữ liệu", tinChi: 3, giuaKy: 7.0, cuoiKy: 8.0 },
  { monHoc: "Mạng máy tính", tinChi: 2, giuaKy: 6.5, cuoiKy: 7.0 },
  { monHoc: "Toán rời rạc", tinChi: 3, giuaKy: 9.0, cuoiKy: 8.5 },
  { monHoc: "Tiếng Anh chuyên ngành", tinChi: 2, giuaKy: 7.5, cuoiKy: 8.0 },
  { monHoc: "Cấu trúc dữ liệu", tinChi: 3, giuaKy: 8.5, cuoiKy: 9.0 },
  { monHoc: "Hệ điều hành", tinChi: 3, giuaKy: 6.0, cuoiKy: 7.5 },
];

function calcAvg(gk: number, ck: number) {
  return +(gk * 0.4 + ck * 0.6).toFixed(1);
}

function gradeLabel(avg: number) {
  if (avg >= 8.5) return { text: "Giỏi", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" };
  if (avg >= 7.0) return { text: "Khá", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" };
  if (avg >= 5.5) return { text: "Trung bình", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" };
  return { text: "Yếu", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" };
}

export default function MyGradesPage() {
  const enriched = grades.map((g) => ({ ...g, avg: calcAvg(g.giuaKy, g.cuoiKy) }));
  const totalCredits = enriched.reduce((s, g) => s + g.tinChi, 0);
  const gpa = +(enriched.reduce((s, g) => s + g.avg * g.tinChi, 0) / totalCredits).toFixed(2);
  const gpaLabel = gradeLabel(gpa);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Điểm của tôi</h1>
        <p className="text-muted-foreground">Kết quả học tập theo từng môn học</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Điểm trung bình tích lũy (GPA)</p>
                <p className="text-2xl font-bold text-foreground">{gpa}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Trạng thái học tập</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge className={gpaLabel.className}>{gpaLabel.text}</Badge>
                  <Badge variant="outline">Đang học</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tổng tín chỉ tích lũy</p>
                <p className="text-2xl font-bold text-foreground">{totalCredits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bảng điểm chi tiết</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Môn học</TableHead>
                <TableHead className="text-center">Tín chỉ</TableHead>
                <TableHead className="text-center">Điểm giữa kỳ</TableHead>
                <TableHead className="text-center">Điểm cuối kỳ</TableHead>
                <TableHead className="text-center">Điểm trung bình</TableHead>
                <TableHead className="text-center">Xếp loại</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enriched.map((g) => {
                const label = gradeLabel(g.avg);
                return (
                  <TableRow key={g.monHoc}>
                    <TableCell className="font-medium">{g.monHoc}</TableCell>
                    <TableCell className="text-center">{g.tinChi}</TableCell>
                    <TableCell className="text-center">{g.giuaKy.toFixed(1)}</TableCell>
                    <TableCell className="text-center">{g.cuoiKy.toFixed(1)}</TableCell>
                    <TableCell className="text-center font-semibold">{g.avg}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={label.className}>{label.text}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
