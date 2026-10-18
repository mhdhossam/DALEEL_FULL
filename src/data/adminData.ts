export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinedDate: string;
  avatar: string;
}

export const usersData: UserRecord[] = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    role: "مسئول نظام",
    status: "نشط",
    joinedDate: "2024-01-15",
    avatar: "/avatars/ahmed.webp"
  },
  {
    id: "2",
    name: "سارة علي",
    email: "sara@example.com",
    role: "محاضر",
    status: "نشط",
    joinedDate: "2024-02-10",
    avatar: "/avatars/sara.webp"
  },
  {
    id: "3",
    name: "خالد محمود",
    email: "khaled@example.com",
    role: "طالب",
    status: "غير نشط",
    joinedDate: "2024-03-05",
    avatar: "/avatars/khaled.webp"
  },
  {
    id: "4",
    name: "منى حسن",
    email: "mona@example.com",
    role: "طالب",
    status: "محظور",
    joinedDate: "2024-03-12",
    avatar: "/avatars/mona.webp"
  },
  {
    id: "5",
    name: "يوسف ابراهيم",
    email: "youssef@example.com",
    role: "محاضر",
    status: "نشط",
    joinedDate: "2024-03-20",
    avatar: "/avatars/youssef.webp"
  },
  {
    id: "6",
    name: "مصطفي سيد ",
    email: "mostafa@example.com",
    role: "مسؤول نظام",
    status: "نشط",
    joinedDate: "2024-03-20",
    avatar: "/avatars/mostafa.webp"
  },
];
