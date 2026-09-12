import type { Database } from "@/types/database"

export type Profile           = Database["public"]["Tables"]["profiles"]["Row"]
export type UpdateProfileInput = Database["public"]["Tables"]["profiles"]["Update"]
export type Attributes        = Database["public"]["Tables"]["attributes"]["Row"]
export type UpdateAttributesInput = Database["public"]["Tables"]["attributes"]["Update"]

export type AttributeKey = "intellect" | "strength" | "discipline" | "vitality" | "creativity"
