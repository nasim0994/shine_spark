import React from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetContactQuery } from "../../Redux/contact/contactApi";
import { useGetBusinessInfoQuery } from "../../Redux/businessInfoApi/businessInfoApi";

export default function Footer() {
  const { data } = useGetContactQuery();
  const contact = data?.data[0];

  const { data: business } = useGetBusinessInfoQuery();
  const businessInfo = business?.data[0];

  let yearNow = new Date().getFullYear();

  return (
    <footer className="bg-black pb-20 pt-10 text-base-100 sm:pb-8">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-[13px] font-semibold uppercase tracking-[5px] opacity-50">
              Need Help?
            </h2>
            <ul className="flex flex-col gap-6 text-[15px] text-gray-200">
              <li className="flex flex-col gap-[2px]">
                <p>Email Us:</p>
                <p>{contact?.email}</p>
              </li>

              <li className="flex flex-col gap-[2px]">
                <p>Call Us:</p>
                <p>{contact?.phone}</p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-[13px] font-semibold uppercase tracking-[5px] opacity-50">
              Discover Shanaf
            </h2>
            <ul className="flex flex-col gap-2 text-[15px] text-gray-200">
              <li>
                <Link to="about-us">About Us</Link>
              </li>
              <li>
                <Link to="contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-[13px] font-semibold uppercase tracking-[5px] opacity-50">
              Policies
            </h2>
            <ul className="flex flex-col gap-2 text-[15px] text-gray-200">
              <li>
                <Link to="privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="return-policy">Refund and Return Policy</Link>
              </li>
              <li>
                <Link to="terms-conditions">Terms and Conditions</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-[13px] font-semibold uppercase tracking-[5px] opacity-50">
              Find Us
            </h2>
            <ul className="flex flex-col gap-5 text-[15px] text-gray-200">
              <li>
                Shop no. 14, 27 SHAPTAK SQUARE, Road No 16, Dhanmondi, Dhaka
                1205.
              </li>
              <li>
                <ul className="flex items-center gap-2">
                  {contact?.socials?.map((social, i) => (
                    <Link
                      key={i}
                      to={social?.url}
                      target="_blank"
                      className="flex h-10 w-10 items-center justify-center border border-base-100 text-lg duration-300 hover:bg-gray-200 hover:text-black"
                    >
                      {React.createElement(FaIcons[social?.icon])}
                    </Link>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <hr className="mt-8 border-gray-200 dark:border-gray-700 sm:mx-auto" />
        <hr className="mt-1 border-gray-200 dark:border-gray-700 sm:mx-auto" />

        {/* bottom */}
        <div className="mt-6 flex items-center justify-center">
          <span className="text-sm text-neutral-content">
            {yearNow} © {businessInfo?.companyName} | Developed by{" "}
            <Link
              to="https://emanagerit.com"
              target="_blank"
              className="text-base-100"
            >
              eManager
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
