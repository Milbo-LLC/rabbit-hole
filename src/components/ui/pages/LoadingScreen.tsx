import Page from "@/components/ui/pages/Page";
import rabbitHoleLogo from "@/assets/logo.svg";
import Image from "next/image";

export default function LoadingScreen() {
  return (
    <Page>
      <div className="flex w-full h-full justify-center items-center">
        <div className="relative flex w-40 h-40 animate-pulse">
          <Image src={rabbitHoleLogo} alt="rabbit hole Logo" fill />
        </div>
      </div>
    </Page>
  );
}
