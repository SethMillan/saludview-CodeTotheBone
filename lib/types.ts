export interface MediaItem {
  formato: string
  preview: string
  propiedades?: {
    resolucion?: string
    modo?: string
    tamaño_archivo?: string
  }
}

export interface StudyType {
  id: string
  name: string
  description: string
  image: string
  icon: string
}

export interface Study {
  id: string
  typeId: string
  name: string
  date: string
  media?: MediaItem[]
  images?: string[]
  interpretation: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface SharedLink {
  id: string
  studyId: string
  url: string
  createdAt: string
}
