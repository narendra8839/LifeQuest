import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gold-500 text-black hover:bg-gold-400 shadow-glow-gold",
        secondary:
          "bg-purple-600 text-white hover:bg-purple-500 shadow-glow-purple",
        outline:
          "border border-white/20 bg-transparent text-white hover:bg-white/5",
        ghost:
          "bg-transparent text-white/70 hover:bg-white/5 hover:text-white",
        danger:
          "bg-red-600 text-white hover:bg-red-500",
      },
      size: {
        sm:   "h-8  px-3  text-sm",
        md:   "h-10 px-4  text-sm",
        lg:   "h-12 px-6  text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export function Button({ className, variant, size, isLoading, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <span className="material-symbols-rounded animate-spin text-[18px]">progress_activity</span>
      ) : null}
      {children}
    </button>
  )
}
