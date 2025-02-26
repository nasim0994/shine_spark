import LoginForm from "@/components/modules/auth/login/LoginForm";
import { useGetFaviconQuery } from "@/Redux/favicon/faviconApi";

export default function Login() {
  window.scroll(0, 0);
  const { data } = useGetFaviconQuery();
  const icon = data?.data?.icon;

  return (
    <section className="flex min-h-[80vh] items-center justify-center py-5">
      <div className="w-[90%] rounded-lg border-2 border-gray-100 p-6 sm:w-[500px]">
        <div className="mb-6 flex items-center justify-center gap-4 border-b pb-4">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/favicon/${icon}`}
            alt="icon"
            className="w-10"
          />
          <div>
            <h1 className="text-2xl font-semibold text-neutral">Sign In</h1>
            <p className="text-sm text-neutral-content">
              Enter your Email & Password to sign in.
            </p>
          </div>
        </div>

        <LoginForm />
      </div>
    </section>
  );
}
