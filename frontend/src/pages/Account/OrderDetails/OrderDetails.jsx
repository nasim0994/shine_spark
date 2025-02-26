import { useParams } from "react-router-dom";
import moment from "moment";
import { useGetOrderByIdQuery } from "@/Redux/order/orderApi";
import Spinner from "@/components/shared/Spinner/Spinner";

const OrderDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetOrderByIdQuery(id);
  const order = data?.data;
  const products = data?.data?.products;

  let content = null;
  if (isLoading) content = <Spinner />;

  if (!isLoading && isError) {
    content = <p className="mt-5 text-red-500">Order get failed</p>;
  }

  if (!isLoading && !isError) {
    content = (
      <div className="p-4">
        <h1 className="text-2xl font-semibold">
          Order <span className="text-primary">#{order?._id}</span>
        </h1>
        <p className="text-xs text-neutral/70">
          Placed on {moment(order?.createdAt).format("Do MMMM YYYY")}
        </p>

        <div className="mt-4 flex space-x-4">
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">Delivery Address</h2>
            <p className="text-sm">{order?.user?.name}</p>
            <p className="text-sm">{order?.user?.phone}</p>
            <p className="text-sm">{order?.user?.email}</p>
            <p className="text-sm">{order?.shippingInfo?.address}</p>
          </div>
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">Payment Method</h2>
            <p className="text-sm">
              Subtotal: ৳ {order?.totalPrice - order?.shippingCharge}
            </p>
            <p className="text-sm">Shipping Fee: ৳{order?.shippingCharge}</p>
            <p className="text-sm">Total: ৳ {order?.totalPrice}</p>
            <p className="text-sm">Payment Method: {order?.paymentMethod}</p>
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">Delivery Method</h2>
            <p className="text-sm">Standard Delivery</p>
          </div>
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">Order Status</h2>
            <p
              className={`text-sm ${order?.status == "pending" ? "text-yellow-500" : order?.status == "shipped" ? "text-blue-500" : order?.status == "delivered" ? "text-primary" : "text-red-500"}`}
            >
              {order?.status}
            </p>
          </div>
        </div>

        {/* product */}
        <div className="my-5 p-5">
          <div className="flex flex-col gap-y-5">
            {products?.map((product) => (
              <div
                key={product?.productId?._Id}
                className="flex w-full items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                      product?.productId?.thumbnail
                    }`}
                    alt="product"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-base font-semibold">
                      {product?.productId?.title}
                    </p>
                    <p className="text-sm">{product?.sku}</p>
                  </div>
                </div>
                <div>
                  {product?.productId?.brand && (
                    <p className="text-xs">
                      Brand: {product?.productId?.brand}
                    </p>
                  )}
                  <p className="text-xs">
                    Category: {product?.productId?.category?.name}
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  Qty: {product?.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-black pt-2">
            <div className="mb-1 flex items-center justify-between text-base">
              <h1>SubTotal</h1>
              <p>
                ৳<span>{order?.totalPrice}</span>
              </p>
            </div>

            <div className="mt-2 flex items-center justify-between font-semibold">
              <h1>Grand Total</h1>
              <p>
                ৳<span> {order?.totalPrice}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default OrderDetailsPage;
