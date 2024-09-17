import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useColorByIdQuery,
  useEditColorMutation,
} from "../../../Redux/color/colorApi";

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
      Swal.fire("", "Update Success", "success");
      navigate("/admin/colors");
    } else {
      Swal.fire("", "Somethin went worng", "error");
      console.log(res);
    }
  };

  return (
    <form
      onSubmit={handleUpdateCategory}
      className="p-4 bg-base-100 shadhow rounded sm:w-1/2"
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
          className="bg-primary text-base-100 px-6 py-1.5 rounded"
          disabled={updateLoading && "disabled"}
        >
          {updateLoading ? "Loading.." : "Update"}
        </button>
      </div>
    </form>
  );
}
