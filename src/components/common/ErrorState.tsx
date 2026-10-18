export function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-xl font-bold text-red-500 mb-2">حصل خطأ ❌</h2>
      <p className="text-muted-foreground">
        لم نتمكن من تحميل البيانات، حاول مرة أخرى
      </p>
    </div>
  );
}
