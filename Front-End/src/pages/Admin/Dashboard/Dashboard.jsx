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
import { AiOutlineDelete } from "react-icons/ai";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Products</p>
            <h3 className="text-primary font-bold">{products?.data?.length}</h3>
          </div>
          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaBoxOpen className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Orders</p>
            <h3 className="text-red-600 font-bold">{orders?.data?.length}</h3>
          </div>

          <div className="bg-red-600 text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaCartPlus className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Users</p>
            <h3 className="text-green-600 font-bold">{users?.data?.length}</h3>
          </div>

          <div className="bg-green-600 text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaUsers className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Administrators</p>
            <h3 className="text-green-600 font-bold">{admin?.data?.length}</h3>
          </div>

          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaUserShield className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Categories</p>
            <h3 className="text-green-600 font-bold">
              {category?.data?.length}
            </h3>
          </div>

          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total SubCategories</p>
            <h3 className="text-green-600 font-bold">
              {subCategory?.data?.length}
            </h3>
          </div>

          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">
              Total Sub Sub-Categories
            </p>
            <h3 className="text-green-600 font-bold">
              {subSubCategory?.data?.length}
            </h3>
          </div>

          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Brand</p>
            <h3 className="text-green-600 font-bold">{brand?.data?.length}</h3>
          </div>

          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <SiBrandfolder className="text-xl" />
          </div>
        </div>
      </div>

      {/* sales */}
      <div className="mt-4 bg-base-100 p-4 rounded shadow">
        <p>Sales Report</p>

        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <div className="flex justify-between items-center rounded-lg p-4 border">
            <div>
              <p className="text-neutral font-dinMedium">Total Sales</p>
              <div className="flex items-end gap-1">
                <h3 className="text-primary font-bold">
                  {orders?.data.reduce(
                    (total, item) => total + item.totalPrice,
                    0
                  )}
                </h3>
                <small>tk</small>
              </div>
            </div>
            <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
              <FaMoneyBillTrendUp className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Order */}
      <div className="mt-4 bg-base-100 p-4 rounded shadow">
        <div className="flex items-center justify-between">
          <p>Latest Orders</p>
          <Link to="/admin/order/all-orders" className="primary_btn text-sm">
            All Orders
          </Link>
        </div>

        <div className="mt-4 relative overflow-x-auto">
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
                  <td className="flex gap-3">
                    <Link
                      to={`/admin/order/${order?._id}`}
                      className=" hover:text-blue-700"
                    >
                      <GrView />
                    </Link>
                    <button
                      onClick={() => deleteOrderHandler(order?._id)}
                      className="hover:text-red-700"
                    >
                      <AiOutlineDelete />
                    </button>
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
