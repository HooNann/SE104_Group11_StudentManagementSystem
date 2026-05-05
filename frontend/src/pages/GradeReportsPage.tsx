import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const classes = [
  { id: "1", label: "CNTT-K20A — Lập trình Web" },
  { id: "2", label: "CNTT-K20B — Cơ sở dữ liệu" },
];

const reportData = [
  { maSV: "SV001", hoTen: "Nguyễn Văn An", avg: 7.85, rank: "Khá" },
  { maSV: "SV002", hoTen: "Trần Thị Bình", avg: 8.80, rank: "Giỏi" },
  { maSV: "SV003", hoTen: "Lê Hoàng Cường", avg: 6.25, rank: "Trung bình" },
  { maSV: "SV004", hoTen: "Phạm Minh Đức", avg: 6.95, rank: "Trung bình" },
  { maSV: "SV005", hoTen: "Hoàng Thị Em", avg: 8.65, rank: "Giỏi" },
];

function getRankVariant(rank: string) {
  if (rank === "Giỏi") return "default";
  if (rank === "Khá") return "secondary";
  return "outline";
}

export default function GradeReportsPage() {
  const [selectedClass, setSelectedClass] = useState(classes[0].id);
  const avgAll = (reportData.reduce((s, r) => s + r.avg, 0) / reportData.length).toFixed(2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Báo cáo điểm</h1>
        <p className="text-muted-foreground">Thống kê và báo cáo kết quả học tập</p>
      </div>

      <div className="max-w-sm">
        <label className="text-sm font-medium text-foreground mb-1.5 block">Chọn lớp</label>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {classes.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Sĩ số</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{reportData.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Điểm TB lớp</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{avgAll}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Tỷ lệ đạt</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">100%</p></CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">STT</TableHead>
              <TableHead className="w-[100px]">Mã SV</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead className="text-center">Điểm TB</TableHead>
              <TableHead className="text-center">Xếp loại</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.map((r, idx) => (
              <TableRow key={r.maSV}>
                <TableCell className="text-center">{idx + 1}</TableCell>
                <TableCell className="font-medium">{r.maSV}</TableCell>
                <TableCell>{r.hoTen}</TableCell>
                <TableCell className="text-center font-semibold">{r.avg.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getRankVariant(r.rank)}>{r.rank}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
