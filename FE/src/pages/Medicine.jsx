import Table from "../components/Table/Table.jsx";
import add from "../assets/images/add.png";
import Button from "../components/Button.jsx";
import ReportIcon from "../assets/svg/ReportIcon.jsx";
import FormMedicine from "../components/FormMedicine";
import Alert from "../components/Alert.jsx";
import { useState } from "react";
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
  const fields = [
    { name: "tenThuoc", label: "Tên thuốc:", width: "full" },
    { name: "soLuong", label: "Số lượng:", width: "half" },
    { name: "donViTinh", label: "Đơn vị tính:", width: "half" },
    { name: "hanSuDung", label: "Hạn sử dụng:", width: "full" },
  ];
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  return (
    <>
      <div className="w-3/4 bg-white absolute top-20 left-85 h-5/6 rounded-2xl shadow-xl">
        <h1 className="text-black text-center font-bold text-2xl pt-5 pb-3">
          DANH SÁCH THUỐC
        </h1>
        <Button className="bg-[#5E5E5E] h-6 text-xs flex justify-self-end items-center text-white font-bold mr-15 mb-2 px-6 gap-1">
          <ReportIcon />
          Xuất báo cáo
        </Button>
        <Button className="bg-[#CA20A5] h-6 text-xs flex justify-self-end items-center text-white font-bold mr-15 ">
          <img src={add} alt="Add Icon" className="w-3 h-3 mr-1" />
          Thêm thuốc mới
        </Button>
        <div className="overflow-y-auto max-h-[500px] p-5">
          <Table
            columns={columns}
            data={data}
            onAdd={() => setShow(true)}
            onRemove={() => setShowAlert(true)}
          />
        </div>
      </div>
      {show && (
        <div className="w-200 bg-white absolute top-60 left-125 h-1/2 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-10">
          <h1 className="text-black text-center font-bold text-2xl pt-5 pb-3 w-full">
            NHẬP THUỐC
          </h1>
          <div className="w-170 mx-auto">
            <FormMedicine
              fields={fields}
              onChange={(data) => console.log(data)}
              variant="primary"
              readOnly={false}
            />
          </div>
          <div className="flex items-center justify-center gap-16 font-bold text-white">
            <Button
              className="bg-[#951010] hover:bg-red-600 w-30 h-10"
              onClick={() => setShow(false)}
            >
              HỦY BỎ
            </Button>
            <Button className="bg-[#268037] hover:bg-green-600 w-30 h-10">
              HOÀN TẤT
            </Button>
          </div>
        </div>
      )}
      <Alert show={showAlert} onClose={() => setShowAlert(false)} />
    </>
  );
}
