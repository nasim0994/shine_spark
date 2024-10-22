import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import {
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
} from "../../../Redux/admin/adminApi";
import { useSelector } from "react-redux";

export default function Administrator() {
  const { data, isLoading, isError, error } = useGetAllAdminsQuery();
  const { loggedUser } = useSelector((state) => state.user);
  const role = loggedUser?.data?.role;

  const [deleteAdmin] = useDeleteAdminMutation();

  const handleDlete = async (id) => {
    if (loggedUser?.data?._id === id) {
      return toast.error("You can't delete yourself");
    }
    const isConfirm = window.confirm("Are you sure delete Administrator");
    if (isConfirm) {
      const res = await deleteAdmin(id);
      if (res?.data?.success) {
        toast.success("Administrator deleted successfully");
      } else {
        toast.error(res?.data?.message || "Something went wrong");
        console.log(res);
      }
    }
  };

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((user) => (
      <tr key={user?._id}>
        <td>
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/user/${user?.image}`}
              alt={user?.name}
              className="h-10 w-10 rounded-full"
              loading="lazy"
            />
            {user?.name}
          </div>
        </td>
        <td>{user?.email}</td>
        <td>{user?.phone}</td>
        <td>{user?.role}</td>
        <td>
          <div className="flex items-center gap-2">
            {role === "superAdmin" && (
              <Link to={`/admin/administrator/edit-administrator/${user?._id}`}>
                <FaEdit className="text-[17px] text-gray-700 duration-200 hover:text-green-500" />
              </Link>
            )}
            <button onClick={() => handleDlete(user?._id)}>
              <AiOutlineDelete className="text-lg hover:text-red-500" />
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <section>
      <div className="mb-2 flex justify-end">
        <Link
          to="/admin/administrator/add-administrator"
          className="primary_btn"
        >
          Add Administrator
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-lg">
        <table className="dashboard_table">
          <thead>
            <tr>
              <th>User name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </section>
  );
}
