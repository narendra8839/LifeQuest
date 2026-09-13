/**
 * confetti.ts — Lightweight zero-dependency celebration particle engine for LifeQuest.
 * Renders celebratory sparkles and golden embers across the screen upon quest conquer & level up.
 */

export function triggerCelebration(originX?: number, originY?: number) {
  if (typeof window === "undefined" || typeof document === "undefined") return

  // Check if reduced motion is requested
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const userReduced = localStorage.getItem("lifequest_reduce_motion") === "true"
  if (prefersReducedMotion || userReduced) return

  const container = document.createElement("div")
  container.style.position = "fixed"
  container.style.inset = "0"
  container.style.pointerEvents = "none"
  container.style.zIndex = "9999"
  container.style.overflow = "hidden"
  document.body.appendChild(container)

  const colors = [
    "#ffc659", // primary gold
    "#fbbc3e", // bright gold
    "#ddb8ff", // secondary purple
    "#57dffe", // tertiary cyan
    "#ffffff", // white sparkle
    "#e5a92b", // container gold
  ]

  const count = 48
  const startX = originX ?? window.innerWidth / 2
  const startY = originY ?? window.innerHeight / 2

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div")
    const color = colors[Math.floor(Math.random() * colors.length)]
    const size = Math.random() * 8 + 4
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
    const velocity = Math.random() * 350 + 150
    const vx = Math.cos(angle) * velocity
    const vy = Math.sin(angle) * velocity - 100 // slight upward bias

    p.style.position = "absolute"
    p.style.left = `${startX}px`
    p.style.top = `${startY}px`
    p.style.width = `${size}px`
    p.style.height = `${size}px`
    p.style.backgroundColor = color
    p.style.borderRadius = Math.random() > 0.4 ? "50%" : "2px"
    p.style.boxShadow = `0 0 8px ${color}`
    p.style.transition = "transform 1.2s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.2s ease-out"
    p.style.transform = "translate(0px, 0px) rotate(0deg) scale(1)"
    p.style.opacity = "1"

    container.appendChild(p)

    // Trigger animation in next frame
    requestAnimationFrame(() => {
      const rot = Math.random() * 720 - 360
      p.style.transform = `translate(${vx}px, ${vy + 200}px) rotate(${rot}deg) scale(0.2)`
      p.style.opacity = "0"
    })
  }

  setTimeout(() => {
    container.remove()
  }, 1400)
}
