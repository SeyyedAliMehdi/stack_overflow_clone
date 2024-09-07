"use server";

import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/models/user.model";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "@/lib/actions/shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/models/question.model";

export async function getUserByID(params: any) {
  try {
    await connectToDatabase();
    const { userId } = params;

    return await User.findOne({ clerkId: userId });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();

    return await User.create(userData);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();

    const { clerkId, updateData, path } = params;
    return await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();

    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user and its data from database and return the deleted user

    // Get user questions ids
    const userQuestionIds = await Question.find({ author: user.id }).distinct(
      "_id",
    );

    await Question.deleteMany({ author: user._id });

    // TODO: Delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
