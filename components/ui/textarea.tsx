import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
          "px-3 min-h-[5rem] py-2 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full " +
          "focus:outline-none focus-visible:border-stone-400 focus:border-stone-400" +
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
