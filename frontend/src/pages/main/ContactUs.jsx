import usePageView from "@/hooks/usePageView";
import { useGetContactQuery } from "@/Redux/contact/contactApi";
import React, { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { FaPhone, FaWhatsapp } from "react-icons/fa6";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ContactUs() {
  usePageView("Contact Us");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data } = useGetContactQuery();
  const contact = data?.data[0];

  return (
    <section className="py-5">
      <h1 className="mb-6 text-center text-xl sm:text-2xl">{contact?.title}</h1>
      <div className="container">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex min-w-[250px] flex-col items-center justify-center gap-2 rounded bg-base-100 px-4 py-6 shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-base-100">
              <FaPhone className="text-xl" />
            </div>
            <h2 className="text-2xl font-semibold">Phone</h2>
            <p>{contact?.phone}</p>
          </div>

          <div className="flex min-w-[250px] flex-col items-center justify-center gap-2 rounded bg-base-100 px-4 py-6 shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-base-100">
              <FaWhatsapp className="text-xl" />
            </div>
            <h2 className="text-2xl font-semibold">Whatsapp</h2>
            <p>{contact?.whatsapp}</p>
          </div>

          <div className="flex min-w-[250px] flex-col items-center justify-center gap-2 rounded bg-base-100 px-4 py-6 shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-base-100">
              <MdOutlineMail className="text-xl" />
            </div>
            <h2 className="text-2xl font-semibold">Email</h2>
            <p>{contact?.email}</p>
          </div>

          <div className="flex min-w-[250px] flex-col items-center justify-center gap-2 rounded bg-base-100 px-4 py-6 shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-base-100">
              <MdOutlineLocationOn className="text-xl" />
            </div>
            <h2 className="text-2xl font-semibold">Address</h2>
            <p>{contact?.address}</p>
          </div>
        </div>
      </div>

      <h2 className="mb-6 mt-10 text-center text-2xl sm:text-3xl">Social</h2>
      <ul className="flex items-center justify-center gap-8">
        {contact?.socials?.map((social, i) => (
          <Link
            key={i}
            to={social?.url}
            target="_blank"
            className="text-4xl duration-300 hover:text-primary"
          >
            {React.createElement(FaIcons[social?.icon])}
          </Link>
        ))}
      </ul>
    </section>
  );
}
