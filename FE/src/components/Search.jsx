import Title from "./Title";
import VectorSearch from "../assets/svg/VectorSearch.jsx";
export default function Search({ hideHeader = true }) {
  return (
    <div className="w-4/5 h-12 pl-5 absolute top-0 left-1/5 overflow-hidden flex items-center bg-[#264580]">
      <Title
        wrapperClass="text-white"
        subtitleClass="text-[7px] italic"
        title="Quản Lí Tài Khoản"
        subtitle="Phòng Y Tế - Trường Đại học Kỹ Thuật Công Nghệ Cần Thơ"
      />
      {hideHeader && (
        <div className="w-1/3 flex items-center h-6 bg-white rounded-xl ml-50">
          <VectorSearch />
          <input
            type="text"
            className="outline-none w-full text-xs text-black"
            placeholder="Tìm kiếm"
          />
        </div>
      )}
    </div>
  );
}
