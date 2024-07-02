import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Ecom-ease Admin",
  description: "Ecom-ease Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
