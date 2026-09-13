"use client"

import { useHero } from "@/lib/stores/heroStore"

/**
 * AttributeRadar — Custom 5-sided SVG Radar Chart for Character Sanctum.
 * Dynamically updates as Discipline, Intellect, Vitality, Creativity, and Strength evolve.
 */
export function AttributeRadar() {
  const { attributes } = useHero()

  // 5 attributes normalized to 0–100 scale (default base max 100)
  const stats = [
    { key: "discipline", label: "Discipline", value: attributes.discipline, color: "#ddb8ff" },
    { key: "intellect",  label: "Intellect",  value: attributes.intellect,  color: "#57dffe" },
    { key: "vitality",   label: "Vitality",   value: attributes.vitality,   color: "#ffc659" },
    { key: "creativity", label: "Creativity", value: attributes.creativity, color: "#ddb8ff" },
    { key: "strength",   label: "Strength",   value: attributes.strength,   color: "#ffb4ab" },
  ]

  const size = 300
  const center = size / 2
  const maxRadius = 110

  // Calculate coordinates for 5 vertices given a radius factor (0 to 1)
  const getCoordinates = (index: number, factor: number) => {
    // 5 points rotated so index 0 is at the top (-PI/2)
    const angle = (index * 2 * Math.PI) / 5 - Math.PI / 2
    const r = maxRadius * factor
    const x = center + r * Math.cos(angle)
    const y = center + r * Math.sin(angle)
    return { x, y }
  }

  // Polygon points for grid rings (20%, 40%, 60%, 80%, 100%)
  const gridRings = [0.2, 0.4, 0.6, 0.8, 1.0].map((factor) => {
    return [0, 1, 2, 3, 4]
      .map((i) => {
        const { x, y } = getCoordinates(i, factor)
        return `${x},${y}`
      })
      .join(" ")
  })

  // Data polygon points based on actual attribute values (clamped 10 to 100)
  const dataPoints = stats.map((s, i) => {
    const factor = Math.min(100, Math.max(15, s.value)) / 100
    return getCoordinates(i, factor)
  })

  const polygonPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <div className="relative flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-[#0c0e13] p-6 shadow-inner">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
          Pentagram Aura Matrix
        </span>
        <span className="text-[10px] font-bold text-[#ddb8ff] uppercase tracking-wider">
          Harmonic Resonance
        </span>
      </div>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        aria-label="Character Attributes Radar Chart"
      >
        <defs>
          {/* Glowing purple gradient for the polygon */}
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#641ea3" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#ddb8ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2dc3e1" stopOpacity="0.6" />
          </linearGradient>

          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric Pentagon Grid Rings */}
        {gridRings.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            strokeDasharray={idx === 4 ? "none" : "2,2"}
          />
        ))}

        {/* Spokes connecting center to each vertex */}
        {[0, 1, 2, 3, 4].map((i) => {
          const outer = getCoordinates(i, 1.0)
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          )
        })}

        {/* The Filled Data Polygon */}
        <polygon
          points={polygonPath}
          fill="url(#radarGradient)"
          stroke="#ddb8ff"
          strokeWidth="2"
          filter="url(#radarGlow)"
          className="transition-all duration-700 ease-out"
        />

        {/* Vertex Markers & Labels */}
        {stats.map((s, i) => {
          const pt = dataPoints[i]
          const labelPt = getCoordinates(i, 1.28)

          return (
            <g key={s.key}>
              {/* Vertex Circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill={s.color}
                stroke="#0c0e13"
                strokeWidth="1.5"
                className="transition-all duration-700 ease-out"
              />

              {/* Label & Value */}
              <text
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#ffffff"
                fontSize="10.5"
                fontWeight="700"
                letterSpacing="0.04em"
              >
                {s.label}
              </text>
              <text
                x={labelPt.x}
                y={labelPt.y + 12}
                textAnchor="middle"
                dominantBaseline="central"
                fill={s.color}
                fontSize="9.5"
                fontWeight="800"
                fontFamily="monospace"
              >
                {s.value}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
