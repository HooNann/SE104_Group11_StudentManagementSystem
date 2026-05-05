import React, { createContext, useContext, useState, useCallback } from "react";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface AnnouncementContextType {
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, "id">) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | null>(null);

const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Thông báo nghỉ lễ 30/4 và 1/5",
    content: "Nhà trường thông báo lịch nghỉ lễ cho toàn thể sinh viên và cán bộ giảng viên từ ngày 30/4 đến hết ngày 3/5.",
    date: "2026-04-25",
  },
  {
    id: "2",
    title: "Lịch thi học kỳ 2",
    content: "Lịch thi chính thức học kỳ 2 đã được cập nhật trên hệ thống. Sinh viên vui lòng kiểm tra lịch thi cá nhân.",
    date: "2026-05-10",
  },
];

export const AnnouncementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);

  const addAnnouncement = useCallback((newAnnouncement: Omit<Announcement, "id">) => {
    const announcement: Announcement = {
      ...newAnnouncement,
      id: Math.random().toString(36).substring(2, 9),
    };
    setAnnouncements((prev) => [announcement, ...prev]);
  }, []);

  const updateAnnouncement = useCallback((id: string, updatedFields: Partial<Announcement>) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a))
    );
  }, []);

  const deleteAnnouncement = useCallback((id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <AnnouncementContext.Provider
      value={{ announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncements = () => {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error("useAnnouncements must be used within an AnnouncementProvider");
  }
  return context;
};
