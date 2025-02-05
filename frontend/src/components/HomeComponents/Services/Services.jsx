import { TbTruckDelivery } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { AiOutlineRedo } from "react-icons/ai";

const Services = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <div className="flex items-center justify-center gap-4 rounded border border-neutral/40 p-4">
            <div>
              <TbTruckDelivery className="text-4xl text-primary" />
            </div>
            <div>
              <h6 className="sm:text-lg">Cash On Delivery</h6>
              <p className="text-[13px] text-neutral/90">Cash On Delivery</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 rounded border border-neutral/40 p-4">
            <div>
              <MdVerified className="text-3xl text-secondary" />
            </div>
            <div>
              <h6 className="sm:text-lg">100% Authentic Product</h6>
              <p className="text-[13px] text-neutral/90">
                Our all product 100% Authentic
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 rounded border border-neutral/40 p-4">
            <div>
              <AiOutlineRedo className="text-3xl text-primary" />
            </div>
            <div>
              <h6 className="sm:text-lg">Return Policy</h6>
              <p className="text-[13px] text-neutral/90">
                7 days return policy
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 rounded border border-neutral/40 p-4">
            <div>
              <BiSupport className="text-3xl text-green-500" />
            </div>
            <div>
              <h6 className="sm:text-lg">Support 24/7</h6>
              <p className="text-[13px] text-neutral/90">
                Contact us 24 hours a day
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
