import { useState, useEffect } from 'react'
import "./ThemeToggle.less"

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark'
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark])

    return (
        <button 
        onClick={() => setIsDark(!isDark)}
        className="theme-toggle"
        >
        {isDark ? '☼' : '☽'}
        </button>
    )
}