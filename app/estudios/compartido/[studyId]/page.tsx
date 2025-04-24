"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

interface SharedStudyPageProps {
  params: {
    studyId: string
  }
}

export default function SharedStudyPage({ params }: SharedStudyPageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStudyType() {
      try {
        // Intentar obtener el estudio de la API
        const response = await fetch("https://sd-example.clvrt.workers.dev/")
        if (response.ok) {
          const data = await response.json()
          const foundStudy = data.estudios?.find((est: any) => est.id_estudio === params.studyId)

          if (foundStudy) {
            // Redirigir al visor del estudio con el tipo correcto
            router.replace(`/estudios/${foundStudy.tipo.toLowerCase()}/${params.studyId}`)
          } else {
            // Si no se encuentra, mostrar error
            setError("No se encontró el estudio compartido")
            setLoading(false)
          }
        } else {
          throw new Error("Error al obtener datos del servidor")
        }
      } catch (error) {
        console.error("Error fetching study data:", error)
        setError("No se pudo cargar el estudio compartido")
        setLoading(false)
      }
    }

    fetchStudyType()
  }, [params.studyId, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl p-6 shadow-sm">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6 mb-6" />
          <Skeleton className="h-64 w-full mb-4 rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl p-6 shadow-sm text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Estudio no encontrado</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/home")}
            className="px-4 py-2 bg-[#05A86B] text-white rounded-lg hover:bg-[#048a59]"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return null // No debería llegar aquí debido a la redirección
}
