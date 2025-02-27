import { useNavigate } from "react-router-dom";
import { useAddAdminMutation } from "@/Redux/admin/adminApi";
import toast from "react-hot-toast";

export default function AddAdministrator() {
  const [addAdmin, { isLoading, isError, error, isSuccess }] =
    useAddAdminMutation();
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const role = "admin";
    const info = {
      name,
      role,
      email,
      phone,
      password,
    };

    const res = await addAdmin(info);
    if (isSuccess) {
      toast.success("Administrator added successfully");
      navigate("/admin/administrator/all");
    } else {
      toast.error(res?.data?.message || "An error occurred");
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 pb-4 shadow">
      <div className="border-b p-3 font-medium">
        <h3>Add New Administrator</h3>
      </div>
      <div className="mx-auto mt-4 rounded border p-4 md:w-2/3">
        <form onSubmit={handleAdd} className="form_group flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-content">Full Name</p>
              <input type="text" name="name" required />
            </div>
            <div>
              <p className="text-sm text-neutral-content">Email</p>
              <input type="email" name="email" required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-content">Password</p>
              <input type="password" name="password" required />
            </div>
            <div>
              <p className="text-sm text-neutral-content">Phone</p>
              <input type="text" name="phone" required />
            </div>
          </div>

          {isError && (
            <p className="text-sm text-red-500">{error?.data?.message}</p>
          )}

          <div>
            <button disabled={isLoading} className="primary_btn">
              {isLoading ? "Loading..." : "Add Administrator"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
