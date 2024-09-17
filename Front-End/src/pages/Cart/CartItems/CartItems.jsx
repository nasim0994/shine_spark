import CartItem from "./CartItem";

export default function CartItems({ carts }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-6 w-[60%]">Product</th>
            <th className="px-6 w-[10%]">Price</th>
            <th className="px-6 w-[10%]">QUANTITY</th>
            <th className="px-6 w-[10%]">Total</th>
            <th className="px-6 w-[10%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {carts?.length > 0 &&
            carts?.map((product, i) => <CartItem key={i} product={product} />)}
        </tbody>
      </table>
    </div>
  );
}
