import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    window.history.scrollRestoration = 'manual' // Disable browser scroll restoration
  }, [pathname])

  return null
}

export default ScrollToTop
