---
name: UI animation preferences
description: User preferences for UI animations in the portfolio
type: feedback
---

**Rule:** Theme transition icons should only slide up/down, no rotation, no coloring (use white/text-white), no ripple circles, larger icons (w-24 h-24), centered overlay.

**Why:** The first iteration was too busy - rotating icons, colored icons, ripple circles all looked strange. User wants clean, minimal transitions.

**How to apply:** When creating the ThemeTransition or similar UI animation components, keep it simple: icons just move vertically with fade, no extra effects.
