import { useRouter } from "next/router"
import { useMemo } from "react"

export function useLocale(): string | null {
  const router = useRouter()
  return useMemo(() => {
    const match = router.route.match(/^\/(fr)(\/|$)/)
    return match && match[1]
  }, [router.route])
}

export function useLang(): string {
  return useLocale() || "en"
}
