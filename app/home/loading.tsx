import { Skeleton } from "@/components/ui/skeleton"
import { Activity } from "lucide-react"

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] px-4 py-8">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </header>

        <section className="mb-8">
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-40 mt-1" />
        </section>

        <div className="space-y-5">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-56 w-full rounded-3xl" />
          ))}
        </div>
      </div>
    </main>
  )
}
