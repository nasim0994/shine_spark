import { useEffect, useState } from "react";
import MultiSocial from "./MultiSocial";
import {
  useAddContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from "@/Redux/contact/contactApi";
import toast from "react-hot-toast";
import Spinner from "@/components/shared/Spinner/Spinner";

export default function Contact() {
  const [socials, setSocials] = useState([]);
  const { data, isLoading } = useGetContactQuery();

  useEffect(() => {
    if (data?.data[0]?.socials) {
      setSocials(data?.data[0]?.socials);
    }
  }, [data]);

  const [updateContact, { isLoading: updateLoading }] =
    useUpdateContactMutation();

  const [addContact, { isLoading: addLoading }] = useAddContactMutation();

  const id = data?.data[0]?._id;

  const handleContact = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const phone = form.phone.value;
    const whatsapp = form.whatsapp.value;
    const email = form.email.value;
    const address = form.address.value;

    const contactInfo = {
      title,
      phone,
      whatsapp,
      email,
      address,
      socials,
    };

    if (id) {
      const res = await updateContact({ id, contactInfo });
      if (res?.data?.success) {
        toast.success("Contact updated successfully");
      } else {
        toast.error(res?.data?.message || "Something went wrong");
        console.log(res);
      }
    } else {
      const res = await addContact(contactInfo);
      if (res?.data?.success) {
        toast.success("Contact add successfully");
      } else {
        toast.error(res?.data?.message || "Something went wrong");
        console.log(res);
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="rounded bg-base-100 pb-4 shadow">
      <div className="border-b p-4 font-medium text-neutral">
        <h3>Contact Info</h3>
      </div>

      <form
        onSubmit={handleContact}
        className="form_group mx-4 mt-3 flex flex-col gap-3 rounded border p-4 text-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-neutral-content">Title</p>
            <input
              type="text"
              name="title"
              defaultValue={data?.data[0]?.title}
            />
          </div>

          <div>
            <p className="text-neutral-content">Email</p>
            <input
              type="email"
              name="email"
              defaultValue={data?.data[0]?.email}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-neutral-content">Phone</p>
            <input
              type="text"
              name="phone"
              defaultValue={data?.data[0]?.phone}
            />
          </div>

          <div>
            <p className="text-neutral-content">Whatsapp</p>
            <input
              type="text"
              name="whatsapp"
              defaultValue={data?.data[0]?.whatsapp}
            />
          </div>
        </div>

        <div>
          <p className="text-neutral-content">Address</p>
          <textarea
            name="address"
            rows="3"
            defaultValue={data?.data[0]?.address}
          ></textarea>
        </div>

        <MultiSocial socials={socials} setSocials={setSocials} />

        <div className="flex justify-end">
          <button disabled={updateLoading} className="primary_btn">
            {updateLoading || addLoading ? "Loading..." : id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}
