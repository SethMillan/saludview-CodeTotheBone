"use client"

import { GalleryHeader } from "@/components/gallery-header"
import { InterpretationSheet } from "@/components/interpretation-sheet"
import { ShareButton } from "@/components/share-button"
import { getStudyById } from "@/lib/data"
import { notFound, useSearchParams } from "next/navigation"
import { MediaViewer } from "@/components/media-viewer"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Video } from "lucide-react"
import { PageTransition } from "@/components/page-transition"

interface StudyDetailPageProps {
  params: {
    typeId: string
    studyId: string
  }
}

export default function StudyDetailPage({ params }: StudyDetailPageProps) {
  const searchParams = useSearchParams()
  const selectedMediaIndex = Number.parseInt(searchParams.get("media") || searchParams.get("imagen") || "0", 10)
  const [study, setStudy] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(selectedMediaIndex)

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

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f9fa]">
        <GalleryHeader title="Cargando..." />
        <div className="container py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </main>
    )
  }

  if (!study) {
    notFound()
  }

  // Adaptar la estructura del estudio para el componente
  const adaptedStudy = {
    id: study.id_estudio || study.id,
    name: study.titulo || study.name,
    date: study.fecha_realizacion || study.date,
    // Usar media si existe, de lo contrario usar imagenes
    media:
      study.media ||
      study.imagenes?.map((img: any) => ({
        formato: img.formato || (typeof img === "string" ? "image/jpeg" : "image/jpeg"),
        preview: img.preview || img,
      })) ||
      [],
    images: study.imagenes ? study.imagenes.map((img: any) => img.preview || img) : study.images || [],
    interpretation: study.interpretacion?.conclusion || study.interpretation || "",
    recommendations: study.interpretacion?.recomendaciones || [],
    doctor: study.nombre_medico || "Dr. Especialista",
    institution: study.institucion || "Hospital General",
    link_estudio: study.link_estudio, // Añadir el link_estudio al objeto adaptado
  }

  // Determinar si el medio actual es un video
  const isVideo = (media: any): boolean => {
    if (!media) return false
    const formato = media.formato?.toLowerCase() || ""
    return formato.includes("video") || formato.includes("mp4") || false
  }

  // Obtener los medios para mostrar
  const mediaItems =
    adaptedStudy.media.length > 0
      ? adaptedStudy.media
      : adaptedStudy.images.map((url: string) => ({
          formato: "image/jpeg",
          preview: url,
        }))

  const currentMedia = mediaItems[currentMediaIndex] || { preview: "/placeholder.svg", formato: "image/jpeg" }
  const currentMediaType = isVideo(currentMedia) ? "video" : "image"

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : prev))
  }

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentMediaIndex(index)
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#f8f9fa]">
        <GalleryHeader title={adaptedStudy.name} />

        <section className="container py-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{adaptedStudy.name}</h1>
              <ShareButton studyId={adaptedStudy.id} typeId={params.typeId} link_estudio={study.link_estudio} />
            </div>

            <div className="bg-background rounded-lg p-4 shadow-sm">
              <MediaViewer
                preview={currentMedia.preview || "/placeholder.svg"}
                alt={`${adaptedStudy.name} - Medio ${currentMediaIndex + 1}`}
                type={currentMediaType}
                formato={currentMedia.formato}
              />
            </div>

            {/* Miniaturas de medios */}
            {mediaItems.length > 1 && (
              <div className="flex overflow-x-auto gap-2 py-2 px-1">
                {mediaItems.map((media: any, index: number) => {
                  const isVideoThumb = isVideo(media)
                  return (
                    <div
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`relative min-w-[80px] h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                        currentMediaIndex === index ? "border-[#05A86B]" : "border-transparent"
                      }`}
                    >
                      {isVideoThumb ? (
                        <div className="w-full h-full relative">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${media.preview || "/placeholder.svg"})` }}
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Video className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={media.preview || "/placeholder.svg"}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <div className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm">
              <button
                onClick={handlePrevMedia}
                disabled={currentMediaIndex === 0}
                className={`p-2 rounded-full ${
                  currentMediaIndex === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#05A86B]/10 text-[#05A86B] hover:bg-[#05A86B]/20"
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-medium">
                {currentMediaType === "video" ? "Video" : "Imagen"} {currentMediaIndex + 1} de {mediaItems.length}
              </span>
              <button
                onClick={handleNextMedia}
                disabled={currentMediaIndex === mediaItems.length - 1}
                className={`p-2 rounded-full ${
                  currentMediaIndex === mediaItems.length - 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#05A86B]/10 text-[#05A86B] hover:bg-[#05A86B]/20"
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <InterpretationSheet
              interpretation={adaptedStudy.interpretation}
              date={adaptedStudy.date}
              doctor={adaptedStudy.doctor}
              institution={adaptedStudy.institution}
              recommendations={adaptedStudy.recommendations}
            />
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
