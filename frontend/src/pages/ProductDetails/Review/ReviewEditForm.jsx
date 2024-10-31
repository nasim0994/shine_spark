import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEditReviewMutation } from "../../../Redux/review/reviewApi";
import Swal from "sweetalert2";

export default function ReviewEditForm({ editModal, setEditModal, review }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  useEffect(() => {
    if (review?.rating) {
      setCurrentValue(review?.rating);
    }
  }, [review?.rating]);

  const [editReview, { isLoading }] = useEditReviewMutation();

  const handleEditReview = async (e) => {
    e.preventDefault();
    const id = review?._id;
    const description = e.target.description.value;
    const data = {
      rating: currentValue,
      description,
      user: review?.user?._id,
      product: review?.product,
    };
    const res = await editReview({ data, id }).unwrap();
    if (res?.success) {
      setEditModal(false);
      Swal.fire("", "Edit Success", "success");
    }
  };

  return (
    <>
      <button
        onClick={() => setEditModal(false)}
        className={`modal_overlay ${editModal && "modal_overlay_show"}`}
      ></button>
      <form
        onSubmit={handleEditReview}
        className={`modal w-[95%] sm:w-[500px] p-4 ${
          editModal && "modal_show"
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p>Product name</p>
            <p className="text-neutral-content text-sm">Rate this product</p>
          </div>
          <div
            onClick={() => setEditModal(false)}
            className="text-neutral-content hover:text-primary duration-200 text-lg cursor-pointer"
          >
            <IoClose />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-center">
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={20}
                  onClick={() => setCurrentValue(index + 1)}
                  onMouseOver={() => setHoverValue(index + 1)}
                  onMouseLeave={() => setHoverValue(undefined)}
                  color={
                    (hoverValue || currentValue) > index ? "#facc15" : "#a9a9a9"
                  }
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
          <div className="mt-5">
            <textarea
              name="description"
              rows="4"
              className="border w-full rounded outline-none p-2 text-sm text-neutral"
              placeholder="Type your comment..."
              defaultValue={review?.description}
            ></textarea>
          </div>
        </div>

        <div className="mt-1 p-3">
          <button
            className="bg-primary text-base-100 px-4 py-1 rounded"
            disabled={isLoading && "disabled"}
          >
            {isLoading ? "Loading..." : "Edit"}
          </button>
        </div>
      </form>
    </>
  );
}
