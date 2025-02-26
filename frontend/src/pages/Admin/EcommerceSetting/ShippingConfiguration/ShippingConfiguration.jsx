import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useAddShippingConfigMutation,
  useGetShippingConfigQuery,
  useUpdateShippingConfigMutation,
} from "../../../../Redux/shippingConfigApi";
import ShippingInput from "./ShippingInput";

export default function ShippingConfiguration() {
  const [shipping, setShipping] = useState([]);
  const { data, isLoading: loading } = useGetShippingConfigQuery();
  const shippngData = data?.data?.shipping;
  const id = data?.data?._id;

  useEffect(() => {
    if (shippngData?.length > 0) {
      setShipping(shippngData);
    }
  }, [shippngData]);

  const [addShippingConfig, { isLoading }] = useAddShippingConfigMutation();
  const [updateShippingConfig, { isLoading: uIsLoading }] =
    useUpdateShippingConfigMutation();

  const handleShipping = async (e) => {
    e.preventDefault();

    if (shipping.length === 0) {
      alert("Please add at least one shipping configuration.");
      return;
    }

    const data = {
      shipping,
    };

    if (id) {
      const res = await updateShippingConfig({ id, data });

      if (res?.data?.success) {
        toast.success("Shipping Configuration updated successfully");
      } else {
        toast.error(
          res?.data?.message || "Failed to update Shipping Configuration",
        );
        console.log(res);
      }
    } else {
      const res = await addShippingConfig({ shipping });
      if (res?.data?.success) {
        toast.success("Shipping Configuration added successfully");
      } else {
        toast.error(
          res?.data?.message || "Failed to add Shipping Configuration",
        );
        console.log(res);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="rounded bg-base-100 text-neutral shadow">
      <div className="border-b p-3">
        <h1>Shipping Configuration</h1>
      </div>

      <div className="p-3 text-neutral-content">
        <form onSubmit={handleShipping} className="form_group text-sm">
          <ShippingInput shipping={shipping} setShipping={setShipping} />

          <div className="mt-4">
            <button disabled={isLoading || uIsLoading} className="primary_btn">
              {isLoading || uIsLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
