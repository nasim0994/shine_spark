import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllColorsQuery } from "@/Redux/color/colorApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function VariantCom({
  isVariant,
  setIsVariant,
  isColor,
  setIsColor,
  isSize,
  setIsSize,
  colors,
  setColors,
  sizes,
  setSizes,
  variants,
  setVariants,
  sellingPrice,
  purchasePrice,
  stock,
  setSizeChart,
}) {
  const [sizeChartUrl, setSizeChartUrl] = useState(null);
  const { data: color } = useAllColorsQuery();
  const colorOptions = color?.data?.map((item) => ({
    label: item?.name,
    value: item?.code,
  }));

  const handleColorChange = (value, i) => {
    const colorExists = colors.some((color) => color.color === value);

    if (colorExists) {
      toast.error("This color is already added!");
    } else {
      setColors((prevColors) =>
        prevColors.map((color, index) =>
          index === i ? { ...color, color: value } : color,
        ),
      );
    }
  };

  const handleColorImageChange = (e, i) => {
    const file = e.target.files[0];

    // check file size
    if (file.size > 1024 * 1024) {
      return toast.error("You can't upload more than 1MB file size");
    }

    if (file && file.size <= 1024 * 1024) {
      setColors((prevColors) => {
        return prevColors.map((color, index) =>
          index === i ? { ...color, imageFile: file } : color,
        );
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setColors((prevColors) =>
          prevColors.map((color, index) =>
            index === i ? { ...color, imageShow: reader.result } : color,
          ),
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewColor = () => {
    const lastColor = colors[colors?.length - 1];
    if (lastColor?.color && lastColor?.imageFile) {
      setColors((prevColors) => [
        ...prevColors,
        {
          color: "",
          imageFile: "",
          imageShow: "",
        },
      ]);
    }
  };

  const handleRemoveColor = (i) => {
    if (colors?.length === 1) {
      return toast.error("At least one color is required");
    } else {
      setColors((prevColors) => prevColors.filter((_, index) => index !== i));
    }
  };

  const makeVariants = (colors, sizes) => {
    let variants = [];
    let index = 0;

    if (isColor && colors?.length > 0 && isSize && sizes?.length > 0) {
      colors?.forEach((color) => {
        sizes?.forEach((size) => {
          console.log(color, size);

          variants.push({
            sku: `${color.split(" ").join("")}-${size}`.toLowerCase(),
            index: index++,
          });
        });
      });
    } else if (isColor && colors?.length > 0) {
      colors?.forEach((color) => {
        variants.push({
          sku: color.split(" ").join("").toLowerCase(),
          index: index++,
        });
      });
    } else if (isSize && sizes?.length > 0) {
      sizes?.forEach((size) => {
        variants.push({
          sku: size.toLowerCase(),
          index: index++,
        });
      });
    }

    return variants;
  };

  useEffect(() => {
    const generatedVariants = makeVariants(
      colors?.map((color) => color?.color),
      sizes,
    );

    setVariants((prevVariants) => {
      const filteredVariants = prevVariants.filter((variant) => {
        const [color, size] = variant.sku.split("-");
        const colorExists = colors?.some(
          (selectedColor) => selectedColor == color,
        );
        const sizeExists = sizes.includes(size);

        return colorExists && (size ? sizeExists : true);
      });

      const newVariants = generatedVariants.map((generatedVariant) => {
        const existingVariant = filteredVariants.find(
          (variant) => variant.sku === generatedVariant.sku,
        );

        return (
          existingVariant || {
            ...generatedVariant,
            sellingPrice: sellingPrice || "",
            purchasePrice: purchasePrice || "",
            stock: stock || "",
          }
        );
      });

      return newVariants;
    });
  }, [colors, sizes, setVariants, sellingPrice, purchasePrice, stock]);

  const handleVariantChange = (e, sku, field) => {
    const value = e.target.value;

    setVariants((prevVariants) => {
      const existingVariantIndex = prevVariants.findIndex(
        (variant) => variant.sku === sku,
      );

      if (existingVariantIndex >= 0) {
        const updatedVariants = [...prevVariants];
        updatedVariants[existingVariantIndex] = {
          ...updatedVariants[existingVariantIndex],
          [field]: value,
        };
        return updatedVariants;
      } else {
        return [
          ...prevVariants,
          {
            sku,
            [field]: value,
          },
        ];
      }
    });
  };

  return (
    <div className="mt-4 rounded border p-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="variants"
          onCheckedChange={() => setIsVariant(!isVariant)}
          checked={isVariant}
        />
        <Label htmlFor="variants">Variants</Label>
      </div>

      {isVariant && (
        <>
          <div className="mt-2 rounded border p-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="color"
                  onCheckedChange={() => setIsColor(!isColor)}
                  checked={isColor}
                />
                <label
                  htmlFor="color"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Color
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="size"
                  onCheckedChange={() => setIsSize(!isSize)}
                  checked={isSize}
                />
                <label
                  htmlFor="size"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Size
                </label>
              </div>
            </div>

            {isColor && (
              <div className="mt-3 rounded border border-dashed bg-gray-50/80 p-3">
                <div className="flex items-center justify-between">
                  <p className="mb-1 text-[15px]">Colors with image</p>
                  <button
                    onClick={handleAddNewColor}
                    className="flex items-center gap-1 rounded border border-dashed bg-base-100 px-2 py-1 text-sm"
                  >
                    <AiOutlinePlus /> <small>Add Color</small>
                  </button>
                </div>

                <div className="mt-2 flex flex-col gap-2">
                  {colors?.map((color, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 rounded border border-dashed bg-base-100 p-2"
                    >
                      <div className="flex items-center gap-4">
                        <Select
                          value={color?.color}
                          onValueChange={(e) => handleColorChange(e, i)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {colorOptions?.map((option, i) => (
                                <SelectItem key={i} value={option?.label}>
                                  <p className="flex items-center">
                                    <span
                                      className="mr-2 h-3 w-3 rounded-full"
                                      style={{
                                        backgroundColor: option?.value,
                                      }}
                                    ></span>
                                    {option?.label}
                                  </p>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <div>
                          <button className="relative h-10 w-full rounded border border-dashed p-1">
                            <input
                              type="file"
                              className="absolute -top-1 left-0 h-full w-full opacity-0"
                              onChange={(e) => handleColorImageChange(e, i)}
                            />
                            {color?.imageShow ? (
                              <img
                                src={color?.imageShow}
                                alt="Color Preview"
                                className="mx-auto h-full w-10 rounded"
                              />
                            ) : (
                              <small className="px-2">Add Image</small>
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveColor(i)}
                        className="duration-200 hover:text-red-400"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isSize && (
              <div className="mt-3 rounded border border-dashed bg-gray-50/80 p-3">
                <p className="mb-1 text-[15px]">Sizes</p>
                <TagsInput
                  value={sizes}
                  onChange={(tags) => setSizes(tags)}
                  onlyUnique
                  inputProps={{
                    placeholder:
                      "Press Enter to add a size (e.g., S, M, L, XL)",
                    className:
                      "placeholder:text-xs border-0 m-0 p-0 pb-1 pl-1 w-max",
                  }}
                />

                <div className="mt-3 flex items-start">
                  <button className="relative">
                    <input
                      type="file"
                      className="absolute -top-1 left-0 h-full w-full opacity-0"
                      onChange={(e) => {
                        if (e.target.files[0].size > 1024 * 1024) {
                          return toast.warning(
                            "File size is too large. Max 1mb is allowed",
                          );
                        }
                        setSizeChart(e.target.files[0]);
                        setSizeChartUrl(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                    {sizeChartUrl ? (
                      <img
                        src={sizeChartUrl}
                        alt="Color Preview"
                        className="mx-auto h-14 w-20 rounded"
                      />
                    ) : (
                      <small className="rounded border border-dashed bg-base-100 p-2">
                        Add Size Chart
                      </small>
                    )}
                  </button>

                  {sizeChartUrl && (
                    <button
                      onClick={() => {
                        setSizeChart(null);
                        setSizeChartUrl(null);
                      }}
                    >
                      <AiOutlineDelete className="text-red-300 duration-300 hover:text-red-500" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {(isColor || isSize) && (
            <div className="mt-2 rounded border p-3">
              <div className="relative mt-3 overflow-x-auto">
                <table className="border_table">
                  <thead>
                    <tr>
                      <th>SKU</th>
                      <th>Selling Price</th>
                      <th>Purchase Price</th>
                      <th>Stock</th>
                    </tr>
                  </thead>

                  <tbody>
                    {variants?.map((variant, i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap">{variant?.sku}</td>
                        <td>
                          <input
                            type="number"
                            onChange={(e) =>
                              handleVariantChange(
                                e,
                                variant?.sku,
                                "sellingPrice",
                              )
                            }
                            required
                            defaultValue={variant?.sellingPrice}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            onChange={(e) =>
                              handleVariantChange(
                                e,
                                variant?.sku,
                                "purchasePrice",
                              )
                            }
                            required
                            defaultValue={variant?.purchasePrice}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            onChange={(e) =>
                              handleVariantChange(e, variant?.sku, "stock")
                            }
                            required
                            defaultValue={variant?.stock}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
