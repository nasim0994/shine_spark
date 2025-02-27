import Pagination from "@/components/Pagination/Pagination";
import Rating from "@/components/Rating/Rating";
import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from "@/Redux/review/reviewApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

export default function AllReview() {
  const [currentPage, setCurrentPage] = useState(1);
  const [description, setDescription] = useState("");

  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  const query = {};
  query["limit"] = 5;
  query["page"] = currentPage;
  query["description"] = description;
  const { data, isLoading } = useGetAllReviewsQuery({ ...query });
  const [deleteReview] = useDeleteReviewMutation();

  const pages = Math.ceil(
    parseInt(data?.meta?.total) / parseInt(data?.meta?.limit),
  );

  const handleReviewDelete = async (reviewId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?",
    );
    if (!confirm) return;

    const data = {
      user: user?._id,
    };
    await deleteReview({ reviewId, data }).unwrap();
    toast.success("Review deleted successfully");
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between rounded-md bg-base-100 p-3 shadow-lg">
        <h1 className="text-lg">AllReview</h1>
        <div>
          <input
            type="text"
            className="rounded-md border px-2.5 py-1.5 placeholder:text-sm"
            placeholder="Search by description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded bg-base-100 p-3 shadow-lg">
        {data?.data && data?.data?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {data?.data?.map((review) => (
              <div key={review?._id} className="relative border-b p-3">
                <div className="flex items-center gap-5">
                  <img
                    src={
                      user?.image === "" || user?.image === null
                        ? "/images/demo_user.jpg"
                        : `${import.meta.env.VITE_BACKEND_URL}/user/${
                            user?.image
                          }`
                    }
                    alt="user"
                    className="h-9 w-9 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <p>{review?.user?.name}</p>
                      <p className="text-sm text-neutral-content">
                        {review?.createdAt?.split("T")[0]}
                      </p>
                    </div>
                    <Rating rating={review?.rating} />
                  </div>
                </div>

                <p className="mt-2.5 text-sm text-neutral-content">
                  {review?.description}
                </p>

                <div className="absolute right-3 top-3">
                  <button
                    onClick={() => handleReviewDelete(review?._id)}
                    className="text-lg text-neutral-content duration-200 hover:text-primary"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}

            {/* pagination */}
            <div className="p-3">
              <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pages={pages}
              />
            </div>
          </div>
        ) : (
          <p className="py-4 text-center text-red-500">
            There have been no reviews yet.
          </p>
        )}
      </div>
    </div>
  );
}
