import AdminHeader from "@/components/layout/admin/header/header";

export default function AdminTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <AdminHeader />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
