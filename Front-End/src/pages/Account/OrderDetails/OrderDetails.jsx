import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../Redux/order/orderApi";
import Spinner from "../../../components/Spinner/Spinner";

const OrderDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetOrderByIdQuery(id);
  const order = data?.data;
  const products = data?.data?.products;

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  }

  if (!isLoading && isError) {
    content = <p className="text-red-500 mt-5">Order get failed</p>;
  }

  if (!isLoading && !isError) {
    content = (
      <div className="p-4">
        <h1 className="font-semibold text-2xl">
          Order <span className="text-primary">#{order?._id}</span>
        </h1>
        <p className="text-xs text-neutral/70">
          Placed on {order?.createdAt.slice(0, 10)}
        </p>

        <div className="flex space-x-4 mt-4">
          <div className="w-1/2">
            <h2 className="font-semibold text-lg">Delivery Address</h2>
            <p className="text-sm">{order?.userId?.name}</p>
            <p className="text-sm">{order?.userId?.phone}</p>
            <p className="text-sm">{order?.userId?.email}</p>
            <p className="text-sm">{order?.shippingInfo?.street}</p>
            <p className="text-sm">
              {order?.shippingInfo?.city}, {order?.shippingInfo?.district}
            </p>
          </div>
          <div className="w-1/2">
            <h2 className="font-semibold text-lg">Payment Method</h2>
            <p className="text-sm">Cash on Delivery</p>
            <p className="text-sm">Subtotal: ৳ {order?.totalPrice}</p>
            <p className="text-sm">Shipping Fee: ৳ 50</p>
            <p className="text-sm">Total: ৳ {order?.totalPrice + 50}</p>
            <p className="text-sm">Payment Status: {order?.status}</p>
            <p className="text-sm">Payment Method: Cash on Delivery</p>
            <p className="text-sm">Payment Date: Not paid yet</p>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <div className="w-1/2">
            <h2 className="font-semibold text-lg">Delivery Method</h2>
            <p className="text-sm">Standard Delivery</p>
          </div>
          <div className="w-1/2">
            <h2 className="font-semibold text-lg">Order Status</h2>
            <p className="text-sm">{order?.status}</p>
          </div>
        </div>

        {/* product */}
        <div className="mx-auto  my-10 shadow-lg p-5 w-[70%]">
          <div className="flex flex-col gap-y-5">
            {products?.map((product) => (
              <div
                key={product?.productId?._Id}
                className="flex items-center justify-between gap-4 w-full"
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                    product?.productId?.images[0]
                  }`}
                  alt="product"
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-base font-semibold">
                  {product?.productId?.title}
                </p>
                <div>
                  <p className="text-xs">Brand: {product?.productId?.brand}</p>
                  <p className="text-xs">
                    Category: {product?.productId?.category}
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  Qty: {product?.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-black  mt-10 pt-2">
            <div className="flex justify-between items-center text-base mb-1">
              <h1>SubTotal</h1>
              <p>
                ৳<span>{order?.totalPrice}</span>
              </p>
            </div>

            <div className="text-neutral/90">
              <div className="flex justify-between items-center border-b border-black py-1">
                <p>Tax</p>
                <p>
                  ৳<span> 00</span>
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 font-semibold">
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
