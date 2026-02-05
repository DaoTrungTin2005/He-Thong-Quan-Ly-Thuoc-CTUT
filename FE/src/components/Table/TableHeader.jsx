export default function TableHeader({ columns }) {
  return (
    <tr className="bg-[#F9FAFB] text-sm text-[#B5B7C0]">
      {columns.map((col, index) => (
        <th
          key={index}
          className={`px-4 py-3 font-medium ${
            col.align === "center" ? "text-center" : "text-left"
          }`}
        >
          {col.label}
        </th>
      ))}
    </tr>
  );
}
