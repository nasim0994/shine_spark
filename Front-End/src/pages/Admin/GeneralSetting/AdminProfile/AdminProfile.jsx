import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useUpdateAdminProfileMutation } from "../../../../Redux/admin/adminApi";
import EditAdminPassword from "../../../../components/AdminComponents/EditAdminPassword/EditAdminPassword";

export default function AdminProfile() {
  const { loggedUser } = useSelector((state) => state.user);
  const admin = loggedUser?.data;
  const id = admin?._id;

  const [updateAdminProfile, { isLoading }] = useUpdateAdminProfileMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const role = admin?.role;
    const info = {
      name,
      email,
      phone,
      role,
    };

    try {
      const res = await updateAdminProfile({ id, info }).unwrap();

      if (res?.success) {
        Swal.fire("", "Profile update success", "success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "",
        error?.data?.error ? error?.data?.error : "Something went wrong",
        "error",
      );
    }
  };

  return (
    <>
      <section className="rounded bg-base-100 pb-4 shadow">
        <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
          <h3>My Profile</h3>
        </div>

        <div className="grid gap-4 xl:grid-cols-2 xl:border-b">
          <div className="p-4 xl:border-r">
            <form
              onSubmit={handleEdit}
              className="form_group flex flex-col gap-4"
            >
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

              <div>
                <p className="text-sm text-neutral-content">Phone</p>
                <input
                  type="text"
                  name="phone"
                  required
                  defaultValue={admin?.phone}
                />
              </div>

              <div>
                <p className="text-sm text-neutral-content">Role</p>
                <input type="text" value={admin?.role} disabled />
              </div>

              <div>
                <button
                  disabled={isLoading && "disabled"}
                  className="primary_btn"
                >
                  {isLoading ? "Loading..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>

          <EditAdminPassword id={id} />
        </div>
      </section>

      <br />
    </>
  );
}
