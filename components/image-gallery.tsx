"use client"

import type { Study } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Video } from "lucide-react"

interface ImageGalleryProps {
  studies: Study[]
}

export function ImageGallery({ studies }: ImageGalleryProps) {
  const [mounted, setMounted] = useState(false)
  const [loadedMedia, setLoadedMedia] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMediaLoaded = (studyId: string) => {
    setLoadedMedia((prev) => ({
      ...prev,
      [studyId]: true,
    }))
  }

  // Modificar la función isVideo para usar el campo formato
  const isVideo = (media: any): boolean => {
    if (!media) return false
    const formato = media.formato?.toLowerCase() || ""
    return formato.includes("video") || formato.includes("mp4") || false
  }

  if (!mounted) {
    return (
      <div className="gallery-grid">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    )
  }

  return (
    <div className="gallery-grid">
      {studies.map((study) => {
        // Usar el primer elemento de media
        const mediaItem = study.media?.[0] || { preview: "/placeholder.svg", formato: "image/jpeg" }
        const mediaUrl = mediaItem.preview || "/placeholder.svg"
        const isVideoMedia = isVideo(mediaItem)

        return (
          <Link key={study.id} href={`/estudios/${study.typeId}/${study.id}`} className="block">
            <div className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-square w-full">
                {/* Skeleton loader */}
                {!loadedMedia[study.id] && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

                {isVideoMedia ? (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${mediaUrl})` }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Video className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="w-full h-full opacity-0" onLoad={() => handleMediaLoaded(study.id)} />
                  </>
                ) : (
                  <Image
                    src={mediaUrl || "/placeholder.svg"}
                    alt={study.name}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      loadedMedia[study.id] ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-width: 640px) 150px, 200px"
                    loading="lazy"
                    onLoad={() => handleMediaLoaded(study.id)}
                  />
                )}
              </div>
              <div className="p-2">
                <h3 className="text-sm font-medium truncate">{study.name}</h3>
                <p className="text-xs inline-block mt-1 px-2 py-0.5 bg-[#05A86B]/10 text-[#05A86B] rounded-full font-medium">
                  {new Date(study.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-sm">
      <div className="relative aspect-square w-full bg-gray-200 animate-pulse" />
      <div className="p-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  )
}
