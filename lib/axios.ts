import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1/',
  withCredentials: true,
})

api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('access')
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

export default api
