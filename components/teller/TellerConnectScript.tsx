'use client'
import { useEffect } from 'react'

export function TellerConnectScript() {
  useEffect(() => {
    if (document.getElementById('teller-connect-script')) return
    const script = document.createElement('script')
    script.id = 'teller-connect-script'
    script.src = 'https://cdn.teller.io/connect/connect.js'
    script.async = true
    document.head.appendChild(script)
    return () => {
      const existingScript = document.getElementById('teller-connect-script')
      if (existingScript) existingScript.remove()
    }
  }, [])
  return null
} 