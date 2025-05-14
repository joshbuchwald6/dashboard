'use client'

import { useEffect } from "react"
import { blockCryptoExtensions } from "@/lib/block-extensions"

export function ExtensionBlocker() {
  useEffect(() => {
    blockCryptoExtensions()
  }, [])
  
  return null
}