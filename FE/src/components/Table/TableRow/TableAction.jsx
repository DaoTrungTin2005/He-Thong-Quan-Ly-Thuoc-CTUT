import Button from "../../Button.jsx"; // Adjust path theo structure của bạn

export default function TableAction({
  rowData,
  onEdit,
  onResetPassword,
  onLock,
  onUnlock,
}) {
  const isLocked = rowData.status === "inactive";

  const handleResetPassword = () => {
    if (onResetPassword) {
      onResetPassword(rowData);
    } else {
      console.log("Đặt lại mật khẩu:", rowData);
    }
  };

  const handleLock = () => {
    if (onLock) {
      onLock(rowData);
    } else {
      console.log("Khóa tài khoản:", rowData);
    }
  };

  const handleUnlock = () => {
    if (onUnlock) {
      onUnlock(rowData);
    } else {
      console.log("Mở khóa:", rowData);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(rowData);
    } else {
      console.log("Sửa thông tin:", rowData);
    }
  };

  // Nếu tài khoản bị khóa -> chỉ hiển thị nút "Mở khóa"
  if (isLocked) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={handleUnlock}
          className="bg-[#264580] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
        >
          Mở khóa
        </Button>
      </div>
    );
  }

  // Nếu tài khoản đang hoạt động -> hiển thị 3 nút
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        onClick={handleResetPassword}
        className="bg-[#3D8E10] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
      >
        Đặt lại mật khẩu
      </Button>

      <Button
        onClick={handleLock}
        className="bg-[#B51C1C] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
      >
        Khóa tài khoản
      </Button>

      <Button
        onClick={handleEdit}
        className="bg-[#BC5B1A] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
      >
        Sửa thông tin
      </Button>
    </div>
  );
}
