import { FetchSectionsOutputType } from 'api-service';

export type ComputedSectionType = Omit<
  FetchSectionsOutputType[number],
  'webfolio_section_content'
> & {
  content: string;
};
