import { useState } from "react";
import { useGetTodayOrdersQuery } from "@/Redux/order/orderApi";
import Pagination from "@/components/Pagination/Pagination";
import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";
import OrderTable from "./OrderTable";

export default function TodaysOrders() {
  const query = {};
  const [currentPage, setCurrentPage] = useState(1);
  query["page"] = currentPage;
  query["limit"] = 10;

  const { data, isLoading, isError, error } = useGetTodayOrdersQuery(query);

  if (isLoading) return <TableSkeleton />;
  if (!isLoading && isError) return <p>{error.error}</p>;

  return (
    <section>
      <div className="mb-2 rounded bg-base-100 p-3">
        <h2 className="text-neutral">Today&apos;s Orders</h2>
      </div>
      <div className="relative flex flex-col justify-between overflow-x-auto pb-4 shadow-lg">
        <OrderTable orders={data?.data} />

        {data?.meta?.pages > 1 && (
          <Pagination
            pages={data?.meta?.pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}
