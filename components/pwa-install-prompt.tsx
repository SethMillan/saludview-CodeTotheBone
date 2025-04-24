"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Detectar si es iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    // Escuchar el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenir que Chrome muestre el prompt automáticamente
      e.preventDefault()
      // Guardar el evento para usarlo más tarde
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Mostrar nuestro botón de instalación
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Limpiar el event listener
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Mostrar el prompt de instalación
    deferredPrompt.prompt()

    // Esperar a que el usuario responda al prompt
    const { outcome } = await deferredPrompt.userChoice

    // Limpiar el evento guardado
    setDeferredPrompt(null)

    // Ocultar el botón de instalación si el usuario aceptó
    if (outcome === "accepted") {
      setIsInstallable(false)
    }
  }

  // No mostrar nada si la app no es instalable o ya está instalada
  if (!isInstallable && !isIOS) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img src="/logo_pwa.png" alt="MediView Logo" className="w-12 h-12" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">Instala MediView</h3>
          {isIOS ? (
            <p className="text-sm text-gray-600 mb-2">
              Para instalar esta app en tu iPhone, toca el botón "Compartir" y luego "Añadir a pantalla de inicio".
            </p>
          ) : (
            <p className="text-sm text-gray-600 mb-2">
              Instala esta aplicación en tu dispositivo para acceder a tus estudios médicos sin conexión.
            </p>
          )}
          {!isIOS && (
            <Button onClick={handleInstallClick} className="bg-[#05A86B] hover:bg-[#048a59] text-white">
              <Download className="mr-2 h-4 w-4" />
              Instalar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
