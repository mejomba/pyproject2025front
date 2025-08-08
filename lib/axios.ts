import axios from 'axios'
import { getAccessToken } from '@/lib/api/token'

const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${base}`,
  withCredentials: true,
})

api.interceptors.request.use(config => {
  const accessToken = getAccessToken()
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

export default api
