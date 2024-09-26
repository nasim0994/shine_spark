import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/user/authApi";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let orderId = queryParams.get("orderId");
  let usernumber = queryParams.get("user");

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleLogin = async (usernumber) => {
    const loginInfo = {
      phone: usernumber,
      password: "12345678",
    };

    const res = await login(loginInfo);
    console.log(res);

    if (res?.data?.success) {
      navigate("/account/orders");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>
        <img src="/images/success.png" alt="" className="mx-auto w-40" />
        <h1 className="mt-2 text-center text-3xl">Order Success</h1>
        <p className="text-center">Your order has been placed successfully</p>
        <p className="text-neutral-content/90 text-center text-sm">
          Your order id: {orderId}
        </p>
        <p className="text-neutral-content/90 text-center text-sm">
          Gest User Login Info <br /> number: {usernumber} & pass: 12345678
        </p>

        {isError && (
          <p className="text-sm text-red-500">{error?.data?.error}</p>
        )}

        <div className="mt-2 flex justify-center gap-3">
          <Link
            to="/shops"
            className="rounded border border-primary px-4 py-2 text-sm text-primary"
          >
            More Shopping
          </Link>
          <button
            onClick={() => handleLogin(usernumber)}
            className="primary_btn text-sm"
            disabled={isLoading && true}
          >
            {isLoading ? "Loading..." : "Login & View Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
