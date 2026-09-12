import { cn } from "@/lib/utils/cn"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gold" | "purple" | "cyan"
}

export function Card({ className, variant = "default", children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rpg-panel",
        {
          "rpg-panel-gold":   variant === "gold",
          "rpg-panel-purple": variant === "purple",
          "rpg-panel-cyan":   variant === "cyan",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex items-center justify-between", className)} {...props}>{children}</div>
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-display text-lg font-semibold text-white", className)} {...props}>{children}</h3>
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props}>{children}</div>
}
