import { Link, useParams } from "react-router-dom";
import { useGetOrderByTransactionIdQuery } from "../../Redux/order/orderApi";
import Spinner from "../../components/Spinner/Spinner";

export default function PaymentResult() {
  const { transactionId } = useParams();
  const { data, isLoading } = useGetOrderByTransactionIdQuery(transactionId);
  if (isLoading) return <Spinner />;

  return (
    <div className="py-8">
      <div className="container">
        {data && data?.data?.isPaid ? (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div className=" flex flex-col items-center justify-center">
                <svg
                  className="animate-draw"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                  <style>{`
                    .animate-draw {
                      width: 100px;
                      height: 100px;
                      stroke-dasharray: 166;
                      stroke-dashoffset: 166;
                      stroke-width: 2;
                      stroke: green;
                      fill: none;
                      animation: draw 1s forwards;
                    }
                    .circle {
                      stroke-dasharray: 157;
                      stroke-dashoffset: 157;
                      stroke-width: 2;
                      stroke: green;
                      fill: none;
                      animation: draw 1s forwards;
                    }
                    .check {
                      stroke-dasharray: 50;
                      stroke-dashoffset: 50;
                      stroke-width: 2;
                      stroke: green;
                      fill: none;
                      animation: draw 0.3s 0.9s forwards;
                    }
                    @keyframes draw {
                      to {
                        stroke-dashoffset: 0;
                      }
                    }
                  `}</style>
                </svg>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Payment successful
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Your transaction ID is{" "}
                  <span className="font-semibold">
                    {data?.data?.transactionId}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 justify-center items-center gap-5">
                <Link to="/">
                  <button className="w-full py-3 rounded-lg text-sm font-medium text-white bg-primary ">
                    Go back to home
                  </button>
                </Link>
                <Link to="/shops">
                  <button className="w-full py-3 rounded-lg text-sm font-medium text-white bg-gray-800 ">
                    Go back to Shop
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div className=" flex flex-col items-center justify-center">
                <svg
                  className="animate-draw"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="cross"
                    fill="none"
                    d="M16 16 36 36 M36 16 16 36"
                  />
                  <style>{`
                    .animate-draw {
                      width: 100px;
                      height: 100px;
                      stroke-dasharray: 166;
                      stroke-dashoffset: 166;
                      stroke-width: 2;
                      stroke: red;
                      fill: none;
                      animation: draw 1s forwards;
                    }
                    .circle {
                      stroke-dasharray: 157;
                      stroke-dashoffset: 157;
                      stroke-width: 2;
                      stroke: red;
                      fill: none;
                      animation: draw 1s forwards;
                    }
                    .cross {
                      stroke-dasharray: 80;
                      stroke-dashoffset: 80;
                      stroke-width: 2;
                      stroke: red;
                      fill: none;
                      animation: draw 0.3s 0.9s forwards;
                    }
                    @keyframes draw {
                      to {
                        stroke-dashoffset: 0;
                      }
                    }
                  `}</style>
                </svg>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Payment Failed
                </h2>
              </div>
              <div className="grid grid-cols-2 justify-center items-center gap-5">
                <Link to="/">
                  <button className="w-full py-3 rounded-lg text-sm font-medium text-white bg-primary ">
                    Go back to home
                  </button>
                </Link>
                <Link to="/shops">
                  <button className="w-full py-3 rounded-lg text-sm font-medium text-white bg-gray-800 ">
                    Go back to Shop
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
