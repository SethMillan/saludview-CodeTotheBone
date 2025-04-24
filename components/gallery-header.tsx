import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface GalleryHeaderProps {
  title: string
}

export function GalleryHeader({ title }: GalleryHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center">
        <Link href="/home">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 text-[#05A86B] hover:text-[#048a59] hover:bg-[#05A86B]/10"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Volver</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold truncate">{title}</h1>
      </div>
    </header>
  )
}
