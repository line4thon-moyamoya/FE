import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// 보호자 모드 토큰 헤더 이름
const PARENT_MODE_HEADER = "X-Parent-Mode-Token";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청마다 토큰 자동으로 붙이기
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 보호자 모드 토큰이 있으면 같이 붙이기
  const parentModeToken = sessionStorage.getItem("parentModeToken");
  if (parentModeToken) {
    config.headers[PARENT_MODE_HEADER] = parentModeToken;
  }

  return config;
});

// 토큰 재발급 (interceptor 가 안 걸리도록 기본 axios 사용)
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, {
    refreshToken,
  });

  const { accessToken, refreshToken: newRefreshToken } = response.data.data;
  localStorage.setItem("accessToken", accessToken);
  if (newRefreshToken) {
    localStorage.setItem("refreshToken", newRefreshToken);
  }
  return accessToken;
};

// 여러 요청이 동시에 401일 때 재발급은 한 번만
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        refreshPromise ??= refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
        const newToken = await refreshPromise;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // 실패했던 요청 다시 보내기
      } catch {
        // 재발급 실패 시 인증 정보 전부 삭제
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("childId");
        sessionStorage.removeItem("parentModeToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;