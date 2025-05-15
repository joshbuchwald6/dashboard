'use client'
import { useTellerConnect } from 'teller-connect-react'
import PropTypes from 'prop-types'

export function TellerConnectButton({ onSuccess }: { onSuccess?: (enrollment: any) => void }) {
  console.log('Teller App ID (from React):', process.env.NEXT_PUBLIC_TELLER_APP_ID)
  const { open, ready } = useTellerConnect({
    applicationId: String(process.env.NEXT_PUBLIC_TELLER_APP_ID || ''),
    environment: 'development',
    products: ['balance', 'transactions'],
    onSuccess: (enrollment) => {
      console.log('Teller Connect onSuccess:', enrollment)
      if (onSuccess) onSuccess(enrollment)
    },
    onExit: () => {
      console.log('Teller Connect closed')
    },
    onEvent: (event) => {
      console.log('Teller Connect event:', event)
    }
  })

  return (
    <button
      className='cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition border border-zinc-800'
      onClick={() => {
        console.log('Button works! (raw click)')
        if (!ready) {
          alert('Teller Connect is not ready. Check your App ID and network.')
          return
        }
        console.log('Add Account button clicked, ready:', ready)
        open()
      }}
      type='button'
      // REMOVE disabled for now to force clickability
    >
      Add Account
    </button>
  )
}

TellerConnectButton.propTypes = {
  onSuccess: PropTypes.func
} 