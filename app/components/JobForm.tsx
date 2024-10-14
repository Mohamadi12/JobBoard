"use client";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useState } from "react";
import {
  Button,
  RadioGroup,
  TextArea,
  TextField,
  Theme,
} from "@radix-ui/themes";
import { Phone, Star, User, Mail } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { redirect } from "next/navigation";
import { saveJobAction } from "../actions/JobActions";
import type { Job } from "../models/Job";

const JobForm = ({ orgId, jobDoc }: { orgId: string; jobDoc?: Job }) => {
  const [countryId, setCountryId] = useState(jobDoc?.countryId || 0);
  const [stateId, setStateId] = useState(jobDoc?.stateId || 0);
  const [cityId, setCityId] = useState(jobDoc?.cityId || 0);
  const [countryName, setCountryName] = useState(jobDoc?.country || "");
  const [stateName, setStateName] = useState(jobDoc?.state || "");
  const [cityName, setCityName] = useState(jobDoc?.city || "");

  const handleSaveJob = async (data: FormData) => {
    data.set("country", countryName.toString());
    data.set("state", stateName.toString());
    data.set("city", cityName.toString());
    data.set("countryId", countryId.toString());
    data.set("stateId", stateId.toString());
    data.set("cityId", cityId.toString());
    data.set("orgId", orgId);
    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`);
  };

  return (
    <>
      <Theme>
        <form
          action={handleSaveJob}
          className="container mt-6 flex flex-col gap-4"
        >
          {jobDoc && <input type="hidden" name="id" value={jobDoc?._id} />}
          <TextField.Root
            name="title"
            placeholder="Job title"
            defaultValue={jobDoc?.title || ""}
          />
          <div className="grid sm:grid-cols-3 *:grow gap-6 mt-4">
            <div>
              Remote ?
              <RadioGroup.Root
                defaultValue={jobDoc?.remote || "hybrid"}
                name="remote"
              >
                <RadioGroup.Item value="onsite">One site</RadioGroup.Item>
                <RadioGroup.Item value="hybrid">
                  Hybrid - remote
                </RadioGroup.Item>
                <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div>
              Full time ?
              <RadioGroup.Root
                defaultValue={jobDoc?.type || "full"}
                name="type"
              >
                <RadioGroup.Item value="project">Project</RadioGroup.Item>
                <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
                <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
              </RadioGroup.Root>
            </div>
            <div>
              Salary
              <TextField.Root name="salary" defaultValue={jobDoc?.salary || ""}>
                <TextField.Slot>$</TextField.Slot>
                <TextField.Slot>k/year</TextField.Slot>
              </TextField.Root>
            </div>
          </div>
          <div className="mt-6">
            Location
            <div className="flex flex-col sm:flex-row gap-4 *:grow">
              <CountrySelect
                defaultValue={
                  countryId ? { id: countryId, name: countryName } : 0
                }
                onChange={(e: any) => {
                  setCountryId(e.id);
                  setCountryName(e.name);
                }}
                placeHolder="Select Country"
              />
              <StateSelect
                defaultValue={stateId ? { id: stateId, name: stateName } : 0}
                value={stateId}
                countryid={countryId}
                onChange={(e: any) => {
                  setStateId(e.id);
                  setStateName(e.name);
                }}
                placeHolder="Select State"
              />
              <CitySelect
                defaultValue={cityId ? { id: cityId, name: cityName } : 0}
                value={cityId}
                countryid={countryId}
                stateid={stateId}
                onChange={(e: any) => {
                  setCityId(e.id);
                  setCityName(e.name);
                }}
                placeHolder="Select City"
              />
            </div>
          </div>
          <div className="sm:flex">
            <div className="w-1/3">
              <h3>Job icon</h3>
              <ImageUpload
                icon={Star}
                name="jobIcon"
                defaultValue={jobDoc?.jobIcon || ""}
              />
            </div>
            <div className="grow">
              <h3>contact person</h3>
              <div className="flex  gap-2">
                <div>
                  <ImageUpload
                    icon={User}
                    name="contactPhoto"
                    defaultValue={jobDoc?.contactPhoto || ""}
                  />
                </div>
                <div className="grow flex flex-col gap-1">
                  <TextField.Root
                    placeholder="John Doe"
                    name="contactName"
                    defaultValue={jobDoc?.contactName || ""}
                  >
                    <TextField.Slot>
                      <User />
                    </TextField.Slot>
                  </TextField.Root>
                  <TextField.Root
                    placeholder="Phone"
                    type="tel"
                    name="contactPhone"
                    defaultValue={jobDoc?.contactPhone || ""}
                  >
                    <TextField.Slot>
                      <Phone />
                    </TextField.Slot>
                  </TextField.Root>
                  <TextField.Root
                    placeholder="Email"
                    type="email"
                    name="contactEmail"
                    defaultValue={jobDoc?.contactEmail || ""}
                  >
                    <TextField.Slot>
                      <Mail />
                    </TextField.Slot>
                  </TextField.Root>
                </div>
              </div>
            </div>
          </div>
          <TextArea
            placeholder="Job description"
            resize={"vertical"}
            name="description"
            defaultValue={jobDoc?.description || ""}
          />
          <div className="flex justify-center mt-2">
            <Button size="3" className="px-6">
              <span className="px-8">Save</span>
            </Button>
          </div>
        </form>
      </Theme>
    </>
  );
};

export default JobForm;
