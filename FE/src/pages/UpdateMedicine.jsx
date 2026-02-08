import FormMedicine from "../components/FormMedicine";
import Button from "../components/Button";
export default function UpdateMedicine() {
  const fields = [
    { name: "tenThuoc", label: "Tên thuốc:", width: "full" },
    { name: "soLuong", label: "Số lượng:", width: "half" },
    { name: "donViTinh", label: "Đơn vị tính:", width: "half" },
    { name: "hanSuDung", label: "Hạn sử dụng:", width: "full" },
  ];
  return (
    <div className="w-6/9 bg-white absolute top-20 left-105 h-1/2 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-10">
      <h1 className="text-black text-center font-bold text-2xl pt-5 pb-3 w-full">
        CẬP NHẬT THÔNG TIN THUỐC
      </h1>
      <div className="w-2/3 mx-auto">
        <FormMedicine
          fields={fields}
          onChange={(data) => console.log(data)}
          variant="primary"
          readOnly={false}
        />
      </div>
      <div className="flex items-center justify-center gap-16 font-bold text-white">
        <Button className="bg-[#951010] hover:bg-red-600 w-30 h-10">
          HỦY BỎ
        </Button>
        <Button className="bg-[#268037] hover:bg-green-600 w-30 h-10">
          HOÀN TẤT
        </Button>
      </div>
    </div>
  );
}
