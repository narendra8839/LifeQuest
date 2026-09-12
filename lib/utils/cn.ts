import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/** cn — merges Tailwind classes with clsx, resolving conflicts via tailwind-merge. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
