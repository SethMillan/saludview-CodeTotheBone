import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { WelcomeOverlay } from "@/components/welcome-overlay"
import { PageTransition } from "@/components/page-transition"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"

export default function SplashScreen() {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#fcf7f4]">
        {/* Welcome overlay that only shows on first visit */}
        <WelcomeOverlay />

        {/* PWA Install Prompt */}
        <PWAInstallPrompt />

        <div className="max-w-md w-full flex flex-col items-center gap-8 splash-animation">
          <div className="flex flex-col items-center gap-2">
            <div className="h-24 w-24 bg-[#05A86B] rounded-full flex items-center justify-center">
              <img src="/logo_pwa.png" alt="MediView Logo" className="h-16 w-16" />
            </div>
            <h1 className="text-4xl font-bold text-[#05A86B] mt-4">MediView</h1>
            <p className="text-gray-500 text-center max-w-xs">
              Tu compañero para visualizar y entender tus estudios médicos de forma fácil y amigable
            </p>
          </div>

          <div className="w-full my-4 rounded-2xl overflow-hidden">
            <video autoPlay loop muted playsInline className="w-full h-auto" poster="/medical-app-interface.png">
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vid_2_sd-rptre7Gs52bdSUbo0i8IDfobDaUJ8Z.mp4"
                type="video/mp4"
              />
              Tu navegador no soporta videos HTML5.
            </video>
          </div>

          <Link href="/home" className="w-full max-w-xs">
            <Button
              className="w-full text-lg py-6 group relative overflow-hidden bg-[#05A86B] hover:bg-[#048a59] text-white border-none"
              size="lg"
            >
              <span className="relative z-10">Comenzar</span>
              <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 bg-[#048a59] w-0 group-hover:w-full transition-all duration-300"></span>
            </Button>
          </Link>
        </div>
      </main>
    </PageTransition>
  )
}
