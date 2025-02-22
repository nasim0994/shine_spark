import IHeart from "@/components/shared/icons/IHeart";
import ProductCard from "@/components/shared/main/ProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { slug } = useParams();

  return (
    <section className="py-2">
      <div className="container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-4 grid gap-10 lg:grid-cols-5">
          {/* left-images */}
          <div className="grid gap-3 md:grid-cols-7 md:gap-4 lg:col-span-3">
            <div className="order-2 flex gap-2 md:order-1 md:flex-col md:gap-3">
              <img
                src="https://staticm247.kalkifashion.com/media/tagalys/product_images/f/i/firozi_blue_crushed_tissue_saree_with_sequins_embellished_scallop_border-sg257040_7_.jpg?smallSize=true"
                alt={`product`}
                width={100}
                height={60}
                className="w-12 md:h-32 md:w-full"
              />
              <img
                src="https://staticm247.kalkifashion.com/media/tagalys/product_images/f/i/firozi_blue_crushed_tissue_saree_with_sequins_embellished_scallop_border-sg257040_7_.jpg?smallSize=true"
                alt={`product`}
                width={100}
                height={60}
                className="w-12 md:h-32 md:w-full"
              />
              <img
                src="https://staticm247.kalkifashion.com/media/tagalys/product_images/f/i/firozi_blue_crushed_tissue_saree_with_sequins_embellished_scallop_border-sg257040_7_.jpg?smallSize=true"
                alt={`product`}
                width={100}
                height={60}
                className="w-12 md:h-32 md:w-full"
              />
            </div>

            <div className="order-1 md:order-2 md:col-span-6">
              <img
                src="https://staticm247.kalkifashion.com/media/tagalys/product_images/f/i/firozi_blue_crushed_tissue_saree_with_sequins_embellished_scallop_border-sg257040_7_.jpg?smallSize=true"
                alt={`product`}
                width={500}
                height={500}
                className="w-full"
              />
            </div>
          </div>

          {/* right-info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-medium">{slug}</h2>
            <div className="flex items-center justify-between">
              <p className="text-neutral">Style No SG263271</p>
              <button>
                <IHeart width={22} height={22} />
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 text-lg">
                <p>$100</p>
                <del className="text-[15px] text-neutral-content opacity-80">
                  $120
                </del>
                <span className="text-[15px] text-red-500">(15% off)</span>
              </div>

              <small className="block text-xs text-neutral-content opacity-60">
                Inclusive of all taxes
              </small>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-lg">Select Size</p>
                <button className="text-primary hover:underline">
                  Size Guide
                </button>
              </div>

              <div className="mt-2 flex flex-wrap items-start gap-2">
                <button className="rounded-xl border px-4 py-1.5 duration-300 hover:bg-gray-100">
                  40
                </button>
                <button className="rounded-xl border px-4 py-1.5 duration-300 hover:bg-gray-100">
                  42
                </button>
                <button className="rounded-xl border px-4 py-1.5 duration-300 hover:bg-gray-100">
                  43
                </button>
                <button className="rounded-xl border px-4 py-1.5 duration-300 hover:bg-gray-100">
                  44
                </button>
                <button className="rounded-xl border px-4 py-1.5 duration-300 hover:bg-gray-100">
                  46
                </button>
                <button className="rounded-xl border px-4 py-1.5 duration-300 hover:bg-gray-100">
                  48
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-lg">Select Color</p>
              </div>

              <div className="mt-2 flex flex-wrap items-start gap-2">
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <img
                        src="https://staticm247.kalkifashion.com/media/tagalys/product_images/f/i/firozi_blue_crushed_tissue_saree_with_sequins_embellished_scallop_border-sg257040_7_.jpg?smallSize=true"
                        alt={`product`}
                        width={20}
                        height={20}
                        className="h-12 w-12 cursor-pointer rounded"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Red</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <img
                        src="https://staticm247.kalkifashion.com/media/tagalys/product_images/f/i/firozi_blue_crushed_tissue_saree_with_sequins_embellished_scallop_border-sg257040_7_.jpg?smallSize=true"
                        alt={`product`}
                        width={20}
                        height={20}
                        className="h-12 w-12 cursor-pointer rounded"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Blue</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <img
                        src="https://staticm247.kalkifashion.com/media/tagalys/product_images/f/i/firozi_blue_crushed_tissue_saree_with_sequins_embellished_scallop_border-sg257040_7_.jpg?smallSize=true"
                        alt={`product`}
                        width={20}
                        height={20}
                        className="h-12 w-12 cursor-pointer rounded"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Green</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 uppercase">
              <button className="rounded border border-primary py-2 text-primary duration-300 hover:bg-primary hover:text-base-100">
                Add to Cart
              </button>
              <button className="rounded border border-primary bg-primary py-2 text-base-100 duration-300 hover:bg-transparent hover:text-primary">
                Buy Now
              </button>
            </div>

            {/* details */}
            <div className="mt-5">
              <p className="text-lg">Product Details</p>

              <div className="mt-2 opacity-80">
                Style No : SG263271 Design No : M154KS6899Y Color: Blue Fabric:
                Silk Work: Mirror Closure: Front Buttons Neck Line: Mandarin
                Collar Sleeves: Full Sleeves Pack Contains: 1 Kurta, 1 Pant and
                1 Dupatta Manufactured / Packed by : Suarabhakti Goods Pvt ltd
                Product Speciality : Immerse yourself in a wave of serenity with
                this vibrant blue kurta, showcasing marbled prints and intricate
                detailing on the neckline and cuffs. Crafted from lightweight,
                breathable fabric, it offers a
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl">Similar Products</h2>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </section>
  );
}
