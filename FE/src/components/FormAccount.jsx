import Button from "./Button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export default function FormAccount({ title }) {
  const [show, setShow] = useState(false);
  return (
    <div className="w-1/2 bg-white h-3/5 rounded-2xl shadow-xl left-125 flex flex-col items-center justify-center absolute top-20">
      <h2 className="text-center text-xl font-bold">{title}</h2>
      <form className="flex w-2/3 px-8 flex-col gap-5 items-center justify-center mt-5 font-bold text-white text-sm">
        <label className="flex w-full items-center gap-2 border border-[#264580] hover:ring-2 hover:ring-blue-500">
          <span className="bg-[#264580] p-2">Tên người dùng:</span>
          <input
            type="text"
            className="py-1 outline-none text-black flex-1 cursor-pointer"
          />
        </label>
        <label className="flex w-full items-center gap-2 border border-[#264580] hover:ring-2 hover:ring-blue-500">
          <span className="bg-[#264580] p-2">Tên đăng nhập:</span>
          <input
            type="text"
            className="py-1 outline-none text-black flex-1 cursor-pointer"
          />
        </label>
        <label className="flex w-full items-center gap-2 border border-[#264580] hover:ring-2 hover:ring-blue-500 relative">
          <span className="bg-[#264580] p-2">Mật khẩu:</span>
          <input
            type={show ? "text" : "password"}
            className="py-1 outline-none text-black flex-1 cursor-pointer"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-gray-500 hover:text-black transition
            "
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </label>
        <span className="flex w-full items-center gap-2 border justify-between gap-5">
          <span className="bg-[#264580] py-2 px-4.5">Vai trò:</span>
          <label
            htmlFor="user"
            className="text-black cursor-pointer flex items-center justify-center gap-2"
          >
            <input id="user" type="radio" name="role" value="user" />
            Nhân viên y tế (NVYT)
          </label>
          <label
            htmlFor="admin"
            className="text-black cursor-pointer flex items-center justify-center gap-2"
          >
            <input id="admin" type="radio" name="role" value="admin" />
            Quản trị viên (QTV)
          </label>
        </span>
        <span className="flex items-center justify-center gap-10 p-5">
          <Button className="bg-[#951010] hover:bg-red-600 w-30 h-10">
            HỦY BỎ
          </Button>
          <Button className="bg-[#268037] hover:bg-green-600 w-30 h-10">
            HOÀN TẤT
          </Button>
        </span>
      </form>
    </div>
  );
}
