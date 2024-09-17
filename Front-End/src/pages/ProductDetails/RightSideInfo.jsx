import { CiDeliveryTruck } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrShieldSecurity } from "react-icons/gr";
import { useGetShippingConfigQuery } from "../../Redux/shippingConfigApi";

const RightSideInfo = () => {
  const { data } = useGetShippingConfigQuery();
  const shippingConfig = data?.data[0];

  return (
    <>
      {/* Delivery */}
      <div className="border-b pb-3 mb-3">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-base font-medium">Delivery</h1>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <CiDeliveryTruck className="text-2xl" />
            <div>
              <h3>Dhaka City</h3>
              <p className="text-neutral/80 text-xs">
                {shippingConfig?.dhakaCity?.time} days
              </p>
            </div>
          </div>

          <p className="text-black font-semibold">
            ৳{shippingConfig?.dhakaCity?.charge}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <CiDeliveryTruck className="text-2xl" />
            <div>
              <h3>Dhaka Out City</h3>
              <p className="text-neutral/80 text-xs">
                {shippingConfig?.dhakaOutCity?.time} days
              </p>
            </div>
          </div>

          <p className="text-black font-semibold">
            ৳{shippingConfig?.dhakaOutCity?.charge}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <CiDeliveryTruck className="text-2xl" />
            <div>
              <h3>OutSide Dhaka</h3>
              <p className="text-neutral/80 text-xs">
                {shippingConfig?.outsideDhaka?.time} days
              </p>
            </div>
          </div>

          <p className="text-black font-semibold">
            ৳{shippingConfig?.outsideDhaka?.charge}
          </p>
        </div>

        <div className="flex gap-2 items-center mt-3">
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
