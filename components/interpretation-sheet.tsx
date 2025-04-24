"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FileText, Download } from "lucide-react"
import { useState } from "react"

interface InterpretationSheetProps {
  interpretation: string
  date: string
  doctor?: string
  institution?: string
  recommendations?: string[]
}

export function InterpretationSheet({
  interpretation,
  date,
  doctor = "Dr. García Méndez",
  institution = "Hospital General",
  recommendations = [],
}: InterpretationSheetProps) {
  const [activeTab, setActiveTab] = useState<"interpretation" | "recommendations">("interpretation")

  const formattedDate = () => {
    try {
      return new Date(date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return date
    }
  }

  const handleDownload = () => {
    // Crear contenido para el PDF
    const content = `
      INTERPRETACIÓN MÉDICA
      
      Fecha: ${formattedDate()}
      Doctor: ${doctor}
      Institución: ${institution}
      
      CONCLUSIÓN:
      ${interpretation}
      
      ${
        recommendations.length > 0
          ? `RECOMENDACIONES:
      ${recommendations.map((rec) => `- ${rec}`).join("\n")}`
          : ""
      }
    `

    // Crear un blob y descargarlo
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `interpretacion-medica-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full bg-[#05A86B] hover:bg-[#048a59] text-white border-none">
          <FileText className="mr-2 h-4 w-4" />
          Interpretación
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl">Interpretación del estudio</SheetTitle>
          <SheetDescription>Análisis e interpretación realizada por un especialista</SheetDescription>
        </SheetHeader>

        <div className="mt-4 flex justify-between items-center">
          <span className="inline-block px-3 py-1 bg-[#05A86B]/10 text-[#05A86B] rounded-full font-medium text-sm">
            {formattedDate()}
          </span>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-[#05A86B] border-[#05A86B] hover:bg-[#05A86B]/10"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-1" />
              Descargar
            </Button>
          </div>
        </div>

        <div className="mt-6">
          {/* Tabs de navegación */}
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "interpretation"
                  ? "text-[#05A86B] border-b-2 border-[#05A86B]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("interpretation")}
            >
              Interpretación
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "recommendations"
                  ? "text-[#05A86B] border-b-2 border-[#05A86B]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("recommendations")}
            >
              Recomendaciones
            </button>
          </div>

          {/* Contenido de la pestaña activa */}
          <div className="mt-4 space-y-4">
            {activeTab === "interpretation" ? (
              <>
                <div className="bg-[#f8f9fa] p-5 rounded-xl">
                  <p className="text-sm whitespace-pre-line">{interpretation}</p>
                </div>

                <div className="bg-[#f8f9fa] p-5 rounded-xl">
                  <h3 className="text-sm font-semibold mb-2">Información del médico</h3>
                  <p className="text-sm text-gray-700">{doctor}</p>
                  <p className="text-xs text-gray-500 mt-1">{institution}</p>
                </div>
              </>
            ) : (
              <div className="bg-[#f8f9fa] p-5 rounded-xl">
                {recommendations && recommendations.length > 0 ? (
                  <ul className="space-y-2">
                    {recommendations.map((rec, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="inline-block h-5 w-5 rounded-full bg-[#05A86B] text-white flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No hay recomendaciones específicas para este estudio.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
