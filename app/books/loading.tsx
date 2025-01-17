import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen  p-8">
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <Skeleton className="h-8 w-48 " />
        <Skeleton className="h-4 w-32 " />
      </div>

      {/* Featured Books Section */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-6 w-36 " />
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card Skeleton */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Skeleton className="absolute inset-0 " />
          </div>

          {/* Book Cover Skeletons */}
          {[0, 1].map((index) => (
            <div
              key={index}
              className="relative aspect-[3/4] rounded-lg overflow-hidden"
            >
              <Skeleton className="absolute inset-0 " />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <Skeleton className="h-4 w-3/4  mb-2" />
                <Skeleton className="h-4 w-1/2 " />
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicators */}
        <div className="mt-8 space-y-4">
          <Skeleton className="h-4 w-full " />
          <Skeleton className="h-4 w-3/4 " />
          <Skeleton className="h-4 w-1/2 " />
        </div>
      </div>
    </div>
  );
}
