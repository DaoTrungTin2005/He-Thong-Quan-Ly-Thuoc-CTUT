import FormNotification from "../components/FormNotification";
export default function Notification() {
  return (
    <div className="w-3/4 bg-white absolute top-20 left-105 h-5/6 rounded-2xl shadow-xl flex flex-col gap-5 py-20 pl-30 pr-50">
      <h1 className="text-lg font-bold">Thông báo</h1>
      <div className="overflow-y-auto max-h-95%">
        <FormNotification type="refusal" />
        <FormNotification type="warning" />
        <FormNotification type="pending" />
        <FormNotification type="success" />
        <FormNotification type="success" />
        <FormNotification type="success" />
        <FormNotification type="success" />
      </div>
    </div>
  );
}
