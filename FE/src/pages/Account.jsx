import Button from "../components/Button";
import add from "../assets/images/add.png";
import Table from "../components/Table/Table.jsx";
import FormChangePass from "../components/FormChangePass.jsx";
import { useState } from "react";
export default function Account() {
  const columns = [
    { key: "id", label: "STT", align: "center" },
    { key: "username", label: "Tên đăng nhập", align: "left" },
    { key: "name", label: "Tên người dùng", align: "left" },
    { key: "role", label: "Vai trò", align: "left" },
    { key: "status", label: "Trạng thái", align: "left" },
    { key: "action", label: "THAO TÁC", align: "center" },
  ];

  const data = [
    {
      id: 1,
      username: "dtthungs311",
      name: "Đào Trung Tin",
      role: "QTV",
      status: "active",
    },
    {
      id: 2,
      username: "Line 74s311",
      name: "Lê Thành Đạt",
      role: "NVYT",
      status: "inactive",
    },
    {
      id: 3,
      username: "dtthungs311",
      name: "Đào Trung Tin",
      role: "QTV",
      status: "active",
    },
    {
      id: 4,
      username: "Line 74s311",
      name: "Lê Thành Đạt",
      role: "NVYT",
      status: "inactive",
    },
    {
      id: 5,
      username: "dtthungs311",
      name: "Đào Trung Tin",
      role: "QTV",
      status: "active",
    },
    {
      id: 6,
      username: "Line 74s311",
      name: "Lê Thành Đạt",
      role: "NVYT",
      status: "inactive",
    },
    {
      id: 7,
      username: "dtthungs311",
      name: "Đào Trung Tin",
      role: "QTV",
      status: "active",
    },
    {
      id: 8,
      username: "Line 74s311",
      name: "Lê Thành Đạt",
      role: "NVYT",
      status: "inactive",
    },
    {
      id: 9,
      username: "dtthungs311",
      name: "Đào Trung Tin",
      role: "QTV",
      status: "active",
    },
    {
      id: 10,
      username: "Line 74s311",
      name: "Lê Thành Đạt",
      role: "NVYT",
      status: "inactive",
    },
  ];
  const handleEdit = (row) => {
    console.log("Sửa thông tin:", row);
  };

  const handleResetPassword = (row) => {
    console.log("Đặt lại mật khẩu:", row);
    setShowChangePasswordForm(true);
  };

  const handleLock = (row) => {
    console.log("Khóa tài khoản:", row);
    // API call để khóa tài khoản
  };

  const handleUnlock = (row) => {
    console.log("Mở khóa:", row);
    // API call để mở khóa tài khoản
  };
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  return (
    <div className="w-3/4 bg-white absolute top-20 left-85 h-5/6 rounded-2xl shadow-xl">
      <h1 className="text-black text-center font-bold text-2xl pt-5 pb-3">
        DANH SÁCH TÀI KHOẢN
      </h1>
      <Button className="bg-[#CA20A5] h-6 text-xs flex justify-self-end items-center text-white font-bold mr-15">
        <img src={add} alt="Add Icon" className="w-3 h-3 mr-1" />
        Thêm tài khoản
      </Button>
      <div className="overflow-y-auto max-h-[500px] p-5">
        <Table
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onResetPassword={handleResetPassword}
          onLock={handleLock}
          onUnlock={handleUnlock}
        />
      </div>
      <FormChangePass
        isVisible={showChangePasswordForm}
        onClose={() => setShowChangePasswordForm(false)}
        showCurrentPassword={false}
      />
    </div>
  );
}
