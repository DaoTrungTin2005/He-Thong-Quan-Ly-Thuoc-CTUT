import TableStatus from "./TableStatus.jsx";
import TableAction from "./TableAction.jsx";

export default function TableRow({
  row,
  columns,
  index,
  onEdit,
  onResetPassword,
  onLock,
  onUnlock,
  onUpdate,
  onAdd,
  onRemove,
}) {
  const isEven = index % 2 === 0;

  // Xác định màu nền dựa trên status
  const getRowBackground = () => {
    if (row.status === "success") {
      return "bg-[#E8F5E9] font-bold"; // Màu xanh lá nhạt cho success
    }
    if (row.status === "failed") {
      return "bg-[#FFEBEE] font-bold"; // Màu đỏ nhạt cho failed
    }
    return isEven ? "bg-white" : "bg-[#FAFAFA]"; // Màu mặc định
  };
  return (
    <tr className={`border-b border-[#EEEEEE] text-sm ${getRowBackground()}`}>
      {columns.map((col, colIndex) => (
        <td
          key={colIndex}
          className={`px-4 py-4 ${
            col.align === "center" ? "text-center" : "text-left"
          }`}
        >
          {col.key === "status" ? (
            <TableStatus status={row[col.key]} />
          ) : col.key === "action" ? (
            <TableAction
              rowData={row}
              onEdit={onEdit}
              onResetPassword={onResetPassword}
              onLock={onLock}
              onUnlock={onUnlock}
              onUpdate={onUpdate}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          ) : (
            <span>{row[col.key]}</span>
          )}
        </td>
      ))}
    </tr>
  );
}
