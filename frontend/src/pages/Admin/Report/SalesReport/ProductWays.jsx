import Pagination from "@/components/Pagination/Pagination";
import Spinner from "@/components/shared/Spinner/Spinner";
import { useGetReportProductWayQuery } from "@/Redux/order/orderApi";
import { useState } from "react";

export default function ProductWays() {
  const query = {};
  const [currentPage, setCurrentPage] = useState(1);
  query["page"] = currentPage;
  query["limit"] = 10;

  const { data, isLoading } = useGetReportProductWayQuery(query);
  const products = data?.data;

  console.log(data);

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="flex min-h-[80vh] flex-col justify-between bg-base-100 shadow-lg">
        <div className="relative overflow-x-auto">
          <table className="dashboard_table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Product name</th>
                <th>Total Sale</th>
                <th>Total Sale Price</th>
                <th>Total Purchase Price</th>
                <th>Total Profit</th>
                <th>Available Stock</th>
              </tr>
            </thead>
            <tbody>
              {products?.length > 0 ? (
                products?.map((product, i) => {
                  const totalPurchasePrice = product?.skuList?.reduce(
                    (acc, sku) => {
                      return acc + sku.orderedQuantity * sku.purchasePrice;
                    },
                    0,
                  );

                  const totalProfit =
                    product?.totalSalePrice - totalPurchasePrice;

                  return (
                    <tr key={product?._id}>
                      <td>{i + 1}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                              product?.thumbnail
                            }`}
                            alt={product?.title}
                            className="h-9 w-9 rounded-lg"
                            loading="lazy"
                          />
                          {product?.title?.length > 30
                            ? product?.title.slice(0, 30) + "..."
                            : product?.title}
                        </div>
                      </td>
                      <td>{product?.totalQuantity}</td>
                      <td>
                        {parseFloat(product?.totalSalePrice).toFixed(2)}TK
                      </td>
                      <td>{totalPurchasePrice}TK</td>
                      <td
                        className={
                          totalProfit > 0 ? "text-green-500" : "text-red-500"
                        }
                      >
                        {parseFloat(totalProfit).toFixed(2)}TK
                      </td>
                      <td>{product?.totalStock}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-sm text-red-500">
                    no product found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}
