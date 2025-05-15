import { Card } from '@/components/ui/card'
import { Banknote, Plus, Edit2, Trash2 } from 'lucide-react'

const demoBankAccounts = [
  {
    name: 'Main Savings',
    type: 'Savings',
    balance: 8459.45,
    logo: '/bank1.png',
    activity: 'Interest +$5.12',
    color: 'bg-emerald-500',
  },
  {
    name: 'Checking Account',
    type: 'Checking',
    balance: 2850.00,
    logo: '/bank2.png',
    activity: 'Deposit +$1,200',
    color: 'bg-blue-500',
  },
  {
    name: 'Emergency Fund',
    type: 'Savings',
    balance: 3000.00,
    logo: '/bank3.png',
    activity: 'Transfer +$500',
    color: 'bg-purple-500',
  },
]

export default function BankAccounts() {
  return (
    <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-500/20 rounded-xl">
          <Banknote className="w-6 h-6 text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-white">Bank Accounts</h2>
        <button className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition">
          <Plus className="w-4 h-4" /> Add Account
        </button>
      </div>
      <div className="space-y-4">
        {demoBankAccounts.map((acc, i) => (
          <div key={i} className="flex items-center gap-3 bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition">
            <img src={acc.logo} alt={acc.name} className={`w-10 h-10 rounded-lg ${acc.color} object-cover`} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{acc.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">{acc.type}</span>
              </div>
              <div className="text-xs text-zinc-400 mt-1">{acc.activity}</div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-lg font-bold text-white">${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <div className="flex gap-1 mt-2">
                <button className="p-1 rounded-full bg-black/30 hover:bg-black/50 transition" title="Edit">
                  <Edit2 className="w-4 h-4 text-zinc-300" />
                </button>
                <button className="p-1 rounded-full bg-black/30 hover:bg-red-600 transition" title="Delete">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
} 