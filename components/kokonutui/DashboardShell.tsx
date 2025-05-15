'use client'

import { useDashboardSection } from '@/store/useDashboardSection'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardContent from './content'
import { AccountsSection } from '@/components/accounts/AccountsSection'
import { TransactionsSection } from '@/components/transactions/TransactionsSection'

export default function DashboardShell() {
  const { activeSection } = useDashboardSection()

  return (
    <div className='flex-1 flex flex-col min-h-0'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className='flex-1 min-h-0'
        >
          {activeSection === 'dashboard' && <DashboardContent />}
          {activeSection === 'accounts' && <AccountsSection />}
          {activeSection === 'transactions' && <TransactionsSection />}
          {/* Add more sections as needed */}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 