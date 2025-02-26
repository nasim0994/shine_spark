import Pagination from "@/components/Pagination/Pagination";
import Rating from "@/components/Rating/Rating";
import {
  useDeleteReviewMutation,
  useGetReviewsByUserIdQuery,
} from "@/Redux/review/reviewApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";

export default function MyReviews() {
  // const [editModal, setEditModal] = useState(false);
  const { loggedUser } = useSelector((state) => state.user);
  const userId = loggedUser?.data?._id;
  const [currentPage, setCurrentPage] = useState(1);

  const query = {};
  query["limit"] = 5;
  query["page"] = currentPage;

  const { data } = useGetReviewsByUserIdQuery({ userId, ...query });
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
      user: userId,
    };
    const res = await deleteReview({ reviewId, data });
    if (res?.data?.success) {
      toast.success("Review deleted successfully");
    } else {
      toast.error(res?.data?.message || "Failed to delete review");
      console.log(res);
    }
  };

  // Edit Review
  // const [editedReview, setEditedReview] = useState({});
  // const handleReviewEdit = (review) => {
  //   setEditedReview(review);
  //   setEditModal(true);
  // };

  return (
    <div>
      <div className="mb-3 border-b pb-1">
        <h3>All Reviews</h3>
      </div>

      <div className="flex flex-col gap-2">
        {data?.data?.map((review) => (
          <div key={review?._id} className="relative border-b p-3">
            <div className="flex items-center gap-5">
              <img
                src={
                  review?.user?.image === "" || review?.user?.image === null
                    ? "/images/demo_user.jpg"
                    : `${import.meta.env.VITE_BACKEND_URL}/user/${
                        review?.user?.image
                      }`
                }
                alt=""
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

            <div className="absolute right-3 top-3 flex items-center gap-1">
              <button
                // onClick={() => handleReviewEdit(review)}
                className="text-lg text-neutral-content duration-200 hover:text-primary"
              >
                <MdEdit />
              </button>

              {/* <ReviewEditForm
                editModal={editModal}
                setEditModal={setEditModal}
                review={editedReview}
              /> */}

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
        {pages > 1 && (
          <div className="p-3">
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pages={pages}
            />
          </div>
        )}
      </div>
    </div>
  );
}
