import { create } from 'zustand'

interface DashboardSectionState {
  section: string
  setSection: (section: string) => void
}

export const useDashboardSection = create<DashboardSectionState>(set => ({
  section: 'dashboard',
  setSection: section => set({ section })
})) 