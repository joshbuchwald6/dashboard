'use client'
import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Card } from '@/components/ui/card'
import { ArrowDownLeft, ArrowUpRight, Plus, Send, User, CreditCard } from 'lucide-react'
import { TellerConnectButton } from '@/components/teller/TellerConnectButton'

/**
 * @param {{ data: number[], up: boolean }} props
 */
function MiniChart({ data, up }: { data: number[], up: boolean }) {
  if (!data || data.length === 0) return null
  const points = data.map((v: number, i: number) => `${i * 18},${32 - v * 0.25}`).join(' ')
  return (
    <svg width='108' height='16' viewBox='0 0 108 16' fill='none'>
      <polyline
        points={points}
        fill='none'
        stroke={up ? '#22c55e' : '#ef4444'}
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  )
}

MiniChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  up: PropTypes.bool
}

export default function AccountsBento () {
  const [mounted, setMounted] = useState(false)
  const [accounts, setAccounts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchAccounts = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    setHasError(false)
    try {
      const res = await fetch('/api/teller/accounts')
      if (!res.ok) throw new Error('Failed to fetch accounts')
      const data = await res.json()
      setAccounts(data.accounts || [])
    } catch (err) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (mounted) fetchAccounts()
  }, [fetchAccounts, mounted])

  /**
   * @param {any} enrollment
   */
  function handleAccountLinked(enrollment: any): void {
    fetch('/api/teller/save-access-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken: enrollment.accessToken })
    }).then(() => fetchAccounts())
  }

  const totalBalance = accounts.reduce((sum: number, acc: any) => sum + (acc.balances?.available || 0), 0)

  if (!mounted) return null

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 font-sans'>
      {/* Accounts Overview */}
      <Card className='col-span-2 bg-[#111113] rounded-2xl p-8 shadow-none border border-black/60'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-3'>
            <div className='bg-[#232326] rounded-xl p-3'>
              <CreditCard className='w-6 h-6 text-white/80' />
            </div>
            <h2 className='text-2xl font-bold text-white'>Accounts Overview</h2>
          </div>
          <div className='flex gap-2'>
            <TellerConnectButton onSuccess={handleAccountLinked} />
            <button className='flex items-center gap-2 px-4 py-2 rounded-full bg-[#a259ff] text-white text-sm font-medium hover:bg-[#7c3aed] transition'>
              <Send className='w-4 h-4' /> Transfer
            </button>
          </div>
        </div>
        <div className='text-4xl font-extrabold text-white mb-1'>${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        <div className='text-zinc-400 text-base mb-6'>Total Balance</div>
        {isLoading && <div className='text-white'>Loading accounts...</div>}
        {hasError && <div className='text-red-500'>Failed to load accounts.</div>}
        <div className='space-y-4'>
          {accounts.map((acc: any) => (
            <div key={acc.id} className='flex items-center gap-4 bg-[#18181b] rounded-xl px-5 py-4'>
              <div className='w-12 h-12 rounded-lg bg-[#232326] flex items-center justify-center'>
                <CreditCard className='w-6 h-6 text-white/60' />
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2'>
                  <span className='text-lg font-bold text-white truncate'>{acc.name}</span>
                  <span className='text-xs text-zinc-400 font-medium'>{acc.type}</span>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  <span className='text-2xl font-extrabold text-white'>${(acc.balances?.available || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                {/* Optionally render a chart if you have historical data */}
                {/* <MiniChart data={acc.chart} up={true} /> */}
              </div>
            </div>
          ))}
        </div>
      </Card>
      {/* No Recent Activity for now */}
    </div>
  )
} 