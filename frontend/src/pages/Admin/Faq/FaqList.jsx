import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";
import { useDeleteFaqByIdMutation, useGetFaqQuery } from "@/Redux/faq/faq";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function FaqList() {
  const { data, isLoading, isError, isSuccess } = useGetFaqQuery();
  const faq = data?.data;

  const [deleteFaq] = useDeleteFaqByIdMutation();
  const deleteFaqHandler = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this Faq?");
    if (isConfirm) {
      const res = await deleteFaq(id).unwrap();
      if (res?.success) {
        toast.success("FAQ deleted successfully");
      } else {
        toast.error(res?.error?.message || "Failed to delete FAQ");
        console.log(res);
      }
    }
  };

  let content = null;
  if (isLoading) return (content = <TableSkeleton />);

  if (isError) {
    content = (
      <p className="mt-5 text-red-500">Something went wrong to get data!</p>
    );
  }

  if (!isError && isSuccess) {
    content = (
      <tbody>
        {faq?.map((faq, i) => (
          <tr key={faq?._id}>
            <td>{i + 1}</td>
            <td>{faq?.qus}</td>
            <td>{faq?.ans}</td>
            <td>
              <div className="flex items-center gap-3">
                <Link to={`/admin/pages/faq/edit/${faq?._id}`}>
                  <AiOutlineEdit className="text-lg hover:text-red-500" />
                </Link>
                <button onClick={() => deleteFaqHandler(faq?._id)}>
                  <AiOutlineDelete className="text-lg hover:text-red-500" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">FAQ</h1>
          <Link to="/admin/pages/faq/add" className="primary_btn text-sm">
            Add FAQ
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Qus</th>
              <th>Ans</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  );
}
