import AppButton from "@/components/AppButton";
import AppTextField from "@/components/AppTextField";
import MainNavBar from "@/components/MainNavBar";
import AppDialog from "@/components/AppDialog";
import AppCard from "@/components/AppCard";
import Link from "next/link";
import surveyApi from "@/api/survey";
import { useState } from "react";
import useDialog from "@/hooks/useDialog";

const CreateSurveyDialog = () => {
  const [name, setName] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();

  const { open, handleOnOpenChange, closeDialog } = useDialog();

  const surveyAddMutation = surveyApi.useAdd();
  const handleOnAdd = async () => {
    if (!name || !title || !description) {
      return;
    }

    await surveyAddMutation.mutateAsync({
      name,
      title,
      description,
    });
  };

  const handleOnCreate = async () => {
    await handleOnAdd();
    closeDialog();
  };

  return (
    <AppDialog
      open={open}
      onOpen={handleOnOpenChange}
      trigger={<AppButton primary>Create survey</AppButton>}
    >
      <div className="p-5">
        <AppTextField className="mt-5" label="Name" onChange={setName} />
        <AppTextField className="mt-5" label="Title" onChange={setTitle} />
        <AppTextField
          className="mt-5"
          label="Description"
          onChange={setDescription}
        />
        <AppButton className="mt-10 w-full" primary onClick={handleOnCreate}>
          Create
        </AppButton>
      </div>
    </AppDialog>
  );
};

const Survey = () => {
  const { data: surveys } = surveyApi.useGetAll();

  const surveyDeleteMutation = surveyApi.useDelete();
  const handleOnDelete = async (surveyId: string) => {
    await surveyDeleteMutation.mutateAsync({ id: surveyId });
  };

  return (
    <div className="h-screen">
      <MainNavBar />
      <div className="container mx-auto">
        <div className="flex justify-center mt-5">
          <CreateSurveyDialog />
        </div>

        <div className="flex flex-row px-10 flex-wrap">
          {surveys &&
            surveys.map((survey, i) => (
              <div key={survey.id} className="w-1/4 p-5">
                <AppCard>
                  <div className="w-full mt-2 font-semibold">{survey.name}</div>
                  <div className="flex justify-between">
                    <Link href={`/builder/${survey.id}`}>
                      <AppButton primary>Go to</AppButton>
                    </Link>
                    <AppButton onClick={() => handleOnDelete(survey.id)}>
                      Delete
                    </AppButton>
                  </div>
                </AppCard>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

Survey.auth = true;

export default Survey;
