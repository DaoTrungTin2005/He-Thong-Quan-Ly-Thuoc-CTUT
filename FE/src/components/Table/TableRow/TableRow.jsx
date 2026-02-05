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
}) {
  const isEven = index % 2 === 0;

  return (
    <tr
      className={`border-b border-[#EEEEEE] text-sm ${
        isEven ? "bg-white" : "bg-[#FAFAFA]"
      }`}
    >
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
            />
          ) : (
            <span className="text-[#292D32]">{row[col.key]}</span>
          )}
        </td>
      ))}
    </tr>
  );
}
