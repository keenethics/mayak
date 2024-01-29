import dynamic from "next/dynamic";
const AdminApp = dynamic(() => import("./adminApp"), {
  ssr: false,
});

const Admin = () => <AdminApp />;

export default Admin;
