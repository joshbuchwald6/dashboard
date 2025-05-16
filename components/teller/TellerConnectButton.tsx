'use client'
import { useTellerConnect } from 'teller-connect-react'
import PropTypes from 'prop-types'

export function TellerConnectButton({ onSuccess }: { onSuccess?: (enrollment: any) => void }) {
  const appId = 'app_pdl5011f79hbrerqk2000'
  const { open, ready } = useTellerConnect({
    applicationId: appId,
    environment: 'development', // or 'production' for prod
    products: ['balance', 'transactions'],
    onSuccess: (enrollment) => {
      if (onSuccess) onSuccess(enrollment)
    },
    onExit: () => {},
    onEvent: () => {}
  })

  console.log('Teller App ID:', appId)
  console.log('Teller ready:', ready)

  return (
    <button
      onClick={() => {
        if (!ready) {
          alert('Teller Connect is not ready. Check your App ID and network.')
          return
        }
        open()
      }}
      disabled={!ready}
      className='flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition border border-zinc-800'
    >
      Add Account
    </button>
  )
}

TellerConnectButton.propTypes = {
  onSuccess: PropTypes.func
} 