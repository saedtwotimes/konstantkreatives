import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-full max-w-md" />
      </div>

      {/* Progress Steps Skeleton */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="relative">
          <Skeleton className="h-2 w-full rounded-full" />
          <div className="flex justify-between mt-2">
            <div className="flex flex-col items-center">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-4 w-16 mt-1" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-4 w-16 mt-1" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-4 w-16 mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area Skeleton */}
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-5 w-full max-w-md mx-auto" />
        </div>

        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    </div>
  )
}

