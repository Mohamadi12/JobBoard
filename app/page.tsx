import React from "react";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import { addOrgAndUserData, JobModel } from "./models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import mongoose from "mongoose";

const Home = async () => {
  const { user } = await withAuth();
  await mongoose.connect(process.env.MONGO_URI as string);
  const latesJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, { limit: 5, sort: "-createdAt" }),
    user
  );
  return (
    <>
      <Hero />
      <Jobs header={""} jobs={latesJobs} />
    </>
  );
};

export default Home;
