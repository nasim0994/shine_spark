import { useParams } from "react-router-dom";
import moment from "moment";
import { useGetOrderByIdQuery } from "../../../Redux/order/orderApi";
import Spinner from "../../../components/Spinner/Spinner";
import { useGetMainLogoQuery } from "../../../Redux/logo/logoApi";
import { useGetContactQuery } from "../../../Redux/contact/contactApi";
import { useEffect } from "react";

export default function Invoice() {
  const params = useParams();
  const id = params.id;

  const { data: logoData } = useGetMainLogoQuery();
  const logo = logoData?.data[0]?.logo;

  const { data: contactData } = useGetContactQuery();
  const contact = contactData?.data[0];

  const { data, isLoading } = useGetOrderByIdQuery(id);
  const order = data?.data;
  const products = data?.data?.products;

  useEffect(() => {
    if (!isLoading) {
      window.print();
    }
  }, [isLoading]);

  if (isLoading) return <Spinner />;

  return (
    <section
      id="invoice"
      className="mx-auto flex h-screen w-[1000px] flex-col justify-between px-6"
    >
      <div>
        {/* <!-- header --> */}
        <div>
          <div className="border-title flex justify-between gap-10 border-b-2 px-2 pb-3">
            <div className="flex gap-3">
              <div>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/logo/${logo}`}
                  alt="logo"
                  className="w-72"
                />
                <div className="text-base">
                  <p>Cell: {contact?.phone}</p>
                  <p>Email: {contact?.email}</p>
                  <p>{contact?.address}</p>
                </div>
              </div>
            </div>

            <div className="text-title w-[30%]">
              <h2 className="title text-end text-3xl font-extrabold italic">
                INVOICE
              </h2>
              <div className="grid grid-cols-2 items-center border-t border-dashed border-gray-400 py-px">
                <p className="text-title/70">Invoice Number</p>
                <p className="w-max font-bold">{order?.invoiceNumber}</p>
              </div>

              <div className="grid grid-cols-2 items-center border-t border-dashed border-gray-400 py-px">
                <p className="text-title/70">Order Date</p>

                <p className="w-max font-bold">
                  {moment(order?.createdAt).format("DD-MM-YYYY")}
                </p>
              </div>

              <div className="grid grid-cols-2 items-center border-t border-dashed border-gray-400 py-px">
                <p className="text-title/70">PAYMENT Type</p>
                <p className="w-max font-bold">{order?.paymentMethod}</p>
              </div>

              <div className="grid grid-cols-2 items-center border-t border-dashed border-gray-400 py-px">
                <p className="text-title/70">DATE</p>
                <p className="w-max font-bold">
                  {moment(Date.now()).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!--Customer Info --> */}
        <div className="text-title p-4 pt-1">
          <h2 className="mb-1 text-xl font-medium">Bill to</h2>

          <div>
            <div>
              <h3>{order?.user?.name}</h3>
              <p>{order?.user?.phone}</p>
              <p>{order?.user?.email}</p>
              <p>{order?.shippingInfo?.address}</p>
              <p className="text-blue-400">{order?.shippingInfo?.note}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="relative mt-2 overflow-x-auto rounded-md border">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>SKU</th>
                <th>Discount</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, i) => {
                const sku = product?.sku;
                const variants = product?.productId?.variant?.variants;

                const variant = variants?.find((v) => v.sku == sku);
                const price = product?.isVariant
                  ? variant?.sellingPrice
                  : product?.productId?.sellingPrice;
                const discountPrice = parseInt(
                  price - (price * product?.discount) / 100,
                );

                const totalPrice = product?.quantity * discountPrice;

                return (
                  <tr key={order?._id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                            product?.productId?.thumbnail
                          }`}
                          alt={product?.productId?.title}
                          className="h-9 w-9 rounded-full"
                          loading="lazy"
                        />

                        <p>{product?.productId?.title}</p>
                      </div>
                    </td>
                    <td>{product?.quantity}</td>
                    <td>{product?.sku}</td>
                    <td>{product?.discount}%</td>
                    <td>
                      <p>
                        {discountPrice}
                        TK <del className="text-sm text-red-500">{price}TK</del>
                      </p>
                    </td>
                    <td>{totalPrice}TK</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6} className="text-end">
                  SubTotal
                </td>
                <td>{order?.totalPrice - order?.shippingCharge}TK</td>
              </tr>

              <tr>
                <td colSpan={6} className="text-end">
                  Shipping Charge
                </td>
                <td>{order?.shippingCharge}TK</td>
              </tr>

              <tr>
                <th colSpan={6} className="text-end">
                  Total
                </th>
                <th>{order?.totalPrice}TK</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="footer mt-28">
        <div className="mt-4 flex justify-between">
          <p>Prepared by</p>
          <p>Authorized by</p>
        </div>
      </div>
    </section>
  );
}
