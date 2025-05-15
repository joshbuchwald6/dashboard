import { Card } from '@/components/ui/card'
import { Clock, ArrowRight } from 'lucide-react'

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="p-8 flex flex-col items-center text-center bg-black/90 border border-white/10 rounded-3xl max-w-md">
        <div className="p-4 bg-purple-500/20 rounded-2xl mb-6">
          <Clock className="w-8 h-8 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
        <p className="text-zinc-400 mb-6">We're working hard to bring you this feature. Stay tuned for updates!</p>
        <button className="px-6 py-3 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition flex items-center gap-2">
          Join Waitlist <ArrowRight className="w-4 h-4" />
        </button>
      </Card>
    </div>
  )
} 