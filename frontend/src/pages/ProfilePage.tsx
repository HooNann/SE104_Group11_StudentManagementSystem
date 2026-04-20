import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { KeyRound } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const initials = user?.name
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  const roleLabel: Record<string, string> = {
    admin: "Quản trị viên",
    teacher: "Giáo viên",
    student: "Sinh viên",
  };

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

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hồ sơ cá nhân</h1>
        <p className="text-muted-foreground">Thông tin tài khoản của bạn</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user ? roleLabel[user.role] : ""}</p>
            </div>
          </div>

          <div className="grid gap-3 pt-2">
            <div>
              <Label className="text-muted-foreground text-xs">Mã người dùng</Label>
              <p className="text-sm font-medium">{user?.id}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Vai trò</Label>
              <p className="text-sm font-medium">{user ? roleLabel[user.role] : ""}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bảo mật</CardTitle>
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
