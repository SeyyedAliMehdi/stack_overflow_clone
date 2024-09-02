"use server";

import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/models/user.model";

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
