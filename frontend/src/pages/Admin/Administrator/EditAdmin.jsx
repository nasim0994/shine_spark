import EditAdminPassword from "@/components/AdminComponents/EditAdminPassword/EditAdminPassword";
import {
  useGetAdminByIdQuery,
  useUpdateAdminProfileMutation,
} from "@/Redux/admin/adminApi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAdministrator() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetAdminByIdQuery(id);
  const admin = data?.data;

  const [updateAdminById, { isLoading }] = useUpdateAdminProfileMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const role = "admin";

    const info = {
      name,
      email,
      phone,
      role,
    };

    try {
      const res = await updateAdminById({ id, info });

      if (res?.data?.success) {
        toast.success("Admin updated successfully");
        form.reset();
        navigate("/admin/administrator/all");
      } else {
        toast.error(res?.data?.message || "An error occurred");
        console.log(res);
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred");
      console.log(error);
    }
  };

  return (
    <>
      <section className="rounded bg-base-100 pb-4 shadow">
        <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
          <h3>Edit Admin</h3>
        </div>

        <div className="mx-auto mt-4 rounded border p-4 md:w-2/3">
          <form
            onSubmit={handleEdit}
            className="form_group flex flex-col gap-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-neutral-content">Full Name</p>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={admin?.name}
                />
              </div>
              <div>
                <p className="text-sm text-neutral-content">Email</p>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={admin?.email}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-neutral-content">Phone</p>
                <input
                  type="text"
                  name="phone"
                  required
                  defaultValue={admin?.phone}
                />
              </div>
            </div>

            <div>
              <button disabled={isLoading} className="primary_btn my-4">
                {isLoading ? "Loading..." : "Update Administrator"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <br />

      <EditAdminPassword id={id} admin={admin} />
    </>
  );
}
