package student.ctuet.edu.vn.hethongquanlythuoc.service;

import java.io.ByteArrayOutputStream;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import student.ctuet.edu.vn.hethongquanlythuoc.domain.Medicine;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.MedicineBatch;
import student.ctuet.edu.vn.hethongquanlythuoc.domain.MedicineHistory;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineBatchRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineHistoryRepository;
import student.ctuet.edu.vn.hethongquanlythuoc.repository.MedicineRepository;

@Service
public class PdfExportService {

    private final MedicineRepository medicineRepository;
    private final MedicineHistoryRepository historyRepository;
    private final MedicineBatchRepository batchRepository;

    public PdfExportService(MedicineRepository medicineRepository,
            MedicineHistoryRepository historyRepository,
            MedicineBatchRepository batchRepository) {
        this.medicineRepository = medicineRepository;
        this.historyRepository = historyRepository;
        this.batchRepository = batchRepository;
    }

    public byte[] exportMedicineReport(LocalDate from, LocalDate to) throws Exception {

        // ── Load font hỗ trợ tiếng Việt ──
        // Cần file times.ttf trong src/main/resources/fonts/
        BaseFont baseFont = BaseFont.createFont(
                new ClassPathResource("fonts/times.ttf").getURL().toString(),
                BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

        Font fontNormal = new Font(baseFont, 12, Font.NORMAL);
        Font fontBold = new Font(baseFont, 12, Font.BOLD);
        Font fontItalic = new Font(baseFont, 12, Font.ITALIC);
        Font fontTitle = new Font(baseFont, 14, Font.BOLD);
        Font fontHeaderTable = new Font(baseFont, 11, Font.BOLD);
        Font fontData = new Font(baseFont, 11, Font.NORMAL);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document doc = new Document(PageSize.A4.rotate(), 30, 30, 30, 30); // landscape
        PdfWriter.getInstance(doc, out);
        doc.open();

        // ── Header trường ──
        PdfPTable headerTable = new PdfPTable(2);
        headerTable.setWidthPercentage(100);
        headerTable.setWidths(new float[] { 50, 50 });

        // Trái - căn giữa
        PdfPCell leftCell = new PdfPCell();
        leftCell.setBorder(PdfPCell.NO_BORDER);
        leftCell.setHorizontalAlignment(Element.ALIGN_CENTER); // ← CENTER

        Paragraph truong = new Paragraph("TRƯỜNG ĐẠI HỌC KỸ THUẬT - CÔNG NGHỆ CẦN THƠ", fontNormal);
        truong.setAlignment(Element.ALIGN_CENTER); // ← thêm dòng này
        leftCell.addElement(truong);

        Paragraph phong = new Paragraph("PHÒNG CÔNG TÁC CHÍNH TRỊ - QUẢN LÝ SINH VIÊN - KHỞI NGHIỆP", fontBold);
        phong.setAlignment(Element.ALIGN_CENTER);
        leftCell.addElement(phong);
        headerTable.addCell(leftCell);

        // Phải - căn giữa
        PdfPCell rightCell = new PdfPCell();
        rightCell.setBorder(PdfPCell.NO_BORDER);
        rightCell.setHorizontalAlignment(Element.ALIGN_CENTER); // ← CENTER

        Paragraph congHoa = new Paragraph("CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", fontBold);
        congHoa.setAlignment(Element.ALIGN_CENTER); // ← thêm dòng này
        rightCell.addElement(congHoa);

        Paragraph docLap = new Paragraph("Độc lập - Tự do - Hạnh phúc", fontBold);
        docLap.setAlignment(Element.ALIGN_CENTER);
        rightCell.addElement(docLap);
        headerTable.addCell(rightCell);

        doc.add(headerTable);

        // ── Ngày tháng ──
        Paragraph dateLine = new Paragraph(
                "Cần Thơ, Ngày " + to.getDayOfMonth() + " tháng " + to.getMonthValue() + " năm " + to.getYear(),
                fontItalic);
        dateLine.setAlignment(Element.ALIGN_RIGHT);
        dateLine.setSpacingBefore(5);
        doc.add(dateLine);

        // ── Tiêu đề ──
        Paragraph title = new Paragraph("BẢNG THỐNG KÊ XUẤT - NHẬP - TỒN THUỐC", fontTitle);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingBefore(15);
        doc.add(title);

        Paragraph dateRange = new Paragraph(
                from.getDayOfMonth() + "/" + from.getMonthValue() + "/" + from.getYear()
                        + " - " + to.getDayOfMonth() + "/" + to.getMonthValue() + "/" + to.getYear(),
                fontNormal);
        dateRange.setAlignment(Element.ALIGN_CENTER);
        dateRange.setSpacingAfter(10);
        doc.add(dateRange);

        // ── Bảng dữ liệu ──
        // 9 cột: STT | TÊN | ĐVT | TỒN NĂM TRƯỚC | TỔNG NHẬP | TỔNG XUẤT | CÒN LẠI |
        // CÒN HẠN | HẾT HẠN
        PdfPTable table = new PdfPTable(9);
        table.setWidthPercentage(100);
        table.setWidths(new float[] { 4, 20, 5, 12, 9, 9, 9, 12, 10 });
        table.setSpacingBefore(5);

        // ── Header dòng 1 ──
        String tonLabel = "TỒN " + to.getDayOfMonth() + "/" + to.getMonthValue() + "/" + to.getYear();
        String[] row1Labels = { "STT", "TÊN LOẠI THUỐC", "ĐVT", "TỒN NĂM TRƯỚC\n(còn hạn sử dụng)", "TỔNG NHẬP",
                "TỔNG XUẤT" };

        for (String label : row1Labels) {
            PdfPCell cell = makeHeaderCell(label, fontHeaderTable);
            cell.setRowspan(2); // merge dọc 2 dòng
            table.addCell(cell);
        }

        // "TỒN cuối kỳ" merge ngang 3 cột
        PdfPCell tonHeader = makeHeaderCell(tonLabel, fontHeaderTable);
        tonHeader.setColspan(3);
        table.addCell(tonHeader);

        // ── Header dòng 2 ──
        table.addCell(makeHeaderCell("Còn lại", fontHeaderTable));
        table.addCell(makeHeaderCell("Còn hạn\nsử dụng", fontHeaderTable));
        table.addCell(makeHeaderCell("Hết hạn\nsử dụng", fontHeaderTable));

        // ── Data ──
        Instant fromInstant = from.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant toInstant = to.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
        List<Medicine> medicines = medicineRepository.findAll();

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

            table.addCell(makeDataCell(String.valueOf(stt++), fontData, Element.ALIGN_CENTER));
            table.addCell(makeDataCell(medicine.getName(), fontData, Element.ALIGN_LEFT));
            table.addCell(makeDataCell(medicine.getUnit(), fontData, Element.ALIGN_CENTER));
            table.addCell(makeDataCell("-", fontData, Element.ALIGN_CENTER));
            table.addCell(
                    makeDataCell(totalImport == 0 ? "-" : String.valueOf(totalImport), fontData, Element.ALIGN_CENTER));
            table.addCell(
                    makeDataCell(totalExport == 0 ? "-" : String.valueOf(totalExport), fontData, Element.ALIGN_CENTER));
            table.addCell(
                    makeDataCell(remaining == 0 ? "-" : String.valueOf(remaining), fontData, Element.ALIGN_CENTER));
            table.addCell(makeDataCell(valid == 0 ? "-" : String.valueOf(valid), fontData, Element.ALIGN_CENTER));
            table.addCell(makeDataCell(expired == 0 ? "-" : String.valueOf(expired), fontData, Element.ALIGN_CENTER));
        }

        doc.add(table);
        doc.close();
        return out.toByteArray();
    }

    // ── Helper: header cell ──
    private PdfPCell makeHeaderCell(String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setPadding(5);
        cell.setMinimumHeight(30);
        return cell;
    }

    // ── Helper: data cell ──
    private PdfPCell makeDataCell(String text, Font font, int align) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setHorizontalAlignment(align);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setPadding(4);
        cell.setMinimumHeight(22);
        return cell;
    }
}