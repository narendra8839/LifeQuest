import { cn } from "@/lib/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        gold:   "bg-gold-500/15   text-gold-400   border border-gold-500/30",
        purple: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
        cyan:   "bg-cyan-500/15   text-cyan-400   border border-cyan-500/30",
        white:  "bg-white/10      text-white/70   border border-white/20",
        red:    "bg-red-500/15    text-red-400    border border-red-500/30",
      },
    },
    defaultVariants: { variant: "white" },
  }
)

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  )
}
