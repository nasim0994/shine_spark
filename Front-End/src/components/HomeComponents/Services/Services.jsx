import { TbTruckDelivery } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { AiOutlineRedo } from "react-icons/ai";

const Services = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <div className="border border-neutral/40 rounded p-4 flex gap-4 justify-center items-center">
            <div>
              <TbTruckDelivery className="text-4xl text-primary" />
            </div>
            <div>
              <h6 className="sm:text-lg">Cash On Delivery</h6>
              <p className="text-[13px] text-neutral/90">
                Lorem ipsum dolor, sit amet
              </p>
            </div>
          </div>

          <div className="border border-neutral/40 rounded p-4 flex gap-4 justify-center items-center">
            <div>
              <MdVerified className="text-3xl  text-secondary" />
            </div>
            <div>
              <h6 className="sm:text-lg">100% Authentic Product</h6>
              <p className="text-[13px] text-neutral/90">
                Our all product 100% Authentic
              </p>
            </div>
          </div>

          <div className="border border-neutral/40 rounded p-4 flex gap-4 justify-center items-center">
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

          <div className="border border-neutral/40 rounded p-4 flex gap-4 justify-center items-center">
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
