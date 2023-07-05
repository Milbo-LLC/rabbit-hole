import Page from "@/components/ui/pages/Page";
import { PulseLoader } from "react-spinners";
import { useUser } from "@auth0/nextjs-auth0/client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import CourseSelector from "@/components/feature-course/ui/CourseSelector";

export default function Courses() {
  // const router = useRouter();
  const { user, error, isLoading } = useUser();

  // Redirect to home if user is not logged in
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [router, user]);

  // Loading View
  if (isLoading) {
    return (
      <Page>
        <div className="flex w-full h-full justify-center items-center">
          <PulseLoader size={20} color="#64B6AC" />
        </div>
      </Page>
    );
  }

  // Error View
  if (error) return <div>{error.message}</div>;

  // Logged in view
  if (user) {
    return (
      <Page>
        <CourseSelector user={user} />
      </Page>
    );
  }

  return null;
}
