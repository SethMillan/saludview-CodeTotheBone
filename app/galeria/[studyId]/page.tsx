"use client"

import { GalleryHeader } from "@/components/gallery-header"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getStudyById } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { PageTransition } from "@/components/page-transition"
import { Video } from "lucide-react"

interface GalleryPageProps {
  params: {
    studyId: string
  }
}

export default function GalleryPage({ params }: GalleryPageProps) {
  const router = useRouter()
  const [study, setStudy] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [loadedMedia, setLoadedMedia] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function fetchStudy() {
      try {
        // Intentar obtener el estudio de la API
        const response = await fetch("https://sd-example.clvrt.workers.dev/")
        if (response.ok) {
          const data = await response.json()
          const foundStudy = data.estudios?.find((est: any) => est.id_estudio === params.studyId)

          if (foundStudy) {
            setStudy(foundStudy)
          } else {
            // Si no se encuentra en la API, intentar obtenerlo de los datos locales
            const localStudy = getStudyById(params.studyId)
            if (localStudy) {
              setStudy(localStudy)
            } else {
              notFound()
            }
          }
        }
      } catch (error) {
        console.error("Error fetching study data:", error)
        // Intentar obtenerlo de los datos locales en caso de error
        const localStudy = getStudyById(params.studyId)
        if (localStudy) {
          setStudy(localStudy)
        } else {
          notFound()
        }
      } finally {
        setLoading(false)
      }
    }

    fetchStudy()
  }, [params.studyId])

  const handleMediaClick = (mediaIndex: number) => {
    router.push(
      `/estudios/${study.tipo?.toLowerCase() || "unknown"}/${study.id_estudio || study.id}?media=${mediaIndex}`,
    )
  }

  const handleMediaLoaded = (mediaUrl: string) => {
    setLoadedMedia((prev) => ({
      ...prev,
      [mediaUrl]: true,
    }))
  }

  // Modificar la función isVideo para usar el campo formato
  const isVideo = (media: any): boolean => {
    if (!media) return false
    const formato = media.formato?.toLowerCase() || ""
    return formato.includes("video") || formato.includes("mp4") || false
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f9fa]">
        <GalleryHeader title="Cargando galería..." />
        <div className="container py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-pulse">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (!study) {
    notFound()
  }

  // Adaptar la estructura del estudio
  const adaptedStudy = {
    id: study.id_estudio || study.id,
    name: study.titulo || study.name,
    type: study.tipo || study.typeId || "Estudio",
    date: study.fecha_realizacion || study.date,
    // Usar media si existe, de lo contrario usar imagenes
    media: study.media || [],
    images: study.imagenes ? study.imagenes.map((img: any) => img.preview) : study.images || [],
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return dateString
    }
  }

  // Combinar media e imágenes para la galería
  const mediaItems =
    adaptedStudy.media.length > 0
      ? adaptedStudy.media.map((item: any) => ({
          preview: item.preview,
          formato: item.formato || "image/jpeg",
        }))
      : adaptedStudy.images.map((url: string) => ({
          preview: url,
          formato: "image/jpeg",
        }))

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#f8f9fa]">
        <GalleryHeader title={`Galería: ${adaptedStudy.name}`} />

        <div className="container py-6">
          <div className="flex flex-col gap-6">
            {/* Encabezado de la galería */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div>
                <h1 className="text-xl font-bold">{adaptedStudy.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{formatDate(adaptedStudy.date)}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#05A86B]/10 text-[#05A86B]">
                    {adaptedStudy.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Galería de medios */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mediaItems && mediaItems.length > 0 ? (
                mediaItems.map((media: any, index: number) => {
                  const isVideoMedia = isVideo(media)
                  return (
                    <div
                      key={`${adaptedStudy.id}-${index}`}
                      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                      onClick={() => handleMediaClick(index)}
                    >
                      <div className="aspect-square relative">
                        {/* Skeleton loader */}
                        {!loadedMedia[media.preview] && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

                        {isVideoMedia ? (
                          <>
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${media.preview || "/placeholder.svg"})` }}
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Video className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <div className="w-full h-full opacity-0" onLoad={() => handleMediaLoaded(media.preview)} />
                          </>
                        ) : (
                          <Image
                            src={media.preview || "/placeholder.svg"}
                            alt={`${adaptedStudy.name} - Medio ${index + 1}`}
                            fill
                            className={`object-cover transition-opacity duration-300 ${
                              loadedMedia[media.preview] ? "opacity-100" : "opacity-0"
                            }`}
                            sizes="(max-width: 640px) 150px, (max-width: 768px) 200px, 250px"
                            onLoad={() => handleMediaLoaded(media.preview)}
                          />
                        )}
                      </div>

                      {/* Tag con el nombre del medio */}
                      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-sm">
                          {isVideoMedia ? "Video" : "Imagen"} {index + 1}
                        </span>
                        {index === 0 && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#05A86B]/80 text-white backdrop-blur-sm">
                            Principal
                          </span>
                        )}
                      </div>

                      {/* Overlay al hacer hover */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 text-black text-xs font-medium px-3 py-1.5 rounded-full">
                          Ver {isVideoMedia ? "video" : "imagen"}
                        </span>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="col-span-full bg-white rounded-xl p-8 text-center">
                  <p className="text-gray-500">No hay medios disponibles para este estudio</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}
