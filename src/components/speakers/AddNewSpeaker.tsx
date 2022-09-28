import { queryClient } from '@/utils/react-query-client';
import {
  useAddSpeakerMutation,
  useSpeakersQuery,
} from '@/utils/__generated__/graphql';
import { ChangeEventHandler, useState } from 'react';

interface AddNewSpeakerInputProps {
  name: string;
  inputValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function AddNewSpeakerInput({
  name,
  inputValue,
  onChange,
}: AddNewSpeakerInputProps) {
  return (
    <div className="place-content-between flex flex-row">
      <div className="flex">
        <h1 className="text-list self-center text-xs font-medium">{name}</h1>
      </div>
      <div className="flex w-[230px]">
        <input
          value={inputValue}
          onChange={onChange}
          className="bg-input w-full px-3 py-2 text-xs text-white border border-gray-700 rounded-md"
          autoFocus
          id="Speaker Name"
          placeholder="Speaker Name"
          required
          minLength={2}
          maxLength={128}
          spellCheck="false"
          aria-label="Speaker Name"
          autoCapitalize="none"
        />
      </div>
    </div>
  );
}

export function AddNewSpeaker() {
  const { mutateAsync, isLoading } = useAddSpeakerMutation({
    onSuccess: () => {
      queryClient.fetchQuery(useSpeakersQuery.getKey());
    },
  });

  const [newSpeaker, setNewSpeaker] = useState({
    name: '',
    social: '',
    job_description: '',
    avatar_url: 'https://via.placeholder.com/350x350',
  });

  const [error, setError] = useState<Error | null>(null);

  const handleAddSpeaker = async () => {
    try {
      await mutateAsync({
        speaker: {
          name: newSpeaker.name,
          social: newSpeaker.social,
          job_description: newSpeaker.job_description,
          avatar_url: newSpeaker.avatar_url,
        },
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="bg-card flex flex-col w-full px-12 pt-10 pb-10 space-y-8 border border-gray-700 rounded-md">
      {error ? (
        <div className="bg-opacity-10 px-4 py-4 text-sm bg-red-900 rounded-md">
          Error: {error.message}
        </div>
      ) : null}

      <AddNewSpeakerInput
        name="Speaker Name"
        onChange={(e) => {
          setError(null);
          setNewSpeaker({
            ...newSpeaker,
            name: e.target.value,
          });
        }}
        inputValue={newSpeaker.name}
      />
      <AddNewSpeakerInput
        name="Twitter Tag"
        onChange={(e) => {
          setError(null);
          setNewSpeaker({ ...newSpeaker, social: e.target.value });
        }}
        inputValue={newSpeaker.social}
      />
      <AddNewSpeakerInput
        name="Job Title"
        onChange={(e) => {
          setError(null);
          setNewSpeaker({ ...newSpeaker, job_description: e.target.value });
        }}
        inputValue={newSpeaker.job_description}
      />
      <AddNewSpeakerInput
        name="Avatar URL"
        onChange={(e) => {
          setError(null);
          setNewSpeaker({ ...newSpeaker, name: e.target.value });
        }}
        inputValue={newSpeaker.avatar_url}
      />
      <div className="flex flex-col">
        <button
          onClick={handleAddSpeaker}
          disabled={isLoading}
          className="bg-header py-3 text-xs font-medium text-white border-gray-500 rounded-md"
        >
          {isLoading ? 'Loading...' : 'Add New Speaker'}
        </button>
      </div>
    </div>
  );
}
