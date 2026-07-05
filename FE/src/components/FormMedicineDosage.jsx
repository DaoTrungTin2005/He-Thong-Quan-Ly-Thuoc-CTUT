import { useState } from "react";
import Button from "./Button";

export default function FormMedicineDosage({
  medicine,
  initialDosage = {},
  onCancel,
  onConfirm,
}) {
  const [timesPerDay, setTimesPerDay] = useState(
    initialDosage.timesPerDay ?? 1,
  );
  const [amountPerTime, setAmountPerTime] = useState(
    initialDosage.amountPerTime ?? 1,
  );
  // Đơn vị luôn khóa theo đơn vị tính gốc của thuốc, không cho chọn khác
  const amountUnit = medicine.unit ?? "";
  const [timeOfDay, setTimeOfDay] = useState(
    initialDosage.timeOfDay ?? {
      morning: false,
      noon: false,
      afternoon: false,
      evening: false,
    },
  );
  const [mealRelation, setMealRelation] = useState(
    initialDosage.mealRelation ?? "none",
  );
  const [mealMinutes, setMealMinutes] = useState(
    initialDosage.mealMinutes ?? 30,
  );
  const [note, setNote] = useState(initialDosage.rawNote ?? "");
  const [error, setError] = useState("");

  const toggleTime = (key) =>
    setTimeOfDay((prev) => ({ ...prev, [key]: !prev[key] }));

  const step = (setter, value, delta, min = 1) =>
    setter(Math.max(min, Number(value) + delta));

  // Demo: gộp toàn bộ thông tin liều dùng thành 1 chuỗi note duy nhất.
  const buildNote = () => {
    const parts = [];

    parts.push(`${timesPerDay} lần/ngày, ${amountPerTime} ${amountUnit}/lần`);

    const timeLabels = [];
    if (timeOfDay.morning) timeLabels.push("sáng");
    if (timeOfDay.noon) timeLabels.push("trưa");
    if (timeOfDay.afternoon) timeLabels.push("chiều");
    if (timeOfDay.evening) timeLabels.push("tối");
    if (timeLabels.length > 0) {
      parts.push(`uống vào ${timeLabels.join(", ")}`);
    }

    if (mealRelation === "before") {
      parts.push(`trước khi ăn ${mealMinutes} phút`);
    } else if (mealRelation === "after") {
      parts.push(`sau khi ăn ${mealMinutes} phút`);
    }

    if (note.trim()) {
      parts.push(note.trim());
    }

    return parts.join(" - ");
  };

  const handleConfirm = () => {
    if (!Object.values(timeOfDay).some(Boolean)) {
      setError("Vui lòng chọn ít nhất một thời điểm uống trong ngày.");
      return;
    }

    onConfirm({
      timesPerDay,
      amountPerTime,
      amountUnit,
      timeOfDay,
      mealRelation,
      mealMinutes: mealRelation === "none" ? null : mealMinutes,
      rawNote: note,
      note: buildNote(),
    });
  };

  const numberBoxClass =
    "flex items-center border border-gray-300 rounded overflow-hidden";
  const stepBtnClass =
    "w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg font-bold select-none";

  return (
    <div className="w-auto max-w-lg px-8 py-6 flex flex-col gap-5 bg-white rounded-lg shadow-lg">
      <h3 className="font-bold text-lg text-[#264580] text-center">
        LIỀU DÙNG: {medicine.name}
      </h3>

      {/* Số lần uống trong ngày */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold">Số lần uống trong ngày</label>
        <div className={numberBoxClass}>
          <button
            type="button"
            className={stepBtnClass}
            onClick={() => step(setTimesPerDay, timesPerDay, -1)}
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-bold">
            {timesPerDay}
          </span>
          <button
            type="button"
            className={stepBtnClass}
            onClick={() => step(setTimesPerDay, timesPerDay, 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Số lượng / lần uống — đơn vị khóa cứng theo thuốc */}
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold whitespace-nowrap">
          Số lượng / lần uống
        </label>
        <div className="flex items-center gap-2">
          <div className={numberBoxClass}>
            <button
              type="button"
              className={stepBtnClass}
              onClick={() => step(setAmountPerTime, amountPerTime, -1)}
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-bold">
              {amountPerTime}
            </span>
            <button
              type="button"
              className={stepBtnClass}
              onClick={() => step(setAmountPerTime, amountPerTime, 1)}
            >
              +
            </button>
          </div>
          {/* Đơn vị cố định, không cho chỉnh sửa */}
          <span className="border border-gray-200 bg-gray-100 rounded h-9 px-3 flex items-center text-sm font-semibold text-gray-600 whitespace-nowrap">
            {amountUnit}
          </span>
        </div>
      </div>

      {/* Thời điểm uống trong ngày */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Thời điểm uống</label>
        <div className="flex flex-wrap gap-4">
          {[
            { key: "morning", label: "Sáng" },
            { key: "noon", label: "Trưa" },
            { key: "afternoon", label: "Chiều" },
            { key: "evening", label: "Tối" },
          ].map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-1 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={timeOfDay[key]}
                onChange={() => toggleTime(key)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Liên quan bữa ăn */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Liên quan bữa ăn</label>
        <div className="flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-1 text-sm cursor-pointer">
            <input
              type="radio"
              name="mealRelation"
              checked={mealRelation === "none"}
              onChange={() => setMealRelation("none")}
            />
            Không liên quan
          </label>
          <label className="flex items-center gap-1 text-sm cursor-pointer">
            <input
              type="radio"
              name="mealRelation"
              checked={mealRelation === "before"}
              onChange={() => setMealRelation("before")}
            />
            Trước ăn
          </label>
          <label className="flex items-center gap-1 text-sm cursor-pointer">
            <input
              type="radio"
              name="mealRelation"
              checked={mealRelation === "after"}
              onChange={() => setMealRelation("after")}
            />
            Sau ăn
          </label>
          {mealRelation !== "none" && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={mealMinutes}
                onChange={(e) => setMealMinutes(Number(e.target.value))}
                className="w-16 border border-gray-300 rounded h-8 px-2 text-sm outline-none"
              />
              <span className="text-sm">phút</span>
            </div>
          )}
        </div>
      </div>

      {/* Ghi chú thêm */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Ghi chú thêm</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="border border-gray-300 rounded px-3 py-2 text-sm outline-none resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <div className="flex items-center justify-center gap-10 pt-2">
        <Button
          type="button"
          className="bg-[#D21013] w-32 h-9 text-sm font-bold text-white rounded shadow-md"
          onClick={onCancel}
        >
          HỦY
        </Button>
        <Button
          type="button"
          className="bg-[#14B319] w-32 h-9 text-sm font-bold text-white rounded shadow-md"
          onClick={handleConfirm}
        >
          XÁC NHẬN
        </Button>
      </div>
    </div>
  );
}
