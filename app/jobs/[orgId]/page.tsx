import Jobs from "@/app/components/Jobs";
import { addOrgAndUserData, JobModel } from "@/app/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import React from "react";

type PageProps = {
  params: {
    orgId: string;
  };
};
const CompanyJobsPage = async (props: PageProps) => {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const { user } = await withAuth();
  const org = await workos.organizations.getOrganization(props.params.orgId);
  let jobsDocs = JSON.parse(
    JSON.stringify(await JobModel.find({ orgId: org.id }))
  );
  jobsDocs = await addOrgAndUserData(jobsDocs, user);
  return (
    <div>
      <div className="container">
        <h1 className="text-xl my-6">{org.name}</h1>
      </div>
      <Jobs jobs={jobsDocs} header={"Jobs posted by" + org.name} />
    </div>
  );
};

export default CompanyJobsPage;
