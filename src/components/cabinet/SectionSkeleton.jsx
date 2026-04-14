import { Skeleton } from "@/components/ui/skeleton";

export function UserSectionSkeleton() {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center gap-3 shrink-0">
          <Skeleton className="w-32 h-32 rounded-lg" />
          <Skeleton className="w-32 h-8 rounded-md" />
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BalanceSectionSkeleton() {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-4">
      <Skeleton className="h-12 w-full rounded-lg" />
      <Skeleton className="h-9 w-52 rounded-md" />
      <div className="pt-2 border-t space-y-2">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}

export function PayersSectionSkeleton() {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-5">
      <Skeleton className="h-5 w-64" />
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-9 w-full" />
          </div>
          <Skeleton className="h-9 w-20 mt-7" />
        </div>
      ))}
    </div>
  );
}

export function RecipientsSectionSkeleton() {
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-5">
      <Skeleton className="h-5 w-64" />
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-9 w-full" />
          </div>
          <Skeleton className="h-9 w-20 mt-7" />
        </div>
      ))}
    </div>
  );
}

export function OrdersSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-36" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}