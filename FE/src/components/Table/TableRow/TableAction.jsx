import Button from "../../Button.jsx";

export default function TableAction({
  rowData,
  onEdit,
  onResetPassword,
  onLock,
  onUnlock,
  onAccess,
  onAdd,
  onUpdate,
  onRemove,
  onLockMedicine,
  onUnlockMedicine,
}) {
  const isLocked = rowData.status === "inactive";
  const isExported = rowData.status === "exported"; // Trạng thái đã xuất
  const isMedicineLocked = rowData.status === "lockMedicine"; // Trạng thái thuốc bị khóa

  const handleAccess = () => {
    if (onAccess) {
      onAccess(rowData);
    } else {
      console.log("Truy xuất", rowData);
    }
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd(rowData);
    } else {
      console.log("Thêm thuốc", rowData);
    }
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(rowData);
    } else {
      console.log("Cập nhật thuốc", rowData);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(rowData);
    } else {
      console.log("Xóa thuốc", rowData);
    }
  };

  const handleLockMedicine = () => {
    if (onLockMedicine) {
      onLockMedicine(rowData);
    } else {
      console.log("Khóa thuốc:", rowData);
    }
  };

  const handleUnlockMedicine = () => {
    if (onUnlockMedicine) {
      onUnlockMedicine(rowData);
    } else {
      console.log("Mở khóa thuốc:", rowData);
    }
  };

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

  // Logic mới: Nếu đã xuất -> hiển thị Access, Add, Lock/Unlock
  if (isExported) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={handleAccess}
          className="bg-[#3D8E10] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
        >
          Truy xuất
        </Button>

        <Button
          onClick={handleAdd}
          className="bg-[#264580] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
        >
          Nhập thuốc
        </Button>

        {isMedicineLocked ? (
          <Button
            onClick={handleUnlockMedicine}
            className="bg-[#264580] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
          >
            Mở khóa thuốc
          </Button>
        ) : (
          <Button
            onClick={handleLockMedicine}
            className="bg-[#B51C1C] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
          >
            Khóa thuốc
          </Button>
        )}
      </div>
    );
  }
  if (isMedicineLocked && !isExported) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={handleAccess}
          className="bg-[#3D8E10] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
        >
          Truy xuất
        </Button>
        <Button
          onClick={handleUnlockMedicine}
          className="bg-[#264580] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
        >
          Mở khóa thuốc
        </Button>
      </div>
    );
  }
  // Logic mới: Nếu chưa xuất -> hiển thị Access, Add, Update, Remove
  if (!isExported && !isLocked && !isMedicineLocked) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={handleAccess}
          className="bg-[#3D8E10] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
        >
          Truy xuất
        </Button>

        <Button
          onClick={handleAdd}
          className="bg-[#264580] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
        >
          Nhập thuốc
        </Button>

        <Button
          onClick={handleUpdate}
          className="bg-[#BC5B1A] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
        >
          Cập nhật
        </Button>

        <Button
          onClick={handleRemove}
          className="bg-[#B51C1C] h-6 text-xs flex justify-self-end items-center text-white font-medium mr hover:opacity-80 transition"
        >
          Xóa
        </Button>
      </div>
    );
  }

  // Nếu tài khoản đang hoạt động -> hiển thị 3 nút (logic cũ)
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
