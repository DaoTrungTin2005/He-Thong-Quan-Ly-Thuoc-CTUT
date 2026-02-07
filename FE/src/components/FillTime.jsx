import Button from "./Button";
export default function FillTime() {
  return (
    <form className="flex items-center justify-center gap-6 py-5 font-bold text-sm">
      <label htmlFor="fortime" className="cursor-pointer">
        Truy xuất theo khoảng thời gian từ:{" "}
      </label>
      <input
        id="fortime"
        type="date"
        className="outline-none bg-white w-30 h-8 rounded-2xl shadow-sm p-2 text-black text-xs cursor-pointer"
      />
      <label htmlFor="totime" className="cursor-pointer">
        đến:{" "}
      </label>
      <input
        id="totime"
        type="date"
        className="outline-none bg-white w-30 h-8 rounded-2xl shadow-sm p-2 text-black text-xs cursor-pointer"
      />
      <Button className="bg-[#39B90F] text-xs text-white w-40 h-8">
        Tiến hành truy xuất
      </Button>
    </form>
  );
}
