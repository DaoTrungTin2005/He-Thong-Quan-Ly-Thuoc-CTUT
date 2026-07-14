/**
 * prescriptionService.js
 */

import { api } from "../lib/apiClient";

/**
 * Lấy danh sách đơn thuốc có phân trang + search
 * GET /api/v1/prescriptions
 */
export const getPrescriptions = (params = {}) => {
  const query = new URLSearchParams();
  query.append("page", params.page ?? 0);
  query.append("size", params.size ?? 10);
  query.append("sortBy", params.sortBy ?? "createdAt");
  query.append("sortDir", params.sortDir ?? "desc");
  if (params.keyword) query.append("keyword", params.keyword);
  if (params.status) query.append("status", params.status);
  return api.get(`/prescriptions?${query.toString()}`);
};

/**
 * Lấy chi tiết đơn thuốc theo prescriptionCode
 * GET /api/v1/prescriptions/:prescriptionCode
 * Response.data.details: [{ id, medicineId, medicineName, unit, quantity, note }]
 */
export const getPrescriptionByCode = (prescriptionCode) =>
  api.get(`/prescriptions/${prescriptionCode}`);

/**
 * Tạo đơn thuốc mới
 * POST /api/v1/prescriptions
 * @param {{ studentCode: string, diagnosis: string, note: string, details: Array<{medicineId: number, quantity: number, note: string}> }} payload
 */
export const createPrescription = (payload) =>
  api.post("/prescriptions", payload);

/**
 * Cập nhật đơn thuốc
 * PUT /api/v1/prescriptions/:prescriptionCode
 * @param {{ studentCode: string, diagnosis: string, note: string, details: Array<{medicineId: number, quantity: number, note: string}> }} payload
 */
export const updatePrescription = (prescriptionCode, payload) =>
  api.put(`/prescriptions/${prescriptionCode}`, payload);

/**
 * Xóa đơn thuốc
 * DELETE /api/v1/prescriptions/:prescriptionCode
 */
export const deletePrescription = (prescriptionCode) =>
  api.delete(`/prescriptions/${prescriptionCode}`);

/**
 * Cấp thuốc
 * PATCH /api/v1/prescriptions/:prescriptionCode/dispense
 */
export const dispensePrescription = (prescriptionCode) =>
  api.patch(`/prescriptions/${prescriptionCode}/dispense`);

/**
 * Hoàn thuốc
 * PATCH /api/v1/prescriptions/:prescriptionCode/return
 */
export const returnPrescription = (prescriptionCode) =>
  api.patch(`/prescriptions/${prescriptionCode}/return`);

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
