import Question from "@/components/forms/Question";
import { redirect } from "next/navigation";
import { getUserByID } from "@/lib/actions/user.action";

const AskQuestionPage = async () => {
  const userId = "123456";
  const mongoUser = await getUserByID({ userId });
  // console.log(user);
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestionPage;
