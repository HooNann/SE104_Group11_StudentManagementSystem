import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, PenLine, ListChecks } from "lucide-react";
import ExportButtons from "@/components/ExportButtons";

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

export default function MyClassesPage() {
  const navigate = useNavigate();

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
              <Button variant="outline" size="sm">
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
    </div>
  );
}