import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddColorMutation } from "../../../Redux/color/colorApi";

export default function AddColor() {
  const navigate = useNavigate();
  const [addColor, { isLoading }] = useAddColorMutation();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const code = e.target.code.value;

    const data = {
      name,
      code,
    };

    const result = await addColor(data);
    if (result?.data?.success) {
      Swal.fire("", "add success", "success");
      navigate("/admin/colors");
    } else {
      Swal.fire("", "Somethin went wrong", "error");
    }
  };

  return (
    <form
      onSubmit={handleAddCategory}
      className="p-4 bg-base-100 shadhow rounded sm:w-1/2"
    >
      <div className="form_group mt-2">
        <p className="text-neutral-content">Color Name</p>
        <input type="text" name="name" required />
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">
          Color Code <small>(hexa)</small>
        </p>
        <input type="text" name="code" defaultValue="#" required />
      </div>

      <div className="mt-4">
        <button
          className="primary_btn text-sm"
          disabled={isLoading && "disabled"}
        >
          {isLoading ? "Loading.." : "Submit"}
        </button>
      </div>
    </form>
  );
}
