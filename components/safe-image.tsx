"use client"

import { useState } from "react"
import Image from "next/image"

interface SafeImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fallbackSrc?: string
  onError?: () => void
}

const DEFAULT_FALLBACK = "/images/stock/general/flag-1361377_1280.jpg"

export default function SafeImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  priority = false,
  fallbackSrc = DEFAULT_FALLBACK,
  onError
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [hasErrored, setHasErrored] = useState(false)

  const handleError = () => {
    if (!hasErrored && currentSrc !== fallbackSrc) {
      setHasErrored(true)
      setCurrentSrc(fallbackSrc)
      onError?.()
    }
  }

  const imageProps = {
    src: currentSrc,
    alt,
    className,
    priority,
    onError: handleError,
  }

  if (fill) {
    return <Image {...imageProps} fill />
  }

  if (width && height) {
    return <Image {...imageProps} width={width} height={height} />
  }

  // Default fallback for when neither fill nor dimensions are provided
  return <Image {...imageProps} width={800} height={400} />
}