import Button from "./Button";
import add from "../assets/images/add.png";
import FormListMedicine from "./FormListMedicine";
import FormChoseMedicine from "./FormChoseMedicine";
import { useState } from "react";

export default function FormPrescription({
  mode = "create",
  status = null,
  initialData = {},
  onBack = () => {},
  onSave = () => {},
}) {
  const [showChoose, setShowChoose] = useState(false);
  const [medicines, setMedicines] = useState(initialData.medicines || []);
  const [isEditing, setIsEditing] = useState(false); // State để theo dõi trạng thái đang sửa

  // Xác định các trạng thái hiển thị
  const isCreateMode = mode === "create";
  const isViewMode = mode === "view";
  const canEdit = isViewMode && status === "pending"; // Chỉ đơn "chờ cấp thuốc" mới có thể sửa
  const isReadOnly = isViewMode && !isEditing; // Chỉ đọc khi đang ở chế độ xem và không đang sửa

  // Hiển thị các nút
  const showAddButton = isCreateMode || isEditing;
  const showRemoveButton = isCreateMode || isEditing;
  const showCreateButton = isCreateMode;
  const showEditButton = canEdit && !isEditing;
  const showSaveButton = isEditing;

  const handleConfirmMedicine = (selected) => {
    const newMedicines = selected.map((med) => ({ ...med, quantity: "" }));
    setMedicines((prev) => [...prev, ...newMedicines]);
    setShowChoose(false);
  };

  const updateQuantity = (id, quantity) => {
    setMedicines((prev) =>
      prev.map((med) => (med.id === id ? { ...med, quantity } : med)),
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    onSave(medicines);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (isEditing) {
      // Hủy sửa - khôi phục dữ liệu ban đầu
      setMedicines(initialData.medicines || []);
      setIsEditing(false);
    } else {
      // Quay lại hoặc hủy tạo đơn
      onBack();
    }
  };

  const MEDICINES = [
    { id: 1, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 2, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 3, name: "Ibulin 100ml", unit: "Chai" },
    { id: 4, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 5, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 6, name: "Ibulin 100ml", unit: "Chai" },
    { id: 7, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 8, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 9, name: "Ibulin 100ml", unit: "Chai" },
    { id: 10, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 11, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 12, name: "Ibulin 100ml", unit: "Chai" },
    { id: 13, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 14, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 15, name: "Ibulin 100ml", unit: "Chai" },
    { id: 16, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 17, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 18, name: "Ibulin 100ml", unit: "Chai" },
    { id: 36, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 19, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 20, name: "Ibulin 100ml", unit: "Chai" },
    { id: 21, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 22, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 23, name: "Ibulin 100ml", unit: "Chai" },
    { id: 24, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 25, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 26, name: "Ibulin 100ml", unit: "Chai" },
    { id: 27, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 28, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 29, name: "Ibulin 100ml", unit: "Chai" },
    { id: 30, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 31, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 32, name: "Ibulin 100ml", unit: "Chai" },
    { id: 33, name: "Bisacodyl HG H/100V", unit: "Viên" },
    { id: 34, name: "Paracetamol 500mg", unit: "Viên" },
    { id: 35, name: "Ibulin 100ml", unit: "Chai" },
  ];

  // Lấy text cho các nút
  const getCancelButtonText = () => {
    if (isEditing) return "HỦY SỬA";
    if (isViewMode) return "QUAY LẠI";
    return "HỦY TẠO ĐƠN";
  };

  return (
    <>
      <div className="w-3/4 bg-white absolute top-18 left-105 h-[90%] rounded-2xl shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between py-2 px-5">
          <div className="flex flex-col justify-center">
            <h2 className="text-sm font-bold text-[#264580]">
              Cán bộ y tế: {initialData.doctorName || "Lê Thành Đạt"}
            </h2>
            <p className="text-xs italic">
              Ca trực : {initialData.shift || "sáng 12/01/2026"}
            </p>
          </div>
          <p className="text-xs italic">
            Thời gian bắt đầu kê đơn:{" "}
            {initialData.startTime || "14:15 | 12/01/2005"}
          </p>
        </div>
        <h1 className="text-center pt-5 font-bold text-2xl pb-3">
          PHIẾU KÊ ĐƠN THUỐC
        </h1>
        <form className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-between gap-10 w-9/10 px-18">
            <div className="w-[55%] bg-[#F7F7F7] rounded-sm p-10 flex flex-col items-center justify-center gap-5 shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]">
              <h2 className="font-bold text-sm">👤 THÔNG TIN BỆNH NHÂN</h2>
              <div className="flex items-center justify-between gap-10">
                <div className="relative shadow-sm">
                  <input
                    type="text"
                    id="fullname"
                    placeholder=" "
                    defaultValue={initialData.fullname || ""}
                    disabled={isReadOnly}
                    className={`peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#98BBFF_100%)] px-3 pt-5 text-sm outline-none font-bold ${
                      isReadOnly ? "cursor-not-allowed opacity-75" : ""
                    }`}
                  />
                  <label
                    htmlFor="fullname"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gray-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px]peer-not-placeholder-shown:text-gray-500"
                  >
                    HỌ VÀ TÊN
                  </label>
                </div>
                <div className="relative shadow-sm">
                  <input
                    type="text"
                    id="studentId"
                    placeholder=" "
                    defaultValue={initialData.studentId || ""}
                    disabled={isReadOnly}
                    className={`peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#98BBFF_100%)] px-3 pt-5 text-sm outline-none font-bold ${
                      isReadOnly ? "cursor-not-allowed opacity-75" : ""
                    }`}
                  />
                  <label
                    htmlFor="studentId"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gray-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px]peer-not-placeholder-shown:text-gray-500"
                  >
                    MÃ SỐ SINH VIÊN
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between gap-10">
                <div className="relative shadow-sm">
                  <input
                    type="text"
                    id="classCode"
                    placeholder=" "
                    defaultValue={initialData.classCode || ""}
                    disabled={isReadOnly}
                    className={`peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#98BBFF_100%)] px-3 pt-5 text-sm outline-none font-bold ${
                      isReadOnly ? "cursor-not-allowed opacity-75" : ""
                    }`}
                  />
                  <label
                    htmlFor="classCode"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gray-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px]peer-not-placeholder-shown:text-gray-500"
                  >
                    MÃ LỚP
                  </label>
                </div>
                <div className="relative shadow-sm">
                  <input
                    type="text"
                    id="insurance"
                    placeholder=" "
                    defaultValue={initialData.insurance || ""}
                    disabled={isReadOnly}
                    className={`peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#98BBFF_100%)] px-3 pt-5 text-sm outline-none font-bold ${
                      isReadOnly ? "cursor-not-allowed opacity-75" : ""
                    }`}
                  />
                  <label
                    htmlFor="insurance"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gray-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px]peer-not-placeholder-shown:text-gray-500"
                  >
                    MÃ SỐ BẢO HIỂM Y TẾ
                  </label>
                </div>
              </div>
            </div>
            <div className="w-[40%] bg-[#F7F7F7] rounded-sm p-10 flex flex-col items-center justify-center gap-5 shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]">
              <h2 className="font-bold text-sm">🩺 CHẨN ĐOÁN</h2>
              <div className="relative shadow-sm">
                <input
                  type="text"
                  id="finalDiagnosis"
                  placeholder=" "
                  defaultValue={initialData.diagnosis || ""}
                  disabled={isReadOnly}
                  className={`peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#98BBFF_100%)] px-3 pt-5 text-sm outline-none font-bold ${
                    isReadOnly ? "cursor-not-allowed opacity-75" : ""
                  }`}
                />
                <label
                  htmlFor="finalDiagnosis"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gray-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px]peer-not-placeholder-shown:text-gray-500"
                >
                  KẾT LUẬN CHUẨN ĐOÁN
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 w-8/10 min-h-50 bg-[#F7F7F7] rounded-sm shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] p-5">
            <h2 className="font-bold text-sm">💊 ĐƠN THUỐC</h2>
            {showAddButton && (
              <Button
                type="button"
                className="bg-[#264580] h-6 text-xs flex justify-self-end items-center text-white font-bold"
                onClick={() => setShowChoose(true)}
              >
                <img src={add} alt="Add Icon" className="w-3 h-3 mr-1" />
                Thêm thuốc
              </Button>
            )}
            {medicines.length > 0 && (
              <div className="w-full flex flex-col gap-3">
                {medicines.map((med) => (
                  <FormListMedicine
                    key={med.id}
                    medicine={med}
                    onQuantityChange={updateQuantity}
                    onRemove={(id) =>
                      setMedicines((prev) => prev.filter((m) => m.id !== id))
                    }
                    showRemoveButton={showRemoveButton}
                    isReadOnly={isReadOnly}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-3 w-8/10 h-40 px-20 bg-[#F7F7F7] rounded-sm p-10 shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]">
            <h2 className="font-bold text-sm">📝 GHI CHÚ VÀ LỜI DẶN</h2>
            <input
              type="text"
              defaultValue={initialData.notes || ""}
              disabled={isReadOnly}
              className={`outline-none bg-white w-4/5 h-15 ${
                isReadOnly ? "cursor-not-allowed opacity-75" : ""
              }`}
            />
          </div>
          <div className="flex items-center justify-center gap-50 pt-5 pb-10">
            <Button
              type="button"
              className="bg-[#D21013] w-50 h-10 text-sm font-bold text-white shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]"
              onClick={handleCancel}
            >
              {getCancelButtonText()}
            </Button>

            {showCreateButton && (
              <Button
                type="submit"
                className="bg-[#14B319] w-50 h-10 text-sm font-bold text-white shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]"
              >
                TẠO ĐƠN THUỐC
              </Button>
            )}

            {showEditButton && (
              <Button
                type="button"
                className="bg-[#FFA500] w-50 h-10 text-sm font-bold text-white shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]"
                onClick={handleEdit}
              >
                SỬA ĐƠN THUỐC
              </Button>
            )}

            {showSaveButton && (
              <Button
                type="button"
                className="bg-[#14B319] w-50 h-10 text-sm font-bold text-white shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]"
                onClick={handleSaveChanges}
              >
                LƯU THAY ĐỔI
              </Button>
            )}
          </div>
        </form>
      </div>

      {showChoose && (
        <div className="fixed inset-0 left-100 bg-opacity-50 flex items-center justify-center z-50">
          <FormChoseMedicine
            data={MEDICINES}
            selectedMedicines={medicines}
            onCancel={() => setShowChoose(false)}
            onConfirm={handleConfirmMedicine}
          />
        </div>
      )}
    </>
  );
}
