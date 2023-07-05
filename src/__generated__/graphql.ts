/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Course = {
  __typename?: 'Course';
  authorId: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  enrollments: Array<Maybe<CourseEnrollment>>;
  id: Scalars['ID'];
  prereqs: Array<Maybe<CoursePrereq>>;
  public: Scalars['Boolean'];
  title: Scalars['String'];
  units: Array<Maybe<CourseUnit>>;
  updatedAt: Scalars['String'];
};

export type CourseEnrollment = {
  __typename?: 'CourseEnrollment';
  course: Course;
  courseId: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  progress?: Maybe<CourseProgress>;
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type CoursePrereq = {
  __typename?: 'CoursePrereq';
  course: Course;
  courseId: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  topics: Array<Maybe<PrereqTopic>>;
  updatedAt: Scalars['String'];
};

export type CourseProgress = {
  __typename?: 'CourseProgress';
  createdAt: Scalars['String'];
  currentLessonId?: Maybe<Scalars['String']>;
  enrollment: CourseEnrollment;
  enrollmentId: Scalars['String'];
  exercisesCompleted: Array<Maybe<Scalars['String']>>;
  id: Scalars['ID'];
  lessonsCompleted: Array<Maybe<Scalars['String']>>;
  quizAttempts: Array<Maybe<QuizAttempt>>;
  status: Status;
  updatedAt: Scalars['String'];
};

export type CourseUnit = {
  __typename?: 'CourseUnit';
  course: Course;
  courseId: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  exercises?: Maybe<Array<Maybe<UnitExercise>>>;
  id: Scalars['ID'];
  lessons: Array<Maybe<UnitLesson>>;
  order: Scalars['Int'];
  quizzes: Array<Maybe<UnitQuiz>>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CreateCourseInput = {
  authorId: Scalars['ID'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CreateQuizAttemptInput = {
  attempt: Scalars['Int'];
  courseProgressId: Scalars['String'];
  questionId: Scalars['String'];
  quizId: Scalars['String'];
  response: Scalars['String'];
};

export type GenerateLessonInput = {
  courseDescription: Scalars['String'];
  courseTitle: Scalars['String'];
  lessonId: Scalars['String'];
  lessonTitle: Scalars['String'];
  pastTopics: Scalars['String'];
  topics: Scalars['String'];
};

export type LessonInput = {
  content: Scalars['String'];
  title: Scalars['String'];
  topics?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPrereqs: Course;
  addUnits: Course;
  createCourse: Course;
  createPrereqsJob: Course;
  createQuizAttempt: QuizAttempt;
  createUnitsJob: Course;
  createUserDetails: UserDetails;
  deleteCourse: Course;
  generateExercises: Array<Maybe<UnitExercise>>;
  generateLesson: UnitLesson;
  generatePrereqs: Course;
  generateQuiz: UnitQuiz;
  generateUnits: Course;
  toggleCourseEnrollment: CourseEnrollment;
  updateCompletedLessons: CourseProgress;
  updateCurrentLessonId: CourseProgress;
  updateQuizAttempt: QuizAttempt;
  updateQuizAttemptStatus: QuizAttempt;
  updateUserDetails: UserDetails;
};


export type MutationAddPrereqsArgs = {
  id: Scalars['String'];
  prereqs?: InputMaybe<Array<InputMaybe<PrereqInput>>>;
};


export type MutationAddUnitsArgs = {
  id: Scalars['String'];
  units?: InputMaybe<Array<InputMaybe<UnitInput>>>;
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationCreatePrereqsJobArgs = {
  id: Scalars['String'];
};


export type MutationCreateQuizAttemptArgs = {
  input?: InputMaybe<CreateQuizAttemptInput>;
};


export type MutationCreateUnitsJobArgs = {
  id: Scalars['String'];
};


export type MutationCreateUserDetailsArgs = {
  userId: Scalars['String'];
};


export type MutationDeleteCourseArgs = {
  id: Scalars['String'];
};


export type MutationGenerateExercisesArgs = {
  id: Scalars['String'];
};


export type MutationGenerateLessonArgs = {
  input: GenerateLessonInput;
};


export type MutationGeneratePrereqsArgs = {
  id: Scalars['String'];
};


export type MutationGenerateQuizArgs = {
  id: Scalars['String'];
};


export type MutationGenerateUnitsArgs = {
  id: Scalars['String'];
};


export type MutationToggleCourseEnrollmentArgs = {
  courseId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateCompletedLessonsArgs = {
  input?: InputMaybe<UpdateCompletedLessonsInput>;
};


export type MutationUpdateCurrentLessonIdArgs = {
  input?: InputMaybe<UpdateCurrentLessonIdInput>;
};


export type MutationUpdateQuizAttemptArgs = {
  id: Scalars['String'];
  input?: InputMaybe<UpdateQuizAttemptInput>;
};


export type MutationUpdateQuizAttemptStatusArgs = {
  id: Scalars['String'];
  status?: InputMaybe<Status>;
};


export type MutationUpdateUserDetailsArgs = {
  input?: InputMaybe<UpdateUserDetailsInput>;
  userId: Scalars['String'];
};

export type PrereqInput = {
  description: Scalars['String'];
  title: Scalars['String'];
  topics?: InputMaybe<Array<InputMaybe<TopicInput>>>;
};

export type PrereqTopic = {
  __typename?: 'PrereqTopic';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  prereq: CoursePrereq;
  prereqId: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allCourses?: Maybe<Array<Maybe<Course>>>;
  course?: Maybe<Course>;
  courses: Array<Maybe<Course>>;
  enrolledIn: Array<Maybe<CourseEnrollment>>;
  enrollment: CourseEnrollment;
  userDetails?: Maybe<UserDetails>;
};


export type QueryCourseArgs = {
  id: Scalars['String'];
};


export type QueryCoursesArgs = {
  authorId: Scalars['String'];
};


export type QueryEnrolledInArgs = {
  userId: Scalars['String'];
};


export type QueryEnrollmentArgs = {
  courseId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryUserDetailsArgs = {
  userId: Scalars['String'];
};

export type QuestionInput = {
  answer: Scalars['String'];
  choices?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  question: Scalars['String'];
};

export type QuizAttempt = {
  __typename?: 'QuizAttempt';
  attempt: Scalars['Int'];
  courseProgress: CourseProgress;
  courseProgressId: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  quiz: UnitQuiz;
  quizId: Scalars['String'];
  responses: Array<Maybe<QuizResponse>>;
  status: Status;
  updatedAt: Scalars['String'];
};

export type QuizInput = {
  questions?: InputMaybe<Array<InputMaybe<QuestionInput>>>;
};

export type QuizQuestion = {
  __typename?: 'QuizQuestion';
  answer: Scalars['String'];
  choices: Array<Maybe<Scalars['String']>>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  question: Scalars['String'];
  unit: CourseUnit;
  unitId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type QuizResponse = {
  __typename?: 'QuizResponse';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  question: QuizQuestion;
  questionId: Scalars['String'];
  quizAttempt: QuizAttempt;
  quizAttemptId: Scalars['String'];
  response: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum Status {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type TopicInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type UnitExercise = {
  __typename?: 'UnitExercise';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  task: Scalars['String'];
  unit: CourseUnit;
  unitId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UnitInput = {
  description: Scalars['String'];
  lessons?: InputMaybe<Array<InputMaybe<LessonInput>>>;
  quizzes?: InputMaybe<Array<InputMaybe<QuizInput>>>;
  title: Scalars['String'];
};

export type UnitLesson = {
  __typename?: 'UnitLesson';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  order: Scalars['Int'];
  title: Scalars['String'];
  topics: Scalars['String'];
  unit: CourseUnit;
  unitId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UnitQuiz = {
  __typename?: 'UnitQuiz';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  questions: Array<Maybe<QuizQuestion>>;
  unit: CourseUnit;
  unitId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UpdateCompletedLessonsInput = {
  courseId: Scalars['String'];
  lessonId: Scalars['String'];
  userId: Scalars['String'];
};

export type UpdateCurrentLessonIdInput = {
  courseId: Scalars['String'];
  lessonId: Scalars['String'];
  userId: Scalars['String'];
};

export type UpdateQuizAttemptInput = {
  questionId: Scalars['String'];
  response?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
};

export type UpdateUserDetailsInput = {
  dob?: InputMaybe<Scalars['String']>;
  educationLevel?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  interests?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lastName?: InputMaybe<Scalars['String']>;
  learningStyle?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  nightMode?: InputMaybe<Scalars['Boolean']>;
  occupation?: InputMaybe<Scalars['String']>;
  pronouns?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UserDetails = {
  __typename?: 'UserDetails';
  createdAt?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  educationLevel?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  interests?: Maybe<Array<Maybe<Scalars['String']>>>;
  lastName?: Maybe<Scalars['String']>;
  learningStyle?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  nightMode?: Maybe<Scalars['Boolean']>;
  occupation?: Maybe<Scalars['String']>;
  pronouns?: Maybe<Array<Maybe<Scalars['String']>>>;
  seenOnboarding?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};
