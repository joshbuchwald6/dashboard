import { create } from 'zustand'

export type DashboardSection =
  | 'dashboard'
  | 'accounts'
  | 'transactions'
  | 'budget'
  | 'spending-trends'
  | 'goals'
  | 'investments'
  | 'tax-tools'

interface DashboardSectionState {
  activeSection: DashboardSection
  setActiveSection: (section: DashboardSection) => void
}

export const useDashboardSection = create<DashboardSectionState>((set: (fn: (state: DashboardSectionState) => DashboardSectionState | Partial<DashboardSectionState>) => void) => ({
  activeSection: 'dashboard',
  setActiveSection: (section: DashboardSection) => set({ activeSection: section })
})) 