import { useCreateFaqMutation } from "@/Redux/faq/faq";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddFaq() {
  const navigate = useNavigate();
  const [addFaq, { isLoading }] = useCreateFaqMutation();

  //------------Handle Add Faq
  const handleAddFaq = async (e) => {
    e.preventDefault();
    const qus = e.target.qus.value;
    const ans = e.target.ans.value;

    const data = {
      qus,
      ans,
    };

    const res = await addFaq(data).unwrap();

    if (res?.success) {
      toast.success("FAQ added successfully");
      e.target.reset();
      navigate("/admin/pages/faq/all");
    } else {
      toast.error(res?.error?.message || "Failed to add FAQ");
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Add FAQ</h3>
      </div>
      <form className="form_group p-4" onSubmit={handleAddFaq}>
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-1">Qus</p>
            <input type="text" name="qus" required />
          </div>
          <div>
            <p className="mb-1">Ans</p>
            <textarea name="ans" required rows={5}></textarea>
          </div>
        </div>

        <button disabled={isLoading} className="primary_btn mt-5">
          {isLoading ? "Loading..." : "Add FAQ"}
        </button>
      </form>
    </section>
  );
}
