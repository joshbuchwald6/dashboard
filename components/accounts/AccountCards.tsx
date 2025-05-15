import { Card } from '@/components/ui/card'
import { Wallet, Plus, Eye, Lock, Edit2, Trash2 } from 'lucide-react'

const demoCards = [
  {
    type: 'Visa',
    number: '**** 1234',
    name: 'Josh Buchwald',
    balance: 8459.45,
    bg: 'bg-gradient-to-tr from-purple-600 to-indigo-600',
    logo: '/visa.svg',
    color: 'text-white',
  },
  {
    type: 'Mastercard',
    number: '**** 5678',
    name: 'Josh Buchwald',
    balance: 2850.00,
    bg: 'bg-gradient-to-tr from-pink-500 to-yellow-500',
    logo: '/mastercard.svg',
    color: 'text-white',
  },
  {
    type: 'Virtual',
    number: '**** 9012',
    name: 'Josh Buchwald',
    balance: 1200.00,
    bg: 'bg-gradient-to-tr from-emerald-500 to-cyan-500',
    logo: '/virtual.svg',
    color: 'text-white',
  },
]

export default function AccountCards() {
  return (
    <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <Wallet className="w-6 h-6 text-purple-500" />
        </div>
        <h2 className="text-xl font-bold text-white">Account Cards</h2>
        <button className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 transition">
          <Plus className="w-4 h-4" /> Add Card
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        {demoCards.map((card, i) => (
          <div key={i} className={`min-w-[260px] max-w-[260px] h-[160px] rounded-2xl shadow-lg relative flex flex-col justify-between p-5 ${card.bg} ${card.color} transition-transform hover:scale-105`}>
            <div className="flex justify-between items-center">
              <img src={card.logo} alt={card.type} className="h-7 w-12 object-contain" />
              <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full uppercase tracking-widest">{card.type}</span>
            </div>
            <div>
              <p className="text-lg font-mono tracking-widest mb-1">{card.number}</p>
              <p className="text-xs text-white/80">{card.name}</p>
            </div>
            <div className="flex justify-between items-end mt-2">
              <span className="text-xl font-bold">${card.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <div className="flex gap-2">
                <button className="p-1 rounded-full bg-black/30 hover:bg-black/50 transition" title="Show">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 rounded-full bg-black/30 hover:bg-black/50 transition" title="Freeze">
                  <Lock className="w-4 h-4" />
                </button>
                <button className="p-1 rounded-full bg-black/30 hover:bg-black/50 transition" title="Edit">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-1 rounded-full bg-black/30 hover:bg-red-600 transition" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
} 