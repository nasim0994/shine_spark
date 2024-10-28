import CartItem from "./CartItem";

export default function CartItems({ carts }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-[60%] px-6">Product</th>
            <th className="w-[10%] px-6">Price</th>
            <th className="w-[10%] px-6">QUANTITY</th>
            <th className="w-[10%] px-6">Total</th>
            <th className="w-[10%] px-6">Action</th>
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
