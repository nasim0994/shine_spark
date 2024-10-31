import { FaTrash, FaPlus } from "react-icons/fa";

const iconOptions = [
  { label: "Facebook", value: "FaFacebook" },
  { label: "Twitter", value: "FaTwitter" },
  { label: "LinkedIn", value: "FaLinkedin" },
  { label: "Instagram", value: "FaInstagram" },
  { label: "YouTube", value: "FaYoutube" },
  { label: "Pinterest", value: "FaPinterest" },
  { label: "GitHub", value: "FaGithub" },
  { label: "Behance", value: "FaBehance" },
  { label: "Twitch", value: "FaTwitch" },
  { label: "Snapchat", value: "FaSnapchat" },
  { label: "Reddit", value: "FaReddit" },
  { label: "WhatsApp", value: "FaWhatsapp" },
  { label: "WhatsApp Square", value: "FaWhatsappSquare" },
  { label: "Telegram", value: "FaTelegram" },
  { label: "Medium", value: "FaMedium" },
  { label: "Discord", value: "FaDiscord" },
  { label: "Tiktok", value: "FaTiktok" },
  { label: "Skype", value: "FaSkype" },
];

export default function MultiSocial({
  socials: social,
  setSocials: setSocial,
}) {
  const handleInputChange = (index, event) => {
    const values = [...social];
    values[index].url = event.target.value;
    setSocial(values);
  };

  const handleIconChange = (index, event) => {
    const values = [...social];
    values[index].icon = event.target.value;
    setSocial(values);
  };

  const handleAddFields = () => {
    if (isFormValid()) {
      setSocial([...social, { icon: "", url: "" }]);
    } else {
      alert("Please select an icon and provide a URL.");
    }
  };

  const handleRemoveFields = (index) => {
    const values = [...social];
    values.splice(index, 1);
    setSocial(values);
  };

  const isFormValid = () => {
    return social.every((entry) => entry.icon !== "" && entry.url !== "");
  };

  return (
    <div className="mt-3 flex flex-col gap-3 border rounded p-3">
      {social?.map((input, index) => (
        <div key={index} className="flex gap-2 text-sm">
          <select
            value={input.icon}
            onChange={(event) => handleIconChange(index, event)}
          >
            <option value="">Select Platform</option>
            {iconOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="url"
            placeholder="Social Media URL"
            value={input.url}
            onChange={(event) => handleInputChange(index, event)}
          />
          <button
            type="button"
            onClick={() => handleRemoveFields(index)}
            className="w-20 bg-red-500 text-white rounded-md flex items-center justify-center"
          >
            <FaTrash />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddFields}
        disabled={social?.length > 0 && !isFormValid()}
        className="w-max bg-gray-500 px-4 py-2 text-base-100 rounded text-sm flex items-center gap-2"
      >
        <FaPlus className="text-xs" /> Add Social Link
      </button>
    </div>
  );
}
