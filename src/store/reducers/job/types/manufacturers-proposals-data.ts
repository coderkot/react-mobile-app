import { Ad } from '../../../../types/ad';

export interface ManufacturersProposalsData {
  isLoading: boolean;
  error: string | null;
  ads: Ad[];
}
