const PLACEHOLDERS = Array.from({ length: 6 }, (_, i) => i);

export default function Loading() {
  return (
    <div className="flex-1 bg-papel">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-10">
        <div className="mb-8 h-10 w-64 animate-pulse bg-carton" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDERS.map((item) => (
            <div key={item} className="animate-pulse">
              <div className="h-64 w-full bg-carton" />
              <div className="mt-4 h-4 w-3/4 bg-carton" />
              <div className="mt-2 h-4 w-1/3 bg-carton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
