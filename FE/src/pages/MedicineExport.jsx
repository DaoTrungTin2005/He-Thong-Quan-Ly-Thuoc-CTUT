import BackIcon from "../assets/svg/BackIcon.jsx";
import FillTime from "../components/FillTime.jsx";
import FormMedicine from "../components/FormMedicine.jsx";
import Table from "../components/Table/Table.jsx";
import timeIcon from "../assets/images/timeIcon.png";
export default function MedicineExport() {
  const fields = [
    { name: "tenThuoc", label: "Tên thuốc:", width: "full" },
    { name: "tonCuoi", label: "Tồn cuối:", width: "half" },
    { name: "donViTinh", label: "Đơn vị tính:", width: "half" },
    { name: "tongNhap", label: "Tổng nhập:", width: "half" },
    { name: "tongXuat", label: "Tổng xuất:", width: "half" },
  ];
  const data = {
    tenThuoc: "Paracetamol 500mg",
    tonCuoi: 100,
    donViTinh: "Viên",
    tongNhap: 200,
    tongXuat: 100,
  };
  const columns = [
    { key: "time", label: "Thời gian", align: "left" },
    { key: "quantity", label: "Số lượng", align: "left" },
    { key: "unit", label: "Đơn vị tính", align: "left" },
    { key: "status", label: "Trạng thái", align: "center" },
  ];

  const dataTime = [
    {
      time: "10:00 AM 21/11/2023",
      quantity: 102,
      unit: "bao",
      status: "exp",
    },
  ];
  return (
    <div className="w-3/4 bg-white absolute top-20 left-85 h-5/6 rounded-2xl shadow-xl">
      <div className="flex flex-col px-5 pt-1 justify-center text-black text-xs">
        <div className="cursor-pointer">
          <BackIcon />
          <p>Trở về</p>
        </div>
      </div>
      <h1 className="text-black text-center font-bold text-2xl pt-5 pb-3">
        DANH SÁCH TÀI KHOẢN
      </h1>
      <FillTime />
      <div className="w-2/3 mx-auto">
        <FormMedicine
          fields={fields}
          onChange={(data) => console.log(data)}
          variant="primary"
          readOnly={true}
          initialData={data}
        />
      </div>
      <div className="w-2/3 h-2/5 m-auto flex flex-col items-center justify-center gap-5 border border-2 border-[#264580]">
        <div className="w-full h-10 bg-[#264580] flex items-center justify-center text-white font-bold gap-5">
          <img src={timeIcon} alt="timeIcon" className="w-6 h-6" />
          <p>Lịch Sử Nhập Xuất Từ 01/01/2025 Đến 31/12/2025</p>
        </div>
        <div className="overflow-y-auto max-h-65 h-65 w-5/6">
          <Table columns={columns} data={dataTime} />
        </div>
      </div>
    </div>
  );
}
