import React from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiBlackBelt } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { CiRedo } from "react-icons/ci";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useGetSubCategoriesQuery } from "@/Redux/subCategory/subCategoryApi";
import { useGetContactQuery } from "@/Redux/contact/contactApi";
import { useGetBusinessInfoQuery } from "@/Redux/businessInfoApi/businessInfoApi";

export default function Footer() {
  const { data } = useGetSubCategoriesQuery({ limit: 10 });
  const subCategories = data?.data;

  const { data: contactData } = useGetContactQuery();
  const contact = contactData?.data[0];

  const { data: business } = useGetBusinessInfoQuery();
  const businessInfo = business?.data[0];
  let yearNow = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pb-6 pt-10">
      <div className="container">
        <div className="xl:mx-36">
          <div className="grid grid-cols-2 gap-6 text-neutral sm:grid-cols-4 lg:grid-cols-6">
            <div>
              <h2 className="text-sm uppercase opacity-80">Designer wear</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                {subCategories?.map((category) => (
                  <li key={category?._id}>
                    <Link to={`/shops?category=${category?.slug}`}>
                      {category?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm uppercase opacity-80">About Us</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ&apos;s</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm uppercase opacity-80">Policies</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                <li>
                  <Link to="/terms-conditions">Terms & conditions</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/return-policy">Returns</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm uppercase opacity-80">My Account</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                <li>
                  <Link to="/cart">Shopping Bag</Link>
                </li>
                <li>
                  <Link to="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link to="/account/orders">Order History</Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2">
              <h2 className="text-sm uppercase opacity-80">Follow US</h2>
              <ul className="opacity-85 mt-4 flex items-center gap-3 text-xl">
                {contact?.socials?.map((social, i) => (
                  <Link
                    key={i}
                    to={social?.url}
                    target="_blank"
                    className="text-2xl"
                  >
                    {React.createElement(FaIcons[social?.icon])}
                  </Link>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border-r pr-4">
                  <h2 className="text-sm uppercase opacity-80">Get in touch</h2>
                  <ul className="opacity-85 mt-4 flex flex-col gap-1 text-[13.5px]">
                    <li>
                      <Link to={`tel:${contact?.phone}`}>{contact?.phone}</Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-sm uppercase opacity-80">Email us on</h2>
                  <ul className="opacity-85 mt-4 flex flex-col gap-1 text-[13.5px]">
                    <li>
                      <Link to={`mailto:${contact?.email}`}>
                        {contact?.email}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-sm uppercase opacity-80">Address</h2>
                <ul className="opacity-85 mt-2 flex flex-col gap-1 text-[13.5px]">
                  <li>
                    <p>{contact?.address}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-start gap-8 text-[15px] opacity-80 sm:mt-16 sm:gap-10 lg:gap-24">
            <div className="flex items-center gap-2">
              <p>
                <HiOutlineEmojiHappy className="text-3xl opacity-60" />
              </p>
              <div>
                <p>24x7</p>
                <p className="-mt-1">Customer Support</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p>
                <FaShippingFast className="text-2xl opacity-60" />
              </p>
              <div>
                <p>Free Shipping*</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p>
                <CiRedo className="text-3xl opacity-60" />
              </p>
              <div>
                <p>Easy Returns</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p>
                <GiBlackBelt className="text-3xl opacity-60" />
              </p>
              <div>
                <p>Custom Fitting</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-sm opacity-70">
            <p>
              © {businessInfo?.companyStartYear} - {yearNow}{" "}
              {businessInfo?.companyName} All Rights Reserved. Developed by{" "}
              <Link
                to="https://www.emanagerit.com"
                target="_blank"
                className="underline"
              >
                eManager
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
