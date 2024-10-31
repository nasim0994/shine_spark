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
    <footer className="bg-gray-50 pb-4 pt-8">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
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
                  className="w-48"
                  alt="Logo"
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="mt-1 font-medium text-neutral-content">
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
            <ul className="text-[15px] text-neutral-content">
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
            <ul className="text-[15px] text-neutral-content">
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
            <ul className="text-[15px] text-neutral-content">
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

        <hr className="my-4 border-gray-200 dark:border-gray-700 sm:mx-auto" />

        {/* bottom */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-[15px] text-neutral-content">
            Copyright© {yearNow != startYear && startYear + " -"} {yearNow}{" "}
            {businessInfo?.companyName}. All Rights Reserved. develop by{" "}
            <Link
              to="https://emanagerit.com"
              target="_blank"
              className="underline"
            >
              eManager
            </Link>
          </span>
          <ul className="mt-3 flex items-center gap-2 text-neutral-content sm:mt-0">
            <li>
              <Link to={contact?.data[0]?.facebookLink} target="_blank">
                <BsFacebook className="text-lg duration-300 hover:-mt-2" />
              </Link>
            </li>
            <li>
              <Link
                to={`https://wa.me/${contact?.data[0]?.whatsapp}`}
                target="_blank"
              >
                <IoLogoWhatsapp className="text-xl duration-300 hover:-mt-2" />
              </Link>
            </li>
            <li>
              <Link to={contact?.data[0]?.instagramLink} target="_blank">
                <AiFillInstagram className="text-xl duration-300 hover:-mt-2" />
              </Link>
            </li>
            <li>
              <Link to="">
                <BsYoutube className="text-xl duration-300 hover:-mt-2" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
