import { useAddColorMutation } from "@/Redux/color/colorApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      toast.success("Color Added Successfully");
      navigate("/admin/product/color/all");
    } else {
      toast.error("Something went wrong");
      console.log(result);
    }
  };

  return (
    <form
      onSubmit={handleAddCategory}
      className="rounded bg-base-100 p-4 shadow sm:w-1/2"
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
        <button className="primary_btn text-sm" disabled={isLoading}>
          {isLoading ? "Loading.." : "Submit"}
        </button>
      </div>
    </form>
  );
}
