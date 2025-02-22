import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function WishlistCard() {
  return (
    <div>
      <div className="relative">
        <button className="absolute right-3 top-3 z-20">
          <AiOutlineClose className="text-xl text-base-100 opacity-70" />
        </button>

        <Link to={`/product/${`slug`}`}>
          <img
            src="https://staticm247.kalkifashion.com/media/tagalys/product_images/f/i/firozi_blue_crushed_tissue_saree_with_sequins_embellished_scallop_border-sg257040_7_.jpg?smallSize=true"
            alt={`product`}
            width={500}
            height={500}
            className="relative z-10 h-[300px] w-full object-cover md:h-[380px]"
          />
          <button className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 bg-gray-200/90 px-8 py-1.5 text-sm uppercase text-neutral duration-300 hover:bg-gray-200">
            Buy Now
          </button>
        </Link>
      </div>
      <Link to={`/product/${`slug`}`} className="mt-2">
        <h2 className="text-[15px] text-neutral">
          Dark Green Bandhani Kurta Set with...
        </h2>
        <div className="mt-1 flex items-center gap-2">
          <p>$100</p>
          <del className="text-sm text-neutral-content opacity-80">$120</del>
        </div>
      </Link>
    </div>
  );
}
