import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import {
  useAddTermsConditionMutation,
  useGetTermsConditionQuery,
  useUpdateTermsConditionMutation,
} from "../../../Redux/termscondition/termsconditionApi";

export default function AdminTermsCondition() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [id, setId] = useState(null);

  const { data: privacy, isLoading } = useGetTermsConditionQuery();

  const [addPrivacy, { isLoading: addIsLoading }] =
    useAddTermsConditionMutation();

  const [updatePrivacy, { isLoading: updateIsLoading }] =
    useUpdateTermsConditionMutation();

  useEffect(() => {
    if (privacy) {
      setContent(privacy?.data?.description);
      setId(privacy?.data?._id);
    }
  }, [privacy]);

  const handlePrivacyPolicy = async (e) => {
    e.preventDefault();
    const info = { description: content };

    try {
      if (id) {
        const res = await updatePrivacy({ id, data: info });
        if (res?.data?.success) {
          Swal.fire(
            "Success",
            "Terms & Conditions updated successfully",
            "success",
          );
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      } else {
        const res = await addPrivacy(info);
        if (res?.data?.success) {
          Swal.fire(
            "Success",
            "Terms & Conditions created successfully",
            "success",
          );
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
      console.log(error);
    }
  };

  return (
    <div className="make_privacy_policy">
      <h2 className="mb-3 text-center text-xl font-medium text-primary sm:text-2xl">
        {id ? "Edit Terms & Conditions" : "Create Terms & Conditions"}
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handlePrivacyPolicy}>
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            className="h400"
          />
          <div className="mt-4">
            <button
              className="primary_btn"
              disabled={addIsLoading || updateIsLoading}
            >
              {addIsLoading || updateIsLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
