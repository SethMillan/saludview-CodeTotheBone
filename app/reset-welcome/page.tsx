"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { GalleryHeader } from "@/components/gallery-header"

export default function ResetWelcomePage() {
  const router = useRouter()

  const handleGoToHome = () => {
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <GalleryHeader title="Página de bienvenida" />

      <div className="container py-12">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Página de bienvenida</h1>

          <p className="text-gray-600 mb-6">
            La página de bienvenida ahora se muestra siempre que ingresas a la aplicación. Haz clic en el botón de abajo
            para ir a la página de inicio y ver la pantalla de bienvenida.
          </p>

          <Button onClick={handleGoToHome} className="w-full bg-[#05A86B] hover:bg-[#048a59] text-white">
            Ir a la página de inicio
          </Button>
        </div>
      </div>
    </main>
  )
}
