import { AiOutlineDelete } from "react-icons/ai";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import IHeart from "../icons/IHeart";

export default function CartSidebar() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>
          Your Cart <small>1 Item</small>
        </SheetTitle>
      </SheetHeader>
      <div className="flex h-full flex-col justify-between">
        <div className="hideScroll flex flex-col gap-2 overflow-y-auto border-t pt-5">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <img
                src="https://staticm247.kalkifashion.com/media/tagalys/product_images/f/i/firozi_blue_crushed_tissue_saree_with_sequins_embellished_scallop_border-sg257040_7_.jpg?smallSize=true"
                alt={`product`}
                width={80}
                height={50}
                className="w-16"
              />
              <div>
                <h2>Blue Marble Printed Kurta Set</h2>
                <div className="mt-1 flex items-center gap-2">
                  <p>$114</p>
                  <del className="text-sm text-neutral-content opacity-80">
                    $120
                  </del>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-1 text-sm text-neutral">
                  <p className="rounded bg-gray-100 px-2 py-1">Size: 36</p>
                  <p className="rounded bg-gray-100 px-2 py-1">Color: Green</p>
                  <p className="rounded bg-gray-100 px-2 py-1">Qty: 1</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <button>
                <IHeart width={20} height={20} />
              </button>
              <p>-</p>
              <button>
                <AiOutlineDelete className="text-xl opacity-60" />
              </button>
            </div>
          </div>
        </div>

        <SheetFooter>
          <div className="w-full border-t pb-6 pt-2">
            <div className="flex items-center justify-between text-lg font-medium">
              <p>Subtotal</p>
              <p>$114</p>
            </div>

            <div className="mt-4 flex flex-col gap-3 uppercase">
              <SheetClose asChild>
                <Link
                  to="/checkout"
                  className="rounded border border-primary py-2 text-center text-primary duration-300 hover:bg-primary hover:text-base-100"
                >
                  Continue To Checkout
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/cart"
                  className="rounded border border-primary bg-primary py-2 text-center text-base-100 duration-300 hover:bg-transparent hover:text-primary"
                >
                  View Cart
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetFooter>
      </div>
    </SheetContent>
  );
}
