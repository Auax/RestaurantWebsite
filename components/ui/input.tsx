import * as React from "react"

import {cn} from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({className, type, ...props}, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "px-3 py-2 bg-gray-50 bg-background border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full " +
                    "focus:outline-none focus-visible:border-stone-400 focus:border-stone-400" +
                    "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export {Input}
