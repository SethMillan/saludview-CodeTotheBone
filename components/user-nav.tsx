import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full text-[#05A86B] hover:text-[#048a59] hover:bg-[#05A86B]/10"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abstract-user-icon-cqtyF5P8OZg7c9XsQGjgZHdqKRK33q.png"
              alt="Avatar"
            />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Dr. García</p>
            <p className="text-xs leading-none text-muted-foreground">doctor@mediview.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer hover:bg-[#05A86B]/10 hover:text-[#05A86B]">
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-[#05A86B]/10 hover:text-[#05A86B]">
            Configuración
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer hover:bg-[#05A86B]/10 hover:text-[#05A86B]">
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
