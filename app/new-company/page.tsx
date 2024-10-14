import React from "react";
import { createCompany } from "../actions/workosActions";
import { withAuth } from "@workos-inc/authkit-nextjs";

const NewCompanyPage = async () => {
  const { user } = await withAuth();
  const handleNewCompanyFormSubmit = async (data: FormData) => {
    "use server";
    if (user) {
      await createCompany(data.get("newCompanyName") as string, user.id);
    }
  };
  return (
    <div className="container">
      <h2 className="text-lg mt-6">Create a new company</h2>
      <p className="text-gray-500 text-sm mb-2">
        To create a job listing your first need to register a company
      </p>

      <form action={handleNewCompanyFormSubmit} className="flex gap-2">
        <input
          name="newCompanyName"
          type="text"
          placeholder="company name"
          className="p-2 border border-gray-400 rounded-md"
        />
        <button
          type="submit"
          className="bg-gray-200 px-4 py-2 rounded-md flex gap-2 items-center"
        >
          Create company
        </button>
      </form>
    </div>
  );
};

export default NewCompanyPage;
