"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CachedData {
  timestamp: number
  data: any
}

interface DataCacheContextType {
  getCachedData: (key: string) => any
  setCachedData: (key: string, data: any, expirationMinutes?: number) => void
  clearCache: () => void
  isOffline: boolean
}

const DataCacheContext = createContext<DataCacheContextType | undefined>(undefined)

export function DataCacheProvider({ children }: { children: ReactNode }) {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    // Verificar el estado de la conexión al cargar
    setIsOffline(!navigator.onLine)

    // Configurar event listeners para cambios en la conexión
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const getCachedData = (key: string) => {
    try {
      const cachedItem = localStorage.getItem(`mediview_cache_${key}`)
      if (!cachedItem) return null

      const { timestamp, data }: CachedData = JSON.parse(cachedItem)

      // Verificar si los datos han expirado (por defecto 24 horas)
      const now = new Date().getTime()
      const expirationTime = 24 * 60 * 60 * 1000 // 24 horas en milisegundos

      if (now - timestamp > expirationTime) {
        localStorage.removeItem(`mediview_cache_${key}`)
        return null
      }

      return data
    } catch (error) {
      console.error("Error al recuperar datos de la caché:", error)
      return null
    }
  }

  const setCachedData = (key: string, data: any, expirationMinutes = 1440) => {
    try {
      const timestamp = new Date().getTime()
      const cacheItem: CachedData = { timestamp, data }
      localStorage.setItem(`mediview_cache_${key}`, JSON.stringify(cacheItem))
    } catch (error) {
      console.error("Error al guardar datos en la caché:", error)
    }
  }

  const clearCache = () => {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("mediview_cache_")) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error("Error al limpiar la caché:", error)
    }
  }

  return (
    <DataCacheContext.Provider value={{ getCachedData, setCachedData, clearCache, isOffline }}>
      {children}
    </DataCacheContext.Provider>
  )
}

export function useDataCache() {
  const context = useContext(DataCacheContext)
  if (context === undefined) {
    throw new Error("useDataCache debe usarse dentro de un DataCacheProvider")
  }
  return context
}
