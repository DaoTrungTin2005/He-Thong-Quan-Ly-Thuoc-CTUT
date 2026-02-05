import Title from "../components/Title.jsx";
import SideBar from "../components/SideBar.jsx";
import Button from "../components/Button.jsx";
import Search from "../components/Search.jsx";
import LogoCTUT from "../assets/images/LogoCTUT.png";
import { Outlet } from "react-router-dom";
export default function MainLayout({ hideHeader = true }) {
  return (
    <>
      <div className="flex w-full bg-[#D4D4D4]">
        <div className="h-screen w-1/5 shadow-xl bg-white flex flex-col fixed z-10 top-0 left-0">
          <div className="flex items-center pl-8 pt-2">
            <img src={LogoCTUT} alt="Logo CTUT" className="w-10 h-10" />
            <Title
              title="Hệ Thống Quản Lí Thuốc "
              subtitle="Trường Đại học Kĩ Thuật - Công Nghệ Cần Thơ"
            />
          </div>
          <SideBar />
          <Button className="m-20 bg-[#951010] text-white hover:scale-105 transition-transform">
            ĐĂNG XUẤT
          </Button>
        </div>
        <div className=" w-full h-screen relative flex flex-col">
          <Search hideHeader={hideHeader} />
          <Outlet />
        </div>
      </div>
    </>
  );
}
