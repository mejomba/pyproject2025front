import axios from 'axios'

const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'
const prefix = process.env.NEXT_PUBLIC_PREFIX_URL || '/api/v1'

const api = axios.create({
  baseURL: `${base}${prefix}`,
  withCredentials: true,
})

api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('access')
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

export default api
