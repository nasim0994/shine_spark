import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../Redux/category/categoryApi";
import { useGetContactQuery } from "../../Redux/contact/contactApi";
import { useGetMainLogoQuery } from "../../Redux/logo/logoApi";
import { useGetBusinessInfoQuery } from "../../Redux/businessInfoApi/businessInfoApi";

export default function Footer() {
  const { data, isLoading } = useGetCategoriesQuery();
  const { data: contact, isLoading: contactLoading } = useGetContactQuery();
  const { data: logo, isLoading: logoLoading } = useGetMainLogoQuery();

  const fiveCategories = data?.data.slice(0, 5);

  const { data: business } = useGetBusinessInfoQuery();
  const businessInfo = business?.data[0];

  let yearNow = new Date().getFullYear();
  const startYear = businessInfo?.companyStartYear;

  if (isLoading || contactLoading || logoLoading) {
    return null;
  }

  return (
    <footer className="pt-8 pb-4 bg-gray-50">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="w-max">
              <Link to="/">
                <img
                  src={
                    logo?.data[0]?.logo === ""
                      ? "/images/logo/logo.png"
                      : `${import.meta.env.VITE_BACKEND_URL}/logo/${
                          logo?.data[0]?.logo
                        }`
                  }
                  className="w-36"
                  alt="Logo"
                />
              </Link>
            </div>
            <p className="text-neutral-content mt-1 font-medium">
              {businessInfo?.tagline}
            </p>

            <div className="mt-2 text-sm text-neutral-content">
              <p>{businessInfo?.bio}</p>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-base font-bold uppercase text-neutral/90">
              Categories
            </h2>
            <ul className="text-neutral-content text-[15px]">
              {fiveCategories?.map((category, i) => (
                <li key={i} className="mb-2">
                  <Link
                    to={`/shops/${category?.slug}`}
                    className="hover:underline"
                  >
                    {category?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-base font-bold uppercase text-neutral/90">
              Information
            </h2>
            <ul className="text-neutral-content text-[15px]">
              <li className="mb-2">
                <Link to="/shops" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-base font-bold uppercase text-neutral/90">
              Get in Touch
            </h2>
            <ul className="text-neutral-content text-[15px]">
              <li>
                <p>{contact?.data[0]?.phone}</p>
              </li>
              <li className="my-1">
                <p>{contact?.data[0]?.email}</p>
              </li>
              <li>
                <p className="italic">{contact?.data[0]?.address}</p>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700" />

        <div>
          <img
            src="/images/sslcommerz-banner.png"
            alt=""
            className="md:w-full md:h-[130px]"
          />
        </div>

        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700" />

        {/* bottom */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-[15px] text-neutral-content">
            Copyright© {yearNow != startYear && startYear + " -"} {yearNow}{" "}
            {businessInfo?.companyName}. All Rights Reserved. develop by{" "}
            <Link
              to="https://emanagerit.com"
              target="_blank"
              className="hover:underline"
            >
              eManager
            </Link>
          </span>
          <ul className="flex items-center gap-2 text-neutral-content mt-3 sm:mt-0">
            <li>
              <Link to={contact?.data[0]?.facebookLink} target="_blank">
                <BsFacebook className="text-lg hover:-mt-2 duration-300" />
              </Link>
            </li>
            <li>
              <Link
                to={`https://wa.me/${contact?.data[0]?.whatsapp}`}
                target="_blank"
              >
                <IoLogoWhatsapp className="text-xl hover:-mt-2 duration-300" />
              </Link>
            </li>
            <li>
              <Link to={contact?.data[0]?.instagramLink} target="_blank">
                <AiFillInstagram className="text-xl hover:-mt-2 duration-300" />
              </Link>
            </li>
            <li>
              <Link to="">
                <BsYoutube className="text-xl hover:-mt-2 duration-300" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
