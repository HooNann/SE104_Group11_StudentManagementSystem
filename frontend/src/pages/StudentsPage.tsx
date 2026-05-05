import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Trash2, Pencil, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { createPortal } from "react-dom";


interface Student {
  studentId: number;
  studentCode: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  className: string;
  email: string;
  status: "Mới tạo" | "Đang học" | "Bảo lưu" | "Tốt nghiệp" | "Thôi học";
}

const initialStudents: Student[] = [
  { studentId: 1, studentCode: "24520403", fullName: "Trần Nhật Duy", dateOfBirth: "2006-08-15", gender: "Nam", className: "KTPM2024.1", email: "24520403@uit.edu.vn", status: "Đang học" },
  { studentId: 2, studentCode: "24520063", fullName: "Nguyễn Ngọc Thu An", dateOfBirth: "2006-05-20", gender: "Nữ", className: "KTPM2024.1", email: "24520063@uit.edu.vn", status: "Đang học" },
  { studentId: 3, studentCode: "24521238", fullName: "Tô Công Hữu Nhân", dateOfBirth: "2006-11-02", gender: "Nam", className: "KTPM2024.2", email: "24521238@uit.edu.vn", status: "Đang học" },
  { studentId: 4, studentCode: "24521885", fullName: "Nguyễn Cao Xuân Trung", dateOfBirth: "2006-03-10", gender: "Nam", className: "KTPM2024.3", email: "24521885@uit.edu.vn", status: "Đang học" }
];

export default function StudentsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isTeacher = user?.role === "teacher";
  const canAddStudent = isAdmin || isTeacher;

  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [newDob, setNewDob] = useState("");
  const [newGender, setNewGender] = useState("Nam");
  const [newClass, setNewClass] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newStatus, setNewStatus] = useState<Student["status"]>("Mới tạo");

  const resetForm = () => {
    setEditingId(null);
    setNewCode(""); setNewName(""); setNewDob(""); 
    setNewGender("Nam"); setNewClass(""); setNewEmail("");
    setNewStatus("Mới tạo");
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setEditingId(student.studentId);
    setNewCode(student.studentCode);
    setNewName(student.fullName);
    setNewDob(student.dateOfBirth);
    setNewGender(student.gender);
    setNewClass(student.className);
    setNewEmail(student.email);
    setNewStatus(student.status);
    setIsModalOpen(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setStudents(prev => prev.map(s => s.studentId === editingId ? {
        ...s, studentCode: newCode, fullName: newName, dateOfBirth: newDob, gender: newGender, className: newClass, email: newEmail, status: newStatus
      } : s));
    } else {
      const newStudent: Student = {
        studentId: Date.now(), 
        studentCode: newCode, fullName: newName, dateOfBirth: newDob, gender: newGender, className: newClass, email: newEmail, status: newStatus
      };
      setStudents(prev => [...prev, newStudent]);
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteStudent = (id: number, name: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa sinh viên ${name} khỏi hệ thống?`)) {
      // Xóa: Lọc bỏ sinh viên có ID trùng khớp
      setStudents(prev => prev.filter(s => s.studentId !== id));
    }
  };

  const filtered = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.studentCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Danh sách Sinh viên</h1>
          <p className="text-muted-foreground">Quản lý hồ sơ sinh viên</p>
        </div>
        {canAddStudent && (
          <Button onClick={handleOpenAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm sinh viên
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo MSSV hoặc Họ tên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MSSV</TableHead>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Ngày sinh</TableHead>
                <TableHead>Giới tính</TableHead>
                <TableHead>Lớp</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Email</TableHead>
                {isAdmin && <TableHead className="text-center">Hành động</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.studentId}>
                  <TableCell className="font-bold">{s.studentCode}</TableCell>
                  <TableCell>{s.fullName}</TableCell>
                  <TableCell>{s.dateOfBirth}</TableCell>
                  <TableCell>{s.gender}</TableCell>
                  <TableCell>{s.className}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        s.status === "Đang học" ? "default" : 
                        s.status === "Tốt nghiệp" ? "secondary" : 
                        s.status === "Bảo lưu" ? "outline" : "destructive"
                      }
                      className="whitespace-nowrap"
                    >
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{s.email}</TableCell>
                  {isAdmin && (
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center gap-3">
                        <button onClick={() => handleEditClick(s)} className="text-blue-500 hover:text-blue-700 transition-colors" title="Sửa thông tin">
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleDeleteStudent(s.studentId, s.fullName)} className="text-red-500 hover:text-red-700 transition-colors" title="Xóa sinh viên">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isModalOpen && createPortal (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                {editingId ? "Cập nhật thông tin Sinh viên" : "Thêm Sinh viên mới"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveStudent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mã SV</label>
                  <Input required placeholder="VD: 24520001" value={newCode} onChange={(e) => setNewCode(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Họ và tên</label>
                  <Input required placeholder="VD: Châu Văn Phong" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ngày sinh</label>
                  <Input required type="date" value={newDob} onChange={(e) => setNewDob(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Giới tính</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={newGender} onChange={(e) => setNewGender(e.target.value)}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lớp</label>
                  <Input required placeholder="VD: KTPM2024.1" value={newClass} onChange={(e) => setNewClass(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input required type="email" placeholder="email@gm.uit.edu.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trạng thái</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                    value={newStatus} 
                    onChange={(e) => setNewStatus(e.target.value as Student["status"])}
                  >
                    <option value="Mới tạo">Mới tạo</option>
                    <option value="Đang học">Đang học</option>
                    <option value="Bảo lưu">Bảo lưu</option>
                    <option value="Tốt nghiệp">Tốt nghiệp</option>
                    <option value="Thôi học">Thôi học</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
                <Button type="submit">Lưu hồ sơ</Button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}