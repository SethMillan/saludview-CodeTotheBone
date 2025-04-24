import type { Study, StudyType } from "./types"

// Definimos los tipos de estudios sin los componentes de iconos
export const studyTypes: StudyType[] = [
  {
    id: "rayos-x",
    name: "Rayos X",
    description: "Imágenes diagnósticas mediante radiación ionizante",
    image: "/chest-xray-silhouette.png",
    icon: "xray",
  },
  {
    id: "mastografia",
    name: "Mastografía",
    description: "Estudio radiológico de las glándulas mamarias",
    image: "/mammography-scan.png",
    icon: "mammography",
  },
  {
    id: "tomografia",
    name: "Tomografía",
    description: "Imágenes por secciones mediante rayos X",
    image: "/axial-chest-ct.png",
    icon: "ct",
  },
  {
    id: "resonancia",
    name: "Resonancia Magnética",
    description: "Imágenes detalladas mediante campos magnéticos",
    image: "/brain-mri-scan.png",
    icon: "mri",
  },
  {
    id: "ultrasonido",
    name: "Ultrasonido",
    description: "Imágenes mediante ondas sonoras de alta frecuencia",
    image: "/abdominal-ultrasound.png",
    icon: "ultrasound",
  },
]

const studies: Study[] = [
  // Rayos X
  {
    id: "rx-torax-1",
    typeId: "rayos-x",
    name: "Radiografía de Tórax",
    date: "2023-12-15",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lateral-chest-xray-9xoW8CXGVtTir3k1riwVUL54mb3Yiw.png",
      "https://placehold.co/600x400/e2e8f0/1e293b?text=Radiograf%C3%ADa+de+T%C3%B3rax+Lateral",
    ],
    interpretation:
      "Campos pulmonares de adecuada transparencia. No se observan infiltrados ni consolidaciones. Silueta cardíaca de tamaño normal. Ángulos costofrénicos libres. Estructuras óseas sin alteraciones evidentes.\n\nImpresión diagnóstica: Estudio radiográfico de tórax dentro de parámetros normales.",
  },
  {
    id: "rx-columna-1",
    typeId: "rayos-x",
    name: "Radiografía de Columna Lumbar",
    date: "2023-11-20",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lumbar-spine-xray-rWPcGVXcLggXQC09lv72Iwn15Xsdr8.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lumbar-spine-lateral-T0WslcJrxwtIzvVuWq481iqPse7EoM.png",
    ],
    interpretation:
      "Lordosis lumbar conservada. Cuerpos vertebrales de altura conservada. Espacios intervertebrales L4-L5 y L5-S1 disminuidos. Osteofitos anteriores en L3, L4 y L5. No se observan listesis ni escoliosis.\n\nImpresión diagnóstica: Cambios degenerativos en columna lumbar, principalmente a nivel de L4-L5 y L5-S1.",
  },

  // Mastografía
  {
    id: "masto-1",
    typeId: "mastografia",
    name: "Mastografía Bilateral",
    date: "2023-10-05",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mammography-comparison-0JyjIEPHNsKtwAdzOHLpsKurvYk1O5.png",
      "https://placehold.co/600x400/ffd6a5/1e293b?text=Mastograf%C3%ADa+Vista+Lateral",
    ],
    interpretation:
      "Patrón fibroglandular heterogéneamente denso, que puede ocultar pequeñas masas. No se identifican nódulos, distorsiones arquitectónicas ni microcalcificaciones sospechosas. Piel y complejo areola-pezón sin alteraciones.\n\nImpresión diagnóstica: BIRADS 2 - Hallazgos benignos.",
  },
  {
    id: "masto-2",
    typeId: "mastografia",
    name: "Mastografía de Control",
    date: "2023-09-18",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mammography-comparison-0JyjIEPHNsKtwAdzOHLpsKurvYk1O5.png",
      "https://placehold.co/600x400/ffd6a5/1e293b?text=Mastograf%C3%ADa+de+Control+Vista+Lateral",
    ],
    interpretation:
      "Patrón fibroglandular de densidad media. Se observa nódulo de bordes bien definidos en cuadrante superior externo de mama derecha, de aproximadamente 8 mm, sin cambios respecto a estudio previo. No se identifican microcalcificaciones sospechosas.\n\nImpresión diagnóstica: BIRADS 3 - Hallazgo probablemente benigno. Se sugiere seguimiento ecográfico en 6 meses.",
  },

  // Tomografía
  {
    id: "tac-craneo-1",
    typeId: "tomografia",
    name: "TAC de Cráneo",
    date: "2023-08-22",
    images: [
      "https://placehold.co/600x400/e6f7f0/1e293b?text=TAC+de+Cr%C3%A1neo+Axial",
      "https://placehold.co/600x400/e6f7f0/1e293b?text=TAC+de+Cr%C3%A1neo+Coronal",
    ],
    interpretation:
      "Parénquima cerebral de densidad homogénea. Sistema ventricular de tamaño y morfología normal. No se observan lesiones focales intra ni extraaxiales. No hay evidencia de hemorragia ni efecto de masa. Estructuras óseas sin alteraciones.\n\nImpresión diagnóstica: Estudio tomográfico de cráneo sin alteraciones significativas.",
  },
  {
    id: "tac-abdomen-1",
    typeId: "tomografia",
    name: "TAC de Abdomen",
    date: "2023-07-14",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abdominal-ct-contrast-j2oScKk4YxTjb62ZAigEx5D9w2F9jI.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abdominal-ct-scan-bigyhtqsXkq1pB3833ImM6jXOk4ZIL.png",
    ],
    interpretation:
      "Hígado de tamaño normal, con densidad homogénea, sin lesiones focales. Vesícula biliar distendida, sin litiasis. Páncreas, bazo y glándulas suprarrenales sin alteraciones. Riñones de tamaño y morfología normal, sin evidencia de litiasis. No se observa líquido libre en cavidad abdominal.\n\nImpresión diagnóstica: Estudio tomográfico de abdomen dentro de límites normales.",
  },

  // Resonancia
  {
    id: "rm-rodilla-1",
    typeId: "resonancia",
    name: "RM de Rodilla Derecha",
    date: "2023-06-30",
    images: [
      "https://placehold.co/600x400/fdffb6/1e293b?text=RM+de+Rodilla+Sagital",
      "https://placehold.co/600x400/fdffb6/1e293b?text=RM+de+Rodilla+Coronal",
    ],
    interpretation:
      "Ligamentos cruzados anterior y posterior íntegros. Ligamentos colaterales conservados. Menisco medial con señal intrasustancia en cuerno posterior, sin evidencia de ruptura. Menisco lateral sin alteraciones. Cartílago articular conservado. No hay derrame articular significativo.\n\nImpresión diagnóstica: Cambios degenerativos iniciales en menisco medial, sin evidencia de ruptura meniscal.",
  },
  {
    id: "rm-columna-1",
    typeId: "resonancia",
    name: "RM de Columna Cervical",
    date: "2023-05-25",
    images: [
      "https://placehold.co/600x400/fdffb6/1e293b?text=RM+de+Columna+Cervical+Sagital",
      "https://placehold.co/600x400/fdffb6/1e293b?text=RM+de+Columna+Cervical+Axial",
    ],
    interpretation:
      "Lordosis cervical conservada. Médula espinal de intensidad de señal normal. Discos intervertebrales C4-C5 y C5-C6 con protrusión posterior que contacta el saco dural sin compresión medular. Espacios de conjugación conservados. No hay evidencia de estenosis del canal raquídeo.\n\nImpresión diagnóstica: Discopatía degenerativa C4-C5 y C5-C6 sin compromiso medular.",
  },

  // Ultrasonido
  {
    id: "us-abdomen-1",
    typeId: "ultrasonido",
    name: "Ultrasonido Abdominal",
    date: "2023-04-12",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abdominal-ultrasound-aR7Q2f6S1rJy6CLAYwiFE0vUbkQNeg.png",
      "https://placehold.co/600x400/a0c4ff/1e293b?text=Ultrasonido+Abdominal+Ri%C3%B1ones",
    ],
    interpretation:
      "Hígado de tamaño normal, con ecogenicidad homogénea, sin lesiones focales. Vesícula biliar distendida, de paredes delgadas, sin litiasis en su interior. Vía biliar intrahepática y extrahepática no dilatada. Páncreas de ecogenicidad normal. Bazo homogéneo de tamaño normal. Riñones de tamaño y ecogenicidad normal, sin evidencia de litiasis o hidronefrosis.\n\nImpresión diagnóstica: Estudio ultrasonográfico abdominal dentro de parámetros normales.",
  },
  {
    id: "us-tiroides-1",
    typeId: "ultrasonido",
    name: "Ultrasonido de Tiroides",
    date: "2023-03-08",
    images: [
      "https://placehold.co/600x400/a0c4ff/1e293b?text=Ultrasonido+de+Tiroides+Transversal",
      "https://placehold.co/600x400/a0c4ff/1e293b?text=Ultrasonido+de+Tiroides+Longitudinal",
    ],
    interpretation:
      "Glándula tiroides de situación habitual, con dimensiones conservadas. Lóbulo derecho con nódulo hipoecogénico de bordes bien definidos, de 7x5 mm, sin microcalcificaciones. Lóbulo izquierdo sin alteraciones. Istmo de grosor normal. No se observan adenopatías cervicales patológicas.\n\nImpresión diagnóstica: Nódulo tiroideo derecho TIRADS 3 (probablemente benigno). Se sugiere seguimiento ecográfico en 6 meses.",
  },
]

export function getStudyTypeById(id: string): StudyType | undefined {
  return studyTypes.find((type) => type.id === id)
}

export function getStudiesByType(typeId: string): Study[] {
  return studies.filter((study) => study.typeId === typeId)
}

export function getStudyById(id: string): Study | undefined {
  return studies.find((study) => study.id === id)
}
