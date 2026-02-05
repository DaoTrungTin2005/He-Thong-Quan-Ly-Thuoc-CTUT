import TableHeader from "./TableHeader.jsx";
import TableRow from "./TableRow/TableRow.jsx";

export default function Table({
  columns,
  data,
  onEdit,
  onResetPassword,
  onLock,
  onUnlock,
}) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <TableHeader columns={columns} />
      </thead>

      <tbody>
        {data.map((row, index) => (
          <TableRow
            key={row.id || index}
            row={row}
            columns={columns}
            index={index}
            onEdit={onEdit}
            onResetPassword={onResetPassword}
            onLock={onLock}
            onUnlock={onUnlock}
          />
        ))}
      </tbody>
    </table>
  );
}
