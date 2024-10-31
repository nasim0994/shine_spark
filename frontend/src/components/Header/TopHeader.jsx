import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook, BsTelephoneInbound, BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetContactQuery } from "../../Redux/contact/contactApi";

const TopHeader = () => {
  const { data } = useGetContactQuery();
  const contact = data?.data[0];
  return (
    <div className="hidden sm:block bg-primary py-1.5 border-b text-base-100">
      <div className="container mx-auto font-medium">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <ul className="flex items-center gap-2">
              <li>
                <Link
                  to={contact?.facebookLink}
                  target="_blank"
                  className="hover:text-base-100 duration-200"
                >
                  <BsFacebook />
                </Link>
              </li>
              <li>
                <Link to={contact?.linkedinLink} target="_blank">
                  <FaLinkedin className="text-[15px]" />
                </Link>
              </li>
              <li>
                <Link to={contact?.instagramLink} target="_blank">
                  <AiFillInstagram className="text-base mr-1" />
                </Link>
              </li>
              <li>
                <Link to={contact?.youtubeLink} target="_blank">
                  <BsYoutube className="text-[15px] mt-px" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6 ">
            <ul className="flex gap-4 items-center font-medium">
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
