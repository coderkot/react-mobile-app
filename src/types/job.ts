export interface Job {
  id: string;
  openDate: Date;
  header: string;
  method: string;
  target: string;
  qualification: string;
  startDate: Date;
  endDate: Date;
  cost: number;
  wasRespond: boolean;
  description: string;
  canRespond: boolean;
}
