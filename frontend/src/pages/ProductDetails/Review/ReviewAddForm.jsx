import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { useAddReviewMutation } from "../../../Redux/review/reviewApi";

export default function ReviewAddForm({ addModal, setAddModal, product, user }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [description, setDescription] = useState("");
  const stars = Array(5).fill(0);

  // console.log(user);

  const [addReview, { isLoading, isError, error, isSuccess }] =
    useAddReviewMutation();

  useEffect(() => {
    if (isError) {
      setAddModal(false);
      Swal.fire("", error.data.error, "error");
    }

    if (isSuccess) {
      Swal.fire("", "Review added successfully", "success");
      setAddModal(false);
      setDescription("");
      setCurrentValue(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, error]);

  const handleAddReview = async () => {
    if (!user?._id) {
      return Swal.fire("", "Please login to write review", "warning");
    }

    const data = {
      rating: currentValue,
      description,
      user: user?._id,
      product: product?._id,
    };

    await addReview(data).unwrap();
  };

  return (
    <>
      <button
        onClick={() => setAddModal(false)}
        className={`modal_overlay ${addModal && "modal_overlay_show"}`}
      ></button>
      <div
        className={`modal w-[95%] sm:w-[500px] p-4 ${addModal && "modal_show"}`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p>Product name</p>
            <p className="text-neutral-content text-sm">Rate this product</p>
          </div>
          <button
            onClick={() => setAddModal(false)}
            className="text-neutral-content hover:text-primary duration-200 text-lg"
          >
            <IoClose />
          </button>
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
              name=""
              rows="4"
              className="border w-full rounded outline-none p-2 text-sm text-neutral"
              placeholder="Type your comment..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="mt-1 p-3">
          <button
            onClick={handleAddReview}
            disabled={isLoading && "disabled"}
            className="bg-primary text-base-100 px-4 py-1 rounded"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}
