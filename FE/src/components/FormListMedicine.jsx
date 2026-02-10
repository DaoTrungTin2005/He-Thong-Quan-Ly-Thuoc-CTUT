import Button from "./Button";
import add from "../assets/images/add.png";

/**
 * @param {Object} props
 * @param {Object} props.medicine - Thông tin thuốc
 * @param {Function} props.onQuantityChange - Hàm thay đổi số lượng
 * @param {Function} props.onRemove - Hàm xóa thuốc
 * @param {boolean} props.showRemoveButton - Hiển thị nút xóa hay không
 * @param {boolean} props.isReadOnly - Chế độ chỉ đọc
 */
export default function FormListMedicine({
  medicine,
  onQuantityChange,
  onRemove,
  showRemoveButton = true,
  isReadOnly = false,
}) {
  return (
    <div className="flex items-center justify-center gap-20">
      <div className="relative shadow-sm">
        <input
          type="text"
          id={`nameMedicine-${medicine.id}`}
          placeholder=" "
          value={medicine.name}
          readOnly
          className="peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#FFFB90_100%)] px-3 pt-5 text-sm outline-none font-bold"
        />
        <label
          htmlFor={`nameMedicine-${medicine.id}`}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gray-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-gray-500"
        >
          TÊN THUỐC
        </label>
      </div>
      <div className="relative shadow-sm">
        <input
          type="text"
          id={`unit-${medicine.id}`}
          placeholder=" "
          value={medicine.unit}
          readOnly
          className="peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#FFFB90_100%)] px-3 pt-5 text-sm outline-none font-bold"
        />
        <label
          htmlFor={`unit-${medicine.id}`}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gray-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-gray-500"
        >
          ĐƠN VỊ TÍNH
        </label>
      </div>
      <div className="relative shadow-sm">
        <input
          type="number"
          id={`quantity-${medicine.id}`}
          placeholder=" "
          value={medicine.quantity}
          onChange={(e) => onQuantityChange(medicine.id, e.target.value)}
          disabled={isReadOnly}
          className={`peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#FFFB90_100%)] px-3 pt-5 text-sm outline-none font-bold ${
            isReadOnly ? "cursor-not-allowed opacity-75" : ""
          }`}
        />
        <label
          htmlFor={`quantity-${medicine.id}`}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gray-500 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-gray-500"
        >
          SỐ LƯỢNG
        </label>
      </div>
      {showRemoveButton && (
        <Button
          type="button"
          className="w-25 h-8 p-3 bg-[#B33C14] text-white font-bold text-sm flex items-center justify-center gap-5 !rounded-4xl"
          onClick={() => onRemove(medicine.id)}
        >
          <img src={add} alt="remove" className="rotate-[46.05deg]" />
          Xóa
        </Button>
      )}
    </div>
  );
}
