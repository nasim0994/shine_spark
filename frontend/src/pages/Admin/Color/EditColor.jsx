import {
  useColorByIdQuery,
  useEditColorMutation,
} from "@/Redux/color/colorApi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditColor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useColorByIdQuery(id);
  const color = data?.data;

  const [editColor, { isLoading: updateLoading }] = useEditColorMutation();

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const code = e.target.code.value;

    const data = {
      name,
      code,
    };

    const res = await editColor({ id, data });
    if (res?.data?.success) {
      toast.success("Color Updated Successfully");
      navigate("/admin/product/color/all");
    } else {
      toast.error(res?.data?.message || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <form
      onSubmit={handleUpdateCategory}
      className="rounded bg-base-100 p-4 shadow sm:w-1/2"
    >
      <div className="form_group mt-2">
        <p>Sub Category Name</p>
        <input type="text" name="name" defaultValue={color?.name} required />
      </div>

      <div className="form_group mt-4">
        <p>
          Category <small>(hexa)</small>
        </p>
        <input type="text" name="code" required defaultValue={color?.code} />
      </div>

      <div className="mt-4">
        <button
          className="rounded bg-primary px-6 py-1.5 text-base-100"
          disabled={updateLoading}
        >
          {updateLoading ? "Loading.." : "Update"}
        </button>
      </div>
    </form>
  );
}
