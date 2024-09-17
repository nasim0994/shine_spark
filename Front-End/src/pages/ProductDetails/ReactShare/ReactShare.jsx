import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebook,
  FaTelegram,
  FaLinkedin,
  FaWhatsappSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function ReactShare({ slug }) {
  const url = `${import.meta.env.VITE_FRONTEND_URL}/product/${slug}`;
  return (
    <div className="mt-px flex gap-2">
      <FacebookShareButton url={url}>
        <FaFacebook className="text-xl text-blue-600" />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <FaSquareXTwitter className="text-xl" />
      </TwitterShareButton>
      <TelegramShareButton url={url}>
        <FaTelegram className="text-xl text-sky-500" />
      </TelegramShareButton>
      <LinkedinShareButton url={url}>
        <FaLinkedin className="text-xl text-sky-400" />
      </LinkedinShareButton>
      <WhatsappShareButton url={url}>
        <FaWhatsappSquare className="text-xl text-green-500" />
      </WhatsappShareButton>
    </div>
  );
}
