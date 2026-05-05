import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Plus, X, Trash2, Key } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createPortal } from "react-dom";

interface UserAccount {
  id: string;
  tenDangNhap: string;
  hoTen: string;
  email: string;
  vaiTro: string;
  trangThai: boolean;
}

const roleColor: Record<string, "default" | "secondary" | "outline" | any> = {
  Admin: "default",
  "Giáo viên": "secondary",
  "Sinh viên": "outline",
};

const initialUsers: UserAccount[] = [
  { id: "1", tenDangNhap: "admin", hoTen: "Quản trị viên Hệ thống", email: "admin@uit.edu.vn", vaiTro: "Admin", trangThai: true },
  { id: "2", tenDangNhap: "teacher", hoTen: "Nguyễn Văn Giảng Viên", email: "gv01@uit.edu.vn", vaiTro: "Giáo viên", trangThai: true },
  { id: "3", tenDangNhap: "student", hoTen: "Trần Nhật Duy", email: "24520403@uit.edu.vn", vaiTro: "Sinh viên", trangThai: true },
];

export default function UsersPage() {
  const { user, logout } = useAuth();
  
  const [users, setUsers] = useState<UserAccount[]>(initialUsers);
  const [search, setSearch] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRoleId, setNewRoleId] = useState(3);

  const getRoleName = (roleId: number) => {
    if (roleId === 1) return "Admin";
    if (roleId === 2) return "Giáo viên";
    return "Sinh viên";
  };

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, trangThai: !u.trangThai } : u));
  };

  const handleResetPassword = (id: string, username: string) => {
    const newPass = window.prompt(`Nhập mật khẩu mới cho tài khoản ${username}:`, "123456");
    if (newPass) {
      alert("Đã đặt lại mật khẩu ảo thành công! (Dữ liệu không lưu DB)");
    }
  };

  const handleDeleteUser = (id: string, tenDangNhapCuaDongNay: string) => {
    if (window.confirm("Bạn có chắc chắn muốn XÓA VĨNH VIỄN người dùng này?")) {
      if (user?.name === tenDangNhapCuaDongNay) {
        alert("Bạn không thể tự xóa chính mình!");
      } else {
        setUsers(prev => prev.filter(u => u.id !== id));
      }
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: UserAccount = {
      id: Date.now().toString(),
      tenDangNhap: newUsername,
      hoTen: newUsername,
      email: newEmail,
      vaiTro: getRoleName(newRoleId),
      trangThai: true
    };

    setUsers(prev => [...prev, newUser]);
    
    setIsModalOpen(false);
    setNewUsername("");
    setNewPassword("");
    setNewEmail("");
    setNewRoleId(3);
  };

  const filtered = users.filter(
    (u) =>
      u.tenDangNhap.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quản lý Người dùng</h1>
          <p className="text-muted-foreground">Quản lý tài khoản</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm người dùng
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm người dùng..."
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
                <TableHead>Tên đăng nhập</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.tenDangNhap}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={roleColor[u.vaiTro] || "default"}>{u.vaiTro}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.trangThai ? "default" : "destructive"}>
                      {u.trangThai ? "Hoạt động" : "Đã khóa"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center flex justify-center items-center gap-2">
                    <Switch checked={u.trangThai} onCheckedChange={() => toggleStatus(u.id)} />
                    <button onClick={() => handleResetPassword(u.id, u.tenDangNhap)} className="text-blue-500 hover:text-blue-700 p-1" title="Reset mật khẩu">
                      <Key className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteUser(u.id, u.tenDangNhap)} className="text-red-500 hover:text-red-700 p-1" title="Xóa tài khoản">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Thêm tài khoản mới</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tên đăng nhập</label>
                <Input required placeholder="VD: Lê Hoàng Duy" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input required type="email" placeholder="VD: abc@gmail.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Mật khẩu</label>
                <Input required type="password" placeholder="Nhập mật khẩu" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Vai trò</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                  value={newRoleId} 
                  onChange={(e) => setNewRoleId(Number(e.target.value))}
                >
                  <option value={1}>Admin</option>
                  <option value={2}>Giáo viên</option>
                  <option value={3}>Sinh viên</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
                <Button type="submit">Lưu dữ liệu</Button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}