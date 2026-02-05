export default function TableStatus({ status }) {
  const statusConfig = {
    active: {
      text: "text-[#49C10C]",
      label: "Đang sử dụng",
    },
    inactive: {
      text: "text-[#B11010]",
      label: "Đã khóa",
    },
  };

  const config = statusConfig[status] || statusConfig.inactive;

  return (
    <span className={` px-3 py-1 text-xs font-bold ${config.text} `}>
      {config.label}
    </span>
  );
}
