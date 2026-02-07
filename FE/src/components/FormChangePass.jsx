import BackIcon from "../assets/svg/BackIcon.jsx";
import lock from "../assets/images/lock.png";
import Title from "./Title.jsx";
import Button from "./Button.jsx";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function FormChangePass({
  isVisible = false,
  onClose,
  showCurrentPassword = true,
}) {
  const [show_pass, setShow] = useState(false);
  const [show_newpass, setShowNewPass] = useState(false);
  const [show_confirmnewpass, setShowConfirmNewPass] = useState(false);

  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đổi mật khẩu
  };

  return (
    <>
      <div className="w-130 bg-gradient-to-b from-[#284781] to-white absolute left-65 top-20 h-130 rounded-2xl shadow-xl">
        <div className="flex flex-col px-5 py-2 justify-center text-white text-xs">
          <div onClick={onClose} className="cursor-pointer">
            <BackIcon />
            <p>Trở về</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center mx-auto justify-center gap-5 bg-white w-20 h-20 rounded-full">
            <img src={lock} alt="Lock Icon" className="w-12 h-12 m-auto" />
          </div>
          <Title
            title="Đổi mật khẩu"
            titleClass="text-xl font-bold text-white"
            subtitle="Điền thông tin dưới đây để tạo mật khẩu mới"
            subtitleClass="text-white text-xs italic"
            wrapperClass="flex flex-col items-center justify-center"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 flex flex-col items-center justify-center m-auto mt-5 gap-4 text-xs"
        >
          {showCurrentPassword && (
            <div className="relative w-full">
              <input
                type={show_pass ? "text" : "password"}
                className="w-full p-3 outline-none cursor-pointer rounded-sm bg-white  focus:ring-1 focus:ring-blue-500"
                placeholder="Mật khẩu hiện tại"
              />
              <button
                type="button"
                onClick={() => setShow(!show_pass)}
                className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-500 hover:text-black transition
              "
              >
                {show_pass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}
          <div className="relative w-full">
            <input
              type={show_newpass ? "text" : "password"}
              className="w-full h-10 p-3 outline-none cursor-pointer rounded-sm bg-white focus:ring-1 focus:ring-blue-500 mt-2"
              placeholder="Mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => setShowNewPass(!show_newpass)}
              className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-gray-500 hover:text-black transition
            "
            >
              {show_newpass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative w-full">
            <input
              type={show_confirmnewpass ? "text" : "password"}
              className="w-full h-10 p-3 outline-none cursor-pointer rounded-sm bg-white focus:ring-1  focus:ring-blue-500 mt-2"
              placeholder="Xác nhận mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => setShowConfirmNewPass(!show_confirmnewpass)}
              className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-gray-500 hover:text-black transition
            "
            >
              {show_confirmnewpass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button className="bg-[#264580] w-full cursor-pointer font-bold text-white h-10">
            Hoàn tất
          </Button>
        </form>
      </div>
    </>
  );
}
