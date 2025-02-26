import { Link, useNavigate } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { AiFillLock, AiTwotonePhone } from "react-icons/ai";
import { useState } from "react";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import Swal from "sweetalert2";
import { useRegisterMutation } from "../../Redux/user/authApi";
import { useEffect } from "react";
import { useGetMainLogoQuery } from "../../Redux/logo/logoApi";

export default function Signup() {
  window.scroll(0, 0);
  const { data: logo } = useGetMainLogoQuery();
  const [errorMesssage, setErrorMessage] = useState("");
  const [register, { isSuccess, isLoading, isError, error }] =
    useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const password = form.password.value;
    const re_password = form.re_password.value;

    const phoneRegex = /^\d{11}$/;
    const isValidPhoneNumber = phoneRegex.test(phone);
    if (!isValidPhoneNumber) {
      return Swal.fire("", "Please give valid phone number!", "error");
    }

    if (password.length < 8) {
      return setErrorMessage("Password must be 8 character");
    } else if (password !== re_password) {
      return setErrorMessage("Password not match");
    } else {
      setErrorMessage("");
    }

    const userInfo = {
      name,
      phone,
      email,
      password,
      role: "user",
    };

    await register(userInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Register success, Please Login now", "success");
      navigate("/login");
    }

    if (isError) {
      Swal.fire(
        "",
        error?.data?.message ? error?.data?.message : "register fail",
        "error",
      );
    }
  }, [isError, isSuccess, error, navigate]);

  return (
    <div className="bg-gray-50 py-6">
      <div className="container">
        <div className="mx-auto rounded-lg bg-base-100 p-6 shadow-lg sm:w-[420px]">
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
            Signup
          </h6>

          <form onSubmit={handleRegister} className="mt-10 text-neutral">
            <div>
              <div className="relative mb-6">
                <span className="absolute bottom-2 text-neutral/80">
                  <HiUser />
                </span>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name *"
                  className="w-full border-b pb-1 pl-6 outline-none placeholder:font-light focus:border-b-primary"
                  required
                />
              </div>

              {/* Phone */}
              <div className="relative mb-6">
                <span className="absolute bottom-2 text-neutral/80">
                  <AiTwotonePhone className="text-lg" />
                </span>
                <input
                  name="phone"
                  type="text"
                  placeholder="Number *"
                  className="w-full border-b pb-1 pl-6 outline-none placeholder:font-light focus:border-b-primary"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative mb-6">
                <span className="absolute bottom-2 text-neutral/80">
                  <MdEmail />
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full border-b pb-1 pl-6 outline-none placeholder:font-light focus:border-b-primary"
                />
              </div>

              {/* Password */}
              <div className="relative mb-6">
                <span className="absolute bottom-2 text-neutral/80">
                  <AiFillLock />
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder="Password *"
                  className="w-full border-b pb-1 pl-6 outline-none placeholder:font-light focus:border-b-primary"
                  required
                />
              </div>

              {/* RePassword */}
              <div className="relative mb-2">
                <span className="absolute bottom-2 text-neutral/80">
                  <AiFillLock />
                </span>
                <input
                  name="re_password"
                  type="password"
                  placeholder="Re-Password *"
                  className="w-full border-b pb-1 pl-6 outline-none placeholder:font-light focus:border-b-primary"
                  required
                />
              </div>
            </div>

            <p className="mb-4 text-sm text-red-500">{errorMesssage}</p>

            <div className="flex w-full flex-col border-opacity-50">
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary py-2 font-semibold text-base-100 duration-300 hover:bg-opacity-90"
                disabled={isLoading}
              >
                {isLoading ? <ButtonSpinner /> : "Create my account"}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-neutral/20 pt-4 text-center">
            <p className="text-sm text-neutral/70">
              Already have an account?
              <Link to="/login" className="pl-2 text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
