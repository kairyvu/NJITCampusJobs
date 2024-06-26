import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: UserWithId | undefined;
}

export interface BaseUser {
  password: string;
  email: string;
  fullName: string;
  phone: string;
  profileDescription?: string;
  profilePicture?: string;
}

export interface UserWithId extends BaseUser {
  _id: string;
}

export interface Student extends BaseUser {
  accountType: "student";
  classYear: {
    start: number;
    end: number;
  };
  degree: string;
  resume?: string;
  transcript?: string;
  major: string;
}

export interface Employer extends BaseUser {
  accountType: "employer";
  department: string;
}

export type User = Student | Employer;

export interface LoginInfo {
  email: string;
  password: string;
  accountType: string;
}

export interface NewJobPost {
  title: string;
  externalApplication: string;
  jobDescription: string;
  location: string;
  salary: number;
}

export interface NewMessage {
  conversation: string;
  sender: string;
  content: string;
}

export interface Conversation {
  id: string;
  members: Array<string>;
  messageCount: number;
}

export interface Application {
  resumeUrl: string;
  job: string;
  status: string;
  student: string;
}

export interface UploadFile {
  dataURI: string;
}
