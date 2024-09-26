import Select from "react-dropdown-select";
import { useGetAllProductsQuery } from "../../../Redux/product/productApi";
import { useState } from "react";
import { useAddFlashDealMutation } from "../../../Redux/flashDeal/flashDeal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddFlashDeal() {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [flashProducts, setFlashProducts] = useState([]);

  const { data: productData } = useGetAllProductsQuery({});
  const products = productData?.data;

  const [addFlashDeal, { isLoading }] = useAddFlashDealMutation();

  // Function to handle changes in input fields
  const handleInputChange = (productIndex, field, value) => {
    setFlashProducts((prevFlashProducts) => {
      const updatedFlashProducts = [...prevFlashProducts];

      if (!updatedFlashProducts[productIndex]) {
        updatedFlashProducts[productIndex] = [];
      }

      // Store all information (color, size, quantity, price) in each entry
      updatedFlashProducts[productIndex] = {
        ...updatedFlashProducts[productIndex],
        product: selectedProducts[productIndex]?._id,
        [field]: value,
      };

      return updatedFlashProducts;
    });
  };

  const handleAddFlashDeal = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const startDate = form.startDate.value;
    const endDate = form.endDate.value;

    const flashProductsInfo = {
      title,
      startDate,
      endDate,
      flashProducts,
    };

    const res = await addFlashDeal(flashProductsInfo);

    if (res?.data?.success) {
      Swal.fire("", "Flash deal add success", "success");
      setSelectedProducts([]);
      form.reset();
      setFlashProducts([]);
      navigate("/admin/flash-deal");
    } else {
      Swal.fire("", "Something went wrong", "error");
    }
  };

  return (
    <section className="rounded bg-base-100 p-3 text-neutral">
      <p>Flash Deal Information</p>

      <form
        onSubmit={handleAddFlashDeal}
        className="mx-auto mt-6 flex flex-col gap-4 text-sm sm:w-2/3"
      >
        <div className="flex flex-col gap-1">
          <p>Title</p>
          <input
            type="text"
            className="rounded border px-4 py-1 outline-none"
            name="title"
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
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>End Date</p>
            <input
              type="date"
              className="rounded border px-4 py-1 outline-none"
              name="endDate"
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
            valueField="title"
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
                    <tr key={productIndex}>
                      <td className="border-r">
                        <div className="flex items-center gap-2">
                          <img
                            src={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/products/${product?.images[0]}`}
                            alt=""
                            className="h-8 w-8 rounded"
                          />
                          <p>{product?.title}</p>
                        </div>
                      </td>
                      <td className="border-r">
                        <p>
                          {product?.variants?.length > 0
                            ? product?.variants[0]?.sellingPrice
                            : product?.sellingPrice}
                        </p>
                      </td>
                      <td className="border-r">
                        <input
                          type="number"
                          name=""
                          className="w-28 rounded border px-4 py-1 outline-none"
                          onChange={(e) =>
                            handleInputChange(
                              productIndex,
                              "discount",
                              e.target.value,
                            )
                          }
                          required
                        />
                      </td>
                      <td>
                        <select
                          className="rounded border px-4 py-1 outline-none"
                          onChange={(e) =>
                            handleInputChange(
                              productIndex,
                              "discountType",
                              e.target.value,
                            )
                          }
                          required
                        >
                          <option value="1">%</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div>
          <button disabled={isLoading && "disabled"} className="primary_btn">
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
