import { useAnnouncements } from "@/contexts/AnnouncementContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone } from "lucide-react";

export default function NewsfeedPage() {
  const { announcements } = useAnnouncements();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bảng tin</h1>
        <p className="text-muted-foreground">Các thông báo mới nhất từ nhà trường</p>
      </div>

      {announcements.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Megaphone className="h-10 w-10 mb-3 opacity-40" />
            <p>Chưa có thông báo nào</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <Card key={a.id} className="hover:shadow-sm transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5 shrink-0">
                    <Megaphone className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-base leading-snug">{a.title}</CardTitle>
                    <Badge variant="outline" className="mt-1 text-[11px]">{a.date}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pl-14 pt-0">
                <p className="text-sm text-muted-foreground whitespace-pre-line">{a.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
