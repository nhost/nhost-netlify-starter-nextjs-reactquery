import { queryClient } from '@/utils/react-query-client';
import {
  useAddSpeakerMutation,
  useSpeakersQuery,
} from '@/utils/__generated__/graphql';
import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLProps } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface AddNewSpeakerInputProps
  extends DetailedHTMLProps<HTMLProps<HTMLInputElement>, HTMLInputElement> {
  /**
   * Error message
   */
  error?: string;
}

const AddNewSpeakerInput = forwardRef(function AddNewSpeakerInput(
  { className, error, ...props }: AddNewSpeakerInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">
        <label
          htmlFor={props.id}
          className="text-list self-center text-xs font-medium"
        >
          {props.label}
        </label>
      </div>

      <div className="grid grid-flow-row col-span-2 gap-1">
        <input
          ref={ref}
          className={twMerge(
            'bg-input px-3 py-2 text-xs text-white border border-gray-700 rounded-md',
            className,
          )}
          minLength={2}
          maxLength={128}
          spellCheck="false"
          autoCapitalize="none"
          {...props}
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
});

type AddNewSpeakerValues = {
  name: string;
  social: string;
  jobTitle: string;
  avatarUrl: string;
};

export function AddNewSpeaker() {
  const { mutateAsync, isLoading, error } = useAddSpeakerMutation({
    onSuccess: () => {
      queryClient.fetchQuery(useSpeakersQuery.getKey());
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddNewSpeakerValues>({
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      social: '',
      jobTitle: '',
      avatarUrl: 'https://via.placeholder.com/350x350',
    },
  });

  async function onSubmit(values: AddNewSpeakerValues) {
    try {
      await mutateAsync({
        speaker: {
          name: values.name,
          social: values.social,
          job_description: values.jobTitle,
          avatar_url: values.avatarUrl,
        },
      });

      reset({
        name: '',
        social: '',
        jobTitle: '',
        avatarUrl: 'https://via.placeholder.com/350x350',
      });
    } catch {
      // This error is handled by useAddSpeakerMutatio
    }
  }
  return (
    <div className="bg-card w-full px-12 pt-10 pb-10 border border-gray-700 rounded-md">
      <form
        className="grid grid-flow-row gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error ? (
          <div className="bg-opacity-10 px-4 py-4 text-sm text-white bg-red-500 rounded-md">
            Error:{' '}
            {error instanceof Error
              ? error.message
              : 'Unknown error occurred. Please try again.'}
          </div>
        ) : null}

        <AddNewSpeakerInput
          {...register('avatarUrl', {
            required: { value: true, message: 'This field is required.' },
          })}
          id="avatarUrl"
          label="Avatar URL"
          placeholder="Avatar URL"
          error={errors?.avatarUrl?.message}
          disabled={isLoading}
        />

        <AddNewSpeakerInput
          {...register('name', {
            required: { value: true, message: 'This field is required.' },
          })}
          id="speakerName"
          label="Name"
          placeholder="Name"
          error={errors?.name?.message}
          disabled={isLoading}
        />

        <AddNewSpeakerInput
          {...register('social', {
            required: { value: true, message: 'This field is required.' },
          })}
          id="social"
          label="Twitter Tag"
          placeholder="Twitter Tag"
          error={errors?.social?.message}
          disabled={isLoading}
        />

        <AddNewSpeakerInput
          {...register('jobTitle', {
            required: { value: true, message: 'This field is required.' },
          })}
          id="jobTitle"
          label="Job Title"
          placeholder="Job Title"
          error={errors?.jobTitle?.message}
          disabled={isLoading}
        />

        <div className="flex flex-col">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-header py-3 text-xs font-medium text-white border-gray-500 rounded-md"
          >
            {isLoading ? 'Loading...' : 'Add New Speaker'}
          </button>
        </div>
      </form>
    </div>
  );
}
