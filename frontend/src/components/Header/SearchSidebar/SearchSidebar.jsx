import SearchBox from "../SearchBox";

export default function SearchSidebar({ searchSidebar, setSearchSidebar }) {
  return (
    <>
      <button
        onClick={() => setSearchSidebar(false)}
        className={`overlay ${searchSidebar && "overlay_show"}`}
      ></button>

      <div
        className={`serach_sidebar ${searchSidebar && "serach_sidebar_show"}`}
      >
        <div className="m-2 text-sm">
          <SearchBox />
        </div>
      </div>
    </>
  );
}
