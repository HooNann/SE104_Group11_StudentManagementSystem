import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

const timeSlots = [
  "07:30 - 08:15", "08:15 - 09:00", "09:00 - 09:45", "10:00 - 10:45", "10:45 - 11:30",
  "13:00 - 13:45", "13:45 - 14:30", "14:30 - 15:15", "15:30 - 16:15", "16:15 - 17:00"
];

interface ScheduleBlock {
  day: number;
  startPeriod: number;
  endPeriod: number;
  courseCode: string;
  subject: string;
  classCode: string;
  room: string;
}

const BLUE_COLOR = "bg-blue-500/15 border border-blue-500/40 text-blue-700 dark:text-blue-400";

const schedule: ScheduleBlock[] = [
  { day: 0, startPeriod: 1, endPeriod: 4, courseCode: "SE101.Q21", subject: "Cấu trúc dữ liệu", classCode: "SE101.Q21.1", room: "A102" },
  { day: 2, startPeriod: 6, endPeriod: 9, courseCode: "IT202.Q21", subject: "Lập trình Web", classCode: "IT202.Q21.2", room: "Lab 01" },
];

const academicYears = ["2022-2023", "2023-2024", "2024-2025"];
const semesters = ["Học kỳ 1", "Học kỳ 2", "Học kỳ Hè"];

export default function TeachingSchedulePage() {
  const [selectedYear, setSelectedYear] = useState("2023-2024");
  const [selectedSemester, setSelectedSemester] = useState("Học kỳ 2");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Lịch giảng dạy</h1>
        <p className="text-muted-foreground">Phân công giảng dạy chi tiết theo kỳ</p>
      </div>

      <Card>
        <CardHeader className="pb-4 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-base text-primary font-bold">
              {selectedSemester}, {selectedYear}
            </CardTitle>
            <div className="flex gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[130px] h-8 text-xs font-medium"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {academicYears.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-[120px] h-8 text-xs font-medium"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {semesters.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 mb-2">
            <div className="p-2"></div>
            {days.map((d, i) => (
              <div key={i} className="p-2 text-center text-sm font-bold border-b-2 border-primary/20 bg-muted rounded-md">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-[100px_repeat(6,1fr)] grid-rows-[repeat(10,minmax(70px,auto))] gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="p-2 flex flex-col items-center justify-center rounded-md bg-muted/50 border border-transparent" style={{ gridColumn: 1, gridRow: i + 1 }}>
                <span className="text-xs font-bold text-foreground">Tiết {i + 1}</span>
                <span className="text-[10px] text-muted-foreground mt-1">{timeSlots[i]}</span>
              </div>
            ))}

            {Array.from({ length: 10 }).map((_, r) => days.map((_, c) => (
              <div key={`${r}-${c}`} className="rounded-lg border border-dashed border-border/40 -z-10" style={{ gridColumn: c + 2, gridRow: r + 1 }} />
            )))}

            {schedule.map((block, idx) => (
              <div 
                key={idx}
                className={`rounded-lg p-2 flex flex-col items-center justify-center text-center gap-0.5 z-10 transition-transform hover:scale-[1.01] ${BLUE_COLOR}`}
                style={{ 
                  gridColumn: block.day + 2, 
                  gridRow: `${block.startPeriod} / span ${block.endPeriod - block.startPeriod + 1}` 
                }}
              >
                <span className="text-[11px] font-bold leading-tight">{block.courseCode}</span>
                <span className="text-[11px] font-bold leading-tight uppercase">{block.subject}</span>
                <div className="flex flex-col text-[10px] opacity-90 mt-1">
                  <span>{block.classCode}</span>
                  <span className="font-medium mt-1">Phòng {block.room}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}