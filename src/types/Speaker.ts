/**
 * Speaker is conference speaker type with a name, social, job, and avatarUrl property, all of which are strings.
 * @property {string} name - The name of the speaker
 * @property {string} social - The social media handle of the speaker.
 * @property {string} job - The job title of the speaker
 * @property {string} avatarUrl - The URL of the speaker's avatar.
 */
export type Speaker = {
  id: string;
  name: string;
  social: string;
  job: string;
  avatarUrl: string;
};
