import { useUpdateAdminPasswordMutation } from "../../../Redux/admin/adminApi";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../Redux/user/userSlice";
import toast from "react-hot-toast";

export default function EditAdminPassword({ id }) {
  const [updateAdminPassword, { isLoading }] = useUpdateAdminPasswordMutation();
  const dispatch = useDispatch();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const repassword = e.target.repassword.value;
    const currentPassword = e.target.currentPassword.value;

    if (password !== repassword) {
      toast.error("Password does not match");
      return;
    }

    const info = {
      password,
      currentPassword,
    };

    const res = await updateAdminPassword({ id, info });

    if (res?.data?.success) {
      toast.success("Password updated successfully");
      dispatch(userLogout());
    } else {
      toast.error(res?.data?.message || "Something  went wrong");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Update Password</h3>
      </div>

      <div className="p-4">
        <form
          onSubmit={handleUpdatePassword}
          className="form_group flex flex-col gap-4"
        >
          <div>
            <p className="text-sm text-neutral-content">Current Password</p>
            <input type="password" name="currentPassword" required />
          </div>
          <div>
            <p className="text-sm text-neutral-content">New Password</p>
            <input type="password" name="password" required />
          </div>
          <div>
            <p className="text-sm text-neutral-content">Confirm Password</p>
            <input type="password" name="repassword" required />
          </div>

          <div>
            <button disabled={isLoading} className="primary_btn">
              {isLoading ? "Loading..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
