import { CiDeliveryTruck } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import { useGetShippingConfigQuery } from "../../Redux/shippingConfigApi";

const RightSideInfo = () => {
  const { data } = useGetShippingConfigQuery();
  const shipping = data?.data?.shipping;

  return (
    <>
      {/* Delivery */}
      <div className="mb-3 border-b pb-3">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-base font-medium">Delivery</h1>
        </div>
        <div className="flex flex-col">
          {shipping?.map((item) => (
            <div key={item._id} className="flex gap-2">
              <CiDeliveryTruck className="text-2xl" />
              <div>
                <h3>{item?.area}</h3>
                <p className="text-xs text-neutral/80">{item?.time} days</p>
              </div>
              <p className="font-semibold text-black">৳{item?.charge}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <GiTakeMyMoney className="text-2xl" />
          <div>
            <h3>Cash on Delivery Available</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSideInfo;
