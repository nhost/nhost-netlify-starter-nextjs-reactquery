/**
 * Speaker is conference speaker type with a name, social, job, and avatarUrl property, all of which are strings.
 * @property {string} name - The name of the speaker
 * @property {string} social - The social media handle of the speaker.
 * @property {string} job_description - The job title of the speaker
 * @property {string} avatar_url - The URL of the speaker's avatar.
 */
export type Speaker = {
  id: string;
  name: string;
  social?: string;
  job_description?: string;
  avatar_url?: string;
};
