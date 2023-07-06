import Page from "@/components/ui/pages/Page";

export default function ErrorScreen({
  message,
}: {
  message: string;
}): JSX.Element {
  return (
    <Page>
      <div className="flex w-full h-full justify-center items-center">
        <div>{message}</div>
      </div>
    </Page>
  );
}
