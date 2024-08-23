import { DefectStatementScreenData } from './defect-statement-screen-data';
import { JobFilesScreenData } from './job-files-screen-data';
import { JobScreenData } from './job-screen-data';
import { ManufacturersProposalsData } from './manufacturers-proposals-data';

export interface JobState {
  jobScreenData: JobScreenData;
  jobFilesScreenData: JobFilesScreenData;
  manufacturersProposalsData: ManufacturersProposalsData;
  defectStatementScreenData: DefectStatementScreenData;
}
