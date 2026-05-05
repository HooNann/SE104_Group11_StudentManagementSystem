import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, PenLine, ListChecks, Search } from "lucide-react";
import ExportButtons from "@/components/ExportButtons";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ClassInfo {
  id: string;
  name: string;
  subject: string;
  studentCount: number;
  schedule: string;
  room: string;
}

const mockClasses: ClassInfo[] = [
  { id: "1", name: "CNTT-K20A", subject: "Lập trình Web", studentCount: 35, schedule: "Thứ 2, 7:30 - 9:30", room: "A301" },
  { id: "2", name: "CNTT-K20B", subject: "Cơ sở dữ liệu", studentCount: 40, schedule: "Thứ 3, 13:00 - 15:00", room: "B205" },
  { id: "3", name: "CNTT-K21A", subject: "Lập trình Web", studentCount: 38, schedule: "Thứ 4, 9:30 - 11:30", room: "A302" },
  { id: "4", name: "KT-K20A", subject: "Tin học đại cương", studentCount: 45, schedule: "Thứ 5, 7:30 - 9:30", room: "C101" },
];

const mockStudents = [
  { maSV: "24520403", hoTen: "Trần Nhật Duy", email: "24520403@uit.edu.vn" },
  { maSV: "24520063", hoTen: "Nguyễn Ngọc Thu An", email: "24520063@uit.edu.vn" },
  { maSV: "24521238", hoTen: "Tô Công Hữu Nhân", email: "24521238@uit.edu.vn" },
  { maSV: "24521885", hoTen: "Nguyễn Cao Xuân Trung", email: "24521885@uit.edu.vn" },
];

export default function MyClassesPage() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [showStudents, setShowStudents] = useState(false);
  const [search, setSearch] = useState("");

  const filteredStudents = mockStudents.filter(s => 
    s.hoTen.toLowerCase().includes(search.toLowerCase()) || 
    s.maSV.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lớp phụ trách</h1>
          <p className="text-muted-foreground">Danh sách các lớp được phân công giảng dạy</p>
        </div>
        <ExportButtons filenamePrefix="lop-phu-trach" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockClasses.map((cls) => (
          <Card key={cls.id} className="hover:shadow-md transition-shadow flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{cls.name}</CardTitle>
                <Badge variant="secondary">{cls.subject}</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-2 text-sm flex-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{cls.studentCount} sinh viên</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{cls.schedule} — Phòng {cls.room}</span>
              </div>
            </CardContent>

            {/* Bổ sung thanh công cụ thao tác ở đáy mỗi Card */}
            <CardFooter className="pt-4 border-t flex justify-end gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setSelectedClass(cls);
                  setShowStudents(true);
                }}
              >
                <ListChecks className="h-4 w-4 mr-2" />
                Danh sách SV
              </Button>
              <Button size="sm" onClick={() => navigate('/grade-entry')}>
                <PenLine className="h-4 w-4 mr-2" />
                Nhập điểm
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={showStudents} onOpenChange={setShowStudents}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Danh sách sinh viên - {selectedClass?.name}</DialogTitle>
            <DialogDescription>
              Môn học: {selectedClass?.subject} · Sĩ số: {selectedClass?.studentCount}
            </DialogDescription>
          </DialogHeader>

          <div className="relative my-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm MSSV hoặc tên..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="border rounded-md max-h-[300px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
                <TableRow>
                  <TableHead className="pl-4">MSSV</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((s) => (
                  <TableRow key={s.maSV}>
                    <TableCell className="pl-4 font-medium">{s.maSV}</TableCell>
                    <TableCell>{s.hoTen}</TableCell>
                    <TableCell className="text-muted-foreground">{s.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}