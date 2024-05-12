import { Types } from "mongoose";

export type ITaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface ITask {
  _id?: Types.ObjectId; 
  title: string;
  description: string;
  status: ITaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: Types.ObjectId; 
  name: string;
  email: string;
  password: string;
}

export interface ICustomBreadcrump {
  label: string;
  href?: string;
  color?: string;
}