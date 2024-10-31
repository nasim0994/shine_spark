import React from "react";
import * as FaIcons from "react-icons/fa";
import { BsTelephoneInbound } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetContactQuery } from "../../Redux/contact/contactApi";

const TopHeader = () => {
  const { data } = useGetContactQuery();
  const contact = data?.data[0];

  return (
    <div className="hidden border-b bg-primary py-1.5 text-base-100 sm:block">
      <div className="container mx-auto font-medium">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <ul className="flex items-center gap-2">
              {contact?.socials?.map((social, i) => (
                <Link
                  key={i}
                  to={social?.url}
                  target="_blank"
                  className="text-base"
                >
                  {React.createElement(FaIcons[social?.icon])}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <ul className="flex items-center gap-4 font-medium">
              <li className="border-r pr-3">
                <p className="flex items-center gap-1.5">
                  <BsTelephoneInbound />
                  {contact?.phone}
                </p>
              </li>

              <li>
                <p className="flex items-center gap-1.5">
                  <MdOutlineEmail className="text-base" />
                  {contact?.email}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
