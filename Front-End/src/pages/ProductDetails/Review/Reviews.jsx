import { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteReviewMutation,
  useGetReviewsByProductIdQuery,
} from "../../../Redux/review/reviewApi";
import Pagination from "../../../components/Pagination/Pagination";
import Rating from "../../../components/Rating/Rating";
import ReviewAddForm from "./ReviewAddForm";
import ReviewEditForm from "./ReviewEditForm";

export default function Reviews({ product }) {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;
  const productId = product?._id;

  const [deleteReview] = useDeleteReviewMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const query = {};
  query["limit"] = 5;
  query["page"] = currentPage;

  const { data } = useGetReviewsByProductIdQuery({ productId, ...query });
  const pages = Math.ceil(
    parseInt(data?.meta?.total) / parseInt(data?.meta?.limit)
  );

  // Delete review
  const handleReviewDelete = async (reviewId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirm) return;

    const data = {
      user: user?._id,
    };
    await deleteReview({ reviewId, data }).unwrap();
    Swal.fire("", "Review deleted successfully", "success");
  };

  // Edit Review
  const [editedReview, setEditedReview] = useState({});
  const handleReviewEdit = (review) => {
    setEditedReview(review);
    setEditModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b p-3">
        <div>
          <h1 className="text-2xl">{product?.rating?.toFixed(1) || 0}</h1>
          <Rating rating={product?.rating || 0} />

          <p className="mt-1 text-neutral-content text-sm">
            {(product?.rating * product?.reviewer).toFixed(0)} Ratings and{" "}
            {product?.reviewer} Reviews
          </p>
        </div>

        {user && user?._id ? (
          <div className="flex items-center gap-4">
            <p>Rate this product</p>
            <button
              onClick={() => setAddModal(!addModal)}
              className="border border-primary text-primary rounded px-4 py-1 hover:bg-primary hover:text-base-100 duration-300 font-light"
            >
              Write a review
            </button>

            <ReviewAddForm
              addModal={addModal}
              setAddModal={setAddModal}
              product={product}
              user={user}
            />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <p>Please login to write review</p>
            <Link
              to="/login"
              className="border rounded px-4 py-1 hover:bg-primary hover:text-base-100 duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      {data?.data && data?.data?.length > 0 ? (
        <div className="flex flex-col gap-2">
          {data?.data?.map((review) => (
            <div key={review?._id} className="border-b p-3 relative">
              <div className="flex items-center gap-5">
                <img
                  src={
                    user?.image === "" || user?.image === null
                      ? "/images/demo_user.jpg"
                      : `${import.meta.env.VITE_BACKEND_URL}/user/${
                          user?.image
                        }`
                  }
                  alt=""
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <p>{review?.user?.name}</p>
                    <p className="text-neutral-content text-sm">
                      {review?.createdAt?.split("T")[0]}
                    </p>
                  </div>
                  <Rating rating={review?.rating} />
                </div>
              </div>

              <p className="mt-2.5 text-sm text-neutral-content">
                {review?.description}
              </p>

              {review?.user?._id === user?._id && (
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    onClick={() => handleReviewEdit(review)}
                    className="text-lg text-neutral-content hover:text-primary duration-200 "
                  >
                    <MdEdit />
                  </button>

                  <ReviewEditForm
                    editModal={editModal}
                    setEditModal={setEditModal}
                    review={editedReview}
                  />

                  <button
                    onClick={() => handleReviewDelete(review?._id)}
                    className="text-lg text-neutral-content hover:text-primary duration-200 "
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              )}
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
        <p className="text-center py-4 text-neutral-content">
          There have been no reviews for this product yet.
        </p>
      )}
    </div>
  );
}
