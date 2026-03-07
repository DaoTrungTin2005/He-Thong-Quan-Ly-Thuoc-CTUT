package student.ctuet.edu.vn.hethongquanlythuoc.service;

import java.io.ByteArrayOutputStream;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.Medicine;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.MedicineBatch;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.MedicineHistory;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineBatchRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineHistoryRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineRepository;

@Service
public class ExportService {

        private final MedicineRepository medicineRepository;
        private final MedicineHistoryRepository historyRepository;
        private final MedicineBatchRepository batchRepository;

        public ExportService(MedicineRepository medicineRepository,
                        MedicineHistoryRepository historyRepository,
                        MedicineBatchRepository batchRepository) {
                this.medicineRepository = medicineRepository;
                this.historyRepository = historyRepository;
                this.batchRepository = batchRepository;
        }

        public byte[] exportMedicineReport(LocalDate from, LocalDate to) throws Exception {

                Workbook wb = new XSSFWorkbook();
                Sheet sheet = wb.createSheet("Báo cáo");

                // ── Fonts ──
                Font fontNormal = wb.createFont();
                fontNormal.setFontName("Times New Roman");
                fontNormal.setBold(false);
                fontNormal.setFontHeightInPoints((short) 14);

                Font fontBold = wb.createFont();
                fontBold.setFontName("Times New Roman");
                fontBold.setBold(true);
                fontBold.setFontHeightInPoints((short) 14);

                Font fontItalic = wb.createFont();
                fontItalic.setFontName("Times New Roman");
                fontItalic.setItalic(true);
                fontItalic.setFontHeightInPoints((short) 14);

                Font fontTitle = wb.createFont();
                fontTitle.setFontName("Times New Roman");
                fontTitle.setBold(true);
                fontTitle.setFontHeightInPoints((short) 16);

                // ── Styles ──
                CellStyle normalCenterStyle = wb.createCellStyle();
                normalCenterStyle.setFont(fontNormal);
                normalCenterStyle.setAlignment(HorizontalAlignment.CENTER);
                normalCenterStyle.setVerticalAlignment(VerticalAlignment.CENTER);

                CellStyle boldCenterStyle = wb.createCellStyle();
                boldCenterStyle.setFont(fontBold);
                boldCenterStyle.setAlignment(HorizontalAlignment.CENTER);
                boldCenterStyle.setVerticalAlignment(VerticalAlignment.CENTER);

                CellStyle italicCenterStyle = wb.createCellStyle();
                italicCenterStyle.setFont(fontItalic);
                italicCenterStyle.setAlignment(HorizontalAlignment.CENTER);
                italicCenterStyle.setVerticalAlignment(VerticalAlignment.CENTER);

                CellStyle titleStyle = wb.createCellStyle();
                titleStyle.setFont(fontTitle);
                titleStyle.setAlignment(HorizontalAlignment.CENTER);
                titleStyle.setVerticalAlignment(VerticalAlignment.CENTER);

                CellStyle subTitleStyle = wb.createCellStyle();
                subTitleStyle.setFont(fontNormal);
                subTitleStyle.setAlignment(HorizontalAlignment.CENTER);
                subTitleStyle.setVerticalAlignment(VerticalAlignment.CENTER);

                CellStyle headerStyle = wb.createCellStyle();
                headerStyle.setFont(fontBold);
                headerStyle.setAlignment(HorizontalAlignment.CENTER);
                headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
                headerStyle.setBorderTop(BorderStyle.THIN);
                headerStyle.setBorderBottom(BorderStyle.THIN);
                headerStyle.setBorderLeft(BorderStyle.THIN);
                headerStyle.setBorderRight(BorderStyle.THIN);
                headerStyle.setWrapText(true);

                CellStyle dataCenterStyle = wb.createCellStyle();
                dataCenterStyle.setFont(fontNormal);
                dataCenterStyle.setAlignment(HorizontalAlignment.CENTER);
                dataCenterStyle.setVerticalAlignment(VerticalAlignment.CENTER);
                dataCenterStyle.setBorderTop(BorderStyle.THIN);
                dataCenterStyle.setBorderBottom(BorderStyle.THIN);
                dataCenterStyle.setBorderLeft(BorderStyle.THIN);
                dataCenterStyle.setBorderRight(BorderStyle.THIN);

                CellStyle dataLeftStyle = wb.createCellStyle();
                dataLeftStyle.setFont(fontNormal);
                dataLeftStyle.setAlignment(HorizontalAlignment.LEFT);
                dataLeftStyle.setVerticalAlignment(VerticalAlignment.CENTER);
                dataLeftStyle.setBorderTop(BorderStyle.THIN);
                dataLeftStyle.setBorderBottom(BorderStyle.THIN);
                dataLeftStyle.setBorderLeft(BorderStyle.THIN);
                dataLeftStyle.setBorderRight(BorderStyle.THIN);

                // ── Column widths ──
                sheet.setColumnWidth(0, 1500);
                sheet.setColumnWidth(1, 9000);
                sheet.setColumnWidth(2, 2500);
                sheet.setColumnWidth(3, 5500);
                sheet.setColumnWidth(4, 4000);
                sheet.setColumnWidth(5, 4000);
                sheet.setColumnWidth(6, 3500);
                sheet.setColumnWidth(7, 5000);
                sheet.setColumnWidth(8, 4500);

                // ── Row 1 ──
                Row r1 = sheet.createRow(0);
                r1.setHeightInPoints(22);
                Cell r1Left = r1.createCell(1);
                r1Left.setCellValue("TRƯỜNG ĐẠI HỌC KỸ THUẬT - CÔNG NGHỆ CẦN THƠ");
                r1Left.setCellStyle(normalCenterStyle);
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 1, 4));
                Cell r1Right = r1.createCell(6);
                r1Right.setCellValue("CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM");
                r1Right.setCellStyle(boldCenterStyle);
                sheet.addMergedRegion(new CellRangeAddress(0, 0, 6, 8));

                // ── Row 2 ──
                Row r2 = sheet.createRow(1);
                r2.setHeightInPoints(22);
                Cell r2Left = r2.createCell(1);
                r2Left.setCellValue("PHÒNG CÔNG TÁC CHÍNH TRỊ - QUẢN LÝ SINH VIÊN - KHỞI NGHIỆP");
                r2Left.setCellStyle(boldCenterStyle); // bỏ gạch chân
                sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 4));
                Cell r2Right = r2.createCell(6);
                r2Right.setCellValue("Độc lập - Tự do - Hạnh phúc");
                r2Right.setCellStyle(boldCenterStyle);
                sheet.addMergedRegion(new CellRangeAddress(1, 1, 6, 8));

                // ── Row 3: trống ──
                sheet.createRow(2).setHeightInPoints(10);

                // ── Row 4: Ngày tháng ──
                Row r4 = sheet.createRow(3);
                r4.setHeightInPoints(22);
                Cell r4Date = r4.createCell(6);
                r4Date.setCellValue("Cần Thơ, Ngày " + to.getDayOfMonth()
                                + " tháng " + to.getMonthValue()
                                + " năm " + to.getYear());
                r4Date.setCellStyle(italicCenterStyle);
                sheet.addMergedRegion(new CellRangeAddress(3, 3, 6, 8));

                // ── Row 5: trống ──
                sheet.createRow(4).setHeightInPoints(10);

                // ── Row 6: Tiêu đề ──
                Row r6 = sheet.createRow(5);
                r6.setHeightInPoints(28);
                Cell titleCell = r6.createCell(0);
                titleCell.setCellValue("BẢNG THỐNG KÊ XUẤT - NHẬP - TỒN THUỐC");
                titleCell.setCellStyle(titleStyle);
                sheet.addMergedRegion(new CellRangeAddress(5, 5, 0, 8));

                // ── Row 7: Khoảng thời gian ──
                Row r7 = sheet.createRow(6);
                r7.setHeightInPoints(20);
                Cell subTitle = r7.createCell(0);
                subTitle.setCellValue(from.getDayOfMonth() + "/" + from.getMonthValue() + "/" + from.getYear()
                                + " - " + to.getDayOfMonth() + "/" + to.getMonthValue() + "/" + to.getYear());
                subTitle.setCellStyle(subTitleStyle);
                sheet.addMergedRegion(new CellRangeAddress(6, 6, 0, 8));

                // ── Row 8: trống ──
                sheet.createRow(7).setHeightInPoints(10);

                // ── Row 9 (index 8): Header dòng 1 ──
                Row header1 = sheet.createRow(8);
                header1.setHeightInPoints(40);

                String[] mainHeaders = {
                                "STT", "TÊN LOẠI THUỐC", "ĐVT",
                                "TỒN NĂM TRƯỚC\n(còn hạn sử dụng)",
                                "TỔNG NHẬP", "TỔNG XUẤT"
                };
                for (int i = 0; i < mainHeaders.length; i++) {
                        Cell c = header1.createCell(i);
                        c.setCellValue(mainHeaders[i]);
                        c.setCellStyle(headerStyle);
                        // merge dọc 2 dòng → dùng RegionUtil để đảm bảo border đầy đủ
                        CellRangeAddress region = new CellRangeAddress(8, 9, i, i);
                        sheet.addMergedRegion(region);
                        applyBorderToRegion(region, sheet);
                }

                // "TỒN cuối kỳ" merge ngang 3 cột
                String tonLabel = "TỒN " + to.getDayOfMonth() + "/" + to.getMonthValue() + "/" + to.getYear();
                Cell tonCell = header1.createCell(6);
                tonCell.setCellValue(tonLabel);
                tonCell.setCellStyle(headerStyle);
                CellRangeAddress tonRegion = new CellRangeAddress(8, 8, 6, 8);
                sheet.addMergedRegion(tonRegion);
                applyBorderToRegion(tonRegion, sheet);

                // ── Row 10 (index 9): Header dòng 2 ──
                Row header2 = sheet.createRow(9);
                header2.setHeightInPoints(40);
                // ── Tạo empty cells cho cột 0-5 ở header2 để border hiện đầy đủ ──
                for (int i = 0; i < 6; i++) {
                        Cell c = header2.getCell(i);
                        if (c == null) {
                                c = header2.createCell(i);
                                c.setCellStyle(headerStyle);
                        }
                }
                String[] subHeaders = { "Còn lại", "Còn hạn sử dụng", "Hết hạn sử dụng" };
                for (int i = 0; i < subHeaders.length; i++) {
                        Cell c = header2.createCell(6 + i);
                        c.setCellValue(subHeaders[i]);
                        c.setCellStyle(headerStyle);
                }

                // ── Data ──
                Instant fromInstant = from.atStartOfDay(ZoneId.systemDefault()).toInstant();
                Instant toInstant = to.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
                List<Medicine> medicines = medicineRepository.findAll();

                int rowNum = 10;
                int stt = 1;
                for (Medicine medicine : medicines) {
                        long medicineId = medicine.getId();

                        List<MedicineHistory> histories = historyRepository
                                        .findByMedicineIdAndDateRange(medicineId, fromInstant, toInstant);

                        int totalImport = histories.stream()
                                        .filter(h -> h.getType() == MedicineHistory.HistoryType.IMPORT)
                                        .mapToInt(MedicineHistory::getQuantity).sum();

                        int totalExport = histories.stream()
                                        .filter(h -> h.getType() == MedicineHistory.HistoryType.EXPORT)
                                        .mapToInt(MedicineHistory::getQuantity).sum();

                        List<MedicineBatch> batches = batchRepository.findByMedicineId(medicineId);
                        int remaining = batches.stream().mapToInt(MedicineBatch::getRemainingQuantity).sum();
                        int expired = batches.stream()
                                        .filter(b -> b.getExpiryDate() != null && b.getExpiryDate().isBefore(to))
                                        .mapToInt(MedicineBatch::getRemainingQuantity).sum();
                        int valid = remaining - expired;

                        Row row = sheet.createRow(rowNum++);
                        row.setHeightInPoints(20);

                        setCell(row, 0, String.valueOf(stt++), dataCenterStyle);
                        setCell(row, 1, medicine.getName(), dataLeftStyle);
                        setCell(row, 2, medicine.getUnit(), dataCenterStyle);
                        setCell(row, 3, "-", dataCenterStyle);
                        setCell(row, 4, totalImport == 0 ? "-" : String.valueOf(totalImport), dataCenterStyle);
                        setCell(row, 5, totalExport == 0 ? "-" : String.valueOf(totalExport), dataCenterStyle);
                        setCell(row, 6, remaining == 0 ? "-" : String.valueOf(remaining), dataCenterStyle);
                        setCell(row, 7, valid == 0 ? "-" : String.valueOf(valid), dataCenterStyle);
                        setCell(row, 8, expired == 0 ? "-" : String.valueOf(expired), dataCenterStyle);
                }

                ByteArrayOutputStream out = new ByteArrayOutputStream();
                wb.write(out);
                wb.close();
                return out.toByteArray();
        }

        // ── Dùng RegionUtil để vẽ border cho toàn vùng merge ──
        private void applyBorderToRegion(CellRangeAddress region, Sheet sheet) {
                RegionUtil.setBorderTop(BorderStyle.THIN, region, sheet);
                RegionUtil.setBorderBottom(BorderStyle.THIN, region, sheet);
                RegionUtil.setBorderLeft(BorderStyle.THIN, region, sheet);
                RegionUtil.setBorderRight(BorderStyle.THIN, region, sheet);
        }

        private void setCell(Row row, int col, String value, CellStyle style) {
                Cell cell = row.createCell(col);
                cell.setCellValue(value);
                cell.setCellStyle(style);
        }
}