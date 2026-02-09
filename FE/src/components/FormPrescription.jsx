import Button from "./Button";
import add from "../assets/images/add.png";
export default function FormPrescription() {
  return (
    <div className="w-3/4 bg-white absolute top-18 left-105 h-[90%] rounded-2xl shadow-xl">
      <div className="flex items-center justify-between py-2 px-5">
        <div className="flex flex-col justify-center">
          <h2 className="text-sm font-bold text-[#264580]">
            Cán bộ y tế: Lê Thành Đạt
          </h2>
          <p className="text-xs italic">Ca trực : sáng 12/01/2026</p>
        </div>
        <p className="text-xs italic">
          Thời gian bắt đầu kê đơn: 14:15 | 12/01/2005
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
                  className="peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#98BBFF_100%)] px-3 pt-5 text-sm outline-none "
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
                  className="peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#98BBFF_100%)] px-3 pt-5 text-sm outline-none "
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
                  className="peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#98BBFF_100%)] px-3 pt-5 text-sm outline-none "
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
                  className="peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#98BBFF_100%)] px-3 pt-5 text-sm outline-none "
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
                className="peer focus:shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] w-full h-12 rounded-sm bg-[linear-gradient(90deg,#F7F7F7_80.29%,#98BBFF_100%)] px-3 pt-5 text-sm outline-none "
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
        <div className="flex flex-col items-center justify-center gap-10 w-8/10 h-50 bg-[#F7F7F7] rounded-sm shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]">
          <h2 className="font-bold text-sm">💊 ĐƠN THUỐC</h2>
          <Button className="bg-[#264580] h-6 text-xs flex justify-self-end items-center text-white font-bold">
            <img src={add} alt="Add Icon" className="w-3 h-3 mr-1" />
            Thêm thuốc
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 w-8/10 h-40 px-20 bg-[#F7F7F7] rounded-sm p-10 shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]">
          <h2 className="font-bold text-sm">📝 GHI CHÚ VÀ LỜI DẶN</h2>
          <input type="text" className="outline-none bg-white w-4/5 h-15" />
        </div>
        <div className="flex items-center justify-center gap-50 pt-5">
          <Button className="bg-[#D21013] w-50 h-10 text-sm font-bold text-white shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]">
            HỦY TẠO ĐƠN
          </Button>
          <Button className="bg-[#14B319] w-50 h-10 text-sm font-bold text-white shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)]">
            TẠO ĐƠN THUỐC
          </Button>
        </div>
      </form>
    </div>
  );
}
