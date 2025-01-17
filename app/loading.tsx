import { LoaderCircleIcon } from "lucide-react";
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-semibold text-muted-foreground">Loading...</h1>
        <LoaderCircleIcon className="animate-spin text-muted-foreground" />
      </div>
    </div>
  );
}
