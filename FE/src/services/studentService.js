/**
 * studentService.js
 */

import { api } from "../lib/apiClient";

/**
 * Lấy thông tin sinh viên theo mã số
 * GET /api/v1/students/:studentCode
 */
export const getStudentByCode = (studentCode) =>
  api.get(`/students/${studentCode}`);
