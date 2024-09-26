import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOrderByIdQuery,
  useStatusUpdateMutation,
} from "../../../Redux/order/orderApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function OrderDetails() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, isError, error } = useGetOrderByIdQuery(id);

  const [statusUpdate, { isLoading: statusLoading }] =
    useStatusUpdateMutation();

  const order = data?.data;
  const products = data?.data?.products;

  const statusHandler = async (id, status) => {
    const isConfirm = window.confirm("Do you want to update status?");

    if (status === "pending") {
      status = "shipped";
    } else if (status === "shipped") {
      status = "delivered";
    } else {
      status = "pending";
    }

    if (isConfirm) {
      try {
        const result = await statusUpdate({ id, status });
        if (result?.data?.success) {
          toast.success(result?.data?.message);
        }
      } catch (error) {
        toast.error(error?.data?.error);
      }
    }
  };

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }

  if (!isLoading && !isError) {
    content = (
      <div>
        <div className="flex justify-end">
          {statusLoading ? (
            <p>Loading...</p>
          ) : (
            <button
              onClick={() => statusHandler(order?._id, order?.status)}
              disabled={order?.status === "delivered"}
              className="mb-4 rounded bg-gray-700 px-6 py-2 text-sm text-base-100 duration-300 hover:bg-primary"
            >
              {order?.status === "pending" ? (
                <span className="">{order?.status}</span>
              ) : order?.status === "shipped" ? (
                <span className="">{order?.status}</span>
              ) : (
                <span className="">{order?.status}</span>
              )}
            </button>
          )}
        </div>
        <div className="rounded-md border p-4">
          <p className="text-lg">Order Details:</p>
          <p>
            Invoice ID: <span className="text-primary">#{order?._id}</span>
          </p>
          <p>
            Invoice Number:{" "}
            <span className="text-primary">INV-{order?.invoiceNumber}</span>
          </p>
        </div>

        <div className="mt-4 rounded-md border p-4">
          <p className="text-lg">Shipping Details:</p>
          <div className="mt-1 text-[15px]">
            <p>{order?.shippingInfo?.name}</p>
            <p>{order?.shippingInfo?.phone}</p>
            <p>
              {order?.shippingInfo?.email
                ? order?.shippingInfo?.email
                : order?.userId?.email}
            </p>
            <p>
              City: {order?.shippingInfo?.city}{" "}
              {order?.shippingInfo?.area && "," + order?.shippingInfo?.area}
            </p>
            <p>Address: {order?.shippingInfo?.street}</p>
            {order?.shippingInfo?.note && (
              <p className="text-sm">({order?.shippingInfo?.note})</p>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-md border p-4">
          <p className="text-lg">Products</p>
          <div>
            {products?.map((product) => {
              let price = product?.productId?.sellingPrice;
              let discount = product?.discount;

              console.log(price);
              console.log(product);

              if (
                product?.productId?.variants &&
                product?.productId?.variants?.length > 0
              ) {
                product?.productId?.variants?.map((variant) => {
                  if (
                    variant?.size === product?.size &&
                    variant?.color === product?.color
                  ) {
                    price = variant?.sellingPrice;
                  }
                });
              }

              return (
                <div key={product?._id}>
                  <div className="mb-4 rounded border-b p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                            product?.productId?.images[0]
                          }`}
                          alt=""
                          className="h-9 w-9 rounded-full"
                        />
                        <div>
                          <p>
                            {product?.productId?.title} * {product?.quantity}
                          </p>
                          <p className="text-sm">
                            {product?.size} - {product?.color}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <p className="font-medium text-primary">
                          ৳
                          {price * product?.quantity -
                            (price * product?.quantity * discount) / 100}
                        </p>
                        {product?.discount > 0 && (
                          <del className="text-xs text-neutral/70">
                            ৳{price * product?.quantity}
                          </del>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="mb-3 flex items-center justify-between border-b pb-3 text-sm">
              <p>Delivery Charge</p>
              <p>{order?.shippingCharge} tk</p>
            </div>

            <div className="flex items-center justify-between font-semibold">
              <p>Total Payable</p>
              <p>{order?.totalPrice} tk</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
}
