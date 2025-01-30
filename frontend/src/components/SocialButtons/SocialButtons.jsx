import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { useGetContactQuery } from "../../Redux/contact/contactApi";

export default function SocialButtons() {
  const { data: contact } = useGetContactQuery();

  return (
    <ul className="flex flex-col items-center gap-2">
      {contact?.data[0]?.socials?.map((social, i) => (
        <Link
          key={i}
          to={social?.url}
          target="_blank"
          className="border border-white bg-black p-2.5 text-xl text-white duration-300 hover:text-primary"
        >
          {React.createElement(FaIcons[social?.icon])}
        </Link>
      ))}
    </ul>
  );
}
