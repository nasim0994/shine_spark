import {
  useAddBusinessInfoMutation,
  useGetBusinessInfoQuery,
  useUpdateBusinessInfoMutation,
} from "@/Redux/businessInfoApi/businessInfoApi";
import toast from "react-hot-toast";

export default function BusinessInfo() {
  const { data } = useGetBusinessInfoQuery();
  const businessInfo = data?.data[0];
  const id = businessInfo?._id;

  const [addBusinessInfo, { isLoading: addIsLoading }] =
    useAddBusinessInfoMutation();
  const [updateBusinessInfo, { isLoading: upIsLoading }] =
    useUpdateBusinessInfoMutation();

  const handleBusinessInfo = async (e) => {
    e.preventDefault();
    const form = e.target;
    const companyName = form.name.value;
    const companyStartYear = form.startYear.value;
    const companyType = form.type.value;
    const tagline = form.tagline.value;

    const data = {
      companyName,
      companyStartYear,
      companyType,
      tagline,
    };

    if (id) {
      const res = await updateBusinessInfo({ id, data });
      if (res?.data?.success) {
        toast.success("Business info updated successfully");
      } else {
        toast.error(res?.data?.message || "Failed to update business info");
      }
    } else {
      const res = await addBusinessInfo(data);
      if (res?.data?.success) {
        toast.success("Business info added successfully");
      } else {
        toast.error(res?.data?.message || "Failed to add business info");
      }
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">Business Info</h3>
      </div>

      <form
        onSubmit={handleBusinessInfo}
        className="form_group p-4 text-neutral-content"
      >
        {/*  */}
        <div className="grid items-start gap-4 rounded border p-4 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <p className="mb-1">Company Name *</p>
            <input
              type="text"
              name="name"
              defaultValue={businessInfo?.companyName}
              required
            />
          </div>

          <div>
            <p className="mb-1">Company Start Year *</p>
            <input
              type="text"
              name="startYear"
              defaultValue={businessInfo?.companyStartYear}
              required
            />
          </div>

          <div>
            <p className="mb-1">Company Type</p>
            <input
              type="text"
              name="type"
              defaultValue={businessInfo?.companyType}
            />
          </div>

          <div className="sm:col-span-2">
            <p className="mb-1">Tagline</p>
            <textarea
              name="tagline"
              rows="2"
              defaultValue={businessInfo?.tagline}
            ></textarea>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={addIsLoading || upIsLoading}
              className="primary_btn"
            >
              {addIsLoading || upIsLoading
                ? "Loading..."
                : id
                  ? "Update"
                  : "Add Info"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
