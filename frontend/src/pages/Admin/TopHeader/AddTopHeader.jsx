import { useAddTopHeaderMutation } from "@/Redux/topHeader/topHeaderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddTopHeader() {
  const navigate = useNavigate();
  const [addTopHeader, { isLoading }] = useAddTopHeaderMutation();

  //------------Handle Add
  const handleAdd = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    const data = { title };

    const res = await addTopHeader(data).unwrap();

    if (res?.success) {
      toast.success("Top Header added successfully");
      e.target.reset();
      navigate("/admin/business/section/topHeader/all");
    } else {
      toast.error(res?.error?.message || "Failed to add Top Header");
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Add Top Header</h3>
      </div>
      <form className="form_group p-4" onSubmit={handleAdd}>
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-1">Title</p>
            <input type="text" name="title" required />
          </div>
        </div>

        <button disabled={isLoading} className="primary_btn mt-5">
          {isLoading ? "Loading..." : "Add Top Header"}
        </button>
      </form>
    </section>
  );
}
