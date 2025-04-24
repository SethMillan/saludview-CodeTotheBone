"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ZoomIn, ZoomOut, MoveHorizontal } from "lucide-react"

interface ZoomableImageProps {
  src: string
  alt: string
}

export function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Resetear posición cuando cambia la escala a 1
  useEffect(() => {
    if (scale === 1) {
      setPosition({ x: 0, y: 0 })
    }
  }, [scale])

  const handleZoomIn = () => {
    if (scale < 3) {
      setScale((prev) => prev + 0.5)
    }
  }

  const handleZoomOut = () => {
    if (scale > 1) {
      setScale((prev) => Math.max(1, prev - 0.5))
    }
  }

  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2)
    } else {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (scale > 1 && e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && scale > 1) {
      const maxOffset = (scale - 1) * 150 // Limitar el desplazamiento basado en el zoom

      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y

      setPosition({
        x: Math.min(Math.max(newX, -maxOffset), maxOffset),
        y: Math.min(Math.max(newY, -maxOffset), maxOffset),
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      e.preventDefault() // Prevenir scroll

      const maxOffset = (scale - 1) * 150

      const newX = e.touches[0].clientX - dragStart.x
      const newY = e.touches[0].clientY - dragStart.y

      setPosition({
        x: Math.min(Math.max(newX, -maxOffset), maxOffset),
        y: Math.min(Math.max(newY, -maxOffset), maxOffset),
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div className="relative aspect-square w-full max-w-2xl mx-auto">
      {/* Controles de zoom optimizados para móviles */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-4">
        <button
          onClick={handleZoomOut}
          className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg ${
            scale === 1 ? "bg-gray-200 text-gray-400" : "bg-white text-[#22c55e] active:bg-gray-100"
          }`}
          disabled={scale === 1}
          aria-label="Alejar"
        >
          <ZoomOut size={24} />
        </button>
        <button
          onClick={handleZoomIn}
          className="w-14 h-14 flex items-center justify-center bg-white text-[#22c55e] rounded-full shadow-lg active:bg-gray-100"
          disabled={scale >= 3}
          aria-label="Acercar"
        >
          <ZoomIn size={24} />
        </button>
      </div>

      {scale > 1 && (
        <div className="absolute top-3 left-0 right-0 z-10 flex justify-center">
          <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1.5 backdrop-blur-sm">
            <MoveHorizontal size={16} />
            <span>Arrastra para mover</span>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden cursor-${scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        style={{ touchAction: scale > 1 ? "none" : "auto" }}
      >
        {/* Skeleton loader */}
        {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />}

        <div
          className={`w-full h-full transition-transform duration-200 ease-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
