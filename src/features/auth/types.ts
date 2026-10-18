export interface User {
    id?: string | number;
    email: string;
    username?: string;
    name?: string;          // alias for username returned by /auth/me/
    role?: "admin" | "user" | "مسئول نظام" | "مستخدم";
    is_staff?: boolean;
    is_active?: boolean;
    is_verified?: boolean;
}

export interface AuthResponse {
    access: string;
    refresh: string;
}

export interface LoginCredentials {
    email: string;         // accepts email OR username — backend resolves both
    password: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
