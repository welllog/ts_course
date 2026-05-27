import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const XP_THRESHOLDS = [0, 50, 120, 220, 350, 520, 730, 990, 1300, 1670, 2100, 2600, 3180, 3840, 4590, 5440, 6400, 7480, 8690, 10000]

function calcLevel(xp: number): number {
  let level = 1
  for (let i = 0; i < XP_THRESHOLDS.length; i++) {
    if (xp >= XP_THRESHOLDS[i]) level = i + 1
    else break
  }
  return Math.min(level, 20)
}

function xpForNextLevel(level: number): number {
  return XP_THRESHOLDS[Math.min(level, 19)]
}

function xpForCurrentLevel(level: number): number {
  return XP_THRESHOLDS[Math.max(level - 1, 0)]
}

export const ACHIEVEMENTS = {
  FIRST_LESSON: { id: 'first-lesson', label: '初学者', description: '完成第一课', icon: '🌱' },
  PERFECT_LESSON: { id: 'perfect-lesson', label: '满分通关', description: '三颗心完成一课', icon: '⭐' },
  JS_MODULE: { id: 'js-module', label: 'JS 达人', description: '完成 JavaScript 基础模块', icon: '🟡' },
  TS_BASIC: { id: 'ts-basic', label: 'TS 入门', description: '完成 TypeScript 入门模块', icon: '🔷' },
  TS_ADVANCED: { id: 'ts-advanced', label: 'TS 大师', description: '完成 TypeScript 进阶模块', icon: '🏆' },
  STREAK_7: { id: 'streak-7', label: '一周连胜', description: '连续 7 天学习', icon: '🔥' },
  CODER: { id: 'coder', label: '开发者', description: '完成 5 个代码挑战', icon: '💻' },
}

export interface LessonResult {
  stars: number
  xpEarned: number
  completedAt: string
}

interface ProgressState {
  xp: number
  level: number
  streak: number
  longestStreak: number
  lastPlayedDate: string
  completedLessons: Record<string, LessonResult>
  achievements: string[]

  addXp: (amount: number) => void
  completeLesson: (lessonId: string, stars: number, xpEarned: number) => void
  unlockAchievement: (achievementId: string) => void
  updateStreak: () => void
  getLevelProgress: () => { current: number; next: number; pct: number }
  isLessonComplete: (lessonId: string) => boolean
  getLessonStars: (lessonId: string) => number
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      streak: 0,
      longestStreak: 0,
      lastPlayedDate: '',
      completedLessons: {},
      achievements: [],

      addXp: (amount) =>
        set((state) => {
          const newXp = state.xp + amount
          return { xp: newXp, level: calcLevel(newXp) }
        }),

      completeLesson: (lessonId, stars, xpEarned) => {
        const prev = get().completedLessons[lessonId]
        if (prev && prev.stars >= stars) return
        set((state) => ({
          completedLessons: {
            ...state.completedLessons,
            [lessonId]: { stars, xpEarned, completedAt: new Date().toISOString() },
          },
        }))
        get().addXp(xpEarned)
        get().updateStreak()

        const completed = get().completedLessons
        const count = Object.keys(completed).length

        if (count === 1) get().unlockAchievement(ACHIEVEMENTS.FIRST_LESSON.id)
        if (stars === 3) get().unlockAchievement(ACHIEVEMENTS.PERFECT_LESSON.id)

        const codeCount = Object.keys(completed).filter((id) => id.includes('code') || parseInt(id.split('-')[2] ?? '0') >= 9).length
        if (codeCount >= 5) get().unlockAchievement(ACHIEVEMENTS.CODER.id)

        const jsKeys = Object.keys(completed).filter((id) => id.startsWith('js-'))
        if (jsKeys.length >= 12) get().unlockAchievement(ACHIEVEMENTS.JS_MODULE.id)

        const tsBasicKeys = Object.keys(completed).filter((id) => id.startsWith('ts-basic-'))
        if (tsBasicKeys.length >= 10) get().unlockAchievement(ACHIEVEMENTS.TS_BASIC.id)

        const tsAdvKeys = Object.keys(completed).filter((id) => id.startsWith('ts-adv-'))
        if (tsAdvKeys.length >= 10) get().unlockAchievement(ACHIEVEMENTS.TS_ADVANCED.id)
      },

      unlockAchievement: (achievementId) =>
        set((state) => {
          if (state.achievements.includes(achievementId)) return state
          return { achievements: [...state.achievements, achievementId] }
        }),

      updateStreak: () =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0]
          if (state.lastPlayedDate === today) return state
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
          const newStreak = state.lastPlayedDate === yesterday ? state.streak + 1 : 1
          const newLongest = Math.max(newStreak, state.longestStreak)
          return { streak: newStreak, longestStreak: newLongest, lastPlayedDate: today }
        }),

      getLevelProgress: () => {
        const { xp, level } = get()
        const currentFloor = xpForCurrentLevel(level)
        const nextCeil = xpForNextLevel(level)
        const pct = level >= 20 ? 100 : Math.round(((xp - currentFloor) / (nextCeil - currentFloor)) * 100)
        return { current: xp - currentFloor, next: nextCeil - currentFloor, pct }
      },

      isLessonComplete: (lessonId) => !!get().completedLessons[lessonId],

      getLessonStars: (lessonId) => get().completedLessons[lessonId]?.stars ?? 0,
    }),
    { name: 'ts-quest-progress' }
  )
)
