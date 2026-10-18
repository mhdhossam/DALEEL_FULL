import api from "./api";

// ── Shape adapter  ────────────────────────────────────────────────────────────
// Backend CustomUser: { id, username, email, is_active, is_staff, is_verified }
// Frontend components expect: { id, name, email, status, role }

const STATUS_MAP: Record<string, string> = {
    true:  "نشط",
    false: "غير نشط",
};

const adaptUser = (u: any) => ({
    ...u,
    id:     String(u.id),
    name:   u.username,
    status: u.is_active ? "نشط" : "غير نشط",
    role:   u.is_staff ? "مسئول نظام" : "طالب",
});

// ── API calls  ────────────────────────────────────────────────────────────────

export const fetchUsers = async () => {
    const { data } = await api.get("/customusers/");
    // DRF paginated response → results array; or plain array
    const raw = Array.isArray(data) ? data : (data?.results ?? []);
    return raw.map(adaptUser);
};

export const deleteUsers = async (id: string) => {
    await api.delete(`/customusers/${id}/`);
};

interface UpdateUser { id: string; status: string }

export const updateUserStatusApi = async ({ id, status }: UpdateUser) => {
    // Map Arabic status label → backend boolean field
    const is_active = status === "نشط";
    await api.patch(`/customusers/${id}/`, { is_active });
};
