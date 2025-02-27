import { useGetFaqByIdQuery, useUpdateFaqMutation } from "@/Redux/faq/faq";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateFaq() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetFaqByIdQuery(id);
  const faq = data?.data;

  const [updateFaq, { isLoading }] = useUpdateFaqMutation();

  //------------Handle Add Faq
  const handleAddFaq = async (e) => {
    e.preventDefault();
    const qus = e.target.qus.value;
    const ans = e.target.ans.value;

    const data = {
      qus,
      ans,
    };

    const res = await updateFaq({ id, data });

    if (res?.data?.success) {
      toast.success("FAQ updated successfully");
      e.target.reset();
      navigate("/admin/pages/faq/all");
    } else {
      toast.error(res?.data?.error?.message || "Failed to update FAQ");
      console.log(res);
    }
  };
  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Edit FAQ</h3>
      </div>

      <form className="form_group p-4" onSubmit={handleAddFaq}>
        <div className="flex flex-col gap-2">
          {/* title */}
          <div>
            <p className="mb-1">Qus</p>
            <input type="text" name="qus" required defaultValue={faq?.qus} />
          </div>
          <div>
            <p className="mb-1">Ans</p>
            <textarea
              name="ans"
              required
              rows={5}
              defaultValue={faq?.ans}
            ></textarea>
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading} className="primary_btn">
            {isLoading ? "Loading..." : "Edit Faq"}
          </button>
        </div>
      </form>
    </section>
  );
}
