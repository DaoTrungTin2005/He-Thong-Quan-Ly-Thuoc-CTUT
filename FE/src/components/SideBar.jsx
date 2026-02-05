import AccountIcon from "../assets/svg/AccountIcon.jsx";
import PersonInfoIcon from "../assets/svg/PersonInfoIcon.jsx";
import StudentInfomation from "../assets/svg/StudentInfomation.jsx";
import MedicineIcon from "../assets/svg/MedicineIcon.jsx";
import OrderIcon from "../assets/svg/OrderIcon.jsx";
import NofiIcon from "../assets/svg/NofiIcon.jsx";
import StatIcon from "../assets/svg/StatIcon.jsx";
import Vector from "../assets/svg/Vector.jsx";

const MENU_ITEMS = [
  { icon: AccountIcon, label: "Quản lí tài khoản" },
  { icon: PersonInfoIcon, label: "Thông tin cá nhân" },
  { icon: StudentInfomation, label: "Thông tin sinh viên" },
  { icon: MedicineIcon, label: "Quản lí thuốc" },
  { icon: OrderIcon, label: "Quản lí đơn thuốc" },
  { icon: NofiIcon, label: "Thông báo" },
  { icon: StatIcon, label: "Thống kê" },
];

function MenuItem({ icon, label }) {
  const IconComponent = icon;

  return (
    <span className="flex w-3/4 items-center hover:bg-[#264580] p-2 rounded-xl transition hover:text-white">
      <div className="flex justify-center">
        <IconComponent />
      </div>
      <p className="ml-2 flex-1 text-left">{label}</p>
      <Vector />
    </span>
  );
}

export default function SideBar() {
  return (
    <div className="w-full flex flex-col gap-3 mt-15 text-[#9197B3] items-center justify-center text-xs cursor-pointer">
      {MENU_ITEMS.map((item, index) => (
        <MenuItem key={index} icon={item.icon} label={item.label} />
      ))}
    </div>
  );
}
