"use client"

import { ReactNode } from "react"
import { DataCacheProvider } from "@/components/data-cache-provider"

export function Providers({ children }: { children: ReactNode }) {
  return <DataCacheProvider>{children}</DataCacheProvider>
}
