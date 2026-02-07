import avatar from "../assets/images/avatar.png";
import avatarsmall from "../assets/images/avatarsmall.png";
import MailIcon from "../assets/svg/MailIcon.jsx";
import ChangePass from "../assets/svg/ChangePass.jsx";
import Button from "../components/Button.jsx";
import Logout from "../assets/svg/LogoutIcon.jsx";
import Table from "../components/Table/Table.jsx";
import FormChangePass from "../components/FormChangePass.jsx";
import { useState } from "react";

export default function Personal() {
  const columns = [
    { key: "time", label: "Thời gian", align: "left" },
    { key: "name", label: "Tên thiết bị", align: "left" },
    { key: "status", label: "Trạng thái", align: "left" },
  ];

  const data = [
    {
      time: "10:00 AM 21/11/2023",
      name: "Thiết bị A",
      status: "success",
    },
    {
      time: "11:30 AM 21/11/2023",
      name: "Thiết bị B",
      status: "failed",
    },
    {
      time: "10:00 AM 21/11/2023",
      name: "Thiết bị A",
      status: "success",
    },
    {
      time: "11:30 AM 21/11/2023",
      name: "Thiết bị B",
      status: "failed",
    },
    {
      time: "10:00 AM 21/11/2023",
      name: "Thiết bị A",
      status: "success",
    },
    {
      time: "11:30 AM 21/11/2023",
      name: "Thiết bị B",
      status: "failed",
    },
  ];

  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  return (
    <div className="w-3/4 bg-white absolute top-20 left-85 h-5/6 rounded-2xl shadow-xl">
      <div className="w-5/6 bg-white absolute left-25 top-2 h-45 rounded-2xl shadow-xl flex items-center justify-between gap-10 p-10">
        <div className="flex items-center justify-center gap-5">
          <img src={avatar} alt="Avatar" />
          <div className="flex flex-col justify-center gap-2">
            <p className="font-bold text-3xl">Ronaldo Tín</p>
            <div className="flex items-center justify-center gap-3 text-white border border-1 border-black w-42 bg-[#274681] px-2 py-1 rounded-2xl">
              <MailIcon />
              <p className="text-white font-bold text-sm">Nhân viên y tế</p>
            </div>
            <div className="flex items-center justify-center text-[10px] mr-15">
              <img src={avatarsmall} alt="Avatar Small" />
              <p className="text-black">Tên đăng nhập:Tindao2311</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Button
            className="w-30 h-8 flex items-center justify-center text-[9px] bg-white border border-1 border-[#E90012] text-[#E90012] font-bold gap-3 hover:bg-[#F5F5F5] transition"
            onClick={() => {
              // Logic đăng xuất
            }}
          >
            <Logout />
            Đăng xuất
          </Button>
          <Button
            className="w-30 h-8 flex items-center justify-center text-[9px] bg-[linear-gradient(90deg,#3AD37E_34.13%,#1E6D41_98.56%)] text-white font-bold gap-0=3 hover:opacity-80 transition"
            onClick={() => setShowChangePasswordForm(true)}
          >
            <ChangePass />
            Đổi mật khẩu
          </Button>
        </div>
      </div>
      <div className="w-5/6 bg-white absolute left-25 bottom-2 h-3/5 rounded-2xl shadow-xl">
        <h1 className="text-black text-center font-bold text-2xl pt-5 pb-1">
          LỊCH SỬ ĐĂNG NHẬP
        </h1>
        <div className="overflow-y-auto max-h-[300px] p-5">
          <Table columns={columns} data={data} />
        </div>
      </div>
      <FormChangePass
        isVisible={showChangePasswordForm}
        onClose={() => setShowChangePasswordForm(false)}
        showCurrentPassword={true}
      />
    </div>
  );
}
