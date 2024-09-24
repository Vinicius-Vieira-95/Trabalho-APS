export type Event = {
  id: string;
  userId: string;
  name: string;
  activityId: string;
  startDate: Date;
  status: string;
  endDate: Date;
  usersList: { userId: string; attended: boolean }[];
  description: string;
  autoFrequency: boolean;
  createdAt: Date;
  updatedAt: Date;
};
