import axios from "axios";

// 환경 변수에서 API URL을 가져옴
const API_URL = process.env.REACT_APP_API_BASE_URL;

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_URL,
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
