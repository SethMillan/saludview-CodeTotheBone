"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Share, Users, UserRound, Copy, ExternalLink } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Actualizar la interfaz de props para incluir typeId
interface ShareButtonProps {
  studyId: string
  typeId?: string // Nuevo prop para el tipo de estudio
  link_estudio?: string
}

export function ShareButton({ studyId, typeId, link_estudio }: ShareButtonProps) {
  const [copiedFamily, setCopiedFamily] = useState(false)
  const [copiedDoctor, setCopiedDoctor] = useState(false)

  // Modificar la URL para que dirija directamente al visor del estudio
  const familyShareUrl = typeId
    ? `${window.location.origin}/estudios/${typeId}/${studyId}`
    : `${window.location.origin}/estudios/compartido/${studyId}`

  // Usar link_estudio si está disponible, de lo contrario usar una URL predeterminada
  const doctorShareUrl =
    link_estudio || "https://demo1.meddream.com/?study=1.2.840.113619.2.67.2158294438.15745010109084247.20000"

  const copyToClipboard = (url: string, setStateFn: (value: boolean) => void) => {
    navigator.clipboard.writeText(url)
    setStateFn(true)
    setTimeout(() => setStateFn(false), 2000)
  }

  const openExternalViewer = () => {
    window.open(doctorShareUrl, "_blank")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          <Share className="mr-2 h-4 w-4" />
          Compartir
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-lg">
        <DialogHeader>
          <DialogTitle>Compartir estudio</DialogTitle>
          <DialogDescription>Elige cómo quieres compartir este estudio médico</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="family" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 rounded-xl p-1">
            <TabsTrigger value="family" className="flex items-center gap-2 rounded-lg">
              <Users className="h-4 w-4" />
              <span>Familiares y amigos</span>
            </TabsTrigger>
            <TabsTrigger value="doctor" className="flex items-center gap-2 rounded-lg">
              <UserRound className="h-4 w-4" />
              <span>Para médicos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="family" className="mt-4">
            <Card className="rounded-xl border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Compartir con familiares y amigos</CardTitle>
                <CardDescription>
                  Comparte este enlace para que tus seres queridos puedan ver tu estudio de forma sencilla
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Input value={familyShareUrl} readOnly className="flex-1 rounded-lg" />
                  <Button
                    onClick={() => copyToClipboard(familyShareUrl, setCopiedFamily)}
                    className="shrink-0 bg-[#05A86B] hover:bg-[#048a59] text-white border-none rounded-lg"
                  >
                    {copiedFamily ? "¡Copiado!" : "Copiar"}
                    <Copy className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctor" className="mt-4">
            <Card className="rounded-xl border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Compartir con profesionales médicos</CardTitle>
                <CardDescription>
                  Este enlace abre tu estudio en un visor médico profesional para un análisis detallado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Input value={doctorShareUrl} readOnly className="flex-1 rounded-lg" />
                  <Button
                    onClick={() => copyToClipboard(doctorShareUrl, setCopiedDoctor)}
                    className="shrink-0 bg-[#05A86B] hover:bg-[#048a59] text-white border-none rounded-lg"
                  >
                    {copiedDoctor ? "¡Copiado!" : "Copiar"}
                    <Copy className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button
                  variant="outline"
                  onClick={openExternalViewer}
                  className="w-full flex items-center justify-center gap-2 border-[#05A86B] text-[#05A86B] hover:bg-[#05A86B]/10 rounded-lg"
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir en visor médico profesional
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
