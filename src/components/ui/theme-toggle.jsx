'use client'

import React, { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    (<Button
      variant="outline"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      className="relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out bg-gray-200 dark:bg-gray-700">
      <span
        className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out transform ${isDark ? 'translate-x-6 bg-gray-800' : 'bg-yellow-500'}`}>
        {isDark ? <Moon size={12} className="text-gray-200" /> : <Sun size={12} className="text-gray-800" />}
      </span>
    </Button>)
  );
}

export default ThemeToggle