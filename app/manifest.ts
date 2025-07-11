import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MediView - Visualizador de Estudios Médicos",
    short_name: "MediView",
    description: "Visualiza e interpreta tus estudios médicos de forma sencilla",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#05A86B",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
