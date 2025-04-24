"use client"

import type React from "react"

import { useState } from "react"
import { ExternalPageViewer } from "@/components/external-page-viewer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GalleryHeader } from "@/components/gallery-header"

export default function IntegracionPage() {
  const [url, setUrl] = useState("")
  const [currentUrl, setCurrentUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url) {
      // Asegurarse de que la URL tenga el formato correcto
      let formattedUrl = url
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        formattedUrl = `https://${url}`
      }
      setCurrentUrl(formattedUrl)
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <GalleryHeader title="Integración de página externa" />

      <div className="container py-6">
        <div className="mb-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Introduce la URL (ej: example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-[#05A86B] hover:bg-[#048a59] text-white">
              Cargar
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-1">
            Nota: Algunas páginas pueden no permitir ser incrustadas por políticas de seguridad.
          </p>
        </div>

        {currentUrl ? (
          <ExternalPageViewer url={currentUrl} height={600} />
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-2">Integración de páginas externas</h2>
            <p className="text-gray-500 mb-4">
              Introduce una URL en el campo de arriba para cargar una página externa.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
