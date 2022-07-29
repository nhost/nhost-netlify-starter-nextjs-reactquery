/**
 * Speaker is conference speaker type with a name, social, job, and avatarUrl property, all of which are strings.
 * @property {string} name - The name of the speaker
 * @property {string} social - The social media handle of the speaker.
 * @property {string} job - The job title of the speaker
 * @property {string} avatarUrl - The URL of the speaker's avatar.
 */
export type Speaker = {
  name: string;
  social: string;
  job: string;
  avatarUrl: string;
};

export function Speaker({ avatarUrl, name, social, job }: Speaker) {
  return (
    <div className="bg-card flex flex-col py-4 px-4 transition-all duration-150 ease-in border border-gray-700 rounded-md">
      <img
        className="object-cover rounded-md aspect-square p-0.5"
        width={350}
        height={350}
        src={avatarUrl}
      />
      <div className="py-2">
        <h1 className="text-lg font-medium text-white">{name}</h1>
        <h2 className="text-dim text-xs font-medium">@{social}</h2>
        <h2 className="text-dim mt-2 text-sm font-medium">{job}</h2>
      </div>
    </div>
  );
}
