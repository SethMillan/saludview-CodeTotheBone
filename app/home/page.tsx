"use client"

import { Activity, User, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { StudyCard } from "@/components/study-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageTransition } from "@/components/page-transition"
import { useDataCache } from "@/components/data-cache-provider"

// Definir la estructura de los datos que esperamos del endpoint
interface ApiResponse {
  perfil: {
    id: string
    nombre: string
    apellido_paterno: string
    apellido_materno: string
    fecha_nacimiento: string
    genero: string
    curp: string
    telefono: string
    email: string
  }
  estudios: Array<{
    id_estudio: string
    tipo: string
    titulo: string
    descripcion: string
    fecha_realizacion: string
    subtitulo: string
    estado: string
    nombre_medico: string
    cedula_profesional: string
    especialidad: string
    institucion: string
    imagenes: Array<{
      url: string
      formato: string
      preview: string
      propiedades: {
        resolucion: string
        modo: string
        tamaño_archivo: string
      }
    }>
    interpretacion: {
      conclusion: string
      recomendaciones: string[]
      notas_medicas: string
      firmado_por: string
      fecha_emision: string
      tipo_documento: string
      codigo_qr_verificacion: string
    }
  }>
}

export default function HomePage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getCachedData, setCachedData, isOffline } = useDataCache()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // Primero intentar obtener datos de la caché
        const cachedData = getCachedData("home_data")
        if (cachedData) {
          setData(cachedData)
          setLoading(false)

          // Actualizar en segundo plano si estamos online
          if (!isOffline) {
            fetchFromAPI()
          }
          return
        }

        // Si no hay datos en caché o estamos online, intentar obtener de la API
        if (!isOffline) {
          await fetchFromAPI()
        } else {
          // Si estamos offline y no hay caché, mostrar error
          setError("No hay conexión a Internet y no se encontraron datos guardados.")
          setLoading(false)
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("No se pudieron cargar los datos. Por favor, intenta de nuevo más tarde.")
        setLoading(false)
      }
    }

    async function fetchFromAPI() {
      try {
        const response = await fetch("https://sd-example.clvrt.workers.dev/")

        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.status}`)
        }

        const responseData = await response.json()
        setData(responseData)
        setError(null)

        // Guardar en caché
        setCachedData("home_data", responseData)
      } catch (err) {
        console.error("Error fetching from API:", err)
        setError("No se pudieron cargar los datos. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [getCachedData, setCachedData, isOffline])

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#f8f9fa] px-4 py-12">
        <div className="max-w-md mx-auto space-y-8">
          <header className="flex justify-between items-center mb-6">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>

            {loading ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : data?.perfil ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abstract-user-icon-cqtyF5P8OZg7c9XsQGjgZHdqKRK33q.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{data.perfil.nombre}</p>
                  <p className="text-xs text-gray-500">{data.perfil.id}</p>
                </div>
              </div>
            ) : null}
          </header>

          {isOffline && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2 mb-4">
              <WifiOff className="h-5 w-5 text-amber-500" />
              <p className="text-sm text-amber-700">Modo sin conexión. Mostrando datos guardados previamente.</p>
            </div>
          )}

          {loading ? (
            <>
              <section className="mb-8">
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-8 w-64" />
              </section>

              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-56 w-full rounded-3xl" />
                ))}
              </div>
            </>
          ) : error ? (
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-4 py-2 bg-[#05A86B] text-white rounded-lg hover:bg-[#048a59]"
              >
                Reintentar
              </button>
            </div>
          ) : (
            <>
              <section className="mb-10">
                <h2 className="text-sm text-gray-500 font-medium mb-2">Estudios Médicos</h2>
                <h1 className="text-3xl font-bold leading-tight">
                  Hola, <span className="text-black font-black">{data?.perfil?.nombre || "Usuario"}</span>
                </h1>
                <p className="text-gray-500 mt-2">
                  {data?.estudios?.length || 0} {data?.estudios?.length === 1 ? "estudio" : "estudios"} disponibles
                </p>
              </section>

              {data?.estudios && data.estudios.length > 0 ? (
                <div className="w-full grid grid-cols-1 gap-4">
                  {data.estudios.map((estudio, index) => {
                    // Asignar un color vibrante basado en la posición
                    const colorSchemes = [
                      { bg: "bg-[#e6f7f0]", text: "text-[#05A86B]" }, // Verde
                      { bg: "bg-[#fff4e5]", text: "text-[#f59e0b]" }, // Naranja
                      { bg: "bg-[#f3e8ff]", text: "text-[#8b5cf6]" }, // Púrpura
                      { bg: "bg-[#eff6ff]", text: "text-[#3b82f6]" }, // Azul
                      { bg: "bg-[#fde68a]", text: "text-[#92400e]" }, // Ámbar
                      { bg: "bg-[#fee2e2]", text: "text-[#ef4444]" }, // Rojo
                    ]

                    // Usar módulo para ciclar a través de los colores
                    const colorIndex = index % colorSchemes.length

                    return (
                      <div key={estudio.id_estudio} className="w-full">
                        <StudyCard estudio={estudio} isLastCard={false} customColors={colorSchemes[colorIndex]} />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <p className="text-gray-500">No hay estudios disponibles</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </PageTransition>
  )
}
