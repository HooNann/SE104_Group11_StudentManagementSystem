import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Save, Settings2, RotateCcw } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    minAge: 18,
    maxAge: 40,
    maxClassSize: 50,
    passScore: 5.0,
    currentSemester: "2023-2024-HK2",
  });

  const handleSave = () => {
    toast({
      title: "Thành công",
      description: "Các quy định hệ thống đã được cập nhật.",
    });
  };

  const handleReset = () => {
    setSettings({
      minAge: 18,
      maxAge: 40,
      maxClassSize: 50,
      passScore: 5.0,
      currentSemester: "2023-2024-HK2",
    });
    toast({
      description: "Đã khôi phục cài đặt mặc định.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Cấu hình hệ thống</h1>
        <p className="text-muted-foreground">Quản lý các tham số và quy định nghiệp vụ</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Quy định Sinh viên & Lớp học</CardTitle>
            </div>
            <CardDescription>Cấu hình giới hạn độ tuổi và sĩ số</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minAge">Tuổi tối thiểu</Label>
                <Input
                  id="minAge"
                  type="number"
                  value={settings.minAge}
                  onChange={(e) => setSettings({ ...settings, minAge: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAge">Tuổi tối đa</Label>
                <Input
                  id="maxAge"
                  type="number"
                  value={settings.maxAge}
                  onChange={(e) => setSettings({ ...settings, maxAge: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSize">Sĩ số tối đa của lớp</Label>
              <Input
                id="maxSize"
                type="number"
                value={settings.maxClassSize}
                onChange={(e) => setSettings({ ...settings, maxClassSize: parseInt(e.target.value) })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Quy định Điểm & Học kỳ</CardTitle>
            </div>
            <CardDescription>Cấu hình tiêu chuẩn đạt và thời gian hiện tại</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passScore">Điểm đạt môn học</Label>
              <Input
                id="passScore"
                type="number"
                step="0.1"
                value={settings.passScore}
                onChange={(e) => setSettings({ ...settings, passScore: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Học kỳ hiện tại</Label>
              <Select
                value={settings.currentSemester}
                onValueChange={(v) => setSettings({ ...settings, currentSemester: v })}
              >
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Chọn học kỳ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024-HK1">Học kỳ 1 (2023-2024)</SelectItem>
                  <SelectItem value="2023-2024-HK2">Học kỳ 2 (2023-2024)</SelectItem>
                  <SelectItem value="2023-2024-HK3">Học kỳ Hè (2023-2024)</SelectItem>
                  <SelectItem value="2024-2025-HK1">Học kỳ 1 (2024-2025)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Khôi phục mặc định
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Lưu cấu hình
        </Button>
      </div>
    </div>
  );
}
