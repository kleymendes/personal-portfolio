import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeTransition() {
  const { isAnimating, animatingTo } = useTheme()
  const toDark = animatingTo === 'dark'

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-20 h-20">
            {toDark ? (
              <>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: 80 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, y: -80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                >
                  <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: 80 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, y: -80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                >
                  <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
