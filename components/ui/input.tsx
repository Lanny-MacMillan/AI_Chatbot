import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        style={{
        border: '2px solid',
        borderImage: 'linear-gradient(to right,#7427f7,#5be9b9, #bc3ed3) 30',
      }}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-custom-purple-200 focus:shadow-[0_0_0_2px] focus:shadow-violet9  disabled:cursor-not-allowed disabled:opacity-50 placeholder: font-customBoldItalic inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[45px] gap-[5px]  text-violet11 shadow-[0_2px_10px] bg-mauve3 data-placeholder:customBlackItalic outline-none pr-12",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
