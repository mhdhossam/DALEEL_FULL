import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosHeaders,
    AxiosInstance,
} from "axios";

// Attach the current access token to every protected request.
export const addAuthHeader = (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers = config.headers || new AxiosHeaders();
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
};

type RetryConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error || !token) {
            reject(error ?? new AxiosError("Token refresh failed"));
        } else {
            resolve(token);
        }
    });

    failedQueue = [];
};

const clearSession = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("auth-storage");
    localStorage.removeItem("daleel_user");
};

const isAuthEndpoint = (url?: string) => {
    if (!url) return false;

    return [
        "/auth/login/",
        "/auth/register/",
        "/auth/me/",
        "/token/",
        "/token/refresh/",
    ].some((endpoint) => url.includes(endpoint));
};

export const makeResponseInterceptor = (instance: AxiosInstance) =>
    async (error: AxiosError) => {
        const original = error.config as RetryConfig | undefined;
        const status = error.response?.status;

        // No request config or non-401 error: let Axios handle it normally.
        if (!original || status !== 401) {
            return Promise.reject(error);
        }

        // Never treat a failed login/register/me/refresh call as an expired
        // session. In particular, this preserves the real login error.
        if (isAuthEndpoint(original.url)) {
            return Promise.reject(error);
        }

        // Prevent an infinite retry loop.
        if (original._retry) {
            clearSession();
            return Promise.reject(error);
        }

        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
            clearSession();
            if (window.location.pathname.startsWith("/admin")) {
                window.location.replace("/admin/login");
            } else {
                window.location.replace("/login");
            }
            return Promise.reject(error);
        }

        original._retry = true;

        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then((token) => {
                original.headers = original.headers || new AxiosHeaders();
                original.headers["Authorization"] = `Bearer ${token}`;
                return instance(original);
            });
        }

        isRefreshing = true;

        try {
            // Use plain Axios here so the refresh request itself is not caught
            // by the same interceptor.
            const { data } = await axios.post("/api/token/refresh/", {
                refresh: refreshToken,
            });

            const newAccessToken = data.access as string;

            localStorage.setItem("access_token", newAccessToken);
            processQueue(null, newAccessToken);

            original.headers = original.headers || new AxiosHeaders();
            original.headers["Authorization"] = `Bearer ${newAccessToken}`;

            return instance(original);
        } catch (refreshError) {
            const axiosRefreshError = refreshError as AxiosError;
            processQueue(axiosRefreshError);
            clearSession();

            if (window.location.pathname.startsWith("/admin")) {
                window.location.replace("/admin/login");
            } else {
                window.location.replace("/login");
            }

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    };

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(addAuthHeader);
api.interceptors.response.use(
    (response) => response,
    makeResponseInterceptor(api),
);

export default api;
