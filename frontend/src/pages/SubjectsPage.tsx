import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

interface Subject {
  id: string;
  maMH: string;
  tenMH: string;
  soTinChi: number;
  khoa: string;
  giangVien: string;
}

const mockTeachers = [
  { id: "gv1", name: "Nguyễn Văn A" },
  { id: "gv2", name: "Trần Thị C" },
  { id: "gv3", name: "Lê Văn D" },
  { id: "gv4", name: "Phạm Thị E" },
  { id: "gv5", name: "Hoàng Minh Tuấn" },
];

const initialSubjects: Subject[] = [
  { id: "1", maMH: "MH001", tenMH: "Lập trình Web", soTinChi: 3, khoa: "CNTT", giangVien: "Nguyễn Văn A" },
  { id: "2", maMH: "MH002", tenMH: "Cơ sở dữ liệu", soTinChi: 4, khoa: "CNTT", giangVien: "Trần Thị C" },
  { id: "3", maMH: "MH003", tenMH: "Toán cao cấp", soTinChi: 3, khoa: "Khoa học cơ bản", giangVien: "Lê Văn D" },
  { id: "4", maMH: "MH004", tenMH: "Kinh tế vi mô", soTinChi: 3, khoa: "Kinh tế", giangVien: "Phạm Thị E" },
  { id: "5", maMH: "MH005", tenMH: "Mạng máy tính", soTinChi: 3, khoa: "CNTT", giangVien: "Hoàng Minh Tuấn" },
  { id: "6", maMH: "MH006", tenMH: "Trí tuệ nhân tạo", soTinChi: 3, khoa: "CNTT", giangVien: "Nguyễn Văn A" },
];

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [subjectForm, setSubjectForm] = useState({ maMH: "", tenMH: "", soTinChi: 3, khoa: "", giangVien: "" });

  const handleOpenAdd = () => {
    setEditingId(null);
    setSubjectForm({ maMH: "", tenMH: "", soTinChi: 3, khoa: "", giangVien: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Subject) => {
    setEditingId(s.id);
    setSubjectForm({ maMH: s.maMH, tenMH: s.tenMH, soTinChi: s.soTinChi, khoa: s.khoa, giangVien: s.giangVien });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setSubjects(prev => prev.map(s => s.id === editingId ? { ...s, ...subjectForm } : s));
    } else {
      setSubjects(prev => [...prev, { id: Date.now().toString(), ...subjectForm }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredSubjects = subjects.filter((s) =>
    s.maMH.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.tenMH.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý Môn học</h2>
          <p className="text-muted-foreground">Danh sách các môn học trong chương trình đào tạo</p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm môn học
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã môn hoặc tên môn học"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã MH</TableHead>
                <TableHead>Tên môn học</TableHead>
                <TableHead className="text-center">Số tín chỉ</TableHead>
                <TableHead>Khoa</TableHead>
                <TableHead>Giảng viên</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.maMH}</TableCell>
                  <TableCell>{s.tenMH}</TableCell>
                  <TableCell className="text-center">{s.soTinChi}</TableCell>
                  <TableCell>{s.khoa}</TableCell>
                  <TableCell>{s.giangVien}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-4">
                      <button 
                        onClick={() => handleOpenEdit(s)} 
                        className="text-blue-500 hover:text-blue-700 transition-colors" 
                        title="Sửa thông tin"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(s.id)} 
                        className="text-red-500 hover:text-red-700 transition-colors" 
                        title="Xóa môn học"
                      >
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Sửa thông tin Môn học" : "Thêm Môn học mới"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Mã môn học</label>
              <Input value={subjectForm.maMH} onChange={e => setSubjectForm({...subjectForm, maMH: e.target.value})} placeholder="VD: SE104" />
            </div>
            <div>
              <label className="text-sm font-medium">Tên môn học</label>
              <Input value={subjectForm.tenMH} onChange={e => setSubjectForm({...subjectForm, tenMH: e.target.value})} placeholder="VD: Nhập môn CN Phần mềm" />
            </div>
            <div>
              <label className="text-sm font-medium">Số tín chỉ</label>
              <Input type="number" min={1} value={subjectForm.soTinChi} onChange={e => setSubjectForm({...subjectForm, soTinChi: Number(e.target.value)})} />
            </div>
            <div>
              <label className="text-sm font-medium">Khoa</label>
              <Input value={subjectForm.khoa} onChange={e => setSubjectForm({...subjectForm, khoa: e.target.value})} placeholder="VD: CNPM" />
            </div>

            <div>
              <label className="text-sm font-medium">Giảng viên phụ trách</label>
              <Select value={subjectForm.giangVien} onValueChange={value => setSubjectForm({...subjectForm, giangVien: value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="-- Chọn giảng viên --" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeachers.map((t) => (
                    <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button onClick={handleSave}>Lưu dữ liệu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}