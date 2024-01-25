// src/axios.js

import axios from 'axios'
import VueCookies from 'vue-cookies'

const instance = axios.create({
  baseURL: 'https://api.olga.lat/api', // Reemplaza esto con la URL base de tu API
})

// Interceptor para agregar el token de acceso a todas las solicitudes
instance.interceptors.request.use(
  (config) => {
    const accessToken = VueCookies.get('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
