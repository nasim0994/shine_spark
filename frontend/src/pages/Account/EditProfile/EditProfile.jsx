import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useEditUserInfoMutation } from "../../../Redux/user/userApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  window.scroll(0, 0);
  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  const { _id, name, phone, email, city, district, street } = user;
  const [editUserInfo, { isLoading, isSuccess, isError }] =
    useEditUserInfoMutation();
  const navigate = useNavigate();

  const handleEditProfile = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const city = form.city.value;
    const district = form.district.value;
    const street = form.street.value;

    const userInfo = {
      name,
      email,
      city,
      district,
      street,
    };

    await editUserInfo({ id: _id, userInfo });
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "update success", "success");
      navigate("/account/profile");
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
    if (isError) {
      Swal.fire("", "update fail", "error");
    }
  }, [isSuccess, isError, navigate]);

  return (
    <div>
      <form
        onSubmit={handleEditProfile}
        className="col-span-2 rounded-md border p-4"
      >
        <div>
          <p>Full Name</p>
          <input
            type="text"
            className="mb-4 w-full rounded border px-3 py-1.5 outline-none"
            defaultValue={name}
            name="name"
            required
          />
        </div>

        <div>
          <p>Number</p>
          <input
            type="text"
            className="mb-4 w-full rounded border px-3 py-1.5 outline-none"
            defaultValue={phone}
            required
            disabled
          />
        </div>

        <div>
          <p>Email</p>
          <input
            type="pail"
            name="email"
            className="mb-4 w-full rounded border px-3 py-1.5 outline-none"
            defaultValue={email}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>City</p>
            <input
              className="mb-4 w-full rounded border px-3 py-1.5 outline-none"
              defaultValue={city}
              name="city"
            />
          </div>

          <div>
            <p>District</p>
            <input
              className="mb-4 w-full rounded border px-3 py-1.5 outline-none"
              defaultValue={district}
              name="district"
            />
          </div>
        </div>

        <div>
          <p>Full Address</p>
          <textarea
            className="mb-4 w-full rounded border px-3 py-1.5 outline-none"
            defaultValue={street}
            name="street"
          />
        </div>

        <div>
          <button
            type="submite"
            className="w-full scale-[1] rounded bg-primary py-2 text-center text-base-100 duration-300 hover:scale-[.99]"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
