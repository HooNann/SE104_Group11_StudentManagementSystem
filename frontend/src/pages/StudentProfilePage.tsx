import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { KeyRound, Mail, Phone, MapPin, Calendar, Hash, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const initialStudentInfo = {
  maSV: "SV2024001",
  hoTen: "Trần Thị B",
  ngaySinh: "15/03/2003",
  gioiTinh: "Nữ",
  email: "tranthib@university.edu.vn",
  sdt: "0901234567",
  diaChi: "123 Nguyễn Huệ, Q.1, TP.HCM",
  lop: "CNTT-K20A",
};

export default function StudentProfilePage() {
  const { user } = useAuth();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [studentInfo, setStudentInfo] = useState(initialStudentInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(initialStudentInfo);

  const handleOpenEdit = () => {
    setEditForm(studentInfo);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setStudentInfo(editForm);
    setIsEditing(false);
    toast({ title: "Thành công", description: "Đã cập nhật thông tin cá nhân." });
  };

  const initials = user?.name
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase() || "SV";

  const handleChangePassword = () => {
    if (!oldPass || !newPass || !confirmPass) {
      toast({ title: "Lỗi", description: "Vui lòng điền đầy đủ thông tin.", variant: "destructive" });
      return;
    }
    if (newPass !== confirmPass) {
      toast({ title: "Lỗi", description: "Mật khẩu mới không khớp.", variant: "destructive" });
      return;
    }
    toast({ title: "Thành công", description: "Mật khẩu đã được thay đổi." });
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
  };

  const infoRows = [
    { icon: Hash, label: "Mã sinh viên", value: studentInfo.maSV },
    { icon: Calendar, label: "Ngày sinh", value: studentInfo.ngaySinh },
    { icon: Mail, label: "Email", value: studentInfo.email },
    { icon: Phone, label: "Số điện thoại", value: studentInfo.sdt },
    { icon: MapPin, label: "Địa chỉ", value: studentInfo.diaChi },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hồ sơ cá nhân</h1>
          <p className="text-muted-foreground">Thông tin sinh viên</p>
        </div>
        <Button onClick={handleOpenEdit} variant="outline">
          <Pencil className="h-4 w-4 mr-2" />
          Sửa thông tin
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl font-bold text-foreground">{studentInfo.hoTen}</h2>
              <p className="text-sm text-muted-foreground">{studentInfo.maSV}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
                <Badge variant="secondary">{studentInfo.lop}</Badge>
                {/* Đã xóa Badge Ngành học/Khoa và Tình trạng */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông tin chi tiết</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {infoRows.map((row) => (
              <div key={row.label} className="flex items-start gap-3">
                <row.icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{row.label}</p>
                  <p className="text-sm font-medium text-foreground">{row.value}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Giới tính</p>
                <p className="text-sm font-medium text-foreground">{studentInfo.gioiTinh}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sửa thông tin cá nhân</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Họ và tên</Label>
              <Input value={editForm.hoTen} onChange={(e) => setEditForm({...editForm, hoTen: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Ngày sinh</Label>
              <Input value={editForm.ngaySinh} onChange={(e) => setEditForm({...editForm, ngaySinh: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Số điện thoại</Label>
              <Input value={editForm.sdt} onChange={(e) => setEditForm({...editForm, sdt: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Địa chỉ</Label>
              <Input value={editForm.diaChi} onChange={(e) => setEditForm({...editForm, diaChi: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Lớp</Label>
              <Input value={editForm.lop} disabled className="bg-slate-100 text-slate-500" />
              <p className="text-xs text-muted-foreground">* Liên hệ Phòng Đào tạo để chuyển lớp</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Hủy</Button>
            <Button onClick={handleSaveEdit}>Lưu cập nhật</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bảo mật</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <KeyRound className="h-4 w-4 mr-2" />
                Đổi mật khẩu
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Đổi mật khẩu</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label>Mật khẩu hiện tại</Label>
                  <Input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder="Nhập mật khẩu hiện tại" />
                </div>
                <div className="space-y-1.5">
                  <Label>Mật khẩu mới</Label>
                  <Input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Nhập mật khẩu mới" />
                </div>
                <div className="space-y-1.5">
                  <Label>Xác nhận mật khẩu mới</Label>
                  <Input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Nhập lại mật khẩu mới" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Hủy</Button>
                </DialogClose>
                <Button onClick={handleChangePassword}>Xác nhận</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}