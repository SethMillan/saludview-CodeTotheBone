"use client"

import { useEffect, useRef } from "react"

interface AnimatedWaveProps {
  className?: string
}

export function AnimatedWave({ className = "" }: AnimatedWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const waves = {
      y: canvas.height / 2,
      length: 0.01,
      amplitude: 20,
      frequency: 0.01,
    }

    const strokeColor = {
      h: 142,
      s: 76,
      l: 36,
      a: 0.5,
    }

    let increment = waves.frequency

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)

      for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, waves.y + Math.sin(i * waves.length + increment) * waves.amplitude * Math.sin(increment))
      }

      ctx.strokeStyle = `hsla(${strokeColor.h}, ${strokeColor.s}%, ${strokeColor.l}%, ${strokeColor.a})`
      ctx.lineWidth = 2
      ctx.stroke()

      increment += waves.frequency

      requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      waves.y = canvas.height / 2
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />
}
