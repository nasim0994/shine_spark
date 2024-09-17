import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import Swal from "sweetalert2";
import {
  useAllColorsQuery,
  useDeleteColorMutation,
} from "../../../Redux/color/colorApi";

export default function AllColor() {
  const { data, isLoading, isError, error } = useAllColorsQuery();
  const colors = data?.data;

  const [deleteColor] = useDeleteColorMutation();

  // Delete Sub Category
  const handleDeleteColor = async (color) => {
    const id = color?._id;

    const isConfirm = window.confirm("Are you sure delete this color?");

    if (isConfirm) {
      const result = await deleteColor(id);
      if (result?.data?.success) {
        Swal.fire("", "Delete Success", "success");
      } else {
        Swal.fire("", "Somethin went worng", "error");
      }
    }
  };

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }

  if (!isLoading && isError) {
    content = <p>{error?.data?.error}</p>;
  }
  if (!isLoading && !isError && colors?.length > 0) {
    content = colors?.map((color, i) => (
      <tr key={color?._id}>
        <td>{i + 1}</td>
        <td>{color?.name}</td>
        <td>{color?.code}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/color/edit/${color?._id}`}
              className="flex gap-1 items-center hover:text-green-700 duration-300"
            >
              <BiSolidPencil />
            </Link>
            <button
              onClick={() => handleDeleteColor(color)}
              className="hover:text-red-500"
            >
              <MdOutlineDelete />
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Link to="/admin/color/add" className="primary_btn text-sm">
          Add New
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-lg">
        <table className="dashboard_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {content ? (
              content
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-red-500 text-sm">
                  No color found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
