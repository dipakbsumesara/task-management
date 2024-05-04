import { Types } from "mongoose";

export type ITaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface ITask {
  _id?: Types.ObjectId; 
  title: string;
  description: string;
  status: ITaskStatus;
}
