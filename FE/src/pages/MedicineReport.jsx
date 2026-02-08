import BackIcon from "../assets/svg/BackIcon.jsx";
import FillTime from "../components/FillTime.jsx";
import fileIcon from "../assets/images/fileIcon.png";
import Title from "../components/Title.jsx";
import excelIcon from "../assets/images/excelIcon.png";
import pdfIcon from "../assets/images/pdfIcon.png";
import Button from "../components/Button.jsx";
export default function MedicineReport() {
  return (
    <div className="w-3/4 bg-white absolute top-20 left-85 h-5/6 rounded-2xl shadow-xl">
      <div className="flex flex-col px-5 pt-1 justify-center text-black text-xs">
        <div className="cursor-pointer">
          <BackIcon />
          <p>Trở về</p>
        </div>
      </div>
      <Title
        title="XUẤT BÁO CÁO"
        subtitle="DANH SÁCH THUỐC"
        wrapperClass="text-center mb-5"
        titleClass="text-3xl font-bold"
        subtitleClass="text-xs"
      />
      <FillTime />
      <div className="relative">
        <img src={fileIcon} alt="fileIcon" className="mx-auto w-160 mb-5" />
        <p className="underline text-xs absolute z-10 bottom-17 left-[47%] cursor-pointer">
          XEM TRƯỚC
        </p>
        <div className="flex items-center justify-center gap-20 w-1/2 mx-auto">
          <Button className="w-30 h-10 bg-gradient-to-r from-white to-[#1E6D41] shadow-[inset_0_1px_0.75px_0_rgba(255,255,255,0.07),_0_4px_4px_0_rgba(0,0,0,0.25),_0_4px_4px_0_rgba(0,0,0,0.25),_0_9.965px_9.675px_0_rgba(15,15,15,0.25)] flex items-center justify-center text-white font-bold gap-2">
            <img src={excelIcon} alt="" /> EXCEL
          </Button>
          <Button className="w-30 h-10 bg-gradient-to-r from-white to-[#9E0C1B] shadow-[inset_0_1px_0.75px_0_rgba(255,255,255,0.07),_0_4px_4px_0_rgba(0,0,0,0.25),_0_4px_4px_0_rgba(0,0,0,0.25),_0_9.965px_9.675px_0_rgba(15,15,15,0.25)] flex items-center justify-center text-white font-bold gap-2">
            <img src={pdfIcon} alt="" /> PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
