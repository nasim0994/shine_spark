import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { useEffect, useState } from "react";
import { loginZodValidation } from "./loginZodValidation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/Redux/user/authApi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userLoggedIn } from "@/Redux/user/userSlice";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const form = useForm({ resolver: zodResolver(loginZodValidation) });
  const dispatch = useDispatch();

  const { loggedUser } = useSelector((state) => state.user);
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  let admin =
    loggedUser?.data?.role === "admin" ||
    loggedUser?.data?.role === "superAdmin";

  useEffect(() => {
    if (from.startsWith("/admin") && !admin) return;

    if (loggedUser?.success || loggedUser !== undefined) {
      navigate(from, { replace: true });
    }
  }, [loggedUser, from, navigate, admin]);

  const onSubmit = async (data) => {
    setError(null);

    const res = await login(data);

    if (res?.data?.success) {
      toast.success(res?.data?.message || "Logged in successfully");
      dispatch(userLoggedIn(res, res?.token));
    } else {
      setError(res?.data?.message);
      console.log(res);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <label>Phone</label>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  value={field.value || ""}
                  className="rounded-full placeholder:text-[13px] placeholder:text-gray-400"
                  placeholder="Enter your phone number"
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <label>Password</label>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPass ? "text" : "password"}
                    {...field}
                    value={field.value || ""}
                    className="rounded-full placeholder:text-[13px] placeholder:text-gray-400"
                    placeholder="*********"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3 cursor-pointer"
                  >
                    {showPass ? (
                      <AiFillEyeInvisible className="text-neutral-content" />
                    ) : (
                      <AiFillEye className="text-neutral-content" />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" className="h-3.5 w-3.5" />
            <label
              htmlFor="remember"
              className="text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Link
            to="/forgot-password"
            className="text-neutral-content hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <Button
          type="submit"
          className="w-full rounded-full bg-primary text-base-100"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </Button>

        <div className="flex items-center justify-center gap-1 text-xs">
          <p className="text-neutral-content">Already have an account?</p>
          <Link to="/register" className="font-semibold text-neutral">
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
}
