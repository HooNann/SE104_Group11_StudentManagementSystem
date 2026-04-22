import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Pencil, Trash2, Users, UserPlus, Search } from "lucide-react";

interface ClassItem {
  id: string;
  maLop: string;
  tenLop: string;
  khoa: string;
  siSo: number;
  giaoVienCN: string;
}

interface StudentItem {
  id: string;
  maSV: string;
  hoTen: string;
  ngaySinh: string;
  email: string;
}

const mockTeachers = [
  { id: "gv1", name: "Nguyễn Văn A" },
  { id: "gv2", name: "Trần Thị C" },
  { id: "gv3", name: "Lê Văn D" },
  { id: "gv4", name: "Phạm Thị E" },
  { id: "gv5", name: "Hoàng Minh Tuấn" },
];

const initialClasses: ClassItem[] = [
  { id: "1", maLop: "CNTT-K20A", tenLop: "Công nghệ thông tin K20A", khoa: "CNTT", siSo: 42, giaoVienCN: "Nguyễn Văn A" },
  { id: "2", maLop: "CNTT-K20B", tenLop: "Công nghệ thông tin K20B", khoa: "CNTT", siSo: 38, giaoVienCN: "Trần Thị C" },
  { id: "3", maLop: "QTKD-K21A", tenLop: "Quản trị kinh doanh K21A", khoa: "Kinh tế", siSo: 45, giaoVienCN: "Lê Văn D" },
  { id: "4", maLop: "KT-K21B", tenLop: "Kế toán K21B", khoa: "Kinh tế", siSo: 40, giaoVienCN: "Phạm Thị E" },
  { id: "5", maLop: "CNTT-K19A", tenLop: "Công nghệ thông tin K19A", khoa: "CNTT", siSo: 35, giaoVienCN: "Hoàng Minh Tuấn" },
];

const allStudents: StudentItem[] = [
  { id: "s1", maSV: "SV001", hoTen: "Nguyễn Văn An", ngaySinh: "15/03/2003", email: "an.nv@email.com" },
  { id: "s2", maSV: "SV002", hoTen: "Trần Thị Bình", ngaySinh: "22/07/2003", email: "binh.tt@email.com" },
  { id: "s3", maSV: "SV003", hoTen: "Lê Hoàng Cường", ngaySinh: "10/11/2003", email: "cuong.lh@email.com" },
  { id: "s4", maSV: "SV004", hoTen: "Phạm Minh Đức", ngaySinh: "05/01/2004", email: "duc.pm@email.com" },
  { id: "s5", maSV: "SV005", hoTen: "Hoàng Thị Em", ngaySinh: "18/09/2003", email: "em.ht@email.com" },
  { id: "s6", maSV: "SV006", hoTen: "Vũ Quốc Phong", ngaySinh: "30/06/2003", email: "phong.vq@email.com" },
  { id: "s7", maSV: "SV007", hoTen: "Đặng Thùy Giang", ngaySinh: "12/04/2004", email: "giang.dt@email.com" },
  { id: "s8", maSV: "SV008", hoTen: "Bùi Thanh Hải", ngaySinh: "25/12/2003", email: "hai.bt@email.com" },
];

const initialEnrollments: Record<string, string[]> = {
  "1": ["s1", "s2", "s3"],
  "2": ["s4", "s5"],
  "3": ["s6"],
  "4": ["s7"],
  "5": ["s8"],
};

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);
  const [enrollments, setEnrollments] = useState<Record<string, string[]>>(initialEnrollments);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  
  const [showStudentList, setShowStudentList] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);

  const [classSearchTerm, setClassSearchTerm] = useState("");
  const [studentListSearchTerm, setStudentListSearchTerm] = useState("");
  const [addStudentSearchTerm, setAddStudentSearchTerm] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [classForm, setClassForm] = useState({ maLop: "", tenLop: "", khoa: "", siSo: 0, giaoVienCN: "" });

  const handleOpenAddClass = () => {
    setEditingClassId(null);
    setClassForm({ maLop: "", tenLop: "", khoa: "", siSo: 0, giaoVienCN: "" });
    setIsClassModalOpen(true);
  };

  const handleOpenEditClass = (c: ClassItem) => {
    setEditingClassId(c.id);
    setClassForm({ maLop: c.maLop, tenLop: c.tenLop, khoa: c.khoa, siSo: c.siSo, giaoVienCN: c.giaoVienCN });
    setIsClassModalOpen(true);
  };

  const handleSaveClass = () => {
    if (editingClassId) {
      setClasses(prev => prev.map(c => c.id === editingClassId ? { ...c, ...classForm } : c));
    } else {
      setClasses(prev => [...prev, { id: Date.now().toString(), ...classForm }]);
    }
    setIsClassModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  const openStudentList = (cls: ClassItem) => {
    setSelectedClass(cls);
    setStudentListSearchTerm("");
    setShowStudentList(true);
  };

  const enrolledStudents = selectedClass
    ? allStudents.filter((s) => (enrollments[selectedClass.id] || []).includes(s.id))
    : [];

  const filteredEnrolledStudents = enrolledStudents.filter(s => 
    s.maSV.toLowerCase().includes(studentListSearchTerm.toLowerCase()) || 
    s.hoTen.toLowerCase().includes(studentListSearchTerm.toLowerCase())
  );

  const availableStudents = selectedClass
    ? allStudents.filter((s) => !(enrollments[selectedClass.id] || []).includes(s.id))
    : [];

  const filteredAvailableStudents = availableStudents.filter(s => 
    s.maSV.toLowerCase().includes(addStudentSearchTerm.toLowerCase()) || 
    s.hoTen.toLowerCase().includes(addStudentSearchTerm.toLowerCase())
  );

  const handleToggleStudentSelect = (studentId: string) => {
    setSelectedStudentIds(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId) 
        : [...prev, studentId]
    );
  };

  const handleAddMultipleStudents = () => {
    if (selectedStudentIds.length === 0 || !selectedClass) return;
    setEnrollments((prev) => ({
      ...prev,
      [selectedClass.id]: [...(prev[selectedClass.id] || []), ...selectedStudentIds],
    }));
    setSelectedStudentIds([]);
    setShowAddStudent(false);
  };

  const handleRemoveStudent = (studentId: string) => {
    if (!selectedClass) return;
    setEnrollments((prev) => ({
      ...prev,
      [selectedClass.id]: (prev[selectedClass.id] || []).filter((id) => id !== studentId),
    }));
  };

  const filteredClasses = classes.filter((c) =>
    c.maLop.toLowerCase().includes(classSearchTerm.toLowerCase()) ||
    c.tenLop.toLowerCase().includes(classSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý Lớp học</h2>
          <p className="text-muted-foreground">Danh sách các lớp học trong trường</p>
        </div>
        <Button onClick={handleOpenAddClass}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm lớp học
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã lớp hoặc tên lớp"
              value={classSearchTerm}
              onChange={(e) => setClassSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã lớp</TableHead>
                <TableHead>Tên lớp</TableHead>
                <TableHead>Khoa</TableHead>
                <TableHead className="text-center">Sĩ số</TableHead>
                <TableHead>GVCN</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.maLop}</TableCell>
                  <TableCell>{c.tenLop}</TableCell>
                  <TableCell>{c.khoa}</TableCell>
                  <TableCell className="text-center">{c.siSo}</TableCell>
                  <TableCell>{c.giaoVienCN}</TableCell>
                  <TableCell className="text-right w-[280px]">
                    <div className="flex items-center justify-end gap-4 whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openStudentList(c)}
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Danh sách SV
                      </Button>
                      <button 
                        onClick={() => handleOpenEditClass(c)} 
                        className="text-blue-500 hover:text-blue-700 transition-colors" 
                        title="Sửa thông tin"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(c.id)} 
                        className="text-red-500 hover:text-red-700 transition-colors" 
                        title="Xóa lớp học"
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

      <Dialog open={showStudentList} onOpenChange={setShowStudentList}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Danh sách sinh viên - {selectedClass?.tenLop}
            </DialogTitle>
            <DialogDescription>
              Mã lớp: {selectedClass?.maLop} · Sĩ số hiện tại: {enrolledStudents.length}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-between items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm MSSV hoặc Họ tên"
                value={studentListSearchTerm}
                onChange={(e) => setStudentListSearchTerm(e.target.value)}
                className="pl-9 w-full max-w-sm"
              />
            </div>
            <Button size="sm" onClick={() => {
              setAddStudentSearchTerm("");
              setSelectedStudentIds([]);
              setShowAddStudent(true);
            }} disabled={availableStudents.length === 0}>
              <UserPlus className="h-4 w-4 mr-2" />
              Thêm sinh viên
            </Button>
          </div>

          <div className="border rounded-md max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white shadow-sm z-10">
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Mã SV</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Ngày sinh</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnrolledStudents.length > 0 ? (
                  filteredEnrolledStudents.map((s, idx) => (
                    <TableRow key={s.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell className="font-bold">{s.maSV}</TableCell>
                      <TableCell>{s.hoTen}</TableCell>
                      <TableCell>{s.ngaySinh}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveStudent(s.id)}
                          title="Xóa khỏi lớp"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                      {enrolledStudents.length === 0 ? "Chưa có sinh viên nào trong lớp này" : "Không tìm thấy sinh viên phù hợp"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Thêm sinh viên vào {selectedClass?.tenLop}</DialogTitle>
            <DialogDescription>
              Đã chọn {selectedStudentIds.length} sinh viên để thêm vào lớp.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm sinh viên để tích chọn"
                value={addStudentSearchTerm}
                onChange={(e) => setAddStudentSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="border rounded-md p-2 h-[300px] overflow-y-auto space-y-1 bg-slate-50">
              {filteredAvailableStudents.length > 0 ? (
                filteredAvailableStudents.map((s) => (
                  <label 
                    key={s.id} 
                    className="flex items-center space-x-3 p-3 hover:bg-white rounded-md cursor-pointer border border-transparent hover:border-slate-200 transition-colors"
                  >
                    <Checkbox 
                      checked={selectedStudentIds.includes(s.id)} 
                      onCheckedChange={() => handleToggleStudentSelect(s.id)} 
                    />
                    <div className="flex-1 font-medium">{s.hoTen}</div>
                    <div className="text-sm text-slate-500">{s.maSV}</div>
                  </label>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  Không tìm thấy sinh viên nào khả dụng.
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStudent(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddMultipleStudents} disabled={selectedStudentIds.length === 0}>
              Lưu vào lớp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isClassModalOpen} onOpenChange={setIsClassModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingClassId ? "Sửa thông tin Lớp học" : "Thêm Lớp học mới"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Mã lớp</label>
              <Input value={classForm.maLop} onChange={e => setClassForm({...classForm, maLop: e.target.value})} placeholder="VD: SE104.Q24" />
            </div>
            <div>
              <label className="text-sm font-medium">Tên lớp</label>
              <Input value={classForm.tenLop} onChange={e => setClassForm({...classForm, tenLop: e.target.value})} placeholder="VD: Nhập môn CN Phần mềm" />
            </div>
            <div>
              <label className="text-sm font-medium">Khoa</label>
              <Input value={classForm.khoa} onChange={e => setClassForm({...classForm, khoa: e.target.value})} placeholder="VD: CNPM" />
            </div>
            <div>
              <label className="text-sm font-medium">Sĩ số (tối đa)</label>
              <Input type="number" value={classForm.siSo} onChange={e => setClassForm({...classForm, siSo: Number(e.target.value)})} />
            </div>
            <div>
              <label className="text-sm font-medium">Giáo viên chủ nhiệm</label>
              <Select value={classForm.giaoVienCN} onValueChange={value => setClassForm({...classForm, giaoVienCN: value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="-- Chọn giáo viên --" />
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
            <Button variant="outline" onClick={() => setIsClassModalOpen(false)}>Hủy</Button>
            <Button onClick={handleSaveClass}>Lưu dữ liệu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}