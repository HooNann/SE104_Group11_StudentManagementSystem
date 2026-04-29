import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Assignment {
  id: string;
  giaoVien: string;
  monHoc: string;
  maLop: string;
  maLopHoc: string;
  thu: string;
  tietBatDau: number;
  tietKetThuc: number;
  phong: string;
}

const teachers = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D"];
const subjects = ["Cấu trúc dữ liệu", "Lập trình Web", "Cơ sở dữ liệu", "Mạng máy tính"];
const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

const initialAssignments: Assignment[] = [
  { id: "1", giaoVien: "Nguyễn Văn A", monHoc: "Lập trình Web", maLop: "SE104.Q21", maLopHoc: "SE104.Q21.1", thu: "Thứ 2", tietBatDau: 1, tietKetThuc: 3, phong: "A301" },
];

export default function TeachingAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState<Partial<Assignment>>({
    giaoVien: "", monHoc: "", maLop: "", maLopHoc: "", thu: "Thứ 2", tietBatDau: 1, tietKetThuc: 3, phong: ""
  });

  const handleSave = () => {
    if (!form.giaoVien || !form.monHoc || !form.maLop || !form.phong) {
      toast({ title: "Lỗi", description: "Vui lòng điền đủ các trường bắt buộc.", variant: "destructive" });
      return;
    }

    if (editingId) {
      setAssignments(assignments.map((a) => (a.id === editingId ? { ...a, ...form } as Assignment : a)));
      toast({ title: "Thành công", description: "Đã cập nhật phân công." });
    } else {
      setAssignments([...assignments, { ...form, id: Date.now().toString() } as Assignment]);
      toast({ title: "Thành công", description: "Đã thêm phân công mới." });
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      setAssignments(assignments.filter((a) => a.id !== deleteId));
      setDeleteId(null);
      toast({ title: "Thành công", description: "Đã xóa phân công." });
    }
  };

  const filtered = assignments.filter(a => 
    a.giaoVien.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.monHoc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Phân công giảng dạy</h1>
          <p className="text-muted-foreground">Quản lý việc phân chia lịch dạy cho giảng viên</p>
        </div>
        <Button onClick={() => { setEditingId(null); setForm(initialAssignments[0]); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Thêm phân công
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm giảng viên hoặc môn học..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Giảng viên</TableHead>
                <TableHead>Môn học</TableHead>
                <TableHead className="text-center">Mã lớp / Mã lớp học</TableHead>
                <TableHead>Lịch học & Phòng</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.giaoVien}</TableCell>
                  <TableCell>{a.monHoc}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col text-xs">
                      <span className="font-bold">{a.maLop}</span>
                      <span className="text-muted-foreground">{a.maLopHoc}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs">
                      <span className="font-medium">{a.thu}, Tiết {a.tietBatDau}-{a.tietKetThuc}</span>
                      <span className="text-blue-600 font-bold">Phòng: {a.phong}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-center gap-4">
                      <button onClick={() => { setEditingId(a.id); setForm(a); setDialogOpen(true); }} className="text-blue-500 hover:text-blue-700">
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button onClick={() => setDeleteId(a.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Sửa phân công" : "Thêm phân công mới"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Giáo viên</Label>
              <Select value={form.giaoVien} onValueChange={(v) => setForm({ ...form, giaoVien: v })}>
                <SelectTrigger><SelectValue placeholder="Chọn giáo viên" /></SelectTrigger>
                <SelectContent>{teachers.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Môn học</Label>
              <Select value={form.monHoc} onValueChange={(v) => setForm({ ...form, monHoc: v })}>
                <SelectTrigger><SelectValue placeholder="Chọn môn học" /></SelectTrigger>
                <SelectContent>{subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Mã môn</Label>
              <Input value={form.maLop} onChange={(e) => setForm({ ...form, maLop: e.target.value })} placeholder=" " />
            </div>
            <div className="space-y-2">
              <Label>Mã lớp học</Label>
              <Input value={form.maLopHoc} onChange={(e) => setForm({ ...form, maLopHoc: e.target.value })} placeholder=" " />
            </div>
            <div className="space-y-2">
              <Label>Phòng học</Label>
              <Input value={form.phong} onChange={(e) => setForm({ ...form, phong: e.target.value })} placeholder=" " />
            </div>
            <div className="col-span-2 grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg border">
              <div className="space-y-1">
                <Label>Thứ</Label>
                <Select value={form.thu} onValueChange={(v) => setForm({ ...form, thu: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Tiết Bắt đầu</Label>
                <Input type="number" min={1} max={10} value={form.tietBatDau} onChange={(e) => setForm({ ...form, tietBatDau: Number(e.target.value) })} />
              </div>
              <div className="space-y-1">
                <Label>Tiết Kết thúc</Label>
                <Input type="number" min={1} max={10} value={form.tietKetThuc} onChange={(e) => setForm({ ...form, tietKetThuc: Number(e.target.value) })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleSave}>Lưu dữ liệu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>Dữ liệu lịch dạy liên quan sẽ bị gỡ bỏ khỏi hệ thống.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}