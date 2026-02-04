import FormLogin from "../components/FormLogin.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
export default function Login() {
  return (
    <AuthLayout>
      <div className="flex flex-col w-full items-center justify-center absolute top-[62%]">
        <div className="flex flex-col text-white items-center justify-center mb-7">
          <h1 className="text-center text-5xl black-ops-one">
            HỆ THỐNG QUẢN LÍ THUỐC
          </h1>
          <h2 className="text-sm italic">
            Phòng Y Tế - Trường Đại học Kỹ Thuật Công Nghệ Cần Thơ
          </h2>
        </div>
        <FormLogin />
      </div>
    </AuthLayout>
  );
}
