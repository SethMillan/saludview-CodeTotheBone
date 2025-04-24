"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"

interface ExternalPageViewerProps {
  url: string
  height?: string | number
  title?: string
}

export function ExternalPageViewer({ url, height = "600px", title = "Página externa" }: ExternalPageViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Reiniciar estados cuando cambia la URL
    setIsLoading(true)
    setError(null)
  }, [url])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError("No se pudo cargar la página externa. Es posible que el sitio no permita ser incrustado en iframes.")
  }

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200">
      {isLoading && (
        <div className="w-full bg-gray-100 animate-pulse" style={{ height }}>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-[#22c55e] border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-gray-500">Cargando página externa...</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full bg-red-50 flex items-center justify-center" style={{ height }}>
          <div className="text-center p-6">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-800 mb-2">Error de carga</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      <iframe
        src={url}
        title={title}
        width="100%"
        height={height}
        style={{ display: isLoading ? "none" : "block" }}
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-scripts allow-same-origin allow-forms"
        referrerPolicy="no-referrer"
        className="border-0"
      />
    </div>
  )
}
