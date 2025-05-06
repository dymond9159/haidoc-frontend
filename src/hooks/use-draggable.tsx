"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface UseDraggableOptions {
  onDragStart?: () => void
  onDragEnd?: (x: number, y: number) => void
}

export function useDraggable(elementRef: React.RefObject<HTMLElement>, options?: UseDraggableOptions) {
  const [isDragging, setIsDragging] = useState(false)
  const initialPositionRef = useRef({ x: 0, y: 0 })
  const currentPositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      initialPositionRef.current = {
        x: e.clientX - currentPositionRef.current.x,
        y: e.clientY - currentPositionRef.current.y,
      }
      options?.onDragStart?.()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const x = e.clientX - initialPositionRef.current.x
      const y = e.clientY - initialPositionRef.current.y

      currentPositionRef.current = { x, y }

      // Apply transform to element
      element.style.transform = `translate(${x}px, ${y}px)`
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return

      setIsDragging(false)
      options?.onDragEnd?.(e.clientX, e.clientY)
    }

    element.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      element.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [elementRef, isDragging, options])

  return { isDragging }
}
