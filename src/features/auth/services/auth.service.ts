import api from "@/lib/api";
import { LoginCredentials, AuthResponse, User } from "../types";

export const authService = {
    /**
     * POST /api/auth/login/
     * Backend accepts { username | email } in the 'username' field.
     * We send whatever the user typed as 'username' — DaleelTokenObtainPairView
     * resolves it against both email and username columns.
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const res = await api.post("/auth/login/", {
            username: credentials.email,   // field re-used for email OR username
            password: credentials.password,
        });
        return res.data;
    },

    /** GET /api/auth/me/ */
    fetchMe: async (): Promise<User> => {
        const res = await api.get("/auth/me/");
        return res.data;
    },

    logout: async (): Promise<void> => {
        // extend here if you add a /auth/logout/ blacklist endpoint
    },

    /** POST /api/token/refresh/ */
    refreshToken: async (refresh: string): Promise<{ access: string }> => {
        const res = await api.post("/token/refresh/", { refresh });
        return res.data;
    },
};
