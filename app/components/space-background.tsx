"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Star properties
    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = []
    const starCount = Math.floor((canvas.width * canvas.height) / 2000) // Responsive star count

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: 0.05 + Math.random() * 0.1,
        opacity: 0.5 + Math.random() * 0.5,
      })
    }

    // Animation
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        // Twinkle effect
        star.opacity = 0.5 + Math.random() * 0.5

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Move stars
        star.y += star.speed

        // Reset stars that go off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/20 to-black/80" />

      {/* Animated planets */}
      <motion.div
        className="absolute right-[10%] top-[15%] h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 opacity-40 blur-md"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-[15%] top-[60%] h-48 w-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 opacity-30 blur-md"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-[70%] top-[70%] h-64 w-64 rounded-full bg-gradient-to-br from-indigo-500 to-purple-700 opacity-20 blur-md"
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </>
  )
}
