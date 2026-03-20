import { useNavigate } from "react-router-dom";
import FormPrescription from "../components/FormPrescription";
import { createPrescription } from "../services/prescriptionService";
import { useState } from "react";

export default function CreatePrescription() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSave = async ({ studentCode, diagnosis, note, medicines }) => {
    setError("");
    try {
      await createPrescription({
        studentCode,
        diagnosis,
        note,
        details: medicines.map((m) => ({
          medicineId: m.id,
          quantity: Number(m.quantity),
        })),
      });
      navigate("/prescription");
    } catch (err) {
      setError(err.message || "Tạo đơn thuốc thất bại.");
    }
  };

  return (
    <>
      {error && (
        <p className="text-red-500 text-sm text-center mt-2 absolute top-16 left-1/2 -translate-x-1/2 z-50">
          {error}
        </p>
      )}
      <FormPrescription
        mode="create"
        onSave={handleSave}
        onBack={() => navigate("/prescription")}
      />
    </>
  );
}
