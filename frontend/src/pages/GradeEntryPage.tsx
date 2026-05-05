import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import ExportButtons from "@/components/ExportButtons";

interface StudentGrade {
  id: string;
  maSV: string;
  hoTen: string;
  quaTrinh: string;
  giuaKy: string;
  cuoiKy: string;
}

const initialGrades: StudentGrade[] = [
  { id: "1", maSV: "SV001", hoTen: "Nguyễn Văn An", quaTrinh: "8", giuaKy: "7.5", cuoiKy: "8" },
  { id: "2", maSV: "SV002", hoTen: "Trần Thị Bình", quaTrinh: "9", giuaKy: "8", cuoiKy: "9" },
  { id: "3", maSV: "SV003", hoTen: "Lê Hoàng Cường", quaTrinh: "6", giuaKy: "5.5", cuoiKy: "7" },
  { id: "4", maSV: "SV004", hoTen: "Phạm Minh Đức", quaTrinh: "7", giuaKy: "6", cuoiKy: "7.5" },
  { id: "5", maSV: "SV005", hoTen: "Hoàng Thị Em", quaTrinh: "8.5", giuaKy: "9", cuoiKy: "8.5" },
];

const classes = [
  { id: "1", label: "CNTT-K20A — Lập trình Web" },
  { id: "2", label: "CNTT-K20B — Cơ sở dữ liệu" },
  { id: "3", label: "CNTT-K21A — Lập trình Web" },
];

const academicYears = ["2022-2023", "2023-2024", "2024-2025"];
const semesters = ["Học kỳ 1", "Học kỳ 2", "Học kỳ Hè"];

function calcAvg(qt: string, gk: string, ck: string): string {
  const a = parseFloat(qt), b = parseFloat(gk), c = parseFloat(ck);
  if (isNaN(a) || isNaN(b) || isNaN(c)) return "—";
  return (a * 0.2 + b * 0.3 + c * 0.5).toFixed(2);
}

export default function GradeEntryPage() {
  const [selectedYear, setSelectedYear] = useState("2023-2024");
  const [selectedSemester, setSelectedSemester] = useState("Học kỳ 2");
  const [selectedClass, setSelectedClass] = useState(classes[0].id);
  const [grades, setGrades] = useState<StudentGrade[]>(initialGrades);

  const updateGrade = (id: string, field: keyof Pick<StudentGrade, "quaTrinh" | "giuaKy" | "cuoiKy">, value: string) => {
    setGrades((prev) => prev.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const handleSave = () => {
    toast({ title: "Thành công", description: "Điểm đã được lưu thành công!" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nhập điểm</h1>
          <p className="text-muted-foreground">Nhập và chỉnh sửa điểm cho sinh viên</p>
        </div>
        <ExportButtons filenamePrefix="nhap-diem" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Năm học</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {academicYears.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Học kỳ</label>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {semesters.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Lớp học</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger><SelectValue placeholder="Chọn lớp học" /></SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">STT</TableHead>
              <TableHead className="w-[100px]">Mã SV</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead className="w-[120px] text-center">Điểm quá trình</TableHead>
              <TableHead className="w-[120px] text-center">Điểm giữa kỳ</TableHead>
              <TableHead className="w-[120px] text-center">Điểm cuối kỳ</TableHead>
              <TableHead className="w-[120px] text-center">Điểm trung bình</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((g, idx) => (
              <TableRow key={g.id}>
                <TableCell className="text-center">{idx + 1}</TableCell>
                <TableCell className="font-medium">{g.maSV}</TableCell>
                <TableCell>{g.hoTen}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={g.quaTrinh}
                    onChange={(e) => updateGrade(g.id, "quaTrinh", e.target.value)}
                    className="h-8 text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={g.giuaKy}
                    onChange={(e) => updateGrade(g.id, "giuaKy", e.target.value)}
                    className="h-8 text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={g.cuoiKy}
                    onChange={(e) => updateGrade(g.id, "cuoiKy", e.target.value)}
                    className="h-8 text-center"
                  />
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {calcAvg(g.quaTrinh, g.giuaKy, g.cuoiKy)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Lưu điểm
        </Button>
      </div>
    </div>
  );
}
