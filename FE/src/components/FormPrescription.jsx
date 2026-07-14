import Button from "./Button";
import add from "../assets/images/add.png";
import FormListMedicine from "./FormListMedicine";
import FormChoseMedicine from "./FormChoseMedicine";
import FormMedicineDosage from "./FormMedicineDosage";
import { useState, useEffect } from "react";
import { getMedicines } from "../services/medicineService";
import { getStudentByCode } from "../services/studentService";

const defaultDosage = {
  timesPerDay: 1,
  amountPerTime: 1,
  timeOfDay: { morning: false, noon: false, afternoon: false, evening: false },
  mealRelation: "none",
  mealMinutes: 30,
  rawNote: "",
};
const parseDosageFromNote = (noteStr = "") => {
  if (!noteStr)
    return { ...defaultDosage, timeOfDay: { ...defaultDosage.timeOfDay } };

  const result = {
    ...defaultDosage,
    timeOfDay: { ...defaultDosage.timeOfDay },
  };
  const remaining = [];

  noteStr.split(" - ").forEach((part) => {
    const timesMatch = part.match(/^(\d+)\s*lần\/ngày,\s*(\d+)\s*.*\/lần$/);
    const timeMatch = part.match(/^uống vào (.+)$/);
    const mealMatch = part.match(/^(trước|sau) khi ăn (\d+)\s*phút$/);

    if (timesMatch) {
      result.timesPerDay = Number(timesMatch[1]);
      result.amountPerTime = Number(timesMatch[2]);
    } else if (timeMatch) {
      const labels = timeMatch[1].split(",").map((s) => s.trim());
      result.timeOfDay.morning = labels.includes("sáng");
      result.timeOfDay.noon = labels.includes("trưa");
      result.timeOfDay.afternoon = labels.includes("chiều");
      result.timeOfDay.evening = labels.includes("tối");
    } else if (mealMatch) {
      result.mealRelation = mealMatch[1] === "trước" ? "before" : "after";
      result.mealMinutes = Number(mealMatch[2]);
    } else if (part.trim()) {
      remaining.push(part.trim());
    }
  });

  result.rawNote = remaining.join(" - ");
  return result;
};

const mapDetailsToMedicines = (details = []) =>
  details.map((d) => ({
    id: d.medicineId,
    name: d.medicineName,
    unit: d.unit,
    quantity: d.quantity,
    note: d.note ?? "",
    stock: null,
    stockError: "",
    ...parseDosageFromNote(d.note),
  }));

export default function FormPrescription({
  mode = "create",
  status = null,
  initialData = {},
  onBack = () => {},
  onSave = () => {},
}) {
  const [showChoose, setShowChoose] = useState(false);
  const [medicines, setMedicines] = useState(
    initialData.medicines ?? mapDetailsToMedicines(initialData.details),
  );
  const [isEditing, setIsEditing] = useState(false);
  const [snapshot, setSnapshot] = useState([]);

  // Hàng đợi thuốc vừa chọn từ FormChoseMedicine, cần nhập liều dùng lần lượt
  const [dosageQueue, setDosageQueue] = useState([]);
  // Thuốc đang được sửa liều dùng (đã có sẵn trong đơn)
  const [dosageEditTarget, setDosageEditTarget] = useState(null);

  const currentDosageMedicine = dosageQueue[0] ?? null;

  // Controlled form fields
  const [studentId, setStudentId] = useState(initialData.studentCode || "");
  const [classCode, setClassCode] = useState(initialData.classCode || "");
  const [fullname, setFullname] = useState(initialData.fullName || "");
  const [insurance, setInsurance] = useState(initialData.insuranceCode || "");
  const [diagnosis, setDiagnosis] = useState(initialData.diagnosis || "");
  const [notes, setNotes] = useState(initialData.note || "");

  const [errors, setErrors] = useState({});
  const [studentError, setStudentError] = useState("");

  const isCreateMode = mode === "create";
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const canEdit = isEditMode && status === "pending";
  const isReadOnly = isViewMode || (isEditMode && !isEditing);
  const studentFilled = !!fullname && !studentError;
  const isPersonalInfoLocked = isReadOnly || studentFilled;

  const showAddButton = isCreateMode || isEditing;
  const showRemoveButton = isCreateMode || isEditing;
  const showCreateButton = isCreateMode;
  const showEditButton = canEdit && !isEditing;
  const showSaveButton = isEditing;

  const [medicineList, setMedicineList] = useState([]);

  useEffect(() => {
    getMedicines({ page: 0, size: 100 })
      .then((res) => {
        console.log("getMedicines res:", res);
        const fullList = res.content.map((m) => ({
          id: m.id,
          name: m.name,
          unit: m.unit,
          stock: m.totalQuantity,
        }));

        const availableList = fullList.filter((m) => m.stock > 0);
        setMedicineList(availableList);

        setMedicines((prev) =>
          prev.map((med) => {
            if (med.stock != null) return med;

            const found = fullList.find((m) => m.id === med.id);
            if (!found) return med;

            let stockError = "";
            if (found.stock === 0) {
              stockError = "Thuốc đã hết trong kho";
            } else if (Number(med.quantity) > found.stock) {
              stockError =
                `Tồn kho chỉ còn ${found.stock} ${found.unit ?? ""}`.trim();
            }

            return { ...med, stock: found.stock, stockError };
          }),
        );
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isReadOnly) return;
    if (!isCreateMode && !isEditing) return;

    const trimmed = studentId.trim();
    if (!trimmed) return;

    const timer = setTimeout(async () => {
      try {
        const res = await getStudentByCode(trimmed);
        if (res) {
          setFullname(res.fullName ?? "");
          setClassCode(res.classCode ?? "");
          setInsurance(res.insuranceCode ?? "");
          setStudentError("");
          setErrors((prev) => ({ ...prev, studentId: "" }));
        }
      } catch (err) {
        setFullname("");
        setClassCode("");
        setInsurance("");
        const apiMessage = err?.response?.data?.message;
        setStudentError(apiMessage || "Sinh viên không tồn tại.");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [studentId, isReadOnly, isCreateMode, isEditing]);

  const validate = () => {
    const newErrors = {};

    if (!studentId.trim()) {
      newErrors.studentId = "Vui lòng nhập mã số sinh viên.";
    } else if (studentError) {
      newErrors.studentId = studentError;
    }

    if (!diagnosis.trim()) {
      newErrors.diagnosis = "Vui lòng nhập chẩn đoán.";
    }

    if (medicines.length === 0) {
      newErrors.medicines = "Vui lòng thêm ít nhất một loại thuốc.";
    } else if (
      medicines.some(
        (med) =>
          med.quantity === "" ||
          med.quantity === null ||
          Number(med.quantity) < 1 ||
          med.stockError,
      )
    ) {
      newErrors.medicines =
        "Vui lòng kiểm tra số lượng thuốc (tối thiểu 1, không vượt tồn kho).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Bước 1: nhận danh sách thuốc vừa tick chọn từ FormChoseMedicine
  // → đưa vào hàng đợi để nhập liều dùng lần lượt từng loại
  const handleConfirmMedicine = (selected) => {
    const withStock = selected.map((med) => {
      const found = medicineList.find((m) => m.id === med.id);
      return {
        ...med,
        quantity: 1,
        stock: found?.stock ?? med.stock ?? null,
        stockError: "",
      };
    });
    setShowChoose(false);
    setDosageQueue(withStock);
  };

  // Bước 2: xác nhận liều dùng cho thuốc đầu hàng đợi → thêm vào đơn, xử lý thuốc tiếp theo
  const handleConfirmDosageFromQueue = (dosage) => {
    setMedicines((prev) => [...prev, { ...currentDosageMedicine, ...dosage }]);
    setErrors((prev) => ({ ...prev, medicines: "" }));
    setDosageQueue((prev) => prev.slice(1));
  };

  const handleCancelDosageFromQueue = () => {
    // Bỏ qua thuốc này, không thêm vào đơn, chuyển sang thuốc tiếp theo
    setDosageQueue((prev) => prev.slice(1));
  };

  // Sửa liều dùng cho thuốc đã có sẵn trong đơn
  const handleEditDosage = (med) => {
    setDosageEditTarget(med);
  };

  const handleConfirmDosageEdit = (dosage) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === dosageEditTarget.id ? { ...m, ...dosage } : m)),
    );
    setDosageEditTarget(null);
  };

  const updateQuantity = (id, rawValue) => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id !== id) return med;

        if (rawValue === "") {
          return { ...med, quantity: "", stockError: "" };
        }

        const num = Number(rawValue);
        const stock = med.stock ?? null;

        if (stock !== null && num > stock) {
          return {
            ...med,
            quantity: num,
            stockError: `Tồn kho chỉ còn ${stock} ${med.unit ?? ""}`.trim(),
          };
        }

        return {
          ...med,
          quantity: Math.max(1, num),
          stockError: "",
        };
      }),
    );
  };

  const handleEdit = () => {
    setSnapshot(medicines);
    setIsEditing(true);
  };

  // Chuyển state medicines nội bộ -> đúng cấu trúc details[] mà BE yêu cầu
  // { medicineId, quantity, note } — khớp với response getPrescriptionByCode
  const buildDetailsPayload = () =>
    medicines.map((med) => ({
      medicineId: med.id,
      quantity: Number(med.quantity),
      note: med.note ?? "",
    }));

  const handleSaveChanges = () => {
    if (!validate()) return;
    onSave({
      studentCode: studentId.trim(),
      diagnosis,
      note: notes,
      medicines,
      details: buildDetailsPayload(),
    });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      studentCode: studentId.trim(),
      diagnosis,
      note: notes,
      medicines,
      details: buildDetailsPayload(),
    });
  };

  const handleCancel = () => {
    if (isEditing) {
      setMedicines(snapshot);
      setIsEditing(false);
    } else {
      onBack();
    }
  };

  const getCancelButtonText = () => {
    if (isEditing) return "HỦY SỬA";
    if (isViewMode || isEditMode) return "QUAY LẠI";
    return "HỦY TẠO ĐƠN";
  };

  const inputClass = (readOnly) =>
    `peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#98BBFF_100%)] px-3 pt-5 text-sm outline-none font-bold ${
      readOnly ? "cursor-not-allowed opacity-75" : ""
    }`;

  const labelClass =
    "absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gray-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-gray-500";

  return (
    <>
      <div
        style={{ padding: "30px" }}
        className="w-full h-9/10 flex flex-col min-h-0 relative"
      >
        {/* Khung ngoài KHÔNG cuộn — chỉ danh sách thuốc bên trong mới cuộn */}
        <div className="bg-white flex-1 min-h-0 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between py-2 px-5 flex-shrink-0">
            <div className="flex flex-col justify-center">
              <h2 className="text-sm font-bold text-[#264580]">
                Cán bộ y tế:{" "}
                {initialData.medicalStaff ||
                  initialData.doctorName ||
                  "Lê Thành Đạt"}
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

          <h1 className="text-center pt-5 font-bold text-2xl pb-3 flex-shrink-0">
            PHIẾU KÊ ĐƠN THUỐC
          </h1>

          {/* Form chiếm hết phần còn lại, min-h-0 để con bên trong scroll đúng cách */}
          <form
            className="flex-1 min-h-0 flex flex-col items-center justify-start gap-3 px-8"
            onSubmit={handleSubmit}
          >
            {/* Hàng trên: thông tin bệnh nhân + chẩn đoán — cố định, không cuộn */}
            <div className="flex items-start justify-between gap-6 w-full flex-shrink-0">
              <div className="flex-[55] bg-[#F7F7F7] rounded-sm p-8 flex flex-col items-center gap-5 shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]">
                <h2 className="font-bold text-sm">👤 THÔNG TIN BỆNH NHÂN</h2>
                <div className="flex items-center justify-between gap-6 pb-6 w-full">
                  <div className="relative shadow-sm flex-1">
                    <input
                      type="text"
                      id="studentId"
                      placeholder=" "
                      value={studentId}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStudentId(val);
                        setErrors((prev) => ({ ...prev, studentId: "" }));
                        if (!val.trim()) {
                          setFullname("");
                          setClassCode("");
                          setInsurance("");
                          setStudentError("");
                        }
                      }}
                      disabled={isReadOnly}
                      className={`${inputClass(isReadOnly)} ${
                        errors.studentId ? "border border-red-400" : ""
                      }`}
                    />
                    <label htmlFor="studentId" className={labelClass}>
                      MÃ SỐ SINH VIÊN
                    </label>
                    {errors.studentId && (
                      <p className="absolute left-0 -bottom-5 text-red-500 text-[10px] whitespace-nowrap">
                        {errors.studentId}
                      </p>
                    )}
                  </div>
                  <div className="relative shadow-sm flex-1">
                    <input
                      type="text"
                      id="fullname"
                      placeholder=" "
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      disabled={isPersonalInfoLocked}
                      className={inputClass(isPersonalInfoLocked)}
                    />
                    <label htmlFor="fullname" className={labelClass}>
                      HỌ VÀ TÊN
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-6 w-full">
                  <div className="relative shadow-sm flex-1">
                    <input
                      type="text"
                      id="classCode"
                      placeholder=" "
                      value={classCode}
                      onChange={(e) => setClassCode(e.target.value)}
                      disabled={isPersonalInfoLocked}
                      className={inputClass(isPersonalInfoLocked)}
                    />
                    <label htmlFor="classCode" className={labelClass}>
                      MÃ LỚP
                    </label>
                  </div>
                  <div className="relative shadow-sm flex-1">
                    <input
                      type="text"
                      id="insurance"
                      placeholder=" "
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                      disabled={isPersonalInfoLocked}
                      className={inputClass(isPersonalInfoLocked)}
                    />
                    <label htmlFor="insurance" className={labelClass}>
                      MÃ SỐ BẢO HIỂM Y TẾ
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex-[40] bg-[#F7F7F7] rounded-sm p-8 flex flex-col items-center gap-5 shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]">
                <h2 className="font-bold text-sm">🩺 CHẨN ĐOÁN</h2>
                <div className="relative shadow-sm w-full">
                  <input
                    type="text"
                    id="finalDiagnosis"
                    placeholder=" "
                    value={diagnosis}
                    onChange={(e) => {
                      setDiagnosis(e.target.value);
                      setErrors((prev) => ({ ...prev, diagnosis: "" }));
                    }}
                    disabled={isReadOnly}
                    className={`${inputClass(isReadOnly)} ${
                      errors.diagnosis ? "border border-red-400" : ""
                    }`}
                  />
                  <label htmlFor="finalDiagnosis" className={labelClass}>
                    KẾT LUẬN CHUẨN ĐOÁN
                  </label>
                </div>
                {errors.diagnosis && (
                  <p className="text-red-500 text-xs w-full">
                    {errors.diagnosis}
                  </p>
                )}
              </div>
            </div>

            {/* Danh sách thuốc — khối này co giãn lấp đầy không gian còn lại,
                phần bên trong (list thuốc) mới thực sự overflow-y-auto và cuộn */}
            <div className="flex-1 min-h-0 flex flex-col gap-3 w-full bg-[#F7F7F7] rounded-sm shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] p-5">
              {/* Header cố định: tiêu đề canh GIỮA, nút thêm thuốc ghim bên phải — không cuộn theo */}
              <div className="relative flex items-center justify-center flex-shrink-0">
                <h2 className="font-bold text-sm">💊 ĐƠN THUỐC</h2>
                {showAddButton && (
                  <Button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#264580] h-10 text-sm flex items-center text-white font-bold gap-2 p-2"
                    onClick={() => setShowChoose(true)}
                  >
                    <img src={add} alt="Add Icon" className="w-3 h-3 mr-1" />
                    Thêm thuốc
                  </Button>
                )}
              </div>

              {/* Vùng cuộn thực sự — có min-height đủ hiện trọn vẹn vài dòng thuốc,
                  tránh bị cắt ngang giữa chừng một dòng */}
              <div className="flex-1 max-h-[260px] overflow-y-auto p-2">
                {medicines.length > 0 ? (
                  <div className="w-full flex flex-col gap-3">
                    {medicines.map((med) => (
                      <FormListMedicine
                        key={med.id}
                        medicine={med}
                        onQuantityChange={updateQuantity}
                        onRemove={(id) =>
                          setMedicines((prev) =>
                            prev.filter((m) => m.id !== id),
                          )
                        }
                        onEditDosage={handleEditDosage}
                        showRemoveButton={showRemoveButton}
                        isReadOnly={isReadOnly}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm italic text-center py-4">
                    Chưa có thuốc nào trong đơn.
                  </p>
                )}
              </div>

              {errors.medicines && (
                <p className="text-red-500 text-xs flex-shrink-0">
                  {errors.medicines}
                </p>
              )}
            </div>

            {/* Ghi chú — cố định, không cuộn */}
            <div className="flex flex-col items-center gap-3 w-full px-8 bg-[#F7F7F7] rounded-sm p-6 shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] flex-shrink-0">
              <h2 className="font-bold text-sm">📝 GHI CHÚ VÀ LỜI DẶN</h2>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isReadOnly}
                className={`outline-none bg-white w-4/5 h-12 px-3 ${
                  isReadOnly ? "cursor-not-allowed opacity-75" : ""
                }`}
              />
            </div>

            {/* Nút hành động — cố định, ghim cuối form */}
            <div className="flex items-center justify-center gap-16 pt-5 pb-10 flex-shrink-0">
              <Button
                type="button"
                className="bg-[#D21013] w-44 h-10 text-sm font-bold text-white shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]"
                onClick={handleCancel}
              >
                {getCancelButtonText()}
              </Button>

              {showCreateButton && (
                <Button
                  type="submit"
                  className="bg-[#14B319] w-44 h-10 text-sm font-bold text-white shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]"
                >
                  TẠO ĐƠN THUỐC
                </Button>
              )}

              {showEditButton && (
                <Button
                  type="button"
                  className="bg-[#FFA500] w-44 h-10 text-sm font-bold text-white shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]"
                  onClick={handleEdit}
                >
                  SỬA ĐƠN THUỐC
                </Button>
              )}

              {showSaveButton && (
                <Button
                  type="button"
                  className="bg-[#14B319] w-44 h-10 text-sm font-bold text-white shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]"
                  onClick={handleSaveChanges}
                >
                  LƯU THAY ĐỔI
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Modal chọn thuốc */}
        {showChoose && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <FormChoseMedicine
              data={medicineList}
              selectedMedicines={medicines}
              onCancel={() => setShowChoose(false)}
              onConfirm={handleConfirmMedicine}
            />
          </div>
        )}

        {/* Modal nhập liều dùng cho thuốc vừa chọn (hàng đợi, từng cái một) */}
        {currentDosageMedicine && (
          <div className="absolute inset-0 flex items-center justify-center z-[60] bg-black/40">
            <FormMedicineDosage
              medicine={currentDosageMedicine}
              onCancel={handleCancelDosageFromQueue}
              onConfirm={handleConfirmDosageFromQueue}
            />
          </div>
        )}

        {/* Modal sửa liều dùng cho thuốc đã có trong đơn */}
        {dosageEditTarget && (
          <div className="absolute inset-0 flex items-center justify-center z-[60] bg-black/40">
            <FormMedicineDosage
              medicine={dosageEditTarget}
              initialDosage={dosageEditTarget}
              onCancel={() => setDosageEditTarget(null)}
              onConfirm={handleConfirmDosageEdit}
            />
          </div>
        )}
      </div>
    </>
  );
}
