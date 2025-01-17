import { Skeleton } from "./ui/skeleton";

export default function ProfileSkeleton() {
    return (
      <div className="flex items-center space-x-2 p-2">
        <Skeleton className="h-12 w-12 rounded-full bg-muted-foreground/10" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80px] bg-muted-foreground/10" />
          <Skeleton className="h-4 w-[150px] bg-muted-foreground/10" />
        </div>
      </div>
    )
  }
  
  