export function TableSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 rounded-lg bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}
