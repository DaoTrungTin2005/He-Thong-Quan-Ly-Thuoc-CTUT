import { useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";
import FormNotification from "../components/FormNotification";

const PAGE_SIZE = 4;

const TYPE_PRIORITY = {
  warning: 0,
  refusal: 1,
  pending: 2,
  success: 3,
};

const getPriority = (type) => TYPE_PRIORITY[(type ?? "").toLowerCase()] ?? 99;

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await getNotifications();
        const sorted = [...(result ?? [])].sort(
          (a, b) => getPriority(a.type) - getPriority(b.type),
        );
        setNotifications(sorted);
        setPage(0);
      } catch (err) {
        console.error("Lỗi khi tải thông báo:", err);
        setError("Không thể tải danh sách thông báo.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const totalPages = Math.max(1, Math.ceil(notifications.length / PAGE_SIZE));
  const pagedNotifications = notifications.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <div
      style={{ padding: "30px" }}
      className="w-full h-9/10 flex flex-col min-h-0"
    >
      <div className="bg-white flex-1 min-h-0 rounded-2xl shadow-xl flex flex-col px-10 py-8">
        <h1 className="text-lg font-bold flex-shrink-0 mb-4">Thông báo</h1>

        {error && (
          <p className="text-red-500 text-sm text-center pb-2 flex-shrink-0">
            {error}
          </p>
        )}

        <div className="flex-1 min-h-0 overflow-y-auto">
          {loading ? (
            <p className="text-gray-400 italic">Đang tải thông báo...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-400 italic">Không có thông báo nào.</p>
          ) : (
            pagedNotifications.map((noti) => (
              <FormNotification
                key={noti.id}
                type={noti.type.toLowerCase()}
                typeText={noti.title}
                message={noti.message}
                dateTime={formatDateTime(noti.createdAt)}
                source="hệ thống"
                batchId={noti.batchId}
              />
            ))
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pt-6 flex-shrink-0 border-t border-gray-100">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-sm"
            >
              &laquo; Trước
            </button>
            <span className="text-sm text-gray-600">
              Trang {page + 1} / {totalPages}
            </span>
            <button
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-sm"
            >
              Tiếp &raquo;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
