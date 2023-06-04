import Page from "@/components/ui/pages/Page";
import Header from "@/components/feature-landing/ui/Header";

export default function Home() {
  return (
    <Page>
      <div className="flex w-full h-fit flex-col gap-4 pb-4">
        <Header />
      </div>
    </Page>
  );
}
