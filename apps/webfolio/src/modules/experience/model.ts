import { FetchExperienceOutputType } from 'api-service';

export type ComputedExperienceType = Omit<
  FetchExperienceOutputType[number],
  | 'webfolio_experience_description'
  | 'webfolio_experience_title'
  | 'webfolio_experience_short_description'
> & {
  title: string;
  description: string;
  short_description: string;
};
