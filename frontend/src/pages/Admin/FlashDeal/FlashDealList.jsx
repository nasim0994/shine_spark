import { Link } from "react-router-dom";
import FlashDealTable from "./FlashDealTable";
import { useGetFlashDealQuery } from "@/Redux/flashDeal/flashDeal";
import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";

export default function FlashDealList() {
  const { data, isLoading, isError, error } = useGetFlashDealQuery();

  let content = null;
  if (isLoading) return (content = <TableSkeleton />);

  if (!isLoading && isError) {
    content = <p>{error?.data?.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((flashDeal, i) => (
      <FlashDealTable key={flashDeal?._id} flashDeal={flashDeal} i={i} />
    ));
  }

  return (
    <div>
      <div className="mb-3 flex items-end justify-between">
        <h1 className="text-lg text-neutral-content">Flash Deal</h1>
        <Link to="/admin/promo/flash-sale/add" className="primary_btn text-sm">
          Add New Flash Deal
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-lg">
        <table className="dashboard_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Total Products</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
}
