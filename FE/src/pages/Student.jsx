import Button from "../components/Button";
import excelIcon from "../assets/images/excelIcon.png";
import FillTime from "../components/FillTime";
import Table from "../components/Table/Table";
import LogoCTUT from "../assets/images/LogoCTUT.png";
import CheckIcon from "../assets/svg/CheckIcon";
export default function Account() {
  const columns = [
    { key: "time", label: "Thời gian", align: "left" },
    { key: "name", label: "Tên File", align: "left" },
    { key: "status", label: "Trạng thái", align: "left" },
  ];

  const data = [
    {
      time: "10:00 AM 21/11/2023",
      name: "cctindao.xls",
      status: "success",
    },
    {
      time: "11:30 AM 21/11/2023",
      name: "cctindao.xls",
      status: "failed",
    },
    {
      time: "10:00 AM 21/11/2023",
      name: "cctindao.xls",
      status: "success",
    },
    {
      time: "11:30 AM 21/11/2023",
      name: "cctindao.xls",
      status: "failed",
    },
    {
      time: "10:00 AM 21/11/2023",
      name: "cctindao.xls",
      status: "success",
    },
    {
      time: "11:30 AM 21/11/2023",
      name: "cctindao.xls",
      status: "failed",
    },
  ];
  const classes = [
    { id: 1, className: "KTPM2311", studentCount: 76 },
    { id: 2, className: "CNTT2301", studentCount: 68 },
    { id: 3, className: "KTPM2312", studentCount: 72 },
    { id: 4, className: "KHMT2305", studentCount: 65 },
    { id: 5, className: "HTTT2308", studentCount: 70 },
    { id: 6, className: "KTPM2313", studentCount: 80 },
    { id: 7, className: "CNTT2302", studentCount: 62 },
    { id: 8, className: "KTPM2314", studentCount: 75 },
  ];
  const ClassCard = ({ className, studentCount }) => {
    return (
      <div className="flex items-center justify-center gap-5">
        <div className="w-20 h-15 bg-white shadow-2xl rounded-[1.875rem_0_0_0.625rem] flex items-center justify-center mr-[-10px]">
          <p className="text-[#264580] font-bold text-2xl">{studentCount}</p>
        </div>
        <div className="rounded-[0.9375rem] bg-[linear-gradient(270deg,_#2C4B84_24.04%,_#FFF_100%)] shadow-[inset_3px_3px_4px_0_rgba(0,0,0,0.25)] w-70 h-15 flex items-center justify-center gap-5 px-5">
          <img src={LogoCTUT} alt="LogoCTUT" className="w-10 h-10" />
          <p className="font-bold text-xl text-white">{className}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#00C86D] flex items-center justify-center">
          <CheckIcon />
        </div>
      </div>
    );
  };
  return (
    <div className="w-3/4 bg-white absolute top-20 left-105 max-h-5/6  rounded-2xl shadow-xl flex items-center flex-col overflow-y-auto">
      <h1 className="text-black text-center font-bold text-2xl pt-10 pb-3">
        NHẬP DỮ LIỆU SINH VIÊN
      </h1>
      <h2 className="text-center font-bold pt-10">Tải lên file excel</h2>
      <p className="text-center">👇</p>
      <div className="flex items-center justify-center w-1/2 rounded-2xl border border-dashed border-1.5 border-[#1E6D41] h-30 p-10 bg-white">
        <Button className="rounded-md w-80 h-10 text-sm font-bold text-white bg-[linear-gradient(90deg,_#FFF_0%,_#1E6D41_57.21%)] shadow-[inset_0_1px_0.75px_0_rgba(255,255,255,0.07),_0_4px_4px_0_rgba(0,0,0,0.25),_0_4px_4px_0_rgba(0,0,0,0.25),_0_9.965px_9.675px_0_rgba(15,15,15,0.25)] flex items-center justify-center gap-5">
          <img src={excelIcon} alt="excelIcon" />
          <label htmlFor="import">NHẬP DỮ LIỆU TỪ FILE EXCEL</label>
          <input type="file" name="import" id="import" className="hidden" />
        </Button>
      </div>
      <div
        className="p-5 bg-[#F8F8F8] 
       shadow-[-4px_4px_4px_0_rgba(0,0,0,0.25),_4px_4px_4px_0_rgba(0,0,0,0.25)] w-2/3 mt-5"
      >
        <h1 className="text-black text-center font-bold text-2xl pt-5 pb-3 ">
          LỊCH SỬ NHẬP LIỆU
        </h1>
        <FillTime
          label="Lọc lịch sử nhập liệu từ:"
          button="Xác nhận lọc"
        ></FillTime>
        <div className="overflow-y-auto max-h-[200px]">
          <Table columns={columns} data={data}></Table>
        </div>
      </div>
      <div className="flex items-center justify-center p-10 w-2/3 gap-5">
        <div className="grid grid-cols-2 gap-5">
          {classes.map((classItem) => (
            <ClassCard
              key={classItem.id}
              className={classItem.className}
              studentCount={classItem.studentCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
