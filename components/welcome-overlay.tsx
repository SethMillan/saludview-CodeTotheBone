"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function WelcomeOverlay() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Solo para manejar la carga inicial y evitar parpadeos
    setLoading(false)
  }, [])

  const handleContinue = () => {
    router.push("/home")
  }

  // Solo ocultar durante la carga inicial para evitar parpadeos
  if (loading) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <iframe
        src="https://v0-splash-screen-design-three.vercel.app/"
        title="Bienvenida a MediView"
        className="absolute inset-0 w-screen h-screen border-0"
        sandbox="allow-scripts allow-same-origin allow-forms"
        referrerPolicy="no-referrer"
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
      />

      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center z-10">
        <Button
          onClick={handleContinue}
          className="bg-[#05A86B] hover:bg-[#048a59] text-white px-10 py-3 rounded-full text-base font-medium w-56 h-14 shadow-lg"
        >
          Continuar a la aplicación
        </Button>
      </div>
    </div>
  )
}
