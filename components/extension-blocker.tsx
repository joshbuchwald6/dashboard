'use client'

import { useEffect, useLayoutEffect } from "react"
import { blockCryptoExtensions } from "@/lib/block-extensions"

export function ExtensionBlocker() {
  // Use useLayoutEffect to run blocking before render
  useLayoutEffect(() => {
    blockCryptoExtensions()
  }, [])
  
  // Also use useEffect as a fallback for SSR
  useEffect(() => {
    blockCryptoExtensions()
  }, [])
  
  return null
}