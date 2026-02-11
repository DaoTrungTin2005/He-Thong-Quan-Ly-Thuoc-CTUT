import Table from "../components/Table/Table.jsx";
import add from "../assets/images/add.png";
import Button from "../components/Button.jsx";
import ReportIcon from "../assets/svg/ReportIcon.jsx";
export default function Prescription() {
  const columns = [
    { key: "stt", label: "STT", align: "center" },
    { key: "prescriptionCode", label: "MÃ ĐƠN THUỐC", align: "left" },
    { key: "fullName", label: "HỌ VÀ TÊN", align: "left" },
    { key: "studentCode", label: "MSSV", align: "left" },
    { key: "insuranceCode", label: "MÃ BHYT", align: "left" },
    { key: "time", label: "THỜI GIAN", align: "center" },
    { key: "status", label: "TRẠNG THÁI", align: "center" },
    { key: "action", label: "THAO TÁC", align: "left" },
  ];

  const data = [
    {
      stt: 1,
      prescriptionCode: "CTUT07012005",
      fullName: "Đào Trung Tin",
      studentCode: "KTPM2311049",
      insuranceCode: "010201201920900",
      time: "15:15 | 02/09/2026",
      status: "waiting", // Chờ thuốc
    },
    {
      stt: 2,
      prescriptionCode: "CTUT07012005",
      fullName: "Đào Trung Tin",
      studentCode: "KTPM2311049",
      insuranceCode: "010201201920900",
      time: "15:15 | 02/09/2026",
      status: "completed", // Đã hoàn thuốc
    },
    {
      stt: 3,
      prescriptionCode: "CTUT07012005",
      fullName: "Đào Trung Tin",
      studentCode: "KTPM2311049",
      insuranceCode: "010201201920900",
      time: "15:15 | 02/09/2026",
      status: "dispensed", // Đã cấp thuốc
    },
  ];
  return (
    <>
      <div className="w-3/4 bg-white absolute top-20 left-105 h-5/6 rounded-2xl shadow-xl">
        <h1 className="text-black text-center font-bold text-2xl pt-5 pb-3">
          DANH SÁCH THUỐC
        </h1>
        <Button className="bg-[#CA20A5] h-6 text-xs flex justify-self-end items-center text-white font-bold mr-15 ">
          <img src={add} alt="Add Icon" className="w-3 h-3 mr-1" />
          KÊ ĐƠN THUỐC
        </Button>
        <div className="overflow-y-auto max-h-[500px] p-5">
          <Table columns={columns} data={data} type="prescription" />
        </div>
      </div>
    </>
  );
}
