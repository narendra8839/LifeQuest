interface AttributeBarProps {
  label: string
  value: number
  maxValue?: number
  color?: "gold" | "purple" | "cyan"
}

/** AttributeBar — single RPG stat bar. TODO: implement from Stitch design. */
export function AttributeBar(_props: AttributeBarProps) {
  return <div className="flex items-center gap-3">{/* TODO */}</div>
}
