/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  AddPrereqsMutation,
  AddUnitsMutation,
  CreateCourseMutation,
} from "@/components/graph";
import {
  Course,
  InputMaybe,
  LessonInput,
  PrereqInput,
  UnitInput,
} from "@/__generated__/graphql";
import { FieldValues } from "react-hook-form";
import useWindowSize from "@/components/utils/hooks/useWindowSize";
import Popup from "@/components/ui/popups/Popup";
import CreateCourseForm from "../forms/CreateCourseForm";
import { Prereq } from "@/app/api/course/generate-prereqs/route";
import { Lesson } from "@/app/api/course/generate-lesson/route";
import { Quiz } from "@/app/api/course/generate-quiz/route";

interface CreateCoursePopupProps {
  authorId: string;
  onClose: any;
  refetchCourses: any;
}

export default function CreateCoursePopup({
  authorId,
  onClose,
  refetchCourses,
}: CreateCoursePopupProps) {
  const screenSize = useWindowSize();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [prereqs, setPrereqs] = useState<Prereq[]>([]);
  const [units, setUnits] = useState<UnitInput[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    console.log("units: ", units);
  }, [units]);

  useEffect(() => {
    if (units.length && prereqs.length && !lessons.length && !quizzes.length) {
      units.forEach((unit) => {
        const topics = unit
          .lessons!.map((lesson: InputMaybe<LessonInput>) => lesson!.topics)
          .join(" ");
        generateQuiz(unit, unit.title, unit.description, topics);
        unit.lessons!.forEach((lesson) =>
          generateLesson(title!, description!, unit, lesson!.title, topics)
        );
      });
    }
  }, [units, prereqs, title, description, lessons, quizzes]);

  useEffect(() => {
    const numLessons = units.reduce(
      (count, current) => count + current.lessons!.length,
      0
    );
    console.log("USEEFFECT - numLessons: ", numLessons);

    if (
      numLessons &&
      lessons.length === numLessons &&
      quizzes.length === units.length
    ) {
      CreateCourse(title!, description!);
    }
  }, [description, lessons, prereqs, quizzes, title, units]);

  // MUTATIONS
  // Create course mutation
  const [createCourse] = useMutation(CreateCourseMutation, {
    onCompleted: (data: { createCourse: Course }) => {
      const completeUnits = units.map((unit) => {
        return {
          title: unit.title,
          description: unit.description,
          lessons: unit.lessons!.map((lesson) => {
            const completeLesson = lessons.find(
              (l) => l.title === lesson!.title
            );
            return {
              title: lesson!.title,
              topics: lesson!.topics,
              content: completeLesson!.content,
            };
          }),
          quizzes: unit.quizzes!,
        };
      });
      refetchCourses();
      onClose();
      setLoading(false);
      AddPrereqs(data.createCourse.id, prereqs);
      AddUnits(data.createCourse.id, completeUnits);
    },
    onError: (error) => console.log("error creating course!: ", error),
  });

  // Function for calling create note mutation
  const CreateCourse = (title: string, description: string) => {
    const input = {
      authorId,
      title,
      description,
    };
    createCourse({
      variables: {
        input,
      },
    });
  };

  // Generate prereqs mutation
  const [addPrereqs] = useMutation(AddPrereqsMutation, {
    onCompleted: (data: { addPrereqs: Course }) => {
      refetchCourses();
    },
    onError: (error) => console.log("error adding prereqs: ", error),
  });

  // Function for calling create note mutation
  const AddPrereqs = (id: string, prereqs: PrereqInput[]) => {
    console.log("addPrereqs - id, prereqs: ", { id, prereqs });
    addPrereqs({
      variables: {
        id,
        prereqs,
      },
    });
  };

  // Generate prereqs mutation
  const [addUnits] = useMutation(AddUnitsMutation, {
    onCompleted: (data: { addUnits: Course }) => {
      refetchCourses();
    },
    onError: (error) => console.log("error adding units: ", error),
  });

  // Function for calling create note mutation
  const AddUnits = (id: string, units: UnitInput[]) => {
    console.log("addUnits - id, units: ", { id, units });
    addUnits({
      variables: {
        id,
        units,
      },
    });
  };

  const generatePrereqs = async (title: string, description: string) => {
    try {
      const response = await fetch("../api/course/generate-prereqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      setPrereqs(data.result);
      return data;
    } catch (error) {
      console.error("Error calling generate-prereqs endpoint: ", error);
    }
  };

  const generateUnits = async (title: string, description: string) => {
    try {
      const response = await fetch("../api/course/generate-units", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      setUnits(data.result);
      return data;
    } catch (error) {
      console.error("Error calling generate-units endpoint: ", error);
    }
  };

  const generateLesson = async (
    courseTitle: string,
    courseDescription: string,
    unit: UnitInput,
    lessonTitle: string,
    topics: string
  ) => {
    try {
      const response = await fetch("../api/course/generate-lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseTitle,
          courseDescription,
          lessonTitle,
          topics,
        }),
      });
      const data = await response.json();
      setLessons((lessons) => [...lessons, data.result]);
      setUnits((units) => [
        ...units.filter((u) => u.title !== unit.title),
        {
          ...units.find((u) => u.title === unit.title)!,
          lessons: [
            ...unit.lessons!.filter((l) => l!.title !== data.result.title),
            data.result,
          ],
        },
      ]);
      return data;
    } catch (error) {
      console.error("Error calling generate-lesson endpoint: ", error);
    }
  };

  const generateQuiz = async (
    unit: UnitInput,
    title: string,
    description: string,
    topics: string
  ) => {
    try {
      const response = await fetch("../api/course/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          topics,
        }),
      });
      const data = await response.json();
      setQuizzes((quizzes) => [...quizzes, data.result]);
      setUnits((units) => [
        ...units.filter((u) => u.title !== title),
        {
          ...unit,
          lessons: unit.lessons,
          quizzes: [data.result],
        },
      ]);
      return data;
    } catch (error) {
      console.error("Error calling openai-test endpoint: ", error);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true);
      setTitle(data.title);
      setDescription(data.description);
      // CreateCourse(data.title, data.description);
      generatePrereqs(data.title, data.description);
      generateUnits(data.title, data.description);
    } catch (error) {
      setLoading(false);
      console.error("Error generating prereqs and units: ", error);
    }
  };

  return (
    <Popup
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "12px",
        padding: "1rem",
        width: screenSize.width > 1024 ? "65%" : "90%",
        maxWidth: 600,
        // aspectRatio: 3 / 2,
        height: 400,
        backgroundColor: "#173F5F",
      }}
      onClose={onClose}
    >
      <div className="flex flex-col w-full h-full items-center justify-between p-0 sm:p-2 gap-1 sm:gap-4">
        <h1 className="text-white p-6 text-xl md:text-3xl">
          What would you like to learn next?
        </h1>
        <CreateCourseForm loading={loading} onSubmit={onSubmit} />
      </div>
    </Popup>
  );
}
