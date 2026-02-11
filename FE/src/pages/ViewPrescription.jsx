import FormPrescription from "../components/FormPrescription.jsx";
// Có thể thay đổi trạng thái giữa các góc view qua call API
export default function ViewPrescription() {
  const data = {
    // Thông tin cán bộ y tế
    doctorName: "Lê Thành Đạt",
    shift: "Sáng 12/01/2026",
    startTime: "14:15 | 12/01/2026",

    // Thông tin bệnh nhân
    fullname: "Nguyễn Văn A",
    studentId: "B2014567",
    classCode: "CTK45A",
    insurance: "DN123456789",

    // Chẩn đoán
    diagnosis: "Viêm họng cấp",

    // Danh sách thuốc
    medicines: [
      { id: 1, name: "Bisacodyl HG H/100V", unit: "Viên", quantity: 12 },
      { id: 2, name: "Paracetamol 500mg", unit: "Viên", quantity: 10 },
    ],

    // Ghi chú
    notes: "Uống thuốc sau bữa ăn, nghỉ ngơi đầy đủ",
  };
  return <FormPrescription mode="view" status="padding" initialData={data} />;
  //   dispensed completed
}
