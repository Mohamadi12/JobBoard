"use server";

import mongoose from "mongoose";
import { JobModel } from "../models/Job";
import { revalidatePath } from "next/cache";

export const saveJobAction = async (formData: FormData) => {
  await mongoose.connect(process.env.MONGO_URI as string);
  const { id, ...jobData } = Object.fromEntries(formData);
  const jobDoc = id
    ? await JobModel.findByIdAndUpdate(id, jobData)
    : await JobModel.create(jobData);
  //Si data contient un orgId
  if ("orgId" in jobData) {
    revalidatePath(`/jobs/${jobData?.orgId}`);
  }
  return JSON.parse(JSON.stringify(jobDoc));
};
