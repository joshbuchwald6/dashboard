'use client'

import { useState } from 'react'

export default function AccountsPage() {
  const [isOpen, setIsOpen] = useState(false)

  function handleAddAccount () {
    setIsOpen(true)
  }

  function handleClose () {
    setIsOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Accounts</h1>
        <button
          className='px-4 py-2 rounded-full bg-black text-white hover:bg-zinc-800 transition'
          onClick={handleAddAccount}
          type='button'
        >
          Add Account
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 max-w-[1600px] mx-auto">
        {/* Your accounts content will go here */}
      </div>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/60 z-50'>
          <div className='bg-white rounded-xl p-8 shadow-xl flex flex-col items-center'>
            <h2 className='text-2xl font-bold mb-4'>Success</h2>
            <button
              className='mt-4 px-4 py-2 rounded bg-zinc-800 text-white hover:bg-zinc-700 transition'
              onClick={handleClose}
              type='button'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 