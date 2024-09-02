import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filter";
import HomeFilter from "@/components/home/HomeFilter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";

export default function Home() {
  const questions = [
    {
      _id: "1",
      title: "How to center a div?",
      tags: [
        { _id: "1", name: "python" },
        { _id: "2", name: "react" },
      ],
      author: { _id: "101", name: "John Doe", picture: "john.jpg" },
      upvotes: 187,
      views: 1000,
      answers: [{}, {}], // Assuming each answer is an object
      createdAt: new Date("2021-09-01T12:00:00.000Z"),
    },
    {
      _id: "2",
      title: "How to connect to a SQL database?",
      tags: [
        { _id: "3", name: "sql" },
        { _id: "4", name: "database" },
      ],
      author: { _id: "102", name: "Jane Smith", picture: "jane.jpg" },
      upvotes: 200,
      views: 500,
      answers: [{}], // Assuming one answer
      createdAt: new Date("2021-09-01T12:00:00.000Z"),
    },
    {
      _id: "3",
      title: "Best practices for React components?",
      tags: [
        { _id: "2", name: "react" },
        { _id: "5", name: "best practices" },
      ],
      author: { _id: "103", name: "Alice Brown", picture: "alice.jpg" },
      upvotes: 300,
      views: 1200,
      answers: [{}, {}, {}], // Assuming three answers
      createdAt: new Date("2021-09-01T12:00:00.000Z"),
    },
    {
      _id: "4",
      title: "Best practices for React components?",
      tags: [
        { _id: "2", name: "react" },
        { _id: "5", name: "best practices" },
      ],
      author: { _id: "103", name: "Alice Brown", picture: "alice.jpg" },
      upvotes: 300,
      views: 1200,
      answers: [{}, {}, {}], // Assuming three answers
      createdAt: new Date("2021-09-01T12:00:00.000Z"),
    },
    {
      _id: "5",
      title: "Best practices for React components?",
      tags: [
        { _id: "2", name: "react" },
        { _id: "5", name: "best practices" },
      ],
      author: { _id: "103", name: "Alice Brown", picture: "alice.jpg" },
      upvotes: 300,
      views: 1200,
      answers: [{}, {}, {}], // Assuming three answers
      createdAt: new Date("2021-09-01T12:00:00.000Z"),
    },
  ];

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilter />

      {questions.length > 0 ? (
        <div className="w-full mt-10 flex flex-col gap-6">
          {questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              answers={question.answers}
              author={question.author}
              createdAt={question.createdAt}
              tags={question.tags}
              upvotes={question.upvotes}
              views={question.views}
            />
          ))}
        </div>
      ) : (
        <NoResult
          title={"There's no question to show"}
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
                       discussion. our query could be the next big thing others learn from. Get
                       Involved! 💡"
          linkTitle="Ask a Question"
          link="/ask-question"
        />
      )}
    </>
  );
}
