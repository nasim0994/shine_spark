import {
  useGetTopHeaderByIdQuery,
  useUpdateTopHeaderMutation,
} from "@/Redux/topHeader/topHeaderApi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTopHeader() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetTopHeaderByIdQuery(id);
  const topHeader = data?.data;

  const [updateTopHeader, { isLoading }] = useUpdateTopHeaderMutation();

  //------------Handle Edit
  const handleAddFaq = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    const data = { title };

    const res = await updateTopHeader({ id, data });

    if (res?.data?.success) {
      toast.success("Top Header updated successfully");
      e.target.reset();
      navigate("/admin/business/section/topHeader/all");
    } else {
      toast.error(res?.data?.error?.message || "Failed to update Top Header");
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Edit Top Header</h3>
      </div>

      <form className="form_group p-4" onSubmit={handleAddFaq}>
        <div className="flex flex-col gap-2">
          <div>
            <p className="mb-1">Title</p>
            <input
              type="text"
              name="title"
              required
              defaultValue={topHeader?.title}
            />
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading} className="primary_btn">
            {isLoading ? "Loading..." : "Edit Top Header"}
          </button>
        </div>
      </form>
    </section>
  );
}
