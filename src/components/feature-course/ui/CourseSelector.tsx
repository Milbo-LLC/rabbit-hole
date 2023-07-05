import { UserProfile } from "@auth0/nextjs-auth0/client";
import { getClient } from "@/lib/client";
import { CourseEnrollment } from "@/__generated__/graphql";
import { EnrolledInQuery } from "@/components/graph";

export default async function CourseSelector({ user }: { user: UserProfile }) {
  console.log("user: ", user);
  const { data }: { data: { enrollments: CourseEnrollment[] } } =
    await getClient().query({
      query: EnrolledInQuery,
      variables: { user: user.sub },
    });
  console.log("data: ", data);
  return <div>Course Selector</div>;
}
