import { FaTrash, FaPlus } from "react-icons/fa";

export default function ShippingInput({ shipping, setShipping }) {
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedShipping = shipping?.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );

    setShipping(updatedShipping);
  };

  const handleAddFields = () => {
    if (isFormValid()) {
      setShipping([...shipping, { area: "", time: "", charge: "" }]);
    } else {
      alert("Please fill all fields before adding a new one.");
    }
  };

  const handleRemoveFields = (index) => {
    const values = [...shipping];
    values.splice(index, 1);
    setShipping(values);
  };

  const isFormValid = () => {
    return shipping.every(
      (entry) => entry.area != "" && entry.time != "" && entry.charge != ""
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {shipping?.map((item, index) => (
        <div key={index} className="flex gap-2 text-sm">
          <input
            type="text"
            name="area"
            placeholder="area"
            value={item?.area}
            onChange={(event) => handleInputChange(index, event)}
          />
          <input
            type="text"
            name="time"
            placeholder="time"
            value={item?.time}
            onChange={(event) => handleInputChange(index, event)}
          />
          <input
            type="text"
            name="charge"
            placeholder="charge"
            value={item?.charge}
            onChange={(event) => handleInputChange(index, event)}
          />
          <button
            type="button"
            onClick={() => handleRemoveFields(index)}
            className="w-32 bg-red-500 text-white rounded-md flex items-center justify-center"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={handleAddFields}
          disabled={shipping?.length > 0 && !isFormValid()}
          className="bg-gray-600 px-4 py-2 text-base-100 rounded text-sm flex items-center gap-2"
        >
          <FaPlus className="text-xs" /> Add Shipping
        </button>
      </div>
    </div>
  );
}
