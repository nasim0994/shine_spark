import { GiBlackBelt } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { CiRedo } from "react-icons/ci";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 pb-6 pt-10">
      <div className="container">
        <div className="xl:mx-36">
          <div className="grid grid-cols-2 gap-6 text-neutral sm:grid-cols-4 lg:grid-cols-6">
            <div>
              <h2 className="text-sm uppercase opacity-80">Designer wear</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                <li>
                  <Link to="">Salwar Kameez</Link>
                </li>
                <li>
                  <Link to="">Sarees</Link>
                </li>
                <li>
                  <Link to="">Lehengas</Link>
                </li>
                <li>
                  <Link to="">Gowns</Link>
                </li>
                <li>
                  <Link to="">Kidswear</Link>
                </li>
                <li>
                  <Link to="">Saree Blouse</Link>
                </li>
                <li>
                  <Link to="">Kurtis</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm uppercase opacity-80">About Us</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                <li>
                  <Link to="">About Us</Link>
                </li>
                <li>
                  <Link to="">Contact Us</Link>
                </li>
                <li>
                  <Link to="">Testimonial</Link>
                </li>
                <li>
                  <Link to="">FAQ&apos;s</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm uppercase opacity-80">Policies</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                <li>
                  <Link to="">Terms & conditions</Link>
                </li>
                <li>
                  <Link to="">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="">Returns</Link>
                </li>
                <li>
                  <Link to="">Payment Policy</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm uppercase opacity-80">My Account</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                <li>
                  <Link to="">Shopping Bag</Link>
                </li>
                <li>
                  <Link to="">Wishlist</Link>
                </li>
                <li>
                  <Link to="">Order History</Link>
                </li>
                <li>
                  <Link to="">Order Tracking</Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2">
              <h2 className="text-sm uppercase opacity-80">Follow US</h2>
              <ul className="opacity-85 mt-4 flex items-center gap-3 text-xl">
                <li>
                  <Link to="">
                    <BsFacebook />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <AiFillInstagram className="text-2xl" />
                  </Link>
                </li>
              </ul>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border-r pr-4">
                  <h2 className="text-sm uppercase opacity-80">Get in touch</h2>
                  <ul className="opacity-85 mt-4 flex flex-col gap-1 text-[13.5px]">
                    <li>
                      <Link to="">+61 (02) 8006 4667 (AUS)</Link>
                    </li>
                    <li>
                      <Link to="">+91 (22) 4890 0416 (India)</Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-sm uppercase opacity-80">Email us on</h2>
                  <ul className="opacity-85 mt-4 flex flex-col gap-1 text-[13.5px]">
                    <li>
                      <Link to="">info@kalkifashion.com</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-sm uppercase opacity-80">Address</h2>
                <ul className="opacity-85 mt-2 flex flex-col gap-1 text-[13.5px]">
                  <li>
                    <Link to="">Dhaka Bangladesh</Link>
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
              © 2007 - 2025 Shine&Spark All Rights Reserved. Developed by{" "}
              <Link to="https://www.emanagerit.com/" target="_blank">
                eManager
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
