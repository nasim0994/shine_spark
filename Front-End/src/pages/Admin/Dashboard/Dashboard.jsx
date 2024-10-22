import { Link } from "react-router-dom";
import { useAllBrandsQuery } from "../../../Redux/brand/brandApi";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import { useGetAllOrdersQuery } from "../../../Redux/order/orderApi";
import { useGetAllProductsQuery } from "../../../Redux/product/productApi";
import { useGetSubCategoriesQuery } from "../../../Redux/subCategory/subCategoryApi";
import { useGetSubSubCategoriesQuery } from "../../../Redux/subSubCategory/subSubCategoryApi";
import { useAllUsersQuery } from "../../../Redux/user/userApi";
import { useGetAllAdminsQuery } from "../../../Redux/admin/adminApi";
import { FaBoxOpen, FaUsers, FaUserShield, FaCartPlus } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { SiBrandfolder } from "react-icons/si";
import { MdOutlineCategory } from "react-icons/md";

export default function Dashboard() {
  const { data: products } = useGetAllProductsQuery();
  const { data: orders } = useGetAllOrdersQuery();
  const { data: users } = useAllUsersQuery();
  const { data: admin } = useGetAllAdminsQuery();
  const { data: category } = useGetCategoriesQuery();
  const { data: subCategory } = useGetSubCategoriesQuery();
  const { data: subSubCategory } = useGetSubSubCategoriesQuery();
  const { data: brand } = useAllBrandsQuery();

  return (
    <section>
      {/* card */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total Products</p>
            <h3 className="font-bold text-primary">{products?.data?.length}</h3>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
            <FaBoxOpen className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total Orders</p>
            <h3 className="font-bold text-red-600">{orders?.data?.length}</h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-600 text-base-100">
            <FaCartPlus className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total Users</p>
            <h3 className="font-bold text-green-600">{users?.data?.length}</h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-600 text-base-100">
            <FaUsers className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total Administrators</p>
            <h3 className="font-bold text-green-600">{admin?.data?.length}</h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
            <FaUserShield className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total Categories</p>
            <h3 className="font-bold text-green-600">
              {category?.data?.length}
            </h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total SubCategories</p>
            <h3 className="font-bold text-green-600">
              {subCategory?.data?.length}
            </h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">
              Total Sub Sub-Categories
            </p>
            <h3 className="font-bold text-green-600">
              {subSubCategory?.data?.length}
            </h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total Brand</p>
            <h3 className="font-bold text-green-600">{brand?.data?.length}</h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
            <SiBrandfolder className="text-xl" />
          </div>
        </div>
      </div>

      {/* sales */}
      <div className="mt-4 rounded bg-base-100 p-4 shadow">
        <p>Sales Report</p>

        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-dinMedium text-neutral">Total Sales</p>
              <div className="flex items-end gap-1">
                <h3 className="font-bold text-primary">
                  {orders?.data.reduce(
                    (total, item) => total + item.totalPrice,
                    0,
                  )}
                </h3>
                <small>tk</small>
              </div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
              <FaMoneyBillTrendUp className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Order */}
      <div className="mt-4 rounded bg-base-100 p-4 shadow">
        <div className="flex items-center justify-between">
          <p>Latest Orders</p>
          <Link to="/admin/order/all-orders" className="primary_btn text-sm">
            All Orders
          </Link>
        </div>

        <div className="relative mt-4 overflow-x-auto">
          <table className="dashboard_table">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Total Products</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.data?.map((order) => (
                <tr key={order?._id}>
                  <td>{order?._id}</td>
                  <td>{order?.products?.length}</td>
                  <td>
                    <div
                      className={`w-max border text-xs ${
                        order?.status === "pending"
                          ? "border-yellow-500"
                          : order?.status === "shipped"
                            ? "border-green-500"
                            : "border-red-500"
                      } rounded px-2 py-1`}
                    >
                      {order?.status === "pending" ? (
                        <span className="text-yellow-500">{order?.status}</span>
                      ) : order?.status === "shipped" ? (
                        <span className="text-green-500">{order?.status}</span>
                      ) : (
                        <span className="text-red-500">{order?.status}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/admin/order/${order?._id}`}
                      className="hover:text-blue-700"
                    >
                      <GrView />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
