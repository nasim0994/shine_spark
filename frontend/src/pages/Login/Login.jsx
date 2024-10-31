import { AiFillEye, AiFillEyeInvisible, AiFillUnlock } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { useState } from "react";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../../Redux/user/authApi";
import { toast } from "react-toastify";
import { useGetMainLogoQuery } from "../../Redux/logo/logoApi";

export default function Login() {
  window.scroll(0, 0);
  const [showPassword, setShowPassword] = useState(false);
  const { loggedUser } = useSelector((state) => state.user);
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState(null);
  const { data: logo } = useGetMainLogoQuery();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (loggedUser?.success || loggedUser !== undefined) {
    navigate(from, { replace: true });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const form = e.target;
    const phone = form.phone.value;
    const password = form.password.value;

    const loginInfo = {
      phone,
      password,
    };

    const res = await login(loginInfo);

    if (res?.data?.success) {
      toast.success(res?.data?.message || "Logged in successfully");
    } else {
      toast.error(
        res?.data?.message || "Something went wrong please try again",
      );
      setError(res?.data?.message);
      console.log(res);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-6">
      <div className="container">
        <div className="mx-auto rounded-lg bg-base-100 p-6 shadow-lg sm:w-[400px]">
          <img
            src={
              logo?.data[0]?.logo === ""
                ? "/images/logo/logo.png"
                : `${import.meta.env.VITE_BACKEND_URL}/logo/${
                    logo?.data[0]?.logo
                  }`
            }
            alt=""
            className="mx-auto w-32"
          />
          <h6 className="mt-2 text-center text-xl font-medium text-neutral/80">
            Log In
          </h6>

          <form onSubmit={handleLogin}>
            <div className="mt-10 text-neutral">
              <div className="relative mb-6">
                <span className="absolute bottom-2 text-neutral/80">
                  <MdOutlinePhoneAndroid />
                </span>
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border-b pb-1 pl-6 outline-none placeholder:font-light focus:border-b-primary"
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
                    className="w-full border-b pb-1 pl-6 outline-none placeholder:font-light focus:border-b-primary"
                    required
                  />

                  <div
                    className="absolute bottom-2 right-2 cursor-pointer"
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

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="mt-3 flex w-full flex-col border-opacity-50">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary py-2 font-semibold text-base-100 duration-300 hover:bg-opacity-90"
                >
                  {isLoading ? <ButtonSpinner /> : "Log In"}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 border-t border-neutral/20 pt-4 text-center">
            <p className="text-sm text-neutral/70">
              Don&apos;t have an account?
              <Link to="/signup" className="pl-2 text-blue-500 hover:underline">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
