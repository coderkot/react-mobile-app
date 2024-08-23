export interface ListParams {
  page: number;
  size: number;
  sort?: Array<SortItem>;
  title?: string;
  method?: string;
  isPublished?: boolean;
  category?: string;
  search?: string;
}

interface SortItem {
  direction: string;
  field: string;
}
