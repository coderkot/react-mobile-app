import { PathSegment } from '../../types/path-segment';

export type JobStackParamList = {
  JobMenu: undefined;
  Job: { menuTitle: string };
  PersonalAttestation: { menuTitle: string };
  LaboratoryAttestation: undefined;
  JobDetails: {
    pathSegments: PathSegment[];
    title: string;
    menuTitle: string;
  };
  JobFiles: {
    pathSegments: PathSegment[];
    title: string;
    menuTitle: string;
  };
  ManufacturersProposals: undefined;
  ManufacturersProposalsDetail: { adId: string };
  DefectStatementLists: undefined;
  DefectStatement: { id: string | null };
};
