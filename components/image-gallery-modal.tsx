"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

interface ImageGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  estudio: {
    id_estudio: string
    tipo: string
    titulo: string
    imagenes: Array<{
      url: string
      formato: string
      preview: string
    }>
  }
}

export function ImageGalleryModal({ isOpen, onClose, estudio }: ImageGalleryModalProps) {
  const router = useRouter()
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  const handleImageClick = (imageIndex: number) => {
    router.push(`/estudios/${estudio.tipo.toLowerCase()}/${estudio.id_estudio}?imagen=${imageIndex}`)
    onClose()
  }

  const handleImageLoaded = (imageUrl: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [imageUrl]: true,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Imágenes de {estudio.titulo}</span>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {estudio.imagenes && estudio.imagenes.length > 0 ? (
            estudio.imagenes.map((imagen, index) => (
              <div
                key={`${estudio.id_estudio}-${index}`}
                className="relative aspect-square cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:border-[#05A86B] transition-all hover:shadow-md"
                onClick={() => handleImageClick(index)}
              >
                {/* Skeleton loader */}
                {!loadedImages[imagen.preview || imagen.url] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}

                <Image
                  src={imagen.preview || imagen.url || "/placeholder.svg"}
                  alt={`${estudio.titulo} - Imagen ${index + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-300 ${
                    loadedImages[imagen.preview || imagen.url] ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 640px) 150px, 200px"
                  onLoad={() => handleImageLoaded(imagen.preview || imagen.url)}
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2">
                  Imagen {index + 1}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No hay imágenes disponibles para este estudio</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
