"use client"

import { ArrowRight, Video, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface MediaItem {
  formato: string
  preview: string
  propiedades?: {
    resolucion: string
    modo: string
    tamaño_archivo: string
  }
}

interface EstudioProps {
  estudio: {
    id_estudio: string
    tipo: string
    titulo: string
    descripcion: string
    fecha_realizacion: string
    subtitulo: string
    estado: string
    media?: MediaItem[]
    imagenes?: MediaItem[] // Para compatibilidad con datos antiguos
    count?: number
    [key: string]: any
  }
  isLastCard?: boolean
  customColors?: { bg: string; text: string }
}

export function StudyCard({ estudio, isLastCard, customColors }: EstudioProps) {
  const router = useRouter()

  // Formatear la fecha
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date)
    } catch (e) {
      return dateString
    }
  }

  // Obtener color de fondo y texto según el tipo de estudio
  const getStyles = (tipo: string, isLastCard?: boolean, customColors?: { bg: string; text: string }) => {
    // Si se proporcionan colores personalizados, usarlos
    if (customColors) {
      return customColors
    }

    // Si es la última tarjeta, darle un color único
    if (isLastCard) {
      return { bg: "bg-[#fde68a]", text: "text-[#92400e]" } // Color ámbar/dorado
    }

    const tipoLower = tipo.toLowerCase()
    if (tipoLower.includes("radio") || tipoLower.includes("rayo")) return { bg: "bg-[#e6f7f0]", text: "text-[#05A86B]" }
    if (tipoLower.includes("masto") || tipoLower.includes("mama")) return { bg: "bg-[#fff4e5]", text: "text-[#f59e0b]" }
    if (tipoLower.includes("tomo")) return { bg: "bg-[#eff6ff]", text: "text-[#3b82f6]" } // Cambiado de negro a azul
    if (tipoLower.includes("resonancia") || tipoLower.includes("magnet"))
      return { bg: "bg-[#eff6ff]", text: "text-[#3b82f6]" }
    if (tipoLower.includes("ultra") || tipoLower.includes("eco")) return { bg: "bg-[#f3e8ff]", text: "text-[#8b5cf6]" }
    return { bg: "bg-[#f3f4f6]", text: "text-gray-700" }
  }

  // Usar el campo media si existe, de lo contrario usar imagenes para compatibilidad
  const mediaItems = estudio.media || estudio.imagenes || []
  const mediaCount = estudio.count || mediaItems.length || 0

  // Modificar la función isVideo para detectar mp4 en el campo formato
  const isVideo = (media: MediaItem): boolean => {
    if (!media) return false

    // Verificar por el formato
    const formato = media.formato?.toLowerCase() || ""
    return formato.includes("video") || formato.includes("mp4") || false
  }

  // Modificar el conteo de videos e imágenes
  const videoCount = mediaItems.filter((item) => isVideo(item)).length
  const imageCount = mediaCount - videoCount

  const styles = getStyles(estudio.tipo, isLastCard, customColors)
  const formattedDate = formatDate(estudio.fecha_realizacion)

  const handleCardClick = () => {
    router.push(`/galeria/${estudio.id_estudio}`)
  }

  return (
    <div
      className={`${styles.bg} rounded-3xl p-6 transition-all hover:shadow-md cursor-pointer`}
      onClick={handleCardClick}
    >
      <div className="space-y-4">
        {/* Tipo de estudio */}
        <p className={`text-xs font-medium uppercase tracking-wider ${styles.text}`}>{estudio.tipo}</p>

        {/* Título y descripción */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{estudio.titulo}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{estudio.descripcion || estudio.subtitulo}</p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"></div>

        {/* Fecha y contador de medios */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-gray-500 text-sm">{formattedDate}</p>
            <div className={`text-lg font-bold ${styles.text} flex items-center gap-2`}>
              {imageCount > 0 && (
                <div className="flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" />
                  <span>{imageCount}</span>
                </div>
              )}
              {videoCount > 0 && (
                <div className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  <span>{videoCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Botón circular con flecha */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center 
            ${styles.bg === "bg-[#222222]" ? "bg-white" : "bg-[#222222]"}`}
          >
            <ArrowRight
              className={`h-5 w-5 
              ${styles.bg === "bg-[#222222]" ? "text-black" : "text-white"}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
