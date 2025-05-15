import { Card } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

export default function AccountsInsights() {
  return (
    <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-fuchsia-500/20 rounded-xl">
          <Sparkles className="w-6 h-6 text-fuchsia-500" />
        </div>
        <h2 className="text-xl font-bold text-white">Insights</h2>
      </div>
      <div className="text-gray-400">AI-powered insights about your accounts will appear here.</div>
    </Card>
  )
} 