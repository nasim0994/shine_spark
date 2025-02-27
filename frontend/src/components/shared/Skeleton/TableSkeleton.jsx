export default function TableSkeleton() {
  return (
    <div className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-3">
        <div className="h-3 w-28 rounded bg-gray-100"></div>
        <div className="h-4 w-28 rounded bg-gray-100"></div>
      </div>

      <div>
        <div className="h-8 border-b bg-base-100"></div>
        <div className="h-8 border-b bg-gray-100"></div>
        <div className="h-8 border-b bg-base-100"></div>
        <div className="h-8 border-b bg-gray-100"></div>
        <div className="h-8 border-b bg-base-100"></div>
        <div className="h-8 border-b bg-gray-100"></div>
        <div className="h-8 border-b bg-base-100"></div>
        <div className="h-8 border-b bg-gray-100"></div>
        <div className="h-8 border-b bg-base-100"></div>
        <div className="h-8 border-b bg-gray-100"></div>
        <div className="h-8 border-b bg-base-100"></div>
        <div className="h-8 border-b bg-gray-100"></div>
      </div>
    </div>
  );
}
