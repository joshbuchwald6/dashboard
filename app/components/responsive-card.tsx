import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ResponsiveCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode
  title?: string
  description?: string
  footer?: React.ReactNode
  className?: string
  contentClassName?: string
  headerClassName?: string
  footerClassName?: string
}

export function ResponsiveCard({
  children,
  title,
  description,
  footer,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  ...props
}: ResponsiveCardProps) {
  return (
    <Card className={cn("border-slate-800 bg-black/60 backdrop-blur-xl", className)} {...props}>
      {(title || description) && (
        <CardHeader className={cn("space-y-1", headerClassName)}>
          {title && <CardTitle className="text-2xl font-bold tracking-tight text-white">{title}</CardTitle>}
          {description && <CardDescription className="text-slate-400">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn("px-4 sm:px-6", contentClassName)}>{children}</CardContent>
      {footer && (
        <CardFooter
          className={cn("flex flex-col space-y-4 border-t border-slate-800 pt-4 px-4 sm:px-6", footerClassName)}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}
