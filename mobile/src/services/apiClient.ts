import Constants from 'expo-constants';
import axios from 'axios';

/**
 * Tầng HTTP DUY NHẤT của app.
 * Screen/component không được import axios — chỉ gọi qua các file trong services/.
 */
const baseURL =
  (Constants.expoConfig?.extra?.apiUrl as string | undefined) ?? 'http://localhost:3000/api/v1';

export interface ServerPingResponse {
  pong: boolean;
  at: string;
  prefix: string;
}

export const apiClient = axios.create({
  baseURL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Kiểm tra server có sống không.
 * Thành công (HTTP 2xx + pong: true) → màn hình hiển thị trạng thái "online".
 * Lỗi mạng/timeout/server down → ném ra để màn hình hiển thị trạng thái "offline".
 */
export const pingServer = async (): Promise<ServerPingResponse> => {
  const { data } = await apiClient.get<ServerPingResponse>('/ping');
  return data;
};

// TODO: gắn access token vào request
// apiClient.interceptors.request.use((config) => { ... });
//
// TODO: 401 → gọi /auth/refresh một lần, rồi retry request gốc.
// Xử lý phải có hàng đợi, tránh 10 request cùng refresh một lúc.

export const getApiBaseUrl = () => baseURL;
