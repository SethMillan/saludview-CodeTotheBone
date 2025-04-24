import { GalleryHeader } from "@/components/gallery-header"
import { ImageGallery } from "@/components/image-gallery"
import { getStudiesByType, getStudyTypeById } from "@/lib/data"
import { notFound } from "next/navigation"
import { PageTransition } from "@/components/page-transition"

interface GalleryPageProps {
  params: {
    typeId: string
  }
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  // Intentar obtener los datos de la API
  let studyType = null
  let studies = []

  try {
    const response = await fetch("https://sd-example.clvrt.workers.dev/")
    if (response.ok) {
      const data = await response.json()

      // Filtrar estudios por tipo
      studies = data.estudios?.filter((est: any) => est.tipo.toLowerCase() === params.typeId) || []

      // Si hay estudios, crear un objeto studyType
      if (studies.length > 0) {
        studyType = {
          id: params.typeId,
          name: studies[0].tipo,
          description: `Colección de estudios de ${studies[0].tipo}`,
        }
      }
    }
  } catch (error) {
    console.error("Error fetching API data:", error)
  }

  // Si no se encuentra en la API, intentar obtenerlo de los datos locales
  if (!studyType) {
    studyType = getStudyTypeById(params.typeId)
    studies = getStudiesByType(params.typeId)
  }

  if (!studyType) {
    notFound()
  }

  // Adaptar la estructura de los estudios de la API al formato que espera el componente
  const adaptedStudies = studies.map((study: any) => ({
    id: study.id_estudio || study.id,
    typeId: params.typeId,
    name: study.titulo || study.name,
    date: study.fecha_realizacion || study.date,
    // Usar media si existe, de lo contrario usar imagenes
    media:
      study.media ||
      study.imagenes?.map((img: any) => ({
        url: img.url || img,
        formato: img.formato || (typeof img === "string" ? "image/jpeg" : "image/jpeg"),
        preview: img.preview || img,
      })) ||
      [],
    images: study.imagenes ? study.imagenes.map((img: any) => img.preview || img.url || img) : study.images || [],
    interpretation: study.interpretacion?.conclusion || study.interpretation || "",
  }))

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#f8f9fa]">
        <GalleryHeader title={studyType.name} />

        <section className="container py-6">
          <h1 className="text-2xl font-bold mb-2">{studyType.name}</h1>
          <p className="text-muted-foreground mb-6">{studyType.description}</p>

          <ImageGallery studies={adaptedStudies} />
        </section>
      </main>
    </PageTransition>
  )
}
