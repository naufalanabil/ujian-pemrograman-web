import { Skeleton } from "@/components/ui/skeleton"

export  function CommentSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-lg p-4">
      {/* Avatar skeleton */}
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          {/* Username skeleton */}
          <Skeleton className="h-4 w-[100px]" />
          {/* Timestamp skeleton */}
          <Skeleton className="h-4 w-[150px]" />
        </div>
        {/* Comment content skeleton */}
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}

