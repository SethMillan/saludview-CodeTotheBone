import { ArrowUpRight, Bone, Brain, Images, ScanEye, ShieldPlus } from "lucide-react"

import Link from "next/link"

interface StudyTypeCardProps {
  studyType: any // Cambiado de StudyType a any para ser más flexible con la estructura de datos
}

export function StudyTypeCard({ studyType }: StudyTypeCardProps) {
  // Asignar un color de fondo basado en el ID del tipo de estudio
  const getBgColor = (id: string) => {
    switch (id) {
      case "rayos-x":
        return "bg-[#d7e3fc]" // Azul claro
      case "mastografia":
        return "bg-[#ffd6a5]" // Naranja claro
      case "tomografia":
        return "bg-[#e6f7f0]" // Verde claro que combina con #05A86B
      case "resonancia":
        return "bg-[#fdffb6]" // Amarillo claro
      case "ultrasonido":
        return "bg-[#a0c4ff]" // Azul medio
      default:
        return "bg-[#e2e8f0]" // Gris claro por defecto
    }
  }

  // Renderizar el icono adecuado basado en el tipo de estudio
  const renderIcon = (iconType: string) => {
    return (
      <div className="w-10 h-10 bg-white/70 rounded-full flex items-center justify-center">
        {iconType === "xray" && <Bone />}
        {iconType === "mammography" && <ShieldPlus />}
        {iconType === "ct" && <Brain />}
        {iconType === "mri" && <ScanEye />}
        {iconType === "ultrasound" && <Images />}
        {!["xray", "mammography", "ct", "mri", "ultrasound"].includes(iconType) && <Images />}
      </div>
    )
  }

  // Verificar que studyType tenga las propiedades necesarias
  if (!studyType || !studyType.id || !studyType.name) {
    return (
      <div className="bg-gray-100 rounded-3xl p-5 h-40 flex flex-col justify-center items-center">
        <p className="text-gray-500 text-sm">Datos incompletos</p>
      </div>
    )
  }

  return (
    <Link href={`/estudios/${studyType.id}`}>
      <div
        className={`${getBgColor(
          studyType.id,
        )} rounded-3xl p-5 h-40 flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-1`}
      >
        <div>
          <h3 className="font-bold text-sm">{studyType.name}</h3>
          <p className="text-xs text-gray-700 mt-1 line-clamp-2">{studyType.description || "Sin descripción"}</p>
        </div>

        <div className="flex justify-between items-end">
          {renderIcon(studyType.icon || "")}
          <div className="h-8 w-8 bg-white/50 rounded-full flex items-center justify-center">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
