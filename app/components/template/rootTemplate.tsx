import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

function RootTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default RootTemplate;
