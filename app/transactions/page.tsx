'use client'

import List02 from '@/components/kokonutui/list-02'
import { Card } from '@/components/ui/card'

export default function Page() {
  return (
    <Card className='p-6 bg-zinc-900 border border-zinc-800'>
      <h1 className='text-2xl font-bold text-white mb-6'>Transactions</h1>
      <List02 />
    </Card>
  )
} 