import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackIcon from "../assets/svg/BackIcon.jsx";
import Title from "../components/Title.jsx";
import wordicon from "../assets/images/wordicon.png";
import pdfIcon from "../assets/images/pdfIcon.png";
import Button from "../components/Button.jsx";
import {
  exportPrescriptionWord,
  exportPrescriptionPdf,
  downloadBlob,
} from "../services/prescriptionService";

export default function PrescriptionReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const prescriptionCode = location.state?.prescriptionCode;

  const [loading, setLoading] = useState({
    pdf: false,
    word: false,
    preview: false,
  });
  const [error, setError] = useState("");
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

  useEffect(() => {
    if (!prescriptionCode) return;

    let objectUrl;
    let cancelled = false;

    const loadPreview = async () => {
      setError("");
      setLoading((prev) => ({ ...prev, preview: true }));
      try {
        const blob = await exportPrescriptionPdf(prescriptionCode);
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setPdfPreviewUrl(objectUrl);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Không tải được bản xem trước.");
        }
      } finally {
        if (!cancelled) {
          setLoading((prev) => ({ ...prev, preview: false }));
        }
      }
    };

    loadPreview();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [prescriptionCode]);

  const handleExportPdf = async () => {
    setError("");
    setLoading((prev) => ({ ...prev, pdf: true }));
    try {
      const blob = await exportPrescriptionPdf(prescriptionCode);
      downloadBlob(blob, `don-thuoc-${prescriptionCode}.pdf`);
    } catch (err) {
      setError(err.message || "Xuất PDF thất bại.");
    } finally {
      setLoading((prev) => ({ ...prev, pdf: false }));
    }
  };

  const handleExportWord = async () => {
    setError("");
    setLoading((prev) => ({ ...prev, word: true }));
    try {
      const blob = await exportPrescriptionWord(prescriptionCode);
      downloadBlob(blob, `don-thuoc-${prescriptionCode}.docx`);
    } catch (err) {
      setError(err.message || "Xuất Word thất bại.");
    } finally {
      setLoading((prev) => ({ ...prev, word: false }));
    }
  };

  return (
    <div
      style={{ padding: "30px" }}
      className="w-full h-9/10 flex flex-col min-h-0"
    >
      <div className="bg-white flex-1 min-h-0 rounded-2xl shadow-xl flex flex-col overflow-y-auto">
        <div
          className="flex flex-col px-5 pt-3 text-black text-xs cursor-pointer flex-shrink-0"
          onClick={() => navigate(-1)}
        >
          <BackIcon />
          <p>Trở về</p>
        </div>

        <Title
          title="IN ĐƠN THUỐC"
          subtitle="DANH SÁCH ĐƠN THUỐC"
          wrapperClass="text-center mb-5 flex-shrink-0"
          titleClass="text-3xl font-bold"
          subtitleClass="text-xs"
        />
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        {prescriptionCode ? (
          <div className="flex flex-col items-center gap-4 px-8 py-4 flex-1 min-h-0">
            <div className="w-full max-w-5xl">
              {loading.preview ? (
                <div className="w-full h-110 flex items-center justify-center text-gray-400 text-sm border border-gray-200 rounded">
                  Đang tải xem trước...
                </div>
              ) : pdfPreviewUrl ? (
                <iframe
                  src={pdfPreviewUrl}
                  className="w-full h-110 rounded border border-gray-200"
                  title="PDF Preview"
                />
              ) : (
                <div className="w-full h-110 rounded border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                  Chưa có dữ liệu xem trước
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-16 pb-6">
              <Button
                onClick={handleExportWord}
                disabled={loading.word}
                className="w-30 h-10 bg-gradient-to-r from-white to-[#000080] shadow-[inset_0_1px_0.75px_0_rgba(255,255,255,0.07),_0_4px_4px_0_rgba(0,0,0,0.25)] flex items-center justify-center text-white font-bold gap-2"
              >
                <img src={wordicon} alt="" className="h-8" />
                {loading.word ? "..." : "WORD"}
              </Button>
              <Button
                onClick={handleExportPdf}
                disabled={loading.pdf}
                className="w-30 h-10 bg-gradient-to-r from-white to-[#9E0C1B] shadow-[inset_0_1px_0.75px_0_rgba(255,255,255,0.07),_0_4px_4px_0_rgba(0,0,0,0.25)] flex items-center justify-center text-white font-bold gap-2"
              >
                <img src={pdfIcon} alt="" />
                {loading.pdf ? "..." : "PDF"}
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm py-8">
            Thiếu mã đơn thuốc.
          </p>
        )}
      </div>
    </div>
  );
}
