export type Event = {
  id: string;
  userId: string;
  name: string;
  activityId: string;
  startDate: string;
  status: string;
  endDate: string;
  date: string;
  usersList: { userId: string; attended: boolean }[];
  description: string;
  autoFrequency: boolean;
  createdAt: Date;
  updatedAt: Date;
};
