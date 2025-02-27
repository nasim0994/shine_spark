import Pagination from "@/components/Pagination/Pagination";
import ButtonSpinner from "@/components/shared/ButtonSpinner";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateFeaturedMutation,
  useUpdateStatusMutation,
} from "@/Redux/product/productApi";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  let query = {};
  query["page"] = currentPage;
  query["limit"] = limit;
  query["status"] = "all";

  const { data, isLoading, isError, error } = useGetAllProductsQuery(query);
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this product?");
    if (isConfirm) {
      const res = await deleteProduct(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message || "Something went wrong!");
        console.log(res);
      }
    }
  };

  // update feature
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateFeatured, { isLoading: ufLoading }] =
    useUpdateFeaturedMutation();
  const [updateStatus, { isLoading: usLoading }] = useUpdateStatusMutation();

  const handleUpdateFeatured = async (id) => {
    setSelectedProduct(id);

    const res = await updateFeatured(id);

    if (res?.data?.success) {
      toast.success("Status updated success");
    } else {
      toast.error(res?.data?.message || "Something went wrong!");
      console.log(res);
    }
  };

  const handleUpdateStatus = async (id) => {
    setSelectedProduct(id);

    const res = await updateStatus(id);

    if (res?.data?.success) {
      toast.success("Status updated success");
    } else {
      toast.error(res?.data?.message || "Something went wrong!");
      console.log(res);
    }
  };

  let content = null;
  if (isLoading) return (content = <TableSkeleton />);
  if (!isLoading && isError) content = <p>{error?.error}</p>;

  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((product) => (
      <tr key={product?._id}>
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
        <td>{product?.category?.name}</td>
        <td>
          {ufLoading && selectedProduct === product?._id ? (
            <ButtonSpinner />
          ) : (
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                checked={product?.featured && product?.featured}
                type="checkbox"
                value={product?.featured}
                className="peer sr-only"
                onChange={() => handleUpdateFeatured(product?._id)}
              />
              <div className="peer h-[23px] w-11 rounded-full bg-gray-200 after:absolute after:start-[1px] after:top-[1.5px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
            </label>
          )}
        </td>
        <td>{product?.sellingPrice}TK</td>
        <td>{product?.totalStock}</td>
        <td>
          {usLoading && selectedProduct === product?._id ? (
            <ButtonSpinner />
          ) : (
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                checked={product?.status && product?.status}
                type="checkbox"
                value={product?.status}
                className="peer sr-only"
                onChange={() => handleUpdateStatus(product?._id)}
              />
              <div className="peer h-[23px] w-11 rounded-full bg-gray-200 after:absolute after:start-[1px] after:top-[1.5px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
            </label>
          )}
        </td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/product/edit/${product?._id}`}
              className="duration-300 hover:text-green-700"
            >
              <BiSolidPencil />
            </Link>
            <button
              onClick={() => handleDeleteProduct(product?._id)}
              className="text-red-500"
            >
              <AiOutlineDelete />
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[17px]">All Products</h2>
        <Link
          to="/admin/product/add"
          className="rounded bg-primary px-6 py-2 text-sm text-base-100"
        >
          Add New Product
        </Link>
      </div>

      <div className="flex min-h-[80vh] flex-col justify-between bg-base-100 shadow-lg">
        <div className="relative overflow-x-auto">
          <table className="dashboard_table">
            <thead>
              <tr>
                <th>Product name</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Base Price</th>
                <th>Total Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {content ? (
                content
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

        {/* pagination */}
        {data?.meta?.pages > 1 && (
          <Pagination
            pages={data?.meta?.pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
