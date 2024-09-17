import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useEditUserInfoMutation } from "../../../Redux/user/userApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditePeofile() {
  window.scroll(0, 0);
  const { loggedUser } = useSelector((state) => state.user);

  const { _id, name, phone, email, city, district, street } = loggedUser?.data;
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
  }, [isSuccess, isError]);

  return (
    <div>
      <form
        onSubmit={handleEditProfile}
        className="border rounded-md p-4 col-span-2"
      >
        <div>
          <p>Full Name</p>
          <input
            type="text"
            className="w-full border outline-none rounded px-3 py-1.5 mb-4 "
            defaultValue={name}
            name="name"
            required
          />
        </div>

        <div>
          <p>Number</p>
          <input
            type="text"
            className="w-full border outline-none rounded px-3 py-1.5 mb-4"
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
            className="w-full border outline-none rounded px-3 py-1.5 mb-4"
            defaultValue={email}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>City</p>
            <input
              className="w-full border outline-none rounded px-3 py-1.5 mb-4"
              defaultValue={city}
              name="city"
            />
          </div>

          <div>
            <p>District</p>
            <input
              className="w-full border outline-none rounded px-3 py-1.5 mb-4"
              defaultValue={district}
              name="district"
            />
          </div>
        </div>

        <div>
          <p>Full Address</p>
          <textarea
            className="w-full border outline-none rounded px-3 py-1.5 mb-4"
            defaultValue={street}
            name="street"
          />
        </div>

        <div>
          <button
            type="submite"
            className="w-full text-center bg-primary text-base-100 py-2 rounded scale-[1] hover:scale-[.99] duration-300"
            disabled={isLoading && "disabled"}
          >
            {isLoading ? "Loading..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
