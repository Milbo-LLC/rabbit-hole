import Topbar from "@/components/feature-nav/topbar";

interface AppPageProps {
  children: JSX.Element;
}

export default function AppPage({ children }: AppPageProps) {
  return (
    <div className="flex flex-col bg-black h-screen">
      <Topbar />
      <div className="flex h-full py-4 px-6 overflow-auto">{children}</div>
    </div>
  );
}
