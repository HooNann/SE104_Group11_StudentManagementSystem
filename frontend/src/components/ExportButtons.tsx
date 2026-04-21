import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExportButtonsProps {
  filenamePrefix?: string;
}

export default function ExportButtons({ filenamePrefix = "export" }: ExportButtonsProps) {
  const handleExportExcel = () => {
    toast({ title: "Xuất Excel", description: `Đang tải xuống ${filenamePrefix}.xlsx...` });
  };

  const handleExportPDF = () => {
    toast({ title: "Tải PDF", description: `Đang tải xuống ${filenamePrefix}.pdf...` });
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleExportExcel}>
        <FileSpreadsheet className="h-4 w-4 mr-1.5" />
        Xuất Excel
      </Button>
      <Button variant="outline" size="sm" onClick={handleExportPDF}>
        <FileText className="h-4 w-4 mr-1.5" />
        Tải PDF
      </Button>
    </div>
  );
}
