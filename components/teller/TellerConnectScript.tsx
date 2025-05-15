'use client'
import { useEffect } from 'react'

export function TellerConnectScript() {
  useEffect(() => {
    // Check if script is already loaded
    if (document.getElementById('teller-connect-script')) {
      console.log('Teller script already exists')
      return
    }

    console.log('Loading Teller Connect script...')

    // Create and append script
    const script = document.createElement('script')
    script.id = 'teller-connect-script'
    script.src = 'https://cdn.teller.io/connect/connect.js'
    script.async = true
    script.onload = () => {
      console.log('Teller Connect script loaded')
      // Initialize TellerConnect
      if (window.TellerConnect) {
        console.log('TellerConnect object found after script load')
      } else {
        console.error('TellerConnect object not found after script load')
      }
    }
    script.onerror = (error) => {
      console.error('Error loading Teller Connect script:', error)
    }
    document.head.appendChild(script)

    // Cleanup
    return () => {
      const existingScript = document.getElementById('teller-connect-script')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return null
} 