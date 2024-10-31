import SearchBox from "../SearchBox";

export default function SearchSidebar({ searchSidebar, setSearchSidebar }) {
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setSearchSidebar(false)}
        className={`overlay ${searchSidebar && "overlay_show"}`}
      ></button>

      <div className={`menu_wrap ${searchSidebar && "menu_wrap_show"} text-sm`}>
        <div className="m-2">
          <SearchBox />
        </div>
      </div>
    </div>
  );
}
