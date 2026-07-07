import { api } from "../lib/apiClient";

/**
 * Xuất đơn thuốc dạng Word
 * GET /api/v1/prescriptions/:prescriptionCode/export/word
 * @returns {Promise<Blob>}
 */
export const exportPrescriptionWord = (prescriptionCode) =>
  api.get(`/prescriptions/${prescriptionCode}/export/word`, {
    responseType: "blob",
  });

/**
 * Xuất đơn thuốc dạng PDF
 * GET /api/v1/prescriptions/:prescriptionCode/export/pdf
 * @returns {Promise<Blob>}
 */
export const exportPrescriptionPdf = (prescriptionCode) =>
  api.get(`/prescriptions/${prescriptionCode}/export/pdf`, {
    responseType: "blob",
  });

/**
 * Helper dùng chung: tải blob về máy dưới dạng file
 */
export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
