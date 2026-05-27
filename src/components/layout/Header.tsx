import { Link, useLocation } from 'react-router-dom'
import { useProgressStore } from '../../store/useProgressStore'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

function XPBar() {
  const { xp, level, getLevelProgress } = useProgressStore()
  const { current, next, pct } = getLevelProgress()
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-xs font-bold text-white">
          {level}
        </span>
        <span className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:block">
          LV
        </span>
      </div>
      <div className="hidden sm:block">
        <div className="mb-0.5 flex items-center justify-between gap-4">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {xp} XP
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {current}/{next}
          </span>
        </div>
        <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function DarkModeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const stored = localStorage.getItem('ts-quest-theme')
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  const toggle = () => {
    setDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('ts-quest-theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-xl text-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
      aria-label="Toggle dark mode"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}

export default function Header() {
  const { streak } = useProgressStore()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link
          to="/"
          className={clsx(
            'flex items-center gap-2 font-bold transition-opacity',
            isHome ? 'opacity-100' : 'opacity-80 hover:opacity-100'
          )}
        >
          <span className="text-2xl">⚡</span>
          <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            TS Quest
          </span>
        </Link>

        <div className="flex-1" />

        {streak > 0 && (
          <div className="flex items-center gap-1 rounded-lg bg-orange-50 px-2.5 py-1 text-sm font-semibold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
            🔥 {streak}
          </div>
        )}

        <XPBar />
        <DarkModeToggle />
      </div>
    </header>
  )
}
