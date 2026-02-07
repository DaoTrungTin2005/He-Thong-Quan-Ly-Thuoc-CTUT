import Table from "../components/Table/Table.jsx";
import add from "../assets/images/add.png";
import Button from "../components/Button.jsx";
import ReportIcon from "../assets/svg/ReportIcon.jsx";
export default function Medicine() {
  const columns = [
    { key: "id", label: "STT", align: "center" },
    { key: "medicine", label: "TÊN THUỐC", align: "left" },
    { key: "quantity", label: "SỐ LƯỢNG", align: "left" },
    { key: "unit", label: "ĐƠN VỊ TÍNH", align: "left" },
    { key: "action", label: "THAO TÁC", align: "center" },
  ];
  const data = [
    {
      id: 1,
      medicine: "thuoc chuot",
      quantity: 123,
      unit: "bao",
      status: "exported",
    },
    {
      id: 2,
      medicine: "thuoc chuot",
      quantity: 123,
      unit: "bao",
      status: "unexported",
    },
    {
      id: 3,
      medicine: "thuoc chuot",
      quantity: 123,
      unit: "bao",
      status: "lockMedicine",
    },
  ];
  return (
    <div className="w-3/4 bg-white absolute top-20 left-85 h-5/6 rounded-2xl shadow-xl">
      <h1 className="text-black text-center font-bold text-2xl pt-5 pb-3">
        DANH SÁCH THUỐC
      </h1>
      <Button className="bg-[#5E5E5E] h-6 text-xs flex justify-self-end items-center text-white font-bold mr-15 mb-2">
        <ReportIcon />
        Thêm thuốc mới
      </Button>
      <Button className="bg-[#CA20A5] h-6 text-xs flex justify-self-end items-center text-white font-bold mr-15 ">
        <img src={add} alt="Add Icon" className="w-3 h-3 mr-1" />
        Thêm thuốc mới
      </Button>
      <div className="overflow-y-auto max-h-[500px] p-5">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}
