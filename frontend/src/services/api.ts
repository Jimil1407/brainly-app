import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://second-brain-6avd.onrender.com/api/v1'
  : 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface Content {
  _id: string;
  link: string;
  type: 'tweet' | 'video' | 'document' | 'link';
  title: string;
  tags: string;
  userId: string;
  createdAt: string;
}

export interface User {
  _id: string;
  username: string;
}

export interface ShareableLink {
  hash: string;
  shareableLink: string;
}

// Auth APIs
export const authAPI = {
  signup: (data: { username: string; password: string }) =>
    api.post('/signup', data),
  
  signin: (data: { username: string; password: string }) =>
    api.post('/signin', data),
};

// Content APIs
export const contentAPI = {
  getAll: () => api.get<{ contents: Content[] }>('/content'),
  
  create: (data: { link: string; type: string; title: string; tags: string }) =>
    api.post('/content', data),
  
  delete: (id: string) => api.delete('/content', { data: { id } }),
  
  share: (id: string) => api.post<ShareableLink>('/content/share', { id }),
  
  shareAll: () => api.post<ShareableLink>('/content/shareAll'),
};

// Public APIs
export const publicAPI = {
  getSharedContent: (hash: string) => api.get(`/content/shared/${hash}`),
};

export default api; 