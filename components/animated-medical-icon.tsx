"use client"

import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

interface AnimatedMedicalIconProps {
  type: "xray" | "ultrasound" | "heart"
}

export function AnimatedMedicalIcon({ type }: AnimatedMedicalIconProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
    const interval = setInterval(() => {
      setAnimate(false)
      setTimeout(() => setAnimate(true), 100)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full w-full">
      {type === "xray" && (
        <div className={`transition-all duration-700 ${animate ? "scale-110" : "scale-100"}`}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M8 18V6h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8Z" className="fill-primary/20" />
            <path d="M15 6h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1" />
            <path d="M10 16v-3a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v3" />
            <path
              d="M7 13h0a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1Z"
              className={`transition-all duration-500 ${animate ? "fill-primary" : "fill-primary/30"}`}
            />
            <path
              d="M17 13h0a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1Z"
              className={`transition-all duration-500 ${animate ? "fill-primary" : "fill-primary/30"}`}
            />
          </svg>
        </div>
      )}

      {type === "ultrasound" && (
        <div className={`transition-all duration-700 ${animate ? "scale-110" : "scale-100"}`}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M2 12h2" />
            <path d="M6 12h2" />
            <path d="M10 12h2" />
            <path d="M14 12h2" />
            <path d="M18 12h2" />
            <path d="M22 12h2" />
            <path
              d="M6 16c1.5 2 3.5 2.5 5 2.5 1.5 0 3.5-.5 5-2.5"
              className={`transition-all duration-500 ${animate ? "stroke-primary stroke-[2.5]" : "stroke-primary/70"}`}
            />
            <path
              d="M8 8c1 1.5 2.5 2 4 2s3-.5 4-2"
              className={`transition-all duration-500 ${animate ? "stroke-primary stroke-[2.5]" : "stroke-primary/70"}`}
            />
          </svg>
        </div>
      )}

      {type === "heart" && (
        <div className={`transition-all duration-700 ${animate ? "scale-110" : "scale-100"}`}>
          <Heart
            className={`h-16 w-16 transition-all duration-500 ${
              animate ? "fill-primary text-primary" : "fill-primary/20 text-primary"
            }`}
          />
        </div>
      )}
    </div>
  )
}
