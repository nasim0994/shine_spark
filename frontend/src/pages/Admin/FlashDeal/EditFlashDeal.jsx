import { useNavigate, useParams } from "react-router-dom";
import Select from "react-dropdown-select";
import { useEffect, useState } from "react";
import {
  useGetFlashDealByIdQuery,
  useUpdateFlashDealMutation,
} from "@/Redux/flashDeal/flashDeal";
import { useGetAllProductsQuery } from "@/Redux/product/productApi";
import toast from "react-hot-toast";

export default function EditFlashDeal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: deal, isLoading: dealIsLoading } = useGetFlashDealByIdQuery(id);

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (deal?.data?.flashProducts?.length > 0) {
      setSelectedProducts(
        deal?.data?.flashProducts?.map((products) => products?.product),
      );
    }
  }, [deal]);

  const { data: productData } = useGetAllProductsQuery();
  const products = productData?.data;
  const [flashProducts, setFlashProducts] = useState([]);

  const [updateFlashDeal, { isLoading }] = useUpdateFlashDealMutation();

  useEffect(() => {
    if (deal?.data?.flashProducts?.length > 0) {
      setFlashProducts(deal?.data?.flashProducts);
    }
  }, [deal]);

  // Function to handle changes in input fields
  const handleInputChange = (productIndex, field, value) => {
    setFlashProducts((prevFlashProducts) => {
      const updatedFlashProducts = [...prevFlashProducts];

      if (!updatedFlashProducts[productIndex]) {
        updatedFlashProducts[productIndex] = [];
      }

      updatedFlashProducts[productIndex] = {
        ...updatedFlashProducts[productIndex],
        product: selectedProducts[productIndex]?._id,
        [field]: value,
      };

      return updatedFlashProducts;
    });
  };

  const handleEditFlashDeal = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const startDate = form.startDate.value;
    const endDate = form.endDate.value;

    const data = {
      title,
      startDate,
      endDate,
      flashProducts,
    };

    const res = await updateFlashDeal({ id, data });

    if (res?.data?.success) {
      toast.success("Flash Deal updated successfully");
      setSelectedProducts([]);
      form.reset();
      setFlashProducts([]);
      navigate("/admin/promo/flash-sale/all");
    } else {
      toast.error("Failed to update flash deal");
      console.log(res);
    }
  };

  if (dealIsLoading) return <p>Loading...</p>;

  return (
    <section className="rounded bg-base-100 p-3 text-neutral">
      <p>Flash Deal Information</p>

      <form
        onSubmit={handleEditFlashDeal}
        className="mx-auto mt-6 flex flex-col gap-4 text-sm xl:w-2/3"
      >
        <div className="flex flex-col gap-1">
          <p>Title</p>
          <input
            type="text"
            className="rounded border px-4 py-1 outline-none"
            name="title"
            defaultValue={deal?.data?.title}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <p>Start Date</p>
            <input
              type="date"
              className="rounded border px-4 py-1 outline-none"
              name="startDate"
              defaultValue={deal?.data?.startDate}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>End Date</p>
            <input
              type="date"
              className="rounded border px-4 py-1 outline-none"
              name="endDate"
              defaultValue={deal?.data?.endDate}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p>Products</p>
          <Select
            multi
            options={products}
            labelField="title"
            valueField="_id"
            onChange={(product) => setSelectedProducts(product)}
            values={selectedProducts}
          />
        </div>

        {selectedProducts?.length > 0 && (
          <div className="flex flex-col gap-1">
            <p>Discounts</p>
            <div className="relative overflow-x-auto shadow-lg">
              <table className="dashboard_table">
                <thead>
                  <tr>
                    <th className="border-b border-r bg-gray-100">Product</th>
                    <th className="border-b border-r bg-gray-100">
                      Base Price
                    </th>
                    <th className="border-b border-r bg-gray-100">Discount</th>
                    <th className="border-b bg-gray-100">Discount Type</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts?.map((product, productIndex) => (
                    <tr key={product?._id}>
                      <td className="border-r">
                        <div className="flex items-center gap-2">
                          <img
                            src={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/products/${product?.thumbnail}`}
                            alt=""
                            className="h-8 w-8 rounded"
                          />
                          <p>{product?.title}</p>
                        </div>
                      </td>
                      <td className="border-r">
                        <p>{product?.sellingPrice}</p>
                      </td>
                      <td className="border-r">
                        <input
                          type="number"
                          className="w-28 rounded border px-4 py-1 outline-none"
                          onChange={(e) =>
                            handleInputChange(
                              productIndex,
                              "discount",
                              e.target.value,
                            )
                          }
                          required
                          defaultValue={
                            deal?.data?.flashProducts[productIndex]?.discount
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue="%"
                          disabled
                          className="bg-base-100"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div>
          <button disabled={isLoading} className="primary_btn">
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
