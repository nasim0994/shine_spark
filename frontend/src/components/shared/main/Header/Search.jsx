import { BiSearch } from "react-icons/bi";

export default function Search() {
  return (
    <>
      <button className="hidden overflow-hidden rounded-lg md:flex">
        <div className="bg-gray-200 px-8 py-2">
          <p className="text-xs text-neutral-content opacity-50">
            search product...
          </p>
        </div>
        <div className="flex w-8 items-center justify-center bg-secondary px-3 text-base-100">
          <p>
            <BiSearch />
          </p>
        </div>
      </button>
    </>
  );
}
