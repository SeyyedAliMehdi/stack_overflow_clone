"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Tag from "@/database/models/tag.model";
import Question, { IQuestion } from "@/database/models/question.model";
import User from "@/database/models/user.model";
import {
  CreateQuestionParams,
  GetQuestionsParams,
} from "@/lib/actions/shared.types";
import { revalidatePath } from "next/cache";

// GET
export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();
    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

// POST
export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase();

    const { title, content, tags, author, path } = params; // Default tags to empty array if not provided

    // Create the question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true },
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path); //Revalidation of a specific path, useful for refreshing cached pages or static content.

    return { question }; // Return the created question or appropriate response
  } catch (error) {
    console.error("Error creating question:", error);
    throw error; // Re-throw the error or handle it accordingly
  }
}
