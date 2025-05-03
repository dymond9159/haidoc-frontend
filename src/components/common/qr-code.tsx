"use client"

import { useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"

interface QRCodeProps {
  data: string
  size?: number
  color?: string
  backgroundColor?: string
  logoUrl?: string
  logoSize?: number
  className?: string
}

export function QRCode({
  data,
  size = 200,
  color = "#000000",
  backgroundColor = "#ffffff",
  logoUrl,
  logoSize = 50,
  className,
}: QRCodeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: "svg",
      data: data,
      dotsOptions: {
        color: color,
        type: "rounded",
      },
      backgroundOptions: {
        color: backgroundColor,
      },
      cornersSquareOptions: {
        type: "extra-rounded",
      },
      cornersDotOptions: {
        type: "dot",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
      },
    })

    if (logoUrl) {
      qrCode.update({
        image: logoUrl,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          imageSize: logoSize,
        },
      })
    }

    ref.current.innerHTML = ""
    qrCode.append(ref.current)
  }, [data, size, color, backgroundColor, logoUrl, logoSize])

  return <div ref={ref} className={className} />
}
