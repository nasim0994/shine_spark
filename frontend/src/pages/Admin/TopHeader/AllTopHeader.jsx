import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";
import {
  useDeleteTopHeaderMutation,
  useGetAllTopHeaderQuery,
} from "@/Redux/topHeader/topHeaderApi";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function AllTopHeader() {
  const { data, isLoading, isError, isSuccess } = useGetAllTopHeaderQuery();
  const topHeaders = data?.data;

  const [deleteTopHeader] = useDeleteTopHeaderMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this content?");
    if (isConfirm) {
      const res = await deleteTopHeader(id);
      if (res?.data?.success) {
        toast.success("deleted successfully");
      } else {
        toast.error(res?.error?.message || "Failed to delete");
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
        {topHeaders?.map((topHeader, i) => (
          <tr key={topHeader?._id}>
            <td>{i + 1}</td>
            <td>{topHeader?.title}</td>
            <td>
              <div className="flex items-center gap-3">
                <Link
                  to={`/admin/business/section/topHeader/edit/${topHeader?._id}`}
                >
                  <AiOutlineEdit className="text-lg hover:text-red-500" />
                </Link>
                <button onClick={() => handleDelete(topHeader?._id)}>
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
          <h1 className="font-medium text-neutral">Top Header</h1>
          <Link
            to="/admin/business/section/topHeader/add"
            className="primary_btn text-sm"
          >
            Add New
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto bg-base-100">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  );
}
