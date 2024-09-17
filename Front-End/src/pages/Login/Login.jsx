import { AiFillEye, AiFillEyeInvisible, AiFillUnlock } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { useEffect, useState } from "react";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../../Redux/user/authApi";
import { toast } from "react-toastify";
import { useGetMainLogoQuery } from "../../Redux/logo/logoApi";

export default function Login() {
  window.scroll(0, 0);
  const [showPassword, setShowPassword] = useState(false);
  const { loggedUser } = useSelector((state) => state.user);
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const { data: logo } = useGetMainLogoQuery();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (loggedUser?.success || loggedUser !== undefined) {
    navigate(from, { replace: true });
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const phone = form.phone.value;
    const password = form.password.value;

    const loginInfo = {
      phone,
      password,
    };

    await login(loginInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Success");
    }
  }, [isSuccess]);

  return (
    <div className="py-6 min-h-[70vh] flex justify-center items-center">
      <div className="container">
        <div className="sm:w-[400px] mx-auto bg-base-100 shadow-lg rounded-lg p-6">
          <img
            src={
              logo?.data[0]?.logo === ""
                ? "/images/logo/logo.png"
                : `${import.meta.env.VITE_BACKEND_URL}/logo/${
                    logo?.data[0]?.logo
                  }`
            }
            alt=""
            className="w-32 mx-auto"
          />
          <h6 className="text-xl font-medium mt-2 text-center text-neutral/80">
            Log In
          </h6>

          <form onSubmit={handleLogin}>
            <div className="mt-10 text-neutral">
              <div className="mb-6 relative">
                <span className="absolute bottom-2 text-neutral/80">
                  <MdOutlinePhoneAndroid />
                </span>
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border-b focus:border-b-primary outline-none pl-6 pb-1 placeholder:font-light"
                  required
                />
              </div>

              <div className="mb-2">
                <div className="relative">
                  <span className="absolute bottom-2 text-neutral/80">
                    <AiFillUnlock className="text-lg" />
                  </span>

                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    name="password"
                    placeholder="Password"
                    className="w-full border-b focus:border-b-primary outline-none pl-6 pb-1 placeholder:font-light"
                    required
                  />

                  <div
                    className="absolute right-2 bottom-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className={`${showPassword ? "block" : "hidden"}`}>
                      <AiFillEye />
                    </span>
                    <span className={`${showPassword ? "hidden" : "block"}`}>
                      <AiFillEyeInvisible />
                    </span>
                  </div>
                </div>
              </div>

              {isError && (
                <p className="text-sm text-red-500">{error?.data?.error}</p>
              )}

              <div className="mt-2 flex justify-end">
                <Link
                  to=""
                  className="text-[13px] text-neutral/70 underline hover:text-primary duration-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="mt-3 flex flex-col w-full border-opacity-50">
                <button
                  type="submit"
                  className="w-full py-2 font-semibold text-base-100 bg-primary rounded hover:bg-opacity-90 duration-300 flex justify-center"
                >
                  {isLoading ? <ButtonSpinner /> : "Log In"}
                </button>
              </div>
            </div>
          </form>

          <div className="border-t border-neutral/20 mt-6 pt-4 text-center">
            <p className="text-sm text-neutral/70">
              Don&apos;t have an account?
              <Link
                to="/signup"
                className="text-blue-500  pl-2 hover:underline"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
