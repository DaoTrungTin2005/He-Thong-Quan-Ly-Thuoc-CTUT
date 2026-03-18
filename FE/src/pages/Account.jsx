import Button from "../components/Button";
import add from "../assets/images/add.png";
import Table from "../components/Table/Table.jsx";
import FormChangePass from "../components/FormChangePass.jsx";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getAccounts } from "../services/accountService";

export default function Account() {
  const columns = [
    { key: "id", label: "ID", align: "center" },
    { key: "username", label: "Tên đăng nhập", align: "left" },
    // "name" giữ nguyên key của bạn → map từ fullname của API ở dưới
    { key: "name", label: "Tên người dùng", align: "left" },
    { key: "email", label: "Email", align: "left" },
    { key: "role", label: "Vai trò", align: "left" },
    { key: "status", label: "Trạng thái", align: "left" },
    { key: "action", label: "THAO TÁC", align: "left" },
  ];

  const { keyword } = useOutletContext() ?? {};

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  });

  const fetchAccounts = async (page = 0, kw = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await getAccounts({
        page,
        size: pagination.size,
        sortDir: "desc",
        keyword: kw,
      });

      // Map fullname → name để khớp với key của Table
      const mapped = res.content.map((item) => ({
        ...item,
        name: item.fullname,
        status: item.status === "Đang sử dụng" ? "active" : "inactive", // ← thêm dòng này
      }));

      setData(mapped);
      setPagination((prev) => ({
        ...prev,
        page: res.pageable.pageNumber,
        totalPages: res.totalPages,
        totalElements: res.totalElements,
      }));
    } catch (err) {
      setError(err.message || "Không thể tải danh sách tài khoản.");
    } finally {
      setLoading(false);
    }
  };

  // Gọi lại API mỗi khi keyword thay đổi, reset về trang 0
  useEffect(() => {
    fetchAccounts(0, keyword ?? "");
  }, [keyword]);

  const handleEdit = (row) => {
    console.log("Sửa thông tin:", row);
  };

  const handleResetPassword = (row) => {
    console.log("Đặt lại mật khẩu:", row);
    setShowChangePasswordForm(true);
  };

  const handleLock = (row) => {
    console.log("Khóa tài khoản:", row);
  };

  const handleUnlock = (row) => {
    console.log("Mở khóa:", row);
  };

  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  return (
    <div className="w-3/4 bg-white absolute top-20 left-105 h-5/6 rounded-2xl shadow-xl">
      <h1 className="text-black text-center font-bold text-2xl pt-5 pb-3">
        DANH SÁCH TÀI KHOẢN
      </h1>
      <Button className="bg-[#CA20A5] h-6 text-xs flex justify-self-end items-center text-white font-bold mr-15">
        <img src={add} alt="Add Icon" className="w-3 h-3 mr-1" />
        Thêm tài khoản
      </Button>

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}

      {loading ? (
        <p className="text-center text-gray-400 mt-10">Đang tải...</p>
      ) : (
        <div className="overflow-y-auto max-h-[600px] p-5">
          <Table
            columns={columns}
            data={data}
            type="account"
            onEdit={handleEdit}
            onResetPassword={handleResetPassword}
            onLock={handleLock}
            onUnlock={handleUnlock}
          />
        </div>
      )}

      {!loading && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pb-4">
          <button
            disabled={pagination.page === 0}
            onClick={() => fetchAccounts(pagination.page - 1, keyword ?? "")}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-sm"
          >
            &laquo; Trước
          </button>
          <span className="text-sm text-gray-600">
            Trang {pagination.page + 1} / {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page + 1 >= pagination.totalPages}
            onClick={() => fetchAccounts(pagination.page + 1, keyword ?? "")}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-sm"
          >
            Tiếp &raquo;
          </button>
        </div>
      )}

      <FormChangePass
        isVisible={showChangePasswordForm}
        onClose={() => setShowChangePasswordForm(false)}
        showCurrentPassword={false}
      />
    </div>
  );
}
