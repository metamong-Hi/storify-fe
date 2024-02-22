'use client'
import ErrorPage from "@/components/userError/UserError"
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <ErrorPage/>
      </body>
    </html>
  )
}