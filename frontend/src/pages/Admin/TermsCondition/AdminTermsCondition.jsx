import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import {
  useAddTermsConditionMutation,
  useGetTermsConditionQuery,
  useUpdateTermsConditionMutation,
} from "@/Redux/termscondition/termsconditionApi";
import toast from "react-hot-toast";

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
          toast.success("Terms & Conditions updated successfully");
        } else {
          toast.error(res?.data?.message || "Something went wrong");
          console.log(res);
        }
      } else {
        const res = await addPrivacy(info);
        if (res?.data?.success) {
          toast.success("Terms & Conditions added successfully");
        } else {
          toast.error(res?.data?.message || "Something went wrong");
          console.log(res);
        }
      }
    } catch (error) {
      toast.error(error?.data?.error);
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
