import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormPrescription from "../components/FormPrescription.jsx";
import Alert from "../components/Alert.jsx";
import {
  getPrescriptionByCode,
  updatePrescription,
} from "../services/prescriptionService";

export default function ViewPrescription() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const prescriptionCode = location.state?.prescriptionCode;

  const [prescriptionData, setPrescriptionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mapStatus = (s = "") => {
    if (s === "Chờ thuốc") return "pending";
    if (s === "Đã cấp thuốc") return "dispensed";
    if (s === "Đã hoàn thuốc") return "completed";
    return s;
  };

  useEffect(() => {
    if (!prescriptionCode) return;
    const fetch = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getPrescriptionByCode(prescriptionCode);
        setPrescriptionData(res);
      } catch (err) {
        console.error(err);
        setError(err.message || "Không thể tải đơn thuốc.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [prescriptionCode]);

  const handleSave = async ({ studentCode, diagnosis, note, details }) => {
    setError("");
    try {
      const updated = await updatePrescription(prescriptionCode, {
        studentCode,
        diagnosis,
        note,
        details,
      });

      if (updated) {
        setPrescriptionData(updated);
      } else {
        const fresh = await getPrescriptionByCode(prescriptionCode);
        setPrescriptionData(fresh);
      }

      setShowSuccessAlert(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Cập nhật đơn thuốc thất bại.");
    }
  };
  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-20">Đang tải đơn thuốc...</p>
    );
  }

  if (error && !prescriptionData) {
    return <p className="text-center text-red-500 mt-20">{error}</p>;
  }

  if (!prescriptionData) return null;
  const initialData = {
    doctorName: prescriptionData.medicalStaff ?? "",
    shift: prescriptionData.shift ?? "",
    startTime: prescriptionData.createdAt
      ? new Date(prescriptionData.createdAt).toLocaleString("vi-VN")
      : "",
    studentCode: prescriptionData.studentCode ?? "",
    fullName: prescriptionData.fullName ?? "",
    classCode: prescriptionData.classCode ?? "",
    insuranceCode: prescriptionData.insuranceCode ?? "",
    diagnosis: prescriptionData.diagnosis ?? "",
    note: prescriptionData.note ?? "",
    details: prescriptionData.details ?? [],
  };

  return (
    <>
      <div className="relative w-full h-full mt-[7%]">
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <FormPrescription
          key={prescriptionCode}
          mode="edit"
          status={mapStatus(prescriptionData.status)}
          initialData={initialData}
          onSave={handleSave}
          onBack={() => navigate("/prescription")}
        />

        <Alert
          show={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          color="#14B319"
          textPart1=""
          main="Cập nhật đơn thuốc thành công"
          textPart2=""
          hidden="hidden"
          Enter="Đã hiểu"
          onCancel={() => setShowSuccessAlert(false)}
          onEnter={() => setShowSuccessAlert(false)}
        />
      </div>
    </>
  );
}
