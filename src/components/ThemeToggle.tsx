import { useState } from 'react'

type Theme = 'light' | 'dark'

// The theme on screen now: the saved choice, or else the OS setting.
function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme
  if (chosen === 'light' || chosen === 'dark') return chosen
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  function handleClick() {
    document.documentElement.dataset.theme = next
    localStorage.setItem('okti-theme', next)
    setTheme(next)
  }

  return (
    <button type="button" className="theme-toggle" onClick={handleClick}>
      {next === 'light' ? 'Light theme' : 'Dark theme'}
    </button>
  )
}

export default ThemeToggle
