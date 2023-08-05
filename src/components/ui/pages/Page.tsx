import Topbar from "@/components/feature-nav/topbar";
import Footer from "@/components/feature-nav/footer";

interface PageProps {
  children: JSX.Element;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="flex bg-black text-white min-w-0 w-full max-w-screen min-h-screen">
      <div className="flex flex-col h-full w-screen min-h-screen justify-between">
        <Topbar />
        <div className="flex flex-1 flex-col h-full scrollbar-hide justify-center">
          <div className="flex overflow-auto p-4">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
