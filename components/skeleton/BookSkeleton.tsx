import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function BookSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      {/* Cover image skeleton */}
      <Skeleton className="h-[360px] w-[240px] rounded-lg" />

      <div className="flex flex-col gap-4">
        {/* Category badge skeleton */}
        <Skeleton className="h-5 w-20" />

        <div className="space-y-2">
          {/* Title skeleton */}
          <Skeleton className="h-8 w-[250px]" />
          
          {/* Author and date skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <Skeleton className="h-6 w-[140px]" />
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-[100px]" />
              {/* Quote skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[40%]" />
              </div>
              {/* Summary skeleton */}
              <div className="space-y-2 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

