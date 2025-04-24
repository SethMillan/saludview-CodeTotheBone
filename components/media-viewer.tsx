"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ZoomIn, ZoomOut, MoveHorizontal, Play, Pause, Volume2, VolumeX, RefreshCw } from "lucide-react"

interface MediaViewerProps {
  preview: string
  alt: string
  type: "image" | "video"
  formato?: string
}

export function MediaViewer({ preview, alt, type, formato }: MediaViewerProps) {
  // Estado para imágenes
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [mediaLoaded, setMediaLoaded] = useState(false)

  // Estado para videos
  const [isPlaying, setIsPlaying] = useState(type === "video") // Iniciar como true para videos
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoError, setVideoError] = useState(false)
  const [isLooping, setIsLooping] = useState(true) // Iniciar con bucle activado

  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Efecto para iniciar la reproducción automática cuando el video está listo
  useEffect(() => {
    if (type === "video" && videoRef.current && mediaLoaded) {
      videoRef.current.play().catch((error) => {
        console.error("Error al reproducir automáticamente el video:", error)
        // Muchos navegadores bloquean la reproducción automática con sonido
        // Intentar reproducir sin sonido
        if (videoRef.current) {
          videoRef.current.muted = true
          setIsMuted(true)
          videoRef.current.play().catch((innerError) => {
            console.error("Error al reproducir automáticamente incluso con mute:", innerError)
            setIsPlaying(false)
          })
        }
      })
    }
  }, [type, mediaLoaded])

  // Resetear posición cuando cambia la escala a 1
  useEffect(() => {
    if (scale === 1) {
      setPosition({ x: 0, y: 0 })
    }
  }, [scale])

  // Funciones para imágenes
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

  const handleMediaLoad = () => {
    setMediaLoaded(true)
  }

  // Funciones para videos
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error al reproducir el video:", error)
          setVideoError(true)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleLoop = () => {
    if (videoRef.current) {
      videoRef.current.loop = !isLooping
      setIsLooping(!isLooping)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setMediaLoaded(true)
    }
  }

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Error de video:", e)
    console.log("Formato del video:", formato)
    console.log("URL del video:", preview)
    setVideoError(true)
    setMediaLoaded(true) // Para quitar el skeleton
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="relative aspect-square w-full max-w-2xl mx-auto">
      {/* Controles comunes */}
      {type === "image" && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-4">
          <button
            onClick={handleZoomOut}
            className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg ${
              scale === 1 ? "bg-gray-200 text-gray-400" : "bg-white text-[#05A86B] active:bg-gray-100"
            }`}
            disabled={scale === 1}
            aria-label="Alejar"
          >
            <ZoomOut size={24} />
          </button>
          <button
            onClick={handleZoomIn}
            className="w-14 h-14 flex items-center justify-center bg-white text-[#05A86B] rounded-full shadow-lg active:bg-gray-100"
            disabled={scale >= 3}
            aria-label="Acercar"
          >
            <ZoomIn size={24} />
          </button>
        </div>
      )}

      {type === "image" && scale > 1 && (
        <div className="absolute top-3 left-0 right-0 z-10 flex justify-center">
          <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1.5 backdrop-blur-sm">
            <MoveHorizontal size={16} />
            <span>Arrastra para mover</span>
          </div>
        </div>
      )}

      {/* Contenedor para imagen */}
      {type === "image" && (
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
          {!mediaLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />}

          <div
            className={`w-full h-full transition-transform duration-200 ease-out ${
              mediaLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={preview || "/placeholder.svg"}
                alt={alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
                onLoad={handleMediaLoad}
              />
            </div>
          </div>
        </div>
      )}

      {/* Contenedor para video */}
      {type === "video" && (
        <div className="relative w-full h-full">
          {/* Skeleton loader */}
          {!mediaLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />}

          {videoError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
              <p className="text-red-500 font-medium mb-2">Error al cargar el video</p>
              <p className="text-gray-500 text-sm text-center">
                No se pudo reproducir el video. Puede que el formato no sea compatible o la URL no sea accesible.
              </p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                src={preview}
                className={`w-full h-full object-contain rounded-lg ${mediaLoaded ? "opacity-100" : "opacity-0"}`}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                onError={handleVideoError}
                muted={isMuted}
                loop={isLooping}
                autoPlay
                playsInline
                controls={false}
              />

              {/* Controles de video personalizados */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white"
                    aria-label={isPlaying ? "Pausar" : "Reproducir"}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>

                  <div className="flex-1 mx-2">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-white/30 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #05A86B ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) 0%)`,
                      }}
                    />
                  </div>

                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 flex items-center justify-center text-white"
                    aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>

                  <button
                    onClick={toggleLoop}
                    className={`w-8 h-8 flex items-center justify-center text-white ${
                      isLooping ? "text-[#05A86B]" : "text-white"
                    }`}
                    aria-label={isLooping ? "Desactivar bucle" : "Activar bucle"}
                    title={isLooping ? "Bucle activado" : "Bucle desactivado"}
                  >
                    <RefreshCw size={18} />
                  </button>

                  <span className="text-white text-xs">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Overlay para reproducir/pausar al hacer clic */}
              {!isPlaying && mediaLoaded && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="w-20 h-20 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full">
                    <Play size={36} className="text-white ml-1" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
