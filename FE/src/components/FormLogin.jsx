import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "./Button";
export default function FormLogin() {
  const [show, setShow] = useState(false);
  return (
    <>
      <form
        action=""
        className="flex flex-col gap-5 items-center justify-center w-1/3 text-[#FFF] font-bold"
      >
        <input
          type="text"
          placeholder="Tên đăng nhập"
          className="w-full border border-2 rounded-sm h-10 placeholder-white placeholder-font-medium cursor-pointer outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition focus:placeholder:opacity-0"
        />
        <div className="w-full relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Mật khẩu"
            className="w-full border border-2 rounded-sm h-10 placeholder-white placeholder-font-medium cursor-pointer outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition focus:placeholder:opacity-0"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-white hover:text-black transition
            "
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <Button
          className="w-1/2 h-10 bg-white text-black rounded-lg"
          type="submit"
        >
          ĐĂNG NHẬP
        </Button>
      </form>
    </>
  );
}
