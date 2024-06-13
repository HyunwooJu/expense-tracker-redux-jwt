import axios from "axios";

// Glitch 프로젝트의 URL로 설정
const API_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://dolomite-volcano-bamboo.glitch.me";

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: `${API_URL}`, // 포트 번호를 포함하지 않음
});

// 요청 인터셉터를 통해 토큰 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 토큰을 localStorage에서 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
